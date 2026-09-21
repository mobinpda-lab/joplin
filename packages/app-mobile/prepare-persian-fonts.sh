#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FONT_DIR="$ROOT/android/app/src/main/assets/fonts"
mkdir -p "$FONT_DIR"

fetch_font() {
  local url="$1" out="$2"
  curl -fsSL "$url" -o "$FONT_DIR/$out"
  test -s "$FONT_DIR/$out"
}

# VazirHarf is pinned to the same upstream revision used by Arvin-clean.
fetch_font "https://github.com/nadalaba/vazirharf/raw/3cbc943b9fb9107baa77008b3e96b3c3e40e9ed8/fonts/ttf/Vazirharf-Regular.ttf" "VazirHarf-Regular.ttf"
fetch_font "https://github.com/nadalaba/vazirharf/raw/3cbc943b9fb9107baa77008b3e96b3c3e40e9ed8/fonts/ttf/Vazirharf-Bold.ttf" "VazirHarf-Bold.ttf"
fetch_font "https://github.com/nadalaba/vazirharf/raw/3cbc943b9fb9107baa77008b3e96b3c3e40e9ed8/OFL.txt" "VazirHarf-OFL.txt"

echo "Persian font assets prepared in $FONT_DIR"
