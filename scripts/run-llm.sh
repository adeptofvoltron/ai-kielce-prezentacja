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

mkdir -p artifacts/llm

echo "==> $NAME"
echo "    model:  $MODEL"
echo "    effort: $EFFORT"
echo

START="$(date -u +%Y-%m-%dT%H:%M:%SZ)"
SECONDS=0

printf '%s' "$BODY" | claude -p \
  --model "$MODEL" \
  --effort "$EFFORT" \
  --permission-mode acceptEdits \
  --output-format json \
  > "artifacts/llm/${NAME}.json"

ELAPSED="$SECONDS"

python3 - "$NAME" "$MODEL" "$EFFORT" "$START" "$ELAPSED" <<'PY'
import json, sys

name, model, effort, started, elapsed = sys.argv[1:6]
with open(f"artifacts/llm/{name}.json") as handle:
    data = json.load(handle)

usage = data.get("usage", {}) or {}
record = {
    "prompt": name,
    "model": model,
    "effort": effort,
    "startedAt": started,
    "wallTimeSeconds": int(elapsed),
    "turns": data.get("num_turns"),
    "costUSD": data.get("total_cost_usd"),
    "inputTokens": usage.get("input_tokens"),
    "outputTokens": usage.get("output_tokens"),
    "cacheReadTokens": usage.get("cache_read_input_tokens"),
    "cacheCreationTokens": usage.get("cache_creation_input_tokens"),
}
with open(f"artifacts/llm/{name}.usage.json", "w") as handle:
    json.dump(record, handle, indent=2)
    handle.write("\n")

print(f"    tur:     {record['turns']}")
print(f"    czas:    {record['wallTimeSeconds']} s")
print(f"    tokeny:  in {record['inputTokens']} / out {record['outputTokens']}")
print(f"    koszt:   {record['costUSD']} USD")
PY

echo
echo "transkrypt: artifacts/llm/${NAME}.json"
echo "zuzycie:    artifacts/llm/${NAME}.usage.json"
