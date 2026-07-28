#!/usr/bin/env node
// Copies generated CSS into dist/ after the library build — Rollup only
// touches modules that get imported as JS, and nothing imports these as
// modules, so they need a plain file copy.
import { cpSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

cpSync(path.join(ROOT, 'src/styles'), path.join(ROOT, 'dist/styles'), { recursive: true })

console.log('Copied src/styles -> dist/styles')
