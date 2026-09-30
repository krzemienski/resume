---
name: Dead Channel design system conventions
description: Rules for the resume site and its Dead Channel DS — dark canonical, zero radius, where radius math lives.
---

Dark is the canonical theme; consumers set `class="dark"` on `<html>`. Light mode is only a "printout" variant.
**Why:** The user asked for a flat black, cyberpunk resume.
**How to apply:** Any new consumer or page defaults to dark, and all motion effects must stop under prefers-reduced-motion.

The DS radius is 0. Derived radii are computed in `scripts/theme-template.css`, which is clamped with max(0, …) and multiplied, never added. Never hand-edit the generated `src/index.css`; run `pnpm tokens` instead.
**Why:** The old additive `+4px` made `rounded-xl` Cards show 4px corners, which broke the zero-radius contract.

Canonical resume content is the user's latest PDF, not the older HTML draft. The PDF has no "12+ years" line.
