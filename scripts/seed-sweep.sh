#!/usr/bin/env bash
#
# SBST jest stochastyczny: jeden przebieg z jednym ziarnem nie jest dowodem.
# Ten skrypt powtarza generacje dla wielu ziaren i zapisuje pomiar kazdego
# przebiegu osobno, zeby dalo sie policzyc mediane i rozrzut.
#
# Uzycie:
#   bash scripts/seed-sweep.sh [--seeds "1 2 3"] [--search-time SEK] [--semantic-seeds PLIK]
#
# Wynik: results/sweep/seed-<n>.json, potem `npx tsx scripts/aggregate-sweep.ts`.
#
# UWAGA: nadpisuje tests/*.sbst.test.ts. Po zakonczeniu odtworz kanoniczny
# przebieg brancha:  bash scripts/run-syntest.sh --seed 42 --search-time 90
set -euo pipefail

SEEDS="1 2 3 4 5 6 7 8 9 10"
SEARCH_TIME="90"
SEMANTIC_SEEDS=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --seeds) SEEDS="$2"; shift 2 ;;
    --search-time) SEARCH_TIME="$2"; shift 2 ;;
    --semantic-seeds) SEMANTIC_SEEDS="$2"; shift 2 ;;
    *) echo "nieznany argument: $1" >&2; exit 1 ;;
  esac
done

mkdir -p results/sweep

for seed in $SEEDS; do
  echo "=============================================================="
  echo "  ziarno $seed"
  echo "=============================================================="

  if [[ -n "$SEMANTIC_SEEDS" ]]; then
    bash scripts/run-syntest.sh --seed "$seed" --search-time "$SEARCH_TIME" \
      --seeds "$SEMANTIC_SEEDS"
  else
    bash scripts/run-syntest.sh --seed "$seed" --search-time "$SEARCH_TIME"
  fi

  # bez mutacji: przy 10 powtorzeniach Stryker zdominowalby czas przebiegu
  npx tsx scripts/metrics.ts --no-mutation \
    --label "seed-$seed" \
    --out "results/sweep/seed-${seed}.json"
done

echo
echo "gotowe. agregacja: npx tsx scripts/aggregate-sweep.ts"
