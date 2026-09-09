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

while [[ $# -gt 0 ]]; do
  case "$1" in
    --seed) SEED="$2"; shift 2 ;;
    --search-time) SEARCH_TIME="$2"; shift 2 ;;
    --seeds) SEEDS_FILE="$2"; shift 2 ;;
    *) echo "nieznany argument: $1" >&2; exit 1 ;;
  esac
done

TOTAL_TIME=$((SEARCH_TIME + 30))

echo "==> 0/4 czyszczenie poprzedniego wyniku"
rm -f tests/*.sbst.test.ts artifacts/syntest-raw/*.spec.js

echo "==> 1/4 kompilacja src/*.ts -> dist/*.js (SynTest nie parsuje TypeScriptu)"
npx tsc -p tsconfig.build.json

ANALYSIS_ARGS=()
if [[ -n "$SEEDS_FILE" ]]; then
  echo "==> ziarna semantyczne: $SEEDS_FILE -> context constant pool"
  ANALYSIS_ARGS=(--analysis-include "./dist/**/*.js" --analysis-include "$SEEDS_FILE")
fi

echo "==> 2/4 przeszukiwanie: DynaMOSA, seed=$SEED, search-time=${SEARCH_TIME}s"
npx syntest javascript test \
  --random-seed "$SEED" \
  --search-time "$SEARCH_TIME" \
  --total-time "$TOTAL_TIME" \
  "${ANALYSIS_ARGS[@]+"${ANALYSIS_ARGS[@]}"}"

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
  npx tsx scripts/syntest-to-vitest.ts "$spec" "tests/${module}.sbst.test.ts"
done

echo
echo "gotowe. testy w tests/*.sbst.test.ts, surowy wynik w artifacts/syntest-raw/"
