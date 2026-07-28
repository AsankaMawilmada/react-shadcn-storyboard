#!/usr/bin/env node
// tsc emits relative import/export specifiers exactly as written in source
// (extensionless, sometimes pointing at a directory) — valid under
// "moduleResolution": "bundler" for a bundler-consumed app, but Node's own
// ESM resolver requires fully-specified paths. Rewrites every relative
// specifier in dist/**/*.js to point at an explicit .js file (or
// <dir>/index.js), so the package works under strict Node resolution too,
// not just inside a bundler.
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DIST = path.resolve(__dirname, '../dist')

// Only matches real import/export statement lines (checked separately,
// see below) — never text inside comments that merely looks like one.
const SPECIFIER_RE = /((?:import|export)(?:[^'"]*?from)?\s*['"])(\.\.?\/[^'"]*)(['"])/

const collectFiles = (dir) => {
  const files = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) files.push(...collectFiles(fullPath))
    else if (entry.name.endsWith('.js') || entry.name.endsWith('.d.ts')) files.push(fullPath)
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
  if (existsSync(absTarget) && statSync(absTarget).isDirectory() && existsSync(path.join(absTarget, 'index.js'))) {
    return `${specifier}/index.js`
  }
  throw new Error(`Cannot resolve relative specifier "${specifier}" from ${fileDir}`)
}

let rewritten = 0
for (const file of collectFiles(DIST)) {
  const dir = path.dirname(file)
  const content = readFileSync(file, 'utf8')
  const lines = content.split('\n')
  let changed = false
  const nextLines = lines.map((line) => {
    const trimmed = line.trimStart()
    if (!trimmed.startsWith('import') && !trimmed.startsWith('export')) return line
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
