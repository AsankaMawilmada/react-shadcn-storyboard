#!/usr/bin/env node
// The whole `npm run build:lib` pipeline in one place. Deliberately not
// Vite (this repo's own bundler, Rolldown as of Vite 8): Rolldown's
// tree-shaking silently drops re-exported bindings from pure
// `export * from './x'` barrel files — an entire component's exports, or a
// whole module, can vanish with no warning, even with treeshake disabled.
// `tsc` is a pure 1:1 transpiler with no bundling and no dead-code
// elimination, which is what preserving a folder-per-component module
// structure actually needs.
//
// 1. tsc            — transpiles src/index.ts, src/components/**,
//                      src/tokens/**, src/lib/** (stories/tests excluded
//                      via tsconfig.build.json) to dist/, mirroring src/
//                      1:1, with .d.ts alongside every .js.
// 2. tsc-alias       — rewrites @/* alias imports to relative paths.
// 3. fixLibExtensions — tsc emits bundler-style extensionless relative
//                      specifiers (`from './components/button'`); Node's
//                      own ESM resolver requires them fully specified.
//                      Rewrites every relative import/export in
//                      dist/**/*.{js,d.ts} to an explicit .js (or
//                      <dir>/index.js).
// 4. copyStyles      — copies src/styles/*.css to dist/styles/ (nothing
//                      imports them as JS modules, so steps 1-3 never
//                      touch them).
import { execSync } from 'node:child_process'
import {
  cpSync,
  existsSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { replaceTscAliasPaths } from 'tsc-alias'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DIST = path.join(ROOT, 'dist')
const TSCONFIG = path.join(ROOT, 'tsconfig.build.json')

// Only matches real import/export statement lines (checked separately,
// see below) — never text inside comments that merely looks like one.
const SPECIFIER_RE =
  /((?:import|export)(?:[^'"]*?from)?\s*['"])(\.\.?\/[^'"]*)(['"])/

const collectDistFiles = (dir) => {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...collectDistFiles(fullPath))
    else if (entry.name.endsWith('.js') || entry.name.endsWith('.d.ts'))
      files.push(fullPath)
  }
  return files
}

// Both .js and .d.ts files resolve against the compiled .js layout, and
// both should reference the .js extension in specifiers — that's the
// standard TS convention for declaration files under node16/nodenext
// resolution (the .d.ts sibling is inferred from the .js specifier).
const resolveSpecifier = (fileDir, specifier) => {
  if (/\.[a-z]+$/i.test(specifier)) return specifier // already has an extension
  const absTarget = path.resolve(fileDir, specifier)
  if (existsSync(`${absTarget}.js`)) return `${specifier}.js`
  if (
    existsSync(absTarget) &&
    statSync(absTarget).isDirectory() &&
    existsSync(path.join(absTarget, 'index.js'))
  ) {
    return `${specifier}/index.js`
  }
  throw new Error(
    `Cannot resolve relative specifier "${specifier}" from ${fileDir}`,
  )
}

const fixLibExtensions = () => {
  let rewritten = 0
  for (const file of collectDistFiles(DIST)) {
    const dir = path.dirname(file)
    const content = readFileSync(file, 'utf8')
    const lines = content.split('\n')
    let changed = false
    const nextLines = lines.map((line) => {
      const trimmed = line.trimStart()
      if (!trimmed.startsWith('import') && !trimmed.startsWith('export'))
        return line
      const match = line.match(SPECIFIER_RE)
      if (!match) return line
      const [, prefix, specifier, suffix] = match
      const resolved = resolveSpecifier(dir, specifier)
      if (resolved === specifier) return line
      changed = true
      return line.replace(SPECIFIER_RE, `${prefix}${resolved}${suffix}`)
    })
    if (changed) {
      writeFileSync(file, nextLines.join('\n'))
      rewritten += 1
    }
  }
  console.log(`Fixed relative import/export extensions in ${rewritten} file(s)`)
}

const copyStyles = () => {
  cpSync(path.join(ROOT, 'src/styles'), path.join(DIST, 'styles'), {
    recursive: true,
  })
  console.log('Copied src/styles -> dist/styles')
}

console.log('[1/4] tsc')
execSync(`tsc -p ${JSON.stringify(TSCONFIG)}`, { stdio: 'inherit', cwd: ROOT })

console.log('[2/4] tsc-alias')
await replaceTscAliasPaths({ configFile: TSCONFIG })

console.log('[3/4] fix-lib-extensions')
fixLibExtensions()

console.log('[4/4] copy-lib-styles')
copyStyles()
