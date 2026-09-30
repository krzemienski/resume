/* GENERATED FROM tokens.json -- DO NOT EDIT. Run scripts/build-tokens.mjs. */
// Portable design tokens (colors as hex). Web consumes the theme via
// src/index.css; mobile (Expo) and any other platform import this object so the
// whole product shares one source of truth.
export const tokens = {
  "color": {
    "light": {
      "background": "#f2f2ec",
      "foreground": "#0a0a0a",
      "border": "#c9c9c1",
      "card": "#ffffff",
      "cardForeground": "#0a0a0a",
      "popover": "#ffffff",
      "popoverForeground": "#0a0a0a",
      "primary": "#b8002e",
      "primaryForeground": "#ffffff",
      "secondary": "#e4e4dc",
      "secondaryForeground": "#0a0a0a",
      "muted": "#e4e4dc",
      "mutedForeground": "#55554f",
      "accent": "#7a1fc2",
      "accentForeground": "#ffffff",
      "destructive": "#c43d00",
      "destructiveForeground": "#ffffff",
      "input": "#b5b5ad",
      "ring": "#b8002e",
      "chart1": "#b8002e",
      "chart2": "#7a1fc2",
      "chart3": "#c25400",
      "chart4": "#c42a10",
      "chart5": "#5a2bc0",
      "sidebar": "#e9e9e2",
      "sidebarForeground": "#1a1a1a",
      "sidebarBorder": "#c9c9c1",
      "sidebarPrimary": "#b8002e",
      "sidebarPrimaryForeground": "#ffffff",
      "sidebarAccent": "#dcdcd3",
      "sidebarAccentForeground": "#0a0a0a",
      "sidebarRing": "#b8002e"
    },
    "dark": {
      "background": "#000000",
      "foreground": "#e6e6e1",
      "border": "#262626",
      "card": "#0a0a0a",
      "cardForeground": "#e6e6e1",
      "popover": "#0a0a0a",
      "popoverForeground": "#e6e6e1",
      "primary": "#ff2d55",
      "primaryForeground": "#000000",
      "secondary": "#141414",
      "secondaryForeground": "#e6e6e1",
      "muted": "#111111",
      "mutedForeground": "#8a8a85",
      "accent": "#b04bff",
      "accentForeground": "#000000",
      "destructive": "#ff5a1f",
      "destructiveForeground": "#000000",
      "input": "#333333",
      "ring": "#ff2d55",
      "chart1": "#ff2d55",
      "chart2": "#b04bff",
      "chart3": "#ff7a1a",
      "chart4": "#ff3b1f",
      "chart5": "#7b3cff",
      "sidebar": "#050505",
      "sidebarForeground": "#e6e6e1",
      "sidebarBorder": "#1f1f1f",
      "sidebarPrimary": "#ff2d55",
      "sidebarPrimaryForeground": "#000000",
      "sidebarAccent": "#141414",
      "sidebarAccentForeground": "#e6e6e1",
      "sidebarRing": "#ff2d55"
    }
  },
  "fontFamily": {
    "sans": [
      "Chakra Petch",
      "sans-serif"
    ],
    "serif": [
      "IBM Plex Serif",
      "serif"
    ],
    "mono": [
      "JetBrains Mono",
      "monospace"
    ]
  },
  "radius": "0rem",
  "spacing": "0.25rem"
} as const;

export type Tokens = typeof tokens;
export default tokens;
