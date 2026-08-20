#!/usr/bin/env node
/**
 * Converts a flat Figma-variables JSON dump (the shape a Figma MCP server's
 * variable-reading tool returns, e.g. Dev Mode MCP's `get_variable_defs` —
 * roughly `{ "surface/default": "#FFFFFF", "radius/radius-sm": "6px" }`)
 * into this repo's W3C-style `.figma/themes/<theme>/*.tokens.json` shape,
 * and deep-merges it into the existing files rather than overwriting them.
 *
 * Why merge, not replace: an MCP variable-read is normally scoped to
 * whatever's selected/open in Figma at the time, not "every variable in the
 * file" — so this is meant to be run repeatedly with partial pulls, folding
 * each one into what's already on disk.
 *
 * Why this doesn't try to reproduce colors.tokens.json's rich
 * `$extensions.com.figma.*` metadata (variable IDs, alias chains, scopes):
 * scripts/transform-tokens.mjs never reads `$extensions` — only `$type` and
 * `$value` (see its `flattenColorValue`/`pathGet`). That metadata came from
 * whatever originally exported these files (a Figma plugin or the REST
 * Variables API, not MCP) and is decorative; a plain `{ $type, $value }`
 * leaf is all the transform pipeline needs.
 *
 * USAGE (see .claude/commands/sync-figma-tokens.md for the full workflow):
 *   node scripts/figma-variables-to-tokens.mjs \
 *     --input <path-to-raw-mcp-json> \
 *     --target colors.tokens.json \
 *     [--theme default]
 *
 * The exact shape of a given Figma MCP server's variable output isn't
 * something this script can guarantee sight-unseen — verify --input against
 * a real pull and adjust `inferType`/`splitPath` below if it differs from
 * the flat "path/segments": value assumption.
 */
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const FIGMA_DIR = path.join(ROOT, '.figma/themes');

const parseArgs = (argv) => {
  const args = { theme: 'default' };
  for (let i = 0; i < argv.length; i += 1) {
    const flag = argv[i];
    if (flag === '--input') args.input = argv[++i];
    else if (flag === '--target') args.target = argv[++i];
    else if (flag === '--theme') args.theme = argv[++i];
    else if (flag === '--delimiter') args.delimiter = argv[++i];
  }
  return args;
};

const args = parseArgs(process.argv.slice(2));
if (!args.input || !args.target) {
  console.error(
    'Usage: node scripts/figma-variables-to-tokens.mjs --input <raw.json> --target <file.tokens.json> [--theme default] [--delimiter /]',
  );
  process.exit(1);
}

const delimiter = args.delimiter ?? '/';

// Figma variable values arrive as plain strings/numbers (unlike the rich
// {colorSpace,components,alpha,hex} object form in the original Figma
// export) — a hex string or "6px"/"24" style numeric string is enough for
// scripts/transform-tokens.mjs, which already tolerates a plain string
// $value for colors (see its flattenColorValue).
const inferType = (rawValue) => {
  const value = String(rawValue).trim();
  if (/^#([0-9a-f]{3,8})$/i.test(value)) return 'color';
  if (/^rgba?\(/i.test(value)) return 'color';
  if (/^-?\d+(\.\d+)?(px|rem)?$/i.test(value)) return 'number';
  return 'string';
};

const toValue = (rawValue, type) => {
  if (type !== 'number') return String(rawValue).trim();
  // Strip a unit suffix and keep a raw number — scripts/transform-tokens.mjs
  // does its own px->rem conversion (see its `figma/rem` transform) and
  // expects a bare number in the source JSON, not "6px".
  const numeric = parseFloat(String(rawValue));
  return Number.isNaN(numeric) ? rawValue : numeric;
};

const deepMerge = (target, source) => {
  for (const [key, value] of Object.entries(source)) {
    if (
      value &&
      typeof value === 'object' &&
      !('$value' in value) &&
      target[key] &&
      typeof target[key] === 'object'
    ) {
      deepMerge(target[key], value);
    } else {
      target[key] = value;
    }
  }
  return target;
};

const raw = JSON.parse(readFileSync(args.input, 'utf8'));
// Accept either `{ "path": "value" }` or `{ "path": { value, type } }` —
// Figma MCP servers vary on this across versions/implementations.
const entries = Object.entries(raw).map(([key, entry]) => {
  const rawValue =
    entry && typeof entry === 'object' && 'value' in entry
      ? entry.value
      : entry;
  const type =
    entry && typeof entry === 'object' && 'type' in entry
      ? entry.type
      : inferType(rawValue);
  return [key, type, toValue(rawValue, type)];
});

const tree = {};
let count = 0;
for (const [keyPath, type, value] of entries) {
  const segments = keyPath.split(delimiter).filter(Boolean);
  let node = tree;
  for (const segment of segments.slice(0, -1)) {
    node[segment] ??= {};
    node = node[segment];
  }
  node[segments.at(-1)] = { $type: type, $value: value };
  count += 1;
}

const targetDir = path.join(FIGMA_DIR, args.theme);
mkdirSync(targetDir, { recursive: true });
const targetPath = path.join(targetDir, args.target);

const existing = existsSync(targetPath)
  ? JSON.parse(readFileSync(targetPath, 'utf8'))
  : {};
const merged = deepMerge(existing, tree);

writeFileSync(targetPath, `${JSON.stringify(merged, null, 2)}\n`);

console.log(
  `Merged ${count} variable(s) from ${args.input} into ${path.relative(ROOT, targetPath)}`,
);
console.log('Review the diff, then run: npm run transform-tokens');
