---
name: Site background video constraints
description: Durable constraints for the resume site's background loop and how it is rendered.
---

The background must stay calm, low contrast and continuously changing, and it must play on phones too (portrait gets its own smaller file). Re-render both orientations after any look change.
**Why:** The user found the earlier short ping-pong clip distracting and noticed it did not play in portrait mode.

Never edit files in the signal-backdrop artifact while an offline render is running, and run only one headless browser at a time.
**Why:** Vite reloads the capture page mid-render, and parallel headless browsers have crashed the container.
