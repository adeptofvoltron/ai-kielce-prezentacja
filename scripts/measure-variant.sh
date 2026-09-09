#!/usr/bin/env bash
#
# Mierzy suite lezacy aktualnie w tests/ i archiwizuje go jako wariant.
#
# Uzycie:
#   bash scripts/measure-variant.sh <nazwa-wariantu> [--keep]
#
# --keep  zostawia testy w tests/ (do dalszej pracy, np. petli naprawczej),
#         tylko kopiujac je do variants/<nazwa>/
#
# Wynik: results/demo-01-llm-<nazwa>.json oraz variants/<nazwa>/
set -euo pipefail

VARIANT="${1:?podaj nazwe wariantu, np. a}"
KEEP="${2:-}"

npx tsx scripts/metrics.ts \
  --label "llm-$VARIANT" \
  --out "results/demo-01-llm-${VARIANT}.json"

mkdir -p "variants/${VARIANT}"
if [[ "$KEEP" == "--keep" ]]; then
  cp tests/*.llm.test.ts "variants/${VARIANT}/" 2>/dev/null || true
  echo "wariant $VARIANT skopiowany do variants/${VARIANT}/ (testy zostaja w tests/)"
else
  mv tests/*.llm.test.ts "variants/${VARIANT}/" 2>/dev/null || true
  echo "wariant $VARIANT przeniesiony do variants/${VARIANT}/ (tests/ wyczyszczone)"
fi
