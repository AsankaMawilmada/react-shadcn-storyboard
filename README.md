# @inoaspect/react-components

A shared React component library, published internally as
**`@inoaspect/react-components`**: Vite + React 19 + TypeScript +
Tailwind CSS v4, built on [Base UI](https://base-ui.com) primitives, themed
from a Figma design-token export, documented in Storybook, and covered by a
Vitest test suite that reuses the Storybook stories as fixtures.

This repo does double duty: it's both the full development environment
(components, stories, tests, a demo app) *and* the source for the published
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

## Getting started (developing this repo)

```bash
npm install
npm run dev          # app dev server
npm run storybook    # component docs, http://localhost:6006
npm run test          # unit + snapshot tests
```

## Scripts

| Script                  | What it does                                              |
| ------------------------ | ---------------------------------------------------------- |
| `npm run dev`             | Vite dev server for `src/App.tsx`                          |
| `npm run build`            | Typecheck (`tsc -b`) + production build of the demo app    |
| `npm run build:lib`        | Build the **publishable package** into `dist/` (see below) |
| `npm run pack:local`       | `build:lib` + `npm pack` → a local `.tgz` for local testing |
| `npm run preview`          | Preview the demo app production build                       |
| `npm run storybook`        | Storybook dev server                                        |
| `npm run build-storybook`  | Static Storybook build → `storybook-static/`               |
| `npm run lint`              | ESLint over the whole repo                                   |
| `npm run test`              | Run the full test suite once (`vitest run`)                |
| `npm run test:watch`       | Vitest in watch mode                                         |
| `npm run transform-tokens` | Regenerate `src/styles/*.css` + `src/tokens/*.ts` from `.figma/themes/` |

## Project structure

```
.figma/themes/<name>/*.tokens.json   Raw W3C design tokens exported from Figma (source of truth)
scripts/transform-tokens.mjs         Style Dictionary pipeline: .figma/ -> src/styles/ + src/tokens/
scripts/fix-lib-extensions.mjs       Postbuild: rewrites dist/ relative imports to be Node-ESM-strict
scripts/copy-lib-styles.mjs          Postbuild: copies src/styles/*.css -> dist/styles/
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

`npm run build:lib` produces the actual publishable `dist/` — deliberately
**not** built with Vite (this repo's own bundler, which runs on Rolldown as
of Vite 8). Rolldown's tree-shaking silently drops re-exported bindings from
pure `export * from './x'` barrel files (even with `treeshake: false` and
even for entry chunks) — an entire component's worth of exports, or a whole
module, can vanish with no warning. `tsc` is a pure 1:1 transpiler with no
bundling and no dead-code elimination, which is what actually preserving a
folder-per-component module structure needs. The pipeline:

1. `tsc -p tsconfig.build.json` — transpiles `src/index.ts`,
   `src/components/**`, `src/tokens/**`, and `src/lib/**` (stories/tests
   excluded) to `dist/`, mirroring the `src/` structure 1:1, with `.d.ts`
   alongside every `.js`.
2. `tsc-alias` — rewrites `@/*` alias imports to relative paths.
3. `scripts/fix-lib-extensions.mjs` — `tsc` emits bundler-style extensionless
   relative specifiers (`from './components/button'`); Node's own ESM
   resolver requires them fully specified. Rewrites every relative
   import/export in `dist/**/*.{js,d.ts}` to an explicit `.js` (or
   `<dir>/index.js`), so the package resolves correctly under strict Node
   ESM too, not just inside a bundler. Verified with a real smoke test:
   packing, installing into a scratch project, and importing from the root
   barrel, a subpath, `/tokens`, and `/theme-provider` under plain `node`.
4. `scripts/copy-lib-styles.mjs` — copies `src/styles/*.css` to `dist/styles/`
   (nothing imports them as JS modules, so the bundler-style steps above
   never touch them).

`react`, `react-dom`, `@base-ui/react`, `class-variance-authority`, `clsx`,
`cmdk`, `lucide-react`, `tailwind-merge`, and `vaul` are all external — never
bundled into `dist/`, always resolved from the consumer's own
`node_modules`. `package.json`'s `"files": ["dist"]` means stories, tests,
`.figma/`, and `scripts/` can never end up in a published tarball regardless
of what the build does; `npm pack --dry-run` is the way to double-check.

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
@source '../node_modules/@inoaspect/react-components/dist';
```

(`@source` path relative to that CSS file.) Without the `@source` line,
Tailwind never sees the class names referenced inside the shipped
components and generates none of the utility CSS they need.

### Use it

```tsx
import { Button, Dialog, DialogContent, DialogTrigger } from '@inoaspect/react-components'
import { ThemeProvider } from '@inoaspect/react-components/theme-provider'
// or, per-component deep imports (same components, smaller per-file graph):
// import { Button } from '@inoaspect/react-components/button'

const App = () => (
  <ThemeProvider>
    <Dialog>
      <DialogTrigger render={<Button>Open</Button>} />
      <DialogContent>...</DialogContent>
    </Dialog>
  </ThemeProvider>
)
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
