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

# Straznik stanu wejsciowego. Prompt, ktory generuje testy od zera, musi
# zastac puste tests/ - inaczej model zobaczy pliki z poprzedniego przebiegu
# i uzna je za swoje, co uniewaznia wynik wariantu. Prompt pracujacy na
# istniejacym suite deklaruje to polem `wejscie:` we frontmatterze.
EXPECTS_INPUT="$(sed -n 's/^wejscie: *//p' "$PROMPT_FILE" | head -1)"
EXISTING="$(find tests -maxdepth 1 -name '*.llm.test.ts' | wc -l)"

if [[ -z "$EXPECTS_INPUT" && "$EXISTING" -gt 0 ]]; then
  echo "blad: tests/ zawiera $EXISTING plikow *.llm.test.ts, a prompt $NAME" >&2
  echo "      generuje suite od zera. Wyczysc je najpierw:" >&2
  echo "        rm -f tests/*.llm.test.ts" >&2
  exit 1
fi

if [[ -n "$EXPECTS_INPUT" && "$EXISTING" -eq 0 ]]; then
  echo "blad: prompt $NAME pracuje na istniejacym suite ($EXPECTS_INPUT)," >&2
  echo "      a tests/ jest puste." >&2
  exit 1
fi

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
