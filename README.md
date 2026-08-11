# @inoaspect/react-components

A shared React component library, published internally as
**`@inoaspect/react-components`**: Vite + React 19 + TypeScript +
Tailwind CSS v4, built on [Base UI](https://base-ui.com) primitives, themed
from a Figma design-token export, documented in Storybook, and covered by a
Vitest test suite that reuses the Storybook stories as fixtures.

This repo does double duty: it's both the full development environment
(components, stories, tests, a demo app) _and_ the source for the published
package. Only `dist/` — components, `ThemeProvider`, and the theme — ever
gets published; stories, tests, and the demo app never leave this repo. See
[Consuming this package](#consuming-this-package) below.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** — CSS-first `@theme`, no `tailwind.config.js`
- **[Base UI](https://base-ui.com)** (`@base-ui/react`) for accessible primitives (Dialog, Popover, Select, Menu, ...); plain elements + [class-variance-authority](https://cva.style) where no primitive is needed; [`cmdk`](https://cmdk.paco.me) for Command and [`vaul`](https://vaul.emilkowal.ski) for Drawer
- **Storybook 10** — one autodocs page per component, no dev sub-navigation
- **[Style Dictionary](https://styledictionary.com)** — transforms the Figma token export into CSS + TS
- **Vitest + Testing Library** — unit and snapshot tests via Storybook's portable stories (`composeStories`)
- **ESLint** (flat config) — typescript-eslint + react-hooks + react-refresh
- **`tsc` + `tsc-alias`** — the publishable library build (see below; deliberately not Vite/Rolldown, see [Library build](#library-build))
- **Husky + lint-staged + commitlint** — git hooks (see [Git hooks](#git-hooks))

## Getting started (developing this repo)

```bash
npm install
npm run dev          # app dev server
npm run storybook    # component docs, http://localhost:6006
npm run test          # unit + snapshot tests
```

## Scripts

| Script                     | What it does                                                            |
| -------------------------- | ----------------------------------------------------------------------- |
| `npm run dev`              | Vite dev server for `src/App.tsx`                                       |
| `npm run build`            | Typecheck (`tsc -b`) + production build of the demo app                 |
| `npm run build:lib`        | Build the **publishable package** into `dist/` (see below)              |
| `npm run pack:local`       | `build:lib` + `npm pack` → a local `.tgz` for local testing             |
| `npm run preview`          | Preview the demo app production build                                   |
| `npm run storybook`        | Storybook dev server                                                    |
| `npm run build-storybook`  | Static Storybook build → `storybook-static/`                            |
| `npm run lint`             | ESLint over the whole repo                                              |
| `npm run test`             | Run the full test suite once (`vitest run`)                             |
| `npm run test:watch`       | Vitest in watch mode                                                    |
| `npm run test:coverage`    | Full test suite + coverage report → `coverage/` (see below)             |
| `npm run transform-tokens` | Regenerate `src/styles/*.css` + `src/tokens/*.ts` from `.figma/themes/` |

## Git hooks

[Husky](https://typicode.github.io/husky/) manages the hooks (`.husky/`);
`npm install` wires them up automatically via the `prepare` script.

- **pre-commit** — runs [lint-staged](https://github.com/lint-staged/lint-staged),
  which runs `eslint --fix` on staged `*.ts`/`*.tsx` files only (config lives
  in `package.json`'s `"lint-staged"` key). Fast — scoped to what you're
  actually committing.

Commit messages are free-form — there's no commit-msg hook enforcing a
format. `scripts/next-version.mjs` (see [CI/CD](#cicd)) still looks for
[Conventional Commits](https://www.conventionalcommits.org/)-style prefixes
(`feat:`, `!:`, `BREAKING CHANGE`) to decide between a minor/major/patch
bump, but nothing requires them — an unprefixed message just falls back to
a patch bump.

There's deliberately no pre-push hook — the full test suite takes ~3
minutes (see [Testing](#testing)), which is too slow to run on every push.
That's left to CI.

## Project structure

```
.figma/themes/<name>/*.tokens.json   Raw W3C design tokens exported from Figma (source of truth)
scripts/transform-tokens.mjs         Style Dictionary pipeline: .figma/ -> src/styles/ + src/tokens/
scripts/build-lib.mjs                The whole `npm run build:lib` pipeline (tsc, alias-rewrite, extension-fix, style copy)
src/styles/                          Generated CSS (tokens.css, theme.css) — do not hand-edit
src/tokens/                          Generated TS token exports — do not hand-edit
src/index.ts                         Root barrel — the package's "." export, re-exports everything
src/components/theme-provider.tsx    Sets/clears data-theme on <html>
src/components/<name>/
  <name>.tsx                          Component
  <name>.stories.tsx                  Storybook stories (every variant, tags: ['autodocs', '!dev'])
  <name>.test.tsx                     Behavior tests (render/interact, via composeStories)
  <name>.snapshot.test.tsx            One toMatchSnapshot() per story, generated automatically
  index.ts                            export * from './<name>' — never ship stories/tests
```

Every component folder follows this same shape, so both `@/components/<name>`
and relative imports resolve, and each Storybook doc, behavior test, and
snapshot test stays colocated with the component it covers.

## Design tokens

Source of truth is the raw Figma export under `.figma/themes/<theme>/*.tokens.json`
(colors, radius, spacing, typography, per-device layout, component-state
colors). `npm run transform-tokens` runs `scripts/transform-tokens.mjs`
(Style Dictionary) to produce:

- `src/styles/tokens.css` — `:root` (default theme), `:root[data-theme="midnight"]`
  (second theme, colors only — radius/spacing/typography/layout are inherited),
  and a hand-maintained `prefers-color-scheme: dark` / `.dark` block (no Figma
  dark-mode export exists, so this isn't token-derived)
- `src/styles/theme.css` — maps those CSS variables into Tailwind's `@theme`
  namespace (`--color-*`, `--radius-*`, `--text-*`, `--leading-*`, ...)
- `src/tokens/*.ts` — the same data as plain TS exports (colors, radius,
  spacing, typography, layout, component-state)

Two themes ship today: **default** (Figma-sourced) and **midnight** (hand-authored,
proves the `data-theme` override mechanism). Switch at runtime with
`ThemeProvider`/`useTheme` from `src/components/theme-provider.tsx`.

`--border` and `--input` intentionally pin to a primitive gray swatch rather
than a semantic token, matching the original hand-authored look. Component-state
tokens (per-variant button/link hover/disabled/focus colors) are exported as
raw data in `src/tokens/component-state.ts` only — deliberately not wired into
any component's actual styling.

## Testing

Every component's tests reuse its own Storybook stories via
`@storybook/react`'s `composeStories`, so fixtures are defined once. `src/test/setup.ts`
polyfills what jsdom lacks (`ResizeObserver`, pointer capture, `scrollIntoView`,
`matchMedia`) so Base UI's floating-ui-positioned overlays work under Vitest.
`src/test/snapshot-all-stories.tsx` auto-generates one `toMatchSnapshot()` per
story, so new variants get a regression snapshot without extra test code.

Note: `vite.config.ts` sets `fileParallelism: false` — running 40+ jsdom
environments concurrently exhausts Windows' worker-thread limits and fails
every file with an unrelated error. Serial execution is fully reliable, at
the cost of runtime: the full suite (86 files, 234 tests) takes ~3 minutes.

### Storybook Vitest addon

`vite.config.ts` splits `test` into two Vitest **projects**:

- **`unit`** — the jsdom suite described above. `npm run test`,
  `npm run test:watch`, and `npm run test:coverage` all target this
  project explicitly (`--project=unit`).
- **`storybook`** — [`@storybook/addon-vitest`](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)
  turns every story into a real assertion, rendered in an actual Chromium
  instance via Playwright (`@vitest/browser-playwright`), not jsdom. Run it
  with `npm run test:storybook`. It also powers the "Vitest" panel inside
  Storybook itself (`npm run storybook`) and the Vitest IDE extension,
  showing every story as a pass/fail test live as you edit.

The two are kept separate deliberately: `storybook` needs Playwright's
browser binaries (`npx playwright install`, done once per machine — the
`@storybook/addon-vitest` installer runs this automatically), which CI
isn't currently set up to provision (see [CI/CD](#cicd)) — bundling it into
the default `test`/`test:coverage` scripts would silently break the
existing pipeline.

### Coverage

`npm run test:coverage` (provider: `@vitest/coverage-v8`) covers
`src/components/**` + `src/lib/**` — stories, tests, and generated
`src/tokens`/`src/styles` are excluded from the denominator. Vitest reports
0% (rather than omitting the file) for anything matched by `include` that no
test ever imports — that's the unconditional default now, no config toggle
needed. Emits three reporters into `coverage/` (gitignored): `text`
(terminal summary), `html` (`coverage/index.html`, browsable locally), and
`cobertura` (`coverage/cobertura-coverage.xml`) — the format Azure
Pipelines' `PublishCodeCoverageResults@2` task expects. Test results
themselves also go to `test-results/junit.xml` (gitignored), for
`PublishTestResults@2`. Both are wired up in [`azure-pipelines.yml`](azure-pipelines.yml)
— see [CI/CD](#cicd) below.

## Components

43 components, covering most of the shadcn/ui catalog on Base UI primitives:

Accordion, Alert, Alert Dialog, Aspect Ratio, Avatar, Badge, Breadcrumb, Button,
Card, Checkbox, Collapsible, Combobox, Command, Context Menu, Dialog, Drawer,
Dropdown Menu, Form, Hover Card, Input, Input OTP, Label, Menubar, Navigation
Menu, Pagination, Popover, Progress, Radio Group, Scroll Area, Select,
Separator, Sheet, Skeleton, Slider, Switch, Table, Tabs, Textarea, Toast,
Toggle, Toggle Group, Tooltip, Typography

Not implemented (each needs an extra third-party library — Calendar/Date
Picker via `react-day-picker`, Carousel via `embla-carousel-react`, Chart via
`recharts`, Data Table via `@tanstack/react-table`, Resizable via
`react-resizable-panels`, plus Sidebar): Calendar, Carousel, Chart, Data Table,
Date Picker, Resizable, Sidebar.

## Library build

`npm run build:lib` runs `scripts/build-lib.mjs`, which produces the actual
publishable `dist/` — deliberately **not** built with Vite (this repo's own
bundler, which runs on Rolldown as of Vite 8). Rolldown's tree-shaking
silently drops re-exported bindings from pure `export * from './x'` barrel
files (even with `treeshake: false` and even for entry chunks) — an entire
component's worth of exports, or a whole module, can vanish with no warning.
`tsc` is a pure 1:1 transpiler with no bundling and no dead-code
elimination, which is what actually preserving a folder-per-component
module structure needs. The single script runs, in order:

1. **`tsc -p tsconfig.build.json`** (spawned) — transpiles `src/index.ts`,
   `src/components/**`, `src/tokens/**`, and `src/lib/**` (stories/tests
   excluded) to `dist/`, mirroring the `src/` structure 1:1, with `.d.ts`
   alongside every `.js`.
2. **`replaceTscAliasPaths`** (`tsc-alias`'s programmatic API) — rewrites
   `@/*` alias imports to relative paths.
3. **`fixLibExtensions`** — `tsc` emits bundler-style extensionless relative
   specifiers (`from './components/button'`); Node's own ESM resolver
   requires them fully specified. Rewrites every relative import/export in
   `dist/**/*.{js,d.ts}` to an explicit `.js` (or `<dir>/index.js`), so the
   package resolves correctly under strict Node ESM too, not just inside a
   bundler. Verified with a real smoke test: packing, installing into a
   scratch project, and importing from the root barrel, a subpath,
   `/tokens`, and `/theme-provider` under plain `node`.
4. **`copyStyles`** — copies `src/styles/*.css` to `dist/styles/` (nothing
   imports them as JS modules, so the steps above never touch them).

`react`, `react-dom`, `@base-ui/react`, `class-variance-authority`, `clsx`,
`cmdk`, `lucide-react`, `tailwind-merge`, and `vaul` are all external — never
bundled into `dist/`, always resolved from the consumer's own
`node_modules`. `package.json`'s `"files": ["dist"]` means stories, tests,
`.figma/`, and `scripts/` can never end up in a published tarball regardless
of what the build does; `npm pack --dry-run` is the way to double-check.

## CI/CD

[`azure-pipelines.yml`](azure-pipelines.yml) is a two-stage pipeline:

1. **`BuildAndTest`** (every push and PR against `main`) — `npm ci`, lint,
   `format:check`, `npm run build` (type-check + demo app), unit tests +
   coverage, an `npm audit --omit=dev` pass (informational — doesn't fail
   the build), and `npm run build:lib`. Test results and coverage are
   published to the build's Tests/Code Coverage tabs. This is pure
   validation on every PR; nothing is versioned or published.
2. **`Publish`** (push to `main` only, after `BuildAndTest` succeeds) — a
   `deployment` job against the `npm-publish` environment, so it only
   proceeds once approved. Downloads the `dist/` and version-bumped
   `package.json` built in stage 1, authenticates to the Azure Artifacts
   feed via `npmAuthenticate@0`, runs `npm publish`, then tags the release
   (`vX.Y.Z`) and pushes the tag back to the repo.

Versioning is commit-driven, not manual: `scripts/next-version.mjs` looks at
every commit since the last `v*` tag and bumps `major` on a `!:`/`BREAKING
CHANGE` commit, `minor` on any `feat:`, otherwise `patch`. Commit messages
aren't required to follow this format (see [Git hooks](#git-hooks)) — an
unprefixed message just falls back to a patch bump, so every merge to
`main` still ships something. It only runs on `main` builds, right before
the `dist`/`package.json` artifacts are published for stage 2 to publish
from. Run it locally with `npm run version:bump` to preview what the next
release would be.

**One-time Azure DevOps setup** (not in the YAML — these live on the
project itself):

- Create an **Environment** named `npm-publish` (Pipelines > Environments).
  Add an **Approvals** check (who can sign off before `npm publish` runs)
  and an **Exclusive Lock** check (so two merges to `main` can never race
  each other's publish + tag).
- Grant the **Project Collection Build Service** identity **Contributor**
  access on the `inoaspecct-digital-feed` feed (Azure Artifacts > feed
  settings > Permissions) — without this, `npmAuthenticate@0` can
  authenticate but `npm publish` still gets a 403.
- Enable **"Allow scripts to access the OAuth token"** on the pipeline
  (Edit pipeline > ... > Triggers > this pipeline's Settings tab), needed
  for the `git push` of the release tag in the `Publish` stage.
- The repo's branch policy for `main` should require the `BuildAndTest`
  stage to pass before merging, so nothing unbuildable ever reaches the
  `Publish` stage.

## Consuming this package

### Install

The Azure DevOps Artifacts feed is already configured for the `@inoaspect`
scope in `.npmrc` (`@inoaspect:registry=...`) — only that scope routes
there, everything else still resolves from the public npm registry. First
time on a machine, authenticate against the feed (e.g. `vsts-npm-auth
-config .npmrc`, or add a PAT per your team's usual process), then:

```bash
npm install @inoaspect/react-components
```

### Wire up styles (important — nothing will be styled without this)

Tailwind v4 does **not** scan `node_modules` by default. In your app's own
Tailwind entry CSS:

```css
@import 'tailwindcss';
@import '@inoaspect/react-components/styles/theme.css';
@import '@inoaspect/react-components/styles/tokens.css';
@import '@inoaspect/react-components/styles/input-field.css';
@import '@inoaspect/react-components/styles/date-select.css';
@import '@inoaspect/react-components/styles/select.css';
@import '@inoaspect/react-components/styles/radio-button-group.css';
@source '../node_modules/@inoaspect/react-components/dist';
```

(`@source` path relative to that CSS file.) Without the `@source` line,
Tailwind never sees the class names referenced inside the shipped
components and generates none of the utility CSS they need.

Most components apply Tailwind utility classes directly, discovered via that
`@source` scan. `InputField`, `DateSelect`, `Select`, and `RadioButtonGroup`
are the exception — their styles are consolidated into named classes
(`.input-field`, `.date-select`, `.select-error`, `.radio-button-group`,
...) defined as plain CSS in a file colocated with the component's source
(`src/components/InputField/InputField.css`,
`src/components/DateSelect/DateSelect.css`,
`src/components/Select/Select.css`,
`src/components/RadioButtonGroup/RadioButtonGroup.css`). The build copies
each into `dist/styles/<kebab-name>.css` (see `scripts/build-lib.mjs`), so
they must be imported explicitly like `theme.css`/`tokens.css` above, not
just discovered via `@source`. They're unrelated components — import
whichever one(s) you actually use.

### Use it

```tsx
import {
  Button,
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@inoaspect/react-components';
import { ThemeProvider } from '@inoaspect/react-components/theme-provider';
// or, per-component deep imports (same components, smaller per-file graph):
// import { Button } from '@inoaspect/react-components/button'

const App = () => (
  <ThemeProvider>
    <Dialog>
      <DialogTrigger render={<Button>Open</Button>} />
      <DialogContent>...</DialogContent>
    </Dialog>
  </ThemeProvider>
);
```

Peer dependencies you need installed: `react`, `react-dom` (^19), `tailwindcss` (^4).

### Local testing before publishing

```bash
npm run pack:local   # builds dist/ and produces inoaspect-react-components-<version>.tgz
```

In the consuming project, either install the tarball directly
(`npm install ../react-shadcn-storyboard/inoaspect-react-components-<version>.tgz`)
for a realistic "as if from the registry" install, or use a `file:` reference
in that project's `package.json` for faster iteration while both repos are
open side by side.

### Publishing

`npm publish` runs `prepublishOnly` (→ `build:lib`) automatically, and
`publishConfig.registry` in `package.json` pins the target registry so it
can't accidentally land on the public npm registry. Bump `version` first
(`npm version patch|minor|major`), then `npm publish` — this isn't
automated in CI here, it's a deliberate manual step.
