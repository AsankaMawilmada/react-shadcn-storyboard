---
description: Pull design tokens from the connected Figma MCP server and merge them into .figma/themes/<theme>/*.tokens.json
---

Pull the latest design tokens from Figma (via the Figma MCP server connected
to this session) and merge them into `.figma/themes/<theme>/*.tokens.json`,
then regenerate `src/styles/`/`src/tokens/` from them.

This only works in a session with a Figma MCP server actually connected —
if no Figma-related tools are available, stop and tell the user to connect
one first (e.g. `claude mcp add` or a project `.mcp.json` entry), rather
than guessing.

## Steps

1. **Confirm the Figma MCP tools available this session** and identify the
   one that reads variables/design tokens (Figma's official Dev Mode MCP
   Server calls it `get_variable_defs`; other servers may name it
   differently — look for whatever returns resolved variable values for a
   selection).

2. **Ask the user which Figma frame/selection to pull from** if it isn't
   obvious — these tools are normally scoped to whatever's selected/open in
   Figma, not "every variable in the file," so a full sync may take several
   calls across different frames (colors, radius/spacing, typography,
   per-device layout, component states).

3. **Call the tool and save its raw JSON output** to a scratch file (the
   session's scratchpad directory, not the repo) — don't try to hand-edit
   `.tokens.json` directly from the tool's raw response.

4. **Sanity-check the shape** before converting: `scripts/figma-variables-to-tokens.mjs`
   assumes a flat `{ "path/segments": value }` (or `{ "path/segments": {value, type} }`)
   map, one entry per resolved variable. If what actually came back looks
   different, say so and adjust the script's `inferType`/parsing rather than
   forcing the data to fit — this hasn't been verified against every Figma
   MCP server's real output.

5. **Pick the target file** based on what was pulled:
   - Color variables → `.figma/themes/<theme>/colors.tokens.json`
   - Radius variables → `radius.tokens.json`
   - Spacing variables → `spacing.tokens.json`
   - Typography (family/size/weight/line-height) → `text.tokens.json`
   - Per-device layout (margin/gutter/widths/breakpoints) →
     `desktop.tokens.json`/`tablet.tokens.json`/`mobile.tokens.json` — these
     have a different internal shape (see `buildLayoutDevice` in
     `scripts/transform-tokens.mjs`) and likely need hand-adjustment rather
     than a straight merge.
   - Component-state colors (button/link hover/pressed/disabled) →
     `components.tokens.json`
   - `theme` is `default` unless the user says otherwise — `midnight` is
     hand-authored (see README's "Design tokens" section) and not currently
     Figma-sourced.

6. **Run the converter** for each file being updated:

   ```
   node scripts/figma-variables-to-tokens.mjs --input <scratch-file> --target <file.tokens.json> --theme <theme>
   ```

   This deep-merges into the existing file — tokens not present in this
   pull are left untouched, tokens that are present get their `$value`
   replaced (see the script's own header comment for why it drops
   `$extensions` on updated leaves: `transform-tokens.mjs` never reads that
   metadata).

7. **Review the diff** (`git diff .figma/themes/`) before doing anything
   else — confirm only the expected tokens changed, and the values look
   sane (a `$type: "number"` leaf should be a bare number, not `"6px"`).

8. **Regenerate the derived output**: `npm run transform-tokens`, then spot
   check `git diff src/styles/tokens.css src/tokens/` for anything
   surprising.

9. **Verify nothing broke**: at minimum `npm run build` (type-checks
   against the regenerated `src/tokens/*.ts`); ideally also
   `npm run storybook` to eyeball a few components against the new values.

10. Summarize what changed and let the user decide on committing — don't
    commit automatically.
