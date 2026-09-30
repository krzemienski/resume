---
name: Dead Channel design system conventions
description: Rules for the resume site and its Dead Channel DS — dark canonical, zero radius, where radius math lives.
---

Dark is the canonical theme; consumers set `class="dark"` on `<html>`. Light mode is only a "printout" variant.
**Why:** The user asked for a flat black, cyberpunk resume.
**How to apply:** Any new consumer or page defaults to dark, and all motion effects must stop under prefers-reduced-motion.

The DS radius is 0. Derived radii are computed in `scripts/theme-template.css`, which is clamped with max(0, …) and multiplied, never added. Never hand-edit the generated `src/index.css`; run `pnpm tokens` instead.
**Why:** The old additive `+4px` made `rounded-xl` Cards show 4px corners, which broke the zero-radius contract.

Palette as of 2026-09-30: crimson primary, violet accent, orange/red (chart-3/4) heat. The user rejected teal/blue, so never reintroduce it.

The downloadable PDF is rendered from the `/print` route by the resume `pdf` script, which uses the chromium CLI. Render against localhost:80, never the dev domain: the dev domain injects a preview banner that adds a blank page. The /print sheets use a named `@page resume-sheet` with zero margin so the home page's Ctrl+P margins stay intact. Anything outside `.print-doc` must be hidden or named, or it spills onto an extra page.
**How to apply:** After changing resume content or print CSS, re-run the script and check `pdfinfo` shows 2 pages.

Canonical resume content is the user's latest PDF, not the older HTML draft. The PDF has no "12+ years" line.
