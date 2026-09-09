#!/usr/bin/env bash
#
# Uruchamia SBST (SynTest, preset DynaMOSA) i przenosi wynik do tests/.
#
# Uzycie:
#   bash scripts/run-syntest.sh [--seed N] [--search-time SEK] [--seeds PLIK]
#
# --seeds PLIK  dodaje plik z ziarnami semantycznymi do zakresu analizy,
#               dzieki czemu jego literaly wpadaja do context constant poola.
#               To mechanizm uzywany przez branch hybrydowy.
set -euo pipefail

SEED="42"
SEARCH_TIME="90"
SEEDS_FILE=""
SEED_GROUP=""
ONLY_TARGET=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --seed) SEED="$2"; shift 2 ;;
    --search-time) SEARCH_TIME="$2"; shift 2 ;;
    --seeds) SEEDS_FILE="$2"; shift 2 ;;
    --seed-group) SEED_GROUP="$2"; shift 2 ;;
    --only-target) ONLY_TARGET="$2"; shift 2 ;;
    *) echo "nieznany argument: $1" >&2; exit 1 ;;
  esac
done

TOTAL_TIME=$((SEARCH_TIME + 30))

echo "==> 0/4 czyszczenie poprzedniego wyniku"
rm -f tests/*.sbst.test.ts artifacts/syntest-raw/*.spec.js

echo "==> 1/4 kompilacja src/*.ts -> dist/*.js (SynTest nie parsuje TypeScriptu)"
npx tsc -p tsconfig.build.json

# Wstrzykniecie ziaren semantycznych.
#
# SynTest zbiera literaly do context constant poola z plikow podanych
# w --analysis-include, ale przyjmuje wylacznie sciezki lezace WEWNATRZ
# --target-root-directory (inaczej: "The given path is not in the given root
# path!"). Plik z ziarnami trafia wiec do dist/ pod ustalona nazwa
# i jest jednoczesnie wykluczony z listy celow - ma zasilac przeszukiwanie,
# a nie byc dla niego celem.
SEEDS_IN_DIST="dist/__semantic_seeds__.js"
ANALYSIS_ARGS=()
rm -f "$SEEDS_IN_DIST"

if [[ -n "$SEEDS_FILE" ]]; then
  if [[ ! -f "$SEEDS_FILE" ]]; then
    echo "blad: nie ma pliku z ziarnami: $SEEDS_FILE" >&2
    exit 1
  fi
  if ! node --check "$SEEDS_FILE"; then
    echo "blad: $SEEDS_FILE nie parsuje sie jako JavaScript" >&2
    exit 1
  fi

  echo "==> ziarna semantyczne: $SEEDS_FILE -> context constant pool"

  # Filtr do alfabetu samplera. Bez niego przebieg konczy sie bez zadnego
  # wygenerowanego testu - patrz naglowek scripts/filter-seeds.mjs.
  if [[ -n "$SEED_GROUP" ]]; then
    node scripts/filter-seeds.mjs "$SEEDS_FILE" "$SEEDS_IN_DIST" --only "$SEED_GROUP"
  else
    node scripts/filter-seeds.mjs "$SEEDS_FILE" "$SEEDS_IN_DIST"
  fi

  ANALYSIS_ARGS=(--analysis-include "./dist/**/*.js")
fi

# Jawna lista celow.
#
# Potrzebna z dwoch powodow. Po pierwsze, przy wstrzykniętych ziarnach
# --target-exclude nie wystarcza: narzedzie i tak bierze plik z ziarnami jako
# cel i marnuje na niego caly slot budzetu. Po drugie, --only-target pozwala
# przeszukac jeden modul zamiast czterech, co skraca przebieg z ~7 minut
# do ~40 sekund.
TARGET_ARGS=()
if [[ -n "$ONLY_TARGET" ]]; then
  if [[ ! -f "src/${ONLY_TARGET}.ts" ]]; then
    echo "blad: nie ma modulu src/${ONLY_TARGET}.ts" >&2
    exit 1
  fi
  echo "==> tylko jeden cel: ${ONLY_TARGET}"
  TARGET_ARGS+=(--target-include "./dist/${ONLY_TARGET}.js")
elif [[ -n "$SEEDS_FILE" ]]; then
  for source in src/*.ts; do
    TARGET_ARGS+=(--target-include "./dist/$(basename "$source" .ts).js")
  done
fi

echo "==> 2/4 przeszukiwanie: DynaMOSA, seed=$SEED, search-time=${SEARCH_TIME}s"
npx syntest javascript test \
  --random-seed "$SEED" \
  --search-time "$SEARCH_TIME" \
  --total-time "$TOTAL_TIME" \
  "${TARGET_ARGS[@]+"${TARGET_ARGS[@]}"}" \
  "${ANALYSIS_ARGS[@]+"${ANALYSIS_ARGS[@]}"}"

rm -f "$SEEDS_IN_DIST"

RUN_DIR="$(find syntest -maxdepth 1 -type d -name 'FID-*' -printf '%T@ %p\n' \
  | sort -rn | head -1 | cut -d' ' -f2-)"

if [[ -z "$RUN_DIR" ]]; then
  echo "blad: nie znalazlem katalogu wyniku SynTesta" >&2
  exit 1
fi

echo "==> 3/4 wynik surowy: $RUN_DIR/tests"
mkdir -p artifacts/syntest-raw
cp "$RUN_DIR"/tests/*.spec.js artifacts/syntest-raw/

echo "==> 4/4 transformacja mocha+chai/dist -> vitest+TS/src"
mkdir -p tests
for spec in "$RUN_DIR"/tests/test-*.spec.js; do
  name="$(basename "$spec" .spec.js)"
  module="${name#test-}"
  if [[ "$module" == __semantic_seeds__ ]]; then
    echo "  pomijam $module (plik z ziarnami, nie modul produkcyjny)"
    continue
  fi
  npx tsx scripts/syntest-to-vitest.ts "$spec" "tests/${module}.sbst.test.ts"
done

echo
echo "gotowe. testy w tests/*.sbst.test.ts, surowy wynik w artifacts/syntest-raw/"
