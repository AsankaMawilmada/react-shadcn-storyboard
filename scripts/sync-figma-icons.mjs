#!/usr/bin/env node
/**
 * Syncs icon components from Figma: downloads every icon component's SVG via
 * the REST API into `.figma/icons/`, then converts each into a React
 * component under `src/icons/`, mirroring the `.figma/themes/` ->
 * `src/styles`+`src/tokens` raw-export/generated-output convention already
 * used for design tokens (see transform-tokens.mjs).
 *
 * Required env (load via `node --env-file=.env.local`, see .env.local.example):
 *   FIGMA_TOKEN     - personal access token (Figma account settings > Security)
 *   FIGMA_FILE_KEY  - the file key from the file's URL: figma.com/design/<KEY>/...
 *
 * Optional env:
 *   FIGMA_ICONS_PAGE  - page name to scan (default: "Icons")
 *   FIGMA_ICON_VARIANT - for component sets with variants, the variant substring
 *                        to prefer, e.g. "Size=24". If unset, the first variant
 *                        child is used and a summary of available variant
 *                        properties is printed so you can tune this and re-run.
 *
 * Every generated component shares one shape (see src/icons/icon.types.ts):
 *   <NameIcon size={24} color="currentColor" strokeWidth={2} {...svgProps} />
 * `color` is applied via a CSS `style.color` override, which `currentColor`
 * fills/strokes (normalized below) inherit — this works uniformly whether the
 * source icon is stroke-based or flat/fill-based, so no per-icon branching is
 * needed. `strokeWidth` is harmless on fill-only icons since they never paint
 * a stroke to begin with.
 *
 * Known limitation: `prefixIds` (via svgo) makes ids unique *across* icon
 * files, but not across multiple simultaneous instances of the *same* icon
 * rendered twice on one page. Icons with gradients/clipPaths could collide in
 * that case — add a `useId()` remap if that turns out to matter in practice.
 *
 * Run via `npm run figma:icons`.
 */
import { readdir, readFile, writeFile, rm, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { transform } from '@svgr/core'
import jsx from '@svgr/plugin-jsx'
import svgo from '@svgr/plugin-svgo'
import prettier from 'prettier'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const RAW_DIR = path.join(ROOT, '.figma/icons')
const OUT_DIR = path.join(ROOT, 'src/icons')

const TOKEN = process.env.FIGMA_TOKEN
const FILE_KEY = process.env.FIGMA_FILE_KEY
const PAGE_NAME = process.env.FIGMA_ICONS_PAGE || 'Icons'
const VARIANT_PREF = process.env.FIGMA_ICON_VARIANT

if (!TOKEN || !FILE_KEY) {
  console.error(
    'Missing FIGMA_TOKEN and/or FIGMA_FILE_KEY. Copy .env.local.example to ' +
      '.env.local and fill them in, then run via `npm run figma:icons`.',
  )
  process.exit(1)
}

const API = 'https://api.figma.com/v1'

async function figmaGet(url) {
  const res = await fetch(url, { headers: { 'X-Figma-Token': TOKEN } })
  if (!res.ok) {
    throw new Error(
      `Figma API ${res.status} ${res.statusText} for ${url}\n${await res.text()}`,
    )
  }
  return res.json()
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// ---------------------------------------------------------------------------
// Naming: normalizes arbitrary Figma layer/component names (slashes, emoji,
// punctuation) into kebab-case filenames and PascalCase component names.
// ---------------------------------------------------------------------------

function words(name) {
  return name
    .replace(/[_/\\]+/g, ' ')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
}

function toKebabCase(name) {
  return words(name)
    .map((w) => w.toLowerCase())
    .join('-')
}

function toPascalCase(name) {
  return words(name)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join('')
}

// ---------------------------------------------------------------------------
// Step 1: fetch raw SVGs from Figma into .figma/icons/
// ---------------------------------------------------------------------------

/** Recursively collects icon candidates from a Figma node subtree.
 * COMPONENT_SET nodes are treated as one icon each (variant children are not
 * recursed into); bare COMPONENT nodes outside any set are also collected. */
function collectIcons(node, results) {
  if (node.type === 'COMPONENT_SET') {
    const variants = node.children ?? []
    const chosen =
      (VARIANT_PREF && variants.find((v) => v.name.includes(VARIANT_PREF))) ??
      variants[0]
    if (chosen) {
      results.push({
        rawName: node.name,
        nodeId: chosen.id,
        variant: chosen.name,
        allVariants: variants.map((v) => v.name),
      })
    }
    return
  }
  if (node.type === 'COMPONENT') {
    results.push({
      rawName: node.name,
      nodeId: node.id,
      variant: null,
      allVariants: [],
    })
    return
  }
  for (const child of node.children ?? []) {
    collectIcons(child, results)
  }
}

function dedupeNames(icons) {
  const seen = new Map()
  for (const icon of icons) {
    const base = toKebabCase(icon.rawName) || 'icon'
    const count = seen.get(base) ?? 0
    seen.set(base, count + 1)
    icon.name = count === 0 ? base : `${base}-${count}`
  }
  return icons
}

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

async function fetchIcons() {
  console.log(`Fetching file ${FILE_KEY}...`)
  const file = await figmaGet(`${API}/files/${FILE_KEY}`)

  const pages = file.document.children.filter((n) => n.type === 'CANVAS')
  const page = pages.find(
    (p) => p.name.toLowerCase() === PAGE_NAME.toLowerCase(),
  )
  if (!page) {
    console.error(
      `Page "${PAGE_NAME}" not found. Available pages: ${pages.map((p) => p.name).join(', ')}\n` +
        'Set FIGMA_ICONS_PAGE to the correct page name and re-run.',
    )
    process.exit(1)
  }

  const icons = []
  collectIcons(page, icons)
  dedupeNames(icons)

  if (icons.length === 0) {
    console.error(
      `No COMPONENT_SET or COMPONENT nodes found on page "${PAGE_NAME}".`,
    )
    process.exit(1)
  }
  console.log(`Found ${icons.length} icons on page "${PAGE_NAME}".`)

  // Summarize variant properties for sets, in case FIGMA_ICON_VARIANT needs tuning.
  const variantSets = icons.filter((i) => i.allVariants.length > 1)
  if (variantSets.length > 0 && !VARIANT_PREF) {
    console.log(
      `\n${variantSets.length} icons have multiple variants; defaulted to the first ` +
        'child of each. Example variant names seen:',
    )
    for (const icon of variantSets.slice(0, 5)) {
      console.log(`  ${icon.rawName}: ${icon.allVariants.join(' | ')}`)
    }
    console.log(
      'If the wrong variant was picked, set FIGMA_ICON_VARIANT (e.g. "Size=24") ' +
        'in .env.local and re-run.\n',
    )
  }

  await mkdir(RAW_DIR, { recursive: true })

  const idToIcon = new Map(icons.map((i) => [i.nodeId, i]))
  const manifest = []
  let fetched = 0
  const failed = []

  for (const batch of chunk(icons, 50)) {
    const ids = batch.map((i) => i.nodeId).join(',')
    let data
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        data = await figmaGet(
          `${API}/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg`,
        )
        break
      } catch (err) {
        if (attempt === 2) throw err
        console.warn(
          `Batch render failed (attempt ${attempt + 1}), retrying...`,
          err.message,
        )
        await sleep(1000 * 2 ** attempt)
      }
    }

    for (const [nodeId, url] of Object.entries(data.images ?? {})) {
      const icon = idToIcon.get(nodeId)
      if (!url) {
        failed.push(icon?.rawName ?? nodeId)
        continue
      }
      try {
        const svgRes = await fetch(url)
        if (!svgRes.ok) throw new Error(`${svgRes.status} ${svgRes.statusText}`)
        const svg = await svgRes.text()
        await writeFile(path.join(RAW_DIR, `${icon.name}.svg`), svg, 'utf8')
        manifest.push({
          name: icon.name,
          nodeId: icon.nodeId,
          variant: icon.variant,
        })
        fetched++
      } catch (err) {
        console.warn(`Failed to download "${icon?.rawName}": ${err.message}`)
        failed.push(icon?.rawName ?? nodeId)
      }
    }
    await sleep(300)
  }

  manifest.sort((a, b) => a.name.localeCompare(b.name))
  await writeFile(
    path.join(RAW_DIR, 'manifest.json'),
    JSON.stringify(manifest, null, 2) + '\n',
    'utf8',
  )

  console.log(
    `\nFetched ${fetched}/${icons.length} icons into ${path.relative(ROOT, RAW_DIR)}/`,
  )
  if (failed.length > 0) {
    console.log(`Failed to fetch (${failed.length}): ${failed.join(', ')}`)
  }
}

// ---------------------------------------------------------------------------
// Step 2: convert .figma/icons/*.svg into src/icons/*Icon.tsx components
// ---------------------------------------------------------------------------

/** Strips inline stroke-width (the root controls it dynamically instead, see
 * the component template below) and normalizes hardcoded colors to
 * `currentColor` so they follow the `color` prop uniformly for every icon. */
function preprocess(svg) {
  return svg
    .replace(/\s+stroke-width="[\d.]+"/g, '')
    .replace(
      /(fill|stroke)="(?!none")(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|black|white)"/gi,
      '$1="currentColor"',
    )
}

function extractDefaultStrokeWidth(svg) {
  const match = svg.match(/stroke-width="([\d.]+)"/)
  return match ? match[1] : '2'
}

async function generateOne(fileName) {
  const filePath = path.join(RAW_DIR, fileName)
  const raw = await readFile(filePath, 'utf8')
  const defaultStrokeWidth = extractDefaultStrokeWidth(raw)
  const cleaned = preprocess(raw)

  const kebabName = fileName.replace(/\.svg$/, '')
  const componentName = `${toPascalCase(kebabName)}Icon`

  const code = await transform(
    cleaned,
    {
      plugins: [svgo, jsx],
      icon: false,
      expandProps: 'end',
      typescript: true,
      jsxRuntime: 'automatic',
      svgProps: {
        width: '{size}',
        height: '{size}',
        strokeWidth: `{strokeWidth}`,
        style: '{color ? { color, ...style } : style}',
      },
      svgoConfig: {
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: { removeViewBox: false, convertColors: false },
            },
          },
          'removeDimensions',
          { name: 'prefixIds', params: { prefix: kebabName } },
        ],
      },
      template: (variables, { tpl }) => tpl`
import type { IconProps } from './icon.types'

export function ${variables.componentName}({
  size = 24,
  color,
  strokeWidth = ${defaultStrokeWidth},
  style,
  background,
  backgroundPadding,
  ...props
}: IconProps) {
  const icon = ${variables.jsx}
  if (!background) return icon
  const padding =
    backgroundPadding ?? (typeof size === 'number' ? Math.round(size * 0.4) : 8)
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        background,
        padding,
      }}
    >
      {icon}
    </span>
  )
}
`,
    },
    { componentName, filePath },
  )

  const outPath = path.join(OUT_DIR, `${componentName}.tsx`)
  const prettierConfig = await prettier.resolveConfig(outPath)
  const formatted = await prettier.format(code, {
    ...prettierConfig,
    filepath: outPath,
  })
  await writeFile(outPath, formatted, 'utf8')
  return componentName
}

async function generateComponents() {
  const files = (await readdir(RAW_DIR)).filter((f) => f.endsWith('.svg'))
  if (files.length === 0) {
    console.error(`No SVGs found in ${path.relative(ROOT, RAW_DIR)}/.`)
    process.exit(1)
  }

  await mkdir(OUT_DIR, { recursive: true })
  // Clear previously generated icon components so removed/renamed Figma icons
  // don't leave stale files behind; icon.types.ts and index.ts are rewritten below.
  const existing = await readdir(OUT_DIR)
  await Promise.all(
    existing
      .filter((f) => f.endsWith('Icon.tsx'))
      .map((f) => rm(path.join(OUT_DIR, f))),
  )

  const componentNames = []
  const failed = []
  for (const file of files) {
    try {
      componentNames.push(await generateOne(file))
    } catch (err) {
      console.warn(`Failed to generate component for ${file}: ${err.message}`)
      failed.push(file)
    }
  }

  componentNames.sort()
  const barrel =
    componentNames.map((name) => `export * from './${name}'`).join('\n') +
    `\nexport type { IconProps } from './icon.types'\n`
  await writeFile(path.join(OUT_DIR, 'index.ts'), barrel, 'utf8')

  console.log(
    `Generated ${componentNames.length} icon components in ${path.relative(ROOT, OUT_DIR)}/`,
  )
  if (failed.length > 0) {
    console.log(`Failed to generate (${failed.length}): ${failed.join(', ')}`)
  }
}

async function main() {
  await fetchIcons()
  console.log()
  await generateComponents()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
