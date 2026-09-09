#!/usr/bin/env python3
"""Wyciaga zuzycie tokenow i log wywolan narzedzi z transkryptu claude -p.

Uzycie:
    python3 scripts/llm-usage.py <nazwa> <model> <effort> <startedAt> <sekundy>

Czyta artifacts/llm/<nazwa>.jsonl, zapisuje:
    artifacts/llm/<nazwa>.usage.json  - model, effort, tokeny, koszt, czas
    artifacts/llm/<nazwa>.tools.json  - kazde wywolanie narzedzia z argumentami

Osobny plik, a nie heredoc w run-llm.sh, zeby dalo sie odtworzyc metryki
z samego transkryptu, gdyby przebieg zostal przerwany.
"""
import json
import sys

name, model, effort, started, elapsed = sys.argv[1:6]

result = {}
tool_calls = []

with open(f"artifacts/llm/{name}.jsonl") as handle:
    for line in handle:
        line = line.strip()
        if not line:
            continue
        try:
            event = json.loads(line)
        except json.JSONDecodeError:
            continue
        if event.get("type") == "result":
            result = event
        for block in (event.get("message", {}) or {}).get("content", []) or []:
            if isinstance(block, dict) and block.get("type") == "tool_use":
                tool_calls.append({"tool": block.get("name"), "input": block.get("input")})

usage = result.get("usage", {}) or {}
record = {
    "prompt": name,
    "model": model,
    "effort": effort,
    "startedAt": started,
    "wallTimeSeconds": int(elapsed),
    "turns": result.get("num_turns"),
    "costUSD": result.get("total_cost_usd"),
    "inputTokens": usage.get("input_tokens"),
    "outputTokens": usage.get("output_tokens"),
    "cacheReadTokens": usage.get("cache_read_input_tokens"),
    "cacheCreationTokens": usage.get("cache_creation_input_tokens"),
    "toolCalls": len(tool_calls),
}

with open(f"artifacts/llm/{name}.usage.json", "w") as handle:
    json.dump(record, handle, indent=2)
    handle.write("\n")

with open(f"artifacts/llm/{name}.tools.json", "w") as handle:
    json.dump(tool_calls, handle, indent=2, ensure_ascii=False)
    handle.write("\n")

print(f"    tur:     {record['turns']}")
print(f"    czas:    {record['wallTimeSeconds']} s")
print(f"    tokeny:  in {record['inputTokens']} / out {record['outputTokens']}"
      f" / cache-read {record['cacheReadTokens']}")
print(f"    koszt:   {record['costUSD']} USD")
print(f"    wywolan narzedzi: {record['toolCalls']}")
