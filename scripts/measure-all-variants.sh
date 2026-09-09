#!/usr/bin/env bash
#
# Mierzy kazdy zarchiwizowany wariant tym samym harnessem i zostawia
# w tests/ wariant kanoniczny.
#
# Uzycie:
#   bash scripts/measure-all-variants.sh a b c
#
# Ostatni podany wariant jest kanoniczny: zostaje w tests/ i dodatkowo
# trafia do results/<branch>.json.
set -euo pipefail

VARIANTS=("$@")
if [[ ${#VARIANTS[@]} -eq 0 ]]; then
  echo "podaj warianty, np.: bash scripts/measure-all-variants.sh a b c" >&2
  exit 1
fi

CANONICAL="${VARIANTS[${#VARIANTS[@]}-1]}"

for variant in "${VARIANTS[@]}"; do
  if [[ ! -d "variants/$variant" ]]; then
    echo "brak katalogu variants/$variant" >&2
    exit 1
  fi

  echo "=============================================================="
  echo "  wariant $variant"
  echo "=============================================================="

  rm -f tests/*.llm.test.ts
  cp "variants/$variant"/*.llm.test.ts tests/

  npx tsx scripts/metrics.ts \
    --label "llm-$variant" \
    --out "results/demo-01-llm-${variant}.json"
done

echo "=============================================================="
echo "  wariant kanoniczny: $CANONICAL -> results/<branch>.json"
echo "=============================================================="

rm -f tests/*.llm.test.ts
cp "variants/$CANONICAL"/*.llm.test.ts tests/
npx tsx scripts/metrics.ts --label "llm-only ($CANONICAL)"
