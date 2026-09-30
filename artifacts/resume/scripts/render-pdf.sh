#!/usr/bin/env bash
# Renders the /print route of the running dev server to public/nick-krzemienski-resume.pdf.
# Usage: pnpm --filter @workspace/resume run pdf   (dev server must be running)
set -euo pipefail
cd "$(dirname "$0")/.."
URL="${RESUME_PRINT_URL:-http://localhost:80/print}"
OUT="public/nick-krzemienski-resume.pdf"
chromium --headless=new --no-sandbox --disable-gpu \
  --no-pdf-header-footer --run-all-compositor-stages-before-draw \
  --virtual-time-budget=15000 \
  --print-to-pdf="$OUT" "$URL"
echo "Wrote $OUT from $URL"
