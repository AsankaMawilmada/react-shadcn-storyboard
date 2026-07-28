# react-shadcn-storyboard

A shadcn/ui-style component library boilerplate: Vite + React 19 + TypeScript +
Tailwind CSS v4, built on [Base UI](https://base-ui.com) primitives, themed
from a Figma design-token export, documented in Storybook, and covered by a
Vitest test suite that reuses the Storybook stories as fixtures.

## Stack

- **Vite + React 19 + TypeScript**
- **Tailwind CSS v4** — CSS-first `@theme`, no `tailwind.config.js`
- **[Base UI](https://base-ui.com)** (`@base-ui/react`) for accessible primitives (Dialog, Popover, Select, Menu, ...); plain elements + [class-variance-authority](https://cva.style) where no primitive is needed; [`cmdk`](https://cmdk.paco.me) for Command and [`vaul`](https://vaul.emilkowal.ski) for Drawer
- **Storybook 10** — one autodocs page per component, no dev sub-navigation
- **[Style Dictionary](https://styledictionary.com)** — transforms the Figma token export into CSS + TS
- **Vitest + Testing Library** — unit and snapshot tests via Storybook's portable stories (`composeStories`)
- **ESLint** (flat config) — typescript-eslint + react-hooks + react-refresh

## Getting started

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
| `npm run build`            | Typecheck (`tsc -b`) + production build                    |
| `npm run preview`          | Preview the production build                                |
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
src/styles/                          Generated CSS (tokens.css, theme.css) — do not hand-edit
src/tokens/                          Generated TS token exports — do not hand-edit
src/components/theme-provider.tsx    Sets/clears data-theme on <html>
src/components/ui/<name>/
  <name>.tsx                          Component
  <name>.stories.tsx                  Storybook stories (every variant, tags: ['autodocs', '!dev'])
  <name>.test.tsx                     Behavior tests (render/interact, via composeStories)
  <name>.snapshot.test.tsx            One toMatchSnapshot() per story, generated automatically
  index.ts                            export * from './<name>'
```

Every component folder follows this same shape, so both `@/components/ui/<name>`
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

Consumable from another package via `package.json`'s `exports` map:
`react-shadcn-storyboard/tokens` and `react-shadcn-storyboard/styles/*`.

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
