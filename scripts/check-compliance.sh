#!/usr/bin/env bash
#
# Sprawdza, czy modele w branchach LLM przestrzegaly ograniczen swojego
# promptu. Zakaz jest istotny: patches/ zawiera poprawna wersje kodu
# z zasianym defektem, a docs/METODOLOGIA.md wymienia oba zasiane bledy.
# Model, ktory je przeczyta, odczytuje odpowiedz zamiast rozwiazywac zadanie.
#
# Lista zabronionych sciezek nie jest wpisana w ten skrypt - czytamy ja
# z pola `zabronione:` we frontmatterze kazdego promptu, zeby nie moglo
# dojsc do rozjechania sie jednego z drugim. Warianty maja rozne listy:
# wariant "a" nie ma dostepu do calego docs/, warianty "b" i "c" czytaja
# docs/SPEC.md z zalozenia.
#
# Uzycie:
#   bash scripts/check-compliance.sh
set -euo pipefail

if ! compgen -G "artifacts/llm/*.tools.json" > /dev/null; then
  echo "brak artifacts/llm/*.tools.json - nie ma czego sprawdzac"
  exit 0
fi

STATUS=0

for log in artifacts/llm/*.tools.json; do
  name="$(basename "$log" .tools.json)"
  prompt="prompts/${name}.md"

  echo "==> $name"

  if [[ ! -f "$prompt" ]]; then
    echo "    pominiete - brak $prompt"
    continue
  fi

  RAW="$(sed -n 's/^zabronione: *"\(.*\)"/\1/p' "$prompt" | head -1)"
  if [[ -z "$RAW" ]]; then
    echo "    pominiete - prompt nie deklaruje pola zabronione:"
    continue
  fi

  found=0
  IFS=',' read -ra ENTRIES <<< "$RAW"
  for entry in "${ENTRIES[@]}"; do
    path="$(echo "$entry" | xargs)"
    # pomijamy wpisy opisowe w rodzaju "inne branche" - to nie sciezki
    [[ "$path" == */* || "$path" == *.md ]] || continue

    hits="$(grep -c -- "$path" "$log" || true)"
    if [[ "$hits" -gt 0 ]]; then
      echo "    NARUSZENIE: $path wystepuje $hits x w logu wywolan narzedzi"
      found=1
      STATUS=1
    fi
  done

  if [[ "$found" -eq 0 ]]; then
    echo "    ok - zadna zabroniona sciezka nie pojawila sie w wywolaniach"
  fi
done

echo
if [[ "$STATUS" -eq 0 ]]; then
  echo "wynik: wszystkie uruchomienia zgodne z ograniczeniami promptu"
else
  echo "wynik: sa naruszenia - patrz wyzej. Wyniki takiego wariantu sa"
  echo "       niewazne, bo model mial dostep do rozwiazania."
fi
exit "$STATUS"
