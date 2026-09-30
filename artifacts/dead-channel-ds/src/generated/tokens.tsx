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
      "primary": "#006b78",
      "primaryForeground": "#ffffff",
      "secondary": "#e4e4dc",
      "secondaryForeground": "#0a0a0a",
      "muted": "#e4e4dc",
      "mutedForeground": "#55554f",
      "accent": "#c4005f",
      "accentForeground": "#ffffff",
      "destructive": "#c41d1d",
      "destructiveForeground": "#ffffff",
      "input": "#b5b5ad",
      "ring": "#006b78",
      "chart1": "#006b78",
      "chart2": "#c4005f",
      "chart3": "#8a7a00",
      "chart4": "#5a3fc0",
      "chart5": "#2f7a2f",
      "sidebar": "#e9e9e2",
      "sidebarForeground": "#1a1a1a",
      "sidebarBorder": "#c9c9c1",
      "sidebarPrimary": "#006b78",
      "sidebarPrimaryForeground": "#ffffff",
      "sidebarAccent": "#dcdcd3",
      "sidebarAccentForeground": "#0a0a0a",
      "sidebarRing": "#006b78"
    },
    "dark": {
      "background": "#000000",
      "foreground": "#e6e6e1",
      "border": "#262626",
      "card": "#0a0a0a",
      "cardForeground": "#e6e6e1",
      "popover": "#0a0a0a",
      "popoverForeground": "#e6e6e1",
      "primary": "#00e5ff",
      "primaryForeground": "#000000",
      "secondary": "#141414",
      "secondaryForeground": "#e6e6e1",
      "muted": "#111111",
      "mutedForeground": "#8a8a85",
      "accent": "#ff2e88",
      "accentForeground": "#000000",
      "destructive": "#ff3b3b",
      "destructiveForeground": "#000000",
      "input": "#333333",
      "ring": "#00e5ff",
      "chart1": "#00e5ff",
      "chart2": "#ff2e88",
      "chart3": "#f5ff3b",
      "chart4": "#9d7bff",
      "chart5": "#39ff88",
      "sidebar": "#050505",
      "sidebarForeground": "#e6e6e1",
      "sidebarBorder": "#1f1f1f",
      "sidebarPrimary": "#00e5ff",
      "sidebarPrimaryForeground": "#000000",
      "sidebarAccent": "#141414",
      "sidebarAccentForeground": "#e6e6e1",
      "sidebarRing": "#00e5ff"
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
