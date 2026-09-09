#!/usr/bin/env bash
#
# Zbiera pliki wynikowe ze wszystkich branchy demo/* do results/ na branchu
# biezacym, zeby scripts/compare.ts mial z czego zlozyc tabele.
#
# Uzycie:
#   bash scripts/collect-results.sh
#
# Czyta je wprost z gita (`git show <branch>:<plik>`), a nie z katalogu
# roboczego - dzieki temu zestawienie zawsze odpowiada temu, co jest
# zacommitowane na danym branchu, i da sie je odtworzyc z samego repozytorium.
set -euo pipefail

BRANCHES=(
  demo/01-llm-only
  demo/02-sbst-only
  demo/03-hybrid
)

mkdir -p results

for branch in "${BRANCHES[@]}"; do
  if ! git rev-parse --verify --quiet "$branch" > /dev/null; then
    echo "pomijam $branch - nie ma takiego brancha"
    continue
  fi

  echo "==> $branch"
  # kazdy branch trzyma swoje wyniki pod nazwa pochodzaca od nazwy brancha
  for path in $(git ls-tree -r --name-only "$branch" -- results | grep '\.json$' || true); do
    target="results/$(basename "$path")"
    git show "${branch}:${path}" > "$target"
    echo "    $target"
  done
done

echo
echo "zebrane pliki:"
ls -1 results/*.json | sed 's/^/  /'
echo
echo "teraz: npx tsx scripts/compare.ts"
