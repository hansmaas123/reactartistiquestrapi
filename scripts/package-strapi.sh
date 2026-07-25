#!/usr/bin/env bash
#
# Package the Strapi server into a single zip you can upload to Combell
# (or any Node host). It ships the SOURCE only — node_modules, the build
# output, caches and secrets are excluded. On the server you run:
#
#     npm install --omit=dev   # or: npm ci
#     npm run build
#     npm run start
#
# Usage:
#   ./scripts/package-strapi.sh              # code only (use MySQL on the host)
#   ./scripts/package-strapi.sh --with-data  # also include .tmp/data.db (SQLite)
#
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SERVER_DIR="$ROOT_DIR/server"
STAMP="$(date +%Y%m%d-%H%M%S)"
OUT="$ROOT_DIR/strapi-server-$STAMP.zip"

WITH_DATA=0
[[ "${1:-}" == "--with-data" ]] && WITH_DATA=1

cd "$SERVER_DIR"

# Base exclusions (heavy or secret — never ship these).
EXCLUDES=(
  "node_modules/*"
  "build/*"
  ".cache/*"
  ".strapi/*"
  ".strapi-updater.json"
  ".env"
  "*.log"
  ".DS_Store"
)

# By default exclude the SQLite runtime DB too; include it with --with-data
# so your existing artworks travel with the code (SQLite hosting only).
if [[ "$WITH_DATA" -eq 0 ]]; then
  EXCLUDES+=(".tmp/*")
  echo "→ Packaging code only (no database). Use MySQL on the host, or pass --with-data for SQLite."
else
  echo "→ Packaging code + .tmp/data.db (SQLite). Your current artworks will be included."
fi

ARGS=()
for e in "${EXCLUDES[@]}"; do ARGS+=(-x "$e"); done

rm -f "$OUT"
zip -r "$OUT" . "${ARGS[@]}" >/dev/null

echo "✔ Created: $OUT"
echo "  Size: $(du -h "$OUT" | cut -f1)"
