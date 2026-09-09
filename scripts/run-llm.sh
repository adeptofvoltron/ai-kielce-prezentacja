#!/usr/bin/env bash
#
# Uruchamia jeden prompt z katalogu prompts/ w trybie headless i zapisuje
# pelny transkrypt oraz zuzycie tokenow.
#
# Uzycie:
#   bash scripts/run-llm.sh prompts/01a-generate-from-code.md
#
# Plik promptu ma frontmatter YAML z modelem i poziomem effortu, a po nim
# dokladna tresc promptu. Skrypt nie modyfikuje tresci - to, co jest w pliku,
# jest tym, co dostaje model.
set -euo pipefail

PROMPT_FILE="${1:?podaj plik promptu, np. prompts/01a-generate-from-code.md}"
NAME="$(basename "$PROMPT_FILE" .md)"

MODEL="$(sed -n 's/^model: *//p' "$PROMPT_FILE" | head -1)"
EFFORT="$(sed -n 's/^effort: *//p' "$PROMPT_FILE" | head -1)"
: "${MODEL:?frontmatter promptu musi zawierac pole model}"
: "${EFFORT:?frontmatter promptu musi zawierac pole effort}"

# tresc = wszystko po drugim wystapieniu linii "---"
BODY="$(awk 'seen==2 {print} /^---$/ {seen++}' "$PROMPT_FILE")"

# Straznik stanu wejsciowego. Prompt deklaruje we frontmatterze, czego
# oczekuje w tests/, a skrypt to sprawdza przed uruchomieniem modelu:
#
#   tests: puste       - suite ma powstac od zera; jesli w tests/ cos lezy,
#                        model przeczyta to i uzna za swoje (zdarzylo sie)
#   tests: istniejace  - prompt pracuje na gotowym suite
#   tests: nieistotne  - prompt nie dotyka testow (np. ekstrakcja intencji)
EXPECTED_TESTS="$(sed -n 's/^tests: *//p' "$PROMPT_FILE" | head -1)"
: "${EXPECTED_TESTS:?frontmatter promptu musi zawierac pole tests: puste|istniejace|nieistotne}"
EXISTING="$(find tests -maxdepth 1 -name '*.test.ts' | wc -l)"

case "$EXPECTED_TESTS" in
  puste)
    if [[ "$EXISTING" -gt 0 ]]; then
      echo "blad: prompt $NAME generuje suite od zera, a tests/ zawiera" >&2
      echo "      $EXISTING plikow *.test.ts. Wyczysc je najpierw." >&2
      exit 1
    fi
    ;;
  istniejace)
    if [[ "$EXISTING" -eq 0 ]]; then
      echo "blad: prompt $NAME pracuje na istniejacym suite, a tests/ jest puste." >&2
      exit 1
    fi
    ;;
  nieistotne) ;;
  *)
    echo "blad: nieznana wartosc 'tests: $EXPECTED_TESTS' w $PROMPT_FILE" >&2
    exit 1
    ;;
esac

mkdir -p artifacts/llm

echo "==> $NAME"
echo "    model:  $MODEL"
echo "    effort: $EFFORT"
echo

START="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
SECONDS=0

# stream-json + --verbose zapisuje kazde wywolanie narzedzia, nie tylko
# koncowa odpowiedz. Dzieki temu w repo jest pelny log tego, co model zrobil:
# ktore pliki czytal, jakie komendy uruchamial, co edytowal.
printf '%s' "$BODY" | claude -p \
  --model "$MODEL" \
  --effort "$EFFORT" \
  --permission-mode bypassPermissions \
  --output-format stream-json \
  --verbose \
  > "artifacts/llm/${NAME}.jsonl"

ELAPSED="$SECONDS"

python3 scripts/llm-usage.py "$NAME" "$MODEL" "$EFFORT" "$START" "$ELAPSED"

echo
echo "transkrypt: artifacts/llm/${NAME}.jsonl"
echo "zuzycie:    artifacts/llm/${NAME}.usage.json"
echo "narzedzia:  artifacts/llm/${NAME}.tools.json"
