#!/usr/bin/env bash
#
# Podmienia absolutna sciezke repozytorium na /repo w plikach z artifacts/.
#
# Uzycie:
#   bash scripts/normalize-artifacts.sh
#
# Po co: transkrypty `claude -p` i surowe wyjscie SynTesta zawieraja pelna
# sciezke katalogu roboczego oraz sciezki wewnetrzne narzedzia
# (~/.claude/projects/...). W repozytorium publicznym to tylko szum, ktory
# dodatkowo rozni sie miedzy maszynami.
#
# UWAGA: po tej operacji pliki w artifacts/ nie sa bajt w bajt tym, co
# wyprodukowalo narzedzie. Zmieniony jest wylacznie prefiks sciezki -
# zadna wartosc, asercja ani komunikat bledu nie jest ruszany.
# Testy w tests/ sa czyszczone juz w trakcie transformacji
# (scripts/syntest-to-vitest.ts), wiec ich to nie dotyczy.
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [[ ! -d "$REPO_ROOT/artifacts" ]]; then
  echo "brak katalogu artifacts/ - nic do zrobienia"
  exit 0
fi

# Trzy formy, w ktorych sciezki trafiaja do artefaktow:
#   1. sciezka repozytorium               /home/kto/praca/repo
#   2. ta sama sciezka jako slug katalogu  -home-kto-praca-repo
#      (tak Claude Code nazywa katalog sesji: ukosniki ORAZ podkreslenia
#      zamienione na myslniki)
#   3. katalog domowy                      /home/kto
REPO_SLUG="${REPO_ROOT//[\/_]/-}"
HOME_DIR="${HOME:-/home/$(id -un)}"

CHANGED=0
while IFS= read -r -d '' file; do
  if grep -qF -e "$REPO_ROOT" -e "$REPO_SLUG" -e "$HOME_DIR" "$file"; then
    sed -i \
      -e "s|${REPO_ROOT}/|/repo/|g" \
      -e "s|${REPO_ROOT}|/repo|g" \
      -e "s|${REPO_SLUG}|-repo|g" \
      -e "s|${HOME_DIR}/|/home/user/|g" \
      -e "s|${HOME_DIR}|/home/user|g" \
      "$file"
    echo "  znormalizowano: ${file#"$REPO_ROOT"/}"
    CHANGED=$((CHANGED + 1))
  fi
done < <(find "$REPO_ROOT/artifacts" -type f -print0)

echo
echo "plikow zmienionych: $CHANGED"

# Kontrola: po przebiegu nie powinno zostac ani jedno wystapienie.
LEFT="$(grep -rlF -e "$REPO_ROOT" -e "$REPO_SLUG" -e "$HOME_DIR" "$REPO_ROOT/artifacts" 2>/dev/null | wc -l)"
if [[ "$LEFT" -gt 0 ]]; then
  echo "UWAGA: w $LEFT plikach nadal sa absolutne sciezki" >&2
  exit 1
fi
echo "kontrola: brak absolutnych sciezek w artifacts/"
