#!/usr/bin/env node
// Computes the next semver version from Conventional Commits since the last
// `v*` release tag (the pipeline pushes that tag right after each publish,
// see azure-pipelines.yml's "Tag release" step) and writes it into
// package.json in place. Bump precedence, matching semantic-release's rules:
//   - any commit with a `!` before the `:` (e.g. `feat!:`) or a
//     `BREAKING CHANGE` footer -> major
//   - `feat:` -> minor
//   - anything else (fix:, chore:, docs:, ...) -> patch, so every merge to
//     main still ships (the pipeline publishes on every merge, not just
//     feature/fix ones).
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const run = (cmd) => execSync(cmd, { encoding: 'utf8' }).trim();

let lastTag = null;
try {
  lastTag = run('git describe --tags --match "v*" --abbrev=0');
} catch {
  // No release tag yet — first-ever publish, diff from repo start.
}

const range = lastTag ? `${lastTag}..HEAD` : 'HEAD';
// %x00-separated so each commit's full body (where `BREAKING CHANGE:`
// footers live) is available, not just the subject line.
const log = run(`git log ${range} --pretty=format:%B%x00`);
const messages = log
  .split('\0')
  .map((message) => message.trim())
  .filter(Boolean);

if (messages.length === 0) {
  console.log(`No commits since ${lastTag ?? 'repo start'} — nothing to bump.`);
  process.exit(0);
}

let bump = 'patch';
for (const message of messages) {
  const subject = message.split('\n')[0];
  if (/^\w+(\(.+\))?!:/.test(subject) || /BREAKING CHANGE/.test(message)) {
    bump = 'major';
    break;
  }
  if (/^feat(\(.+\))?:/.test(subject)) bump = 'minor';
}

const pkgPath = new URL('../package.json', import.meta.url);
const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
const [major, minor, patch] = pkg.version.split('.').map(Number);

const next =
  bump === 'major'
    ? `${major + 1}.0.0`
    : bump === 'minor'
      ? `${major}.${minor + 1}.0`
      : `${major}.${minor}.${patch + 1}`;

pkg.version = next;
writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`);

console.log(
  `Version bump: ${bump} (${pkg.name}@${next}) — ${messages.length} commit(s) since ${lastTag ?? 'repo start'}`,
);
