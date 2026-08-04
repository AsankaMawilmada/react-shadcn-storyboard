#!/usr/bin/env node
/**
 * Transforms the raw Figma W3C token export in `.figma/themes/<name>/*.tokens.json`
 * into consumable CSS (`src/styles/`) and TS (`src/tokens/`) source, using Style
 * Dictionary as the transform engine. Run via `npm run transform-tokens`.
 *
 * Three gotchas this script exists to handle (see plan for detail):
 *  1. desktop/tablet/mobile.tokens.json share identical top-level key names for
 *     different per-device values — each is built as its own isolated
 *     StyleDictionary instance, never combined in one `source` glob, and the
 *     responsive CSS is hand-assembled from the three resolved dictionaries.
 *  2. the component-state TS export reads `dictionary.unfilteredTokens` rather
 *     than `dictionary.tokens`, because that file's `filter` is deliberately
 *     narrowed (see buildComponentState below) and would otherwise drop tokens.
 *  3. dark-mode overrides are hand-maintained constants in this script, since
 *     no Figma dark-mode export exists — they are never derived from tokens.
 */
import StyleDictionary from 'style-dictionary';
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import prettier from 'prettier';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FIGMA_DIR = path.join(ROOT, '.figma/themes');
const CSS_DIR = path.join(ROOT, 'src/styles');
const TS_DIR = path.join(ROOT, 'src/tokens');

mkdirSync(CSS_DIR, { recursive: true });
mkdirSync(TS_DIR, { recursive: true });

const figmaPath = (theme, file) => path.join(FIGMA_DIR, theme, file);
const readJSON = (file) => JSON.parse(readFileSync(file, 'utf8'));

// ---------------------------------------------------------------------------
// Shared value helpers
// ---------------------------------------------------------------------------

/** Figma exports color $value as {colorSpace, components, alpha, hex}; a
 * hand-authored theme (midnight) may just use a plain hex string. Normalize
 * to a hex string either way. */
const flattenColorValue = (tree) => {
  const walk = (node) => {
    if (!node || typeof node !== 'object') return;
    if ('$value' in node) {
      if (
        node.$type === 'color' &&
        node.$value &&
        typeof node.$value === 'object'
      ) {
        node.$value = node.$value.hex ?? String(node.$value);
      }
      return;
    }
    for (const key of Object.keys(node)) {
      if (key.startsWith('$')) continue;
      walk(node[key]);
    }
  };
  walk(tree);
  return tree;
};

const pxToRem = (px) => {
  const rem = Number(px) / 16;
  return `${parseFloat(rem.toFixed(4))}rem`;
};

const pathGet = (tree, segments) => {
  let node = tree;
  for (const segment of segments) {
    node = node?.[segment];
    if (node === undefined) {
      throw new Error(`Token path not found: ${segments.join('.')}`);
    }
  }
  if (!('$value' in node)) {
    throw new Error(
      `Path ${segments.join('.')} does not resolve to a leaf token`,
    );
  }
  return node.$value;
};

/** Minimal recursive pretty-printer for generated TS object literals. */
const toTsLiteral = (value, indent = 0) => {
  const pad = '  '.repeat(indent);
  const padIn = '  '.repeat(indent + 1);
  if (typeof value === 'object' && value !== null) {
    const entries = Object.entries(value)
      .map(([key, val]) => {
        const safeKey = /^[A-Za-z_$][\w$]*$/.test(key)
          ? key
          : JSON.stringify(key);
        return `${padIn}${safeKey}: ${toTsLiteral(val, indent + 1)},`;
      })
      .join('\n');
    return `{\n${entries}\n${pad}}`;
  }
  return JSON.stringify(value);
};

const banner =
  '/* GENERATED FILE — do not edit by hand.\n * Produced by scripts/transform-tokens.mjs from .figma/themes/. Run `npm run transform-tokens` to regenerate.\n */\n\n';

// ---------------------------------------------------------------------------
// Style Dictionary registration (shared across builds)
// ---------------------------------------------------------------------------

StyleDictionary.registerPreprocessor({
  name: 'figma/flatten-color',
  preprocessor: (tokens) => flattenColorValue(tokens),
});

StyleDictionary.registerTransform({
  name: 'figma/rem',
  type: 'value',
  filter: (token) =>
    token.$type === 'number' &&
    (token.filePath.endsWith('radius.tokens.json') ||
      token.filePath.endsWith('spacing.tokens.json') ||
      (token.filePath.endsWith('text.tokens.json') &&
        token.path[0] === 'size')),
  transform: (token) =>
    token.path.at(-1) === 'radius-full' ? '9999px' : pxToRem(token.$value),
});

// Figma's float32 export introduces artifacts like 1.100000023841858 for a
// clean 1.1 — round any remaining raw numbers (weight, line-height) so the
// generated output doesn't carry that noise through.
StyleDictionary.registerTransform({
  name: 'figma/round-number',
  type: 'value',
  filter: (token) =>
    token.$type === 'number' && typeof token.$value === 'number',
  transform: (token) => Math.round(token.$value * 1000) / 1000,
});

StyleDictionary.registerTransform({
  name: 'figma/px',
  type: 'value',
  filter: (token) =>
    token.$type === 'number' &&
    ['desktop.tokens.json', 'tablet.tokens.json', 'mobile.tokens.json'].some(
      (f) => token.filePath.endsWith(f),
    ),
  transform: (token) => `${token.$value}px`,
});

// ---------------------------------------------------------------------------
// Colors — curated semantic mapping, default theme + midnight theme
// ---------------------------------------------------------------------------

const COLOR_VAR_MAP = {
  background: ['surface', 'default'],
  foreground: ['text', 'default'],
  card: ['surface', 'default'],
  'card-foreground': ['text', 'default'],
  popover: ['surface', 'default'],
  'popover-foreground': ['text', 'default'],
  primary: ['surface', 'brand'],
  'primary-foreground': ['text', 'inverse'],
  secondary: ['surface', 'subtle'],
  'secondary-foreground': ['text', 'default'],
  muted: ['surface', 'subtle'],
  'muted-foreground': ['text', 'subtle'],
  accent: ['surface', 'brand-subtler'],
  'accent-foreground': ['text', 'brand'],
  destructive: ['border', 'status', 'error'],
  'destructive-foreground': ['text', 'inverse'],
  success: ['border', 'status', 'success'],
  'success-foreground': ['text', 'inverse'],
  warning: ['border', 'status', 'warning'],
  'warning-foreground': ['text', 'inverse'],
  ring: ['border', 'focused'],
  link: ['text', 'link'],
  'link-hover': ['text', 'link-hover'],
  'link-pressed': ['text', 'link-pressed'],
};

const buildThemeColors = async (theme, { pinBorderInputToPrimitive }) => {
  const sd = new StyleDictionary({
    source: [figmaPath(theme, 'colors.tokens.json')],
    preprocessors: ['figma/flatten-color'],
    platforms: { css: { transforms: [] } },
  });
  await sd.hasInitialized;
  const dictionary = await sd.getPlatformTokens('css');
  const tree = dictionary.tokens;

  const vars = {};
  for (const [cssVar, tokenPath] of Object.entries(COLOR_VAR_MAP)) {
    vars[cssVar] = pathGet(tree, tokenPath);
  }

  if (pinBorderInputToPrimitive) {
    // Deliberately bypass the semantic `border.*` group for these two vars —
    // pinned straight to a primitive swatch to match the original
    // hand-authored look, per the design brief.
    const primitives = flattenColorValue(
      readJSON(figmaPath('default', 'style.tokens.json')),
    );
    const pinned = pathGet(primitives, ['_colors', '_grayscale', '_200']);
    vars.border = pinned;
    vars.input = pinned;
  } else {
    vars.border = pathGet(tree, ['border', 'default']);
    vars.input = pathGet(tree, ['border', 'default']);
  }

  return vars;
};

// ---------------------------------------------------------------------------
// Radius & spacing — full scales, straight passthrough
// ---------------------------------------------------------------------------

const buildScale = async (theme, file, groupKey) => {
  const sd = new StyleDictionary({
    source: [figmaPath(theme, file)],
    platforms: { css: { transforms: ['figma/rem'] } },
  });
  await sd.hasInitialized;
  const dictionary = await sd.getPlatformTokens('css');
  const group = dictionary.tokens[groupKey];
  const result = {};
  for (const [key, token] of Object.entries(group)) {
    result[key.replace(`${groupKey}-`, '')] = token.$value;
  }
  return result;
};

// ---------------------------------------------------------------------------
// Typography
// ---------------------------------------------------------------------------

const buildTypography = async (theme) => {
  const sd = new StyleDictionary({
    source: [figmaPath(theme, 'text.tokens.json')],
    platforms: { css: { transforms: ['figma/round-number', 'figma/rem'] } },
  });
  await sd.hasInitialized;
  const dictionary = await sd.getPlatformTokens('css');
  const t = dictionary.tokens;
  const strip = (group, prefix) =>
    Object.fromEntries(
      Object.entries(t[group]).map(([key, token]) => [
        key.replace(`${prefix}-`, ''),
        token.$value,
      ]),
    );
  return {
    family: strip('family', 'family'),
    size: strip('size', 'size'),
    weight: strip('weight', 'weight'),
    lineHeight: strip('lineheight', 'lineheight'),
  };
};

// ---------------------------------------------------------------------------
// Layout — desktop/tablet/mobile, each an ISOLATED StyleDictionary instance
// so identical top-level keys (margin, gutter, ...) across the three files
// never collide in a shared `source` glob.
// ---------------------------------------------------------------------------

const DEVICES = ['mobile', 'tablet', 'desktop'];

const buildLayoutDevice = async (device) => {
  const sd = new StyleDictionary({
    source: [figmaPath('default', `${device}.tokens.json`)],
    platforms: { css: { transforms: ['figma/px'] } },
  });
  await sd.hasInitialized;
  const dictionary = await sd.getPlatformTokens('css');
  const t = dictionary.tokens;
  return {
    margin: t.margin.$value,
    gutter: t.gutter.$value,
    contentMaxWidth: t['content max-width'].$value,
    paragraphMaxWidth: t['paragraph-max-width'].$value,
    breakpoint: t.breakpoints.breakpoint.$value,
    widths: Object.fromEntries(
      Object.entries(t.widths).map(([key, token]) => [
        key.replace('width-', ''),
        token.$value,
      ]),
    ),
    containers: Object.fromEntries(
      Object.entries(t.containers).map(([key, token]) => [key, token.$value]),
    ),
  };
};

// ---------------------------------------------------------------------------
// Component-state tokens — raw data only, never imported by button.tsx.
// Demonstrates the `dictionary.unfilteredTokens` gotcha: this output's file
// `filter` only matches the `buttons` group (mirroring a real pipeline where
// that filter exists to drive a *different*, buttons-only output elsewhere),
// so `dictionary.tokens` inside the format would be missing `link` entirely.
// Reading `dictionary.unfilteredTokens` instead recovers the full tree.
// ---------------------------------------------------------------------------

StyleDictionary.registerFormat({
  name: 'figma/component-state-ts',
  format: ({ dictionary }) => {
    const rebuild = (node) => {
      if (
        node &&
        typeof node === 'object' &&
        'path' in node &&
        '$value' in node
      ) {
        return node.value ?? node.$value;
      }
      const out = {};
      for (const [key, val] of Object.entries(node)) {
        if (key.startsWith('$')) continue;
        out[key] = rebuild(val);
      }
      return out;
    };
    // NOTE: dictionary.tokens here only contains `buttons` (see file filter
    // below) — dictionary.unfilteredTokens is required to also get `link`.
    const full = rebuild(dictionary.unfilteredTokens);
    return (
      banner +
      `export const componentState = ${toTsLiteral(full)} as const\n\n` +
      'export default componentState\n'
    );
  },
});

const buildComponentState = async () => {
  const sd = new StyleDictionary({
    source: [figmaPath('default', 'components.tokens.json')],
    preprocessors: ['figma/flatten-color'],
    platforms: {
      ts: {
        buildPath: `${TS_DIR}/`,
        files: [
          {
            destination: 'component-state.ts',
            format: 'figma/component-state-ts',
            filter: (token) => token.path[0] === 'buttons',
          },
        ],
      },
    },
  });
  await sd.buildAllPlatforms();
};

// ---------------------------------------------------------------------------
// Assemble outputs
// ---------------------------------------------------------------------------

const cssVarBlock = (vars, indent = '  ') =>
  Object.entries(vars)
    .map(([key, value]) => `${indent}--${key}: ${value};`)
    .join('\n');

// Hand-maintained — no Figma dark-mode export exists for this theme.
const DARK_MODE_COLORS = {
  background: '#0B0B0F',
  foreground: '#F5F3FA',
  card: '#141018',
  'card-foreground': '#F5F3FA',
  popover: '#141018',
  'popover-foreground': '#F5F3FA',
  primary: '#9B5CFF',
  'primary-foreground': '#17131F',
  secondary: '#211B2E',
  'secondary-foreground': '#F5F3FA',
  muted: '#211B2E',
  'muted-foreground': '#B9B0CC',
  accent: '#3D2E5C',
  'accent-foreground': '#DCC4FF',
  destructive: '#FF6B6B',
  'destructive-foreground': '#17131F',
  success: '#4ADE80',
  'success-foreground': '#17131F',
  warning: '#FBBF24',
  'warning-foreground': '#17131F',
  border: '#2A2340',
  input: '#2A2340',
  ring: '#C9A6FF',
  link: '#C9A6FF',
  'link-hover': '#DCC4FF',
  'link-pressed': '#B088F0',
};

const main = async () => {
  const defaultColors = await buildThemeColors('default', {
    pinBorderInputToPrimitive: true,
  });
  const midnightColors = await buildThemeColors('midnight', {
    pinBorderInputToPrimitive: false,
  });

  const radius = await buildScale('default', 'radius.tokens.json', 'radius');
  const spacing = await buildScale('default', 'spacing.tokens.json', 'spacing');
  const typography = await buildTypography('default');

  const [mobile, tablet, desktop] = await Promise.all(
    DEVICES.map(buildLayoutDevice),
  );

  await buildComponentState();

  // ---- src/styles/tokens.css ----
  const fontFamily = (name) =>
    `"${name}", ui-sans-serif, system-ui, -apple-system, sans-serif`;

  const typographyVars = {
    'font-sans': fontFamily(typography.family.base),
    'font-heading': fontFamily(typography.family.heading),
    ...Object.fromEntries(
      Object.entries(typography.size).map(([k, v]) => [`text-${k}`, v]),
    ),
    ...Object.fromEntries(
      Object.entries(typography.weight).map(([k, v]) => [
        `font-weight-${k}`,
        v,
      ]),
    ),
    ...Object.fromEntries(
      Object.entries(typography.lineHeight).map(([k, v]) => [
        `leading-${k}`,
        v,
      ]),
    ),
  };

  const radiusVars = Object.fromEntries(
    Object.entries(radius).map(([k, v]) => [`radius-${k}`, v]),
  );
  const spacingVars = Object.fromEntries(
    Object.entries(spacing).map(([k, v]) => [`spacing-${k}`, v]),
  );

  const layoutStaticVars = {
    'layout-paragraph-max-width': mobile.paragraphMaxWidth,
    ...Object.fromEntries(
      Object.entries(desktop.widths).map(([k, v]) => [`layout-width-${k}`, v]),
    ),
    ...Object.fromEntries(
      Object.entries(desktop.containers).map(([k, v]) => [`layout-${k}`, v]),
    ),
  };
  const layoutResponsiveVars = (device) => ({
    'layout-margin': device.margin,
    'layout-gutter': device.gutter,
    'layout-content-max-width': device.contentMaxWidth,
  });

  const tokensCss = `${banner}:root {
  /* colors — default theme */
${cssVarBlock(defaultColors)}

  /* radius scale */
${cssVarBlock(radiusVars)}

  /* spacing scale */
${cssVarBlock(spacingVars)}

  /* typography */
${cssVarBlock(typographyVars)}

  /* layout — mobile-first base (see @media overrides below) */
${cssVarBlock(layoutResponsiveVars(mobile))}
${cssVarBlock(layoutStaticVars)}
}

@media (min-width: ${tablet.breakpoint}) {
  :root {
${cssVarBlock(layoutResponsiveVars(tablet))}
  }
}

@media (min-width: ${desktop.breakpoint}) {
  :root {
${cssVarBlock(layoutResponsiveVars(desktop))}
  }
}

:root[data-theme="midnight"] {
  /* colors — midnight theme (radius/spacing/typography/layout inherited) */
${cssVarBlock(midnightColors)}
}

/* Theming is controlled entirely by the explicit data-theme attribute (see
 * ThemeProvider) — deliberately no @media (prefers-color-scheme: dark) here,
 * so the OS/browser color scheme never overrides it. */
.dark {
${cssVarBlock(DARK_MODE_COLORS)}
}
`;
  writeFileSync(path.join(CSS_DIR, 'tokens.css'), tokensCss);

  // ---- src/styles/theme.css ----
  // Deliberately NOT registering spacingVars here: Tailwind v4 shares the
  // bare `--spacing-*` theme namespace across every sizing utility family
  // (w-*, h-*, max-w-*, max-h-*, min-w-*, min-h-*, size-*, gap-*, p-*, m-*,
  // inset-*, ...), not just padding/margin/gap. Our Figma spacing scale's
  // key names (xs/sm/md/lg/xl/2xl/3xl/...) collide with Tailwind's own
  // t-shirt-size vocabulary for max-w-*/w-*/etc — registering
  // `--spacing-md` here silently redefines `max-w-md` from Tailwind's
  // stock 28rem down to our spacing token's 0.5rem project-wide. The named
  // spacing scale is still fully available as plain CSS custom properties
  // in tokens.css `:root` (usable via `var(--spacing-md)` / arbitrary
  // value syntax) and in src/tokens/spacing.ts — just not auto-wired into
  // Tailwind's utility-generating theme.
  const themeCss = `${banner}@theme inline {
${Object.keys(defaultColors)
  .map((key) => `  --color-${key}: var(--${key});`)
  .join('\n')}

${Object.keys(radiusVars)
  .map((key) => `  --${key}: var(--${key});`)
  .join('\n')}

${Object.keys(typographyVars)
  .map((key) => `  --${key}: var(--${key});`)
  .join('\n')}
}
`;
  writeFileSync(path.join(CSS_DIR, 'theme.css'), themeCss);

  // ---- src/tokens/*.ts ----
  const primitives = flattenColorValue(
    readJSON(figmaPath('default', 'style.tokens.json')),
  );
  const rebuildPrimitives = (node) => {
    if (node && typeof node === 'object' && '$value' in node)
      return node.$value;
    const out = {};
    for (const [key, val] of Object.entries(node)) {
      if (key.startsWith('$')) continue;
      out[key] = rebuildPrimitives(val);
    }
    return out;
  };

  writeFileSync(
    path.join(TS_DIR, 'colors.ts'),
    `${banner}export const colors = {\n  default: ${toTsLiteral(defaultColors, 1)},\n  midnight: ${toTsLiteral(midnightColors, 1)},\n} as const\n\nexport const primitives = ${toTsLiteral(rebuildPrimitives(primitives))} as const\n\nexport default colors\n`,
  );

  writeFileSync(
    path.join(TS_DIR, 'radius.ts'),
    `${banner}export const radius = ${toTsLiteral(radius)} as const\n\nexport default radius\n`,
  );

  writeFileSync(
    path.join(TS_DIR, 'spacing.ts'),
    `${banner}export const spacing = ${toTsLiteral(spacing)} as const\n\nexport default spacing\n`,
  );

  writeFileSync(
    path.join(TS_DIR, 'typography.ts'),
    `${banner}export const typography = ${toTsLiteral(typography)} as const\n\nexport default typography\n`,
  );

  writeFileSync(
    path.join(TS_DIR, 'layout.ts'),
    `${banner}export const layout = {\n  mobile: ${toTsLiteral(mobile, 1)},\n  tablet: ${toTsLiteral(tablet, 1)},\n  desktop: ${toTsLiteral(desktop, 1)},\n} as const\n\nexport default layout\n`,
  );

  writeFileSync(
    path.join(TS_DIR, 'index.ts'),
    `${banner}export * from './colors'\nexport * from './radius'\nexport * from './spacing'\nexport * from './typography'\nexport * from './layout'\nexport * from './component-state'\n`,
  );

  // toTsLiteral (above) and Style Dictionary's own JS formatters both emit
  // double-quoted strings, regardless of the project's prettier config —
  // reformat every generated file here instead of hand-tracking quote style
  // (or any other prettier setting) separately.
  const prettierConfig = await prettier.resolveConfig(
    path.join(TS_DIR, 'index.ts'),
  );
  for (const file of readdirSync(TS_DIR)) {
    if (!file.endsWith('.ts')) continue;
    const filePath = path.join(TS_DIR, file);
    const formatted = await prettier.format(readFileSync(filePath, 'utf8'), {
      ...prettierConfig,
      filepath: filePath,
    });
    writeFileSync(filePath, formatted);
  }

  console.log('Token transform complete:');
  console.log('  src/styles/tokens.css');
  console.log('  src/styles/theme.css');
  console.log(
    '  src/tokens/{colors,radius,spacing,typography,layout,component-state,index}.ts',
  );
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
