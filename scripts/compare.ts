/**
 * Skleja results/*.json w tabele porownawcze.
 *
 * Uzycie:
 *   bash scripts/collect-results.sh    # sciagnij wyniki z branchy demo/*
 *   npx tsx scripts/compare.ts
 *
 * Wynik: results/COMPARISON.md
 */
import { globSync, readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");

interface Report {
  branch: string;
  label: string;
  generatedAt: string;
  suite: {
    testCases?: number;
    tests: number;
    lines: number;
    assertionsPerTest: number;
    genericTestNames: number;
  };
  coverage: Record<string, { branches: { pct: number }; lines: { pct: number } }>;
  oracles: Record<string, { verdict: string }>;
  mutation: { state?: string; score: number; survived: number } | null;
}

/** Branche kanoniczne - jeden suite na podejscie, w kolejnosci narracji. */
const CANONICAL = [
  ["demo-02-sbst-only", "SBST"],
  ["demo-01-llm-only", "LLM"],
  ["demo-03-hybrid", "hybryda"],
] as const;

/** Warianty brancha LLM - ta sama metodologia, rozne modele i wejscia. */
const VARIANTS = [
  ["demo-01-llm-a", "a: kod"],
  ["demo-01-llm-b", "b: +spec"],
  ["demo-01-llm-c", "c: b+naprawa"],
  ["demo-01-llm-d", "d: +spec, tanio"],
  ["demo-01-llm-e", "e: d+naprawa"],
] as const;

const VERDICT_LABEL: Record<string, string> = {
  caught: "wykryty",
  cemented: "utrwalony",
  mixed: "mieszany",
  silent: "nietkniety",
};

const reports = new Map<string, Report>();
for (const file of globSync("results/*.json", { cwd: repoRoot })) {
  const report = JSON.parse(readFileSync(resolve(repoRoot, file), "utf8")) as Report;
  reports.set(basename(file, ".json"), report);
}

if (reports.size === 0) {
  console.error("brak results/*.json - uruchom najpierw bash scripts/collect-results.sh");
  process.exit(1);
}

function verdict(report: Report | undefined, oracle: string): string {
  const value = report?.oracles[oracle]?.verdict;
  return value === undefined ? "-" : (VERDICT_LABEL[value] ?? value);
}

function mutationScore(report: Report | undefined): string {
  if (report?.mutation == null) return "-";
  if (report.mutation.state === "niemierzalne") return "niemierzalne";
  return `${report.mutation.score}%`;
}

function branchPct(report: Report | undefined, file = "total"): string {
  const pct = report?.coverage[file]?.branches.pct;
  return pct === undefined ? "-" : `${pct}%`;
}

function table(columns: readonly (readonly [string, string])[]): string {
  const picked = columns.map(([key, title]) => [title, reports.get(key)] as const);

  const rows: string[][] = [
    ["metryka", ...picked.map(([title]) => title)],
    ["---", ...picked.map(() => "---")],
    ["pokrycie galezi (`src/`)", ...picked.map(([, r]) => branchPct(r))],
    ["`pricing.ts`", ...picked.map(([, r]) => branchPct(r, "pricing.ts"))],
    ["`invoiceId.ts`", ...picked.map(([, r]) => branchPct(r, "invoiceId.ts"))],
    ["`loyalty.ts`", ...picked.map(([, r]) => branchPct(r, "loyalty.ts"))],
    ["`cart.ts`", ...picked.map(([, r]) => branchPct(r, "cart.ts"))],
    ["mutation score", ...picked.map(([, r]) => mutationScore(r))],
    ["mutacje mierzone na", ...picked.map(([, r]) => r?.mutation?.state ?? "-")],
    ["testow", ...picked.map(([, r]) => String(r?.suite.testCases ?? r?.suite.tests ?? "-"))],
    ["linii kodu testow", ...picked.map(([, r]) => String(r?.suite.lines ?? "-"))],
    ["nazw bez intencji", ...picked.map(([, r]) => String(r?.suite.genericTestNames ?? "-"))],
    ["rozbieznosc ze spec (loyalty)", ...picked.map(([, r]) => verdict(r, "loyaltySpecDeviation"))],
    ["awaria koszyka (cart)", ...picked.map(([, r]) => verdict(r, "cartUnderflowCrash"))],
    ["kupon z prototypu", ...picked.map(([, r]) => verdict(r, "couponPrototypeChain"))],
  ];

  return rows.map((row) => "| " + row.join(" | ") + " |").join("\n");
}

const sources = [...reports.values()]
  .map((r) => `${r.label} (${r.generatedAt.slice(0, 19).replace("T", " ")})`)
  .join(", ");

const output = [
  "# Porownanie podejsc",
  "",
  "Wygenerowane przez `npm run compare` z plikow `results/*.json`, zebranych",
  "z branchy `demo/*` przez `npm run collect`.",
  "",
  "## Trzy podejscia",
  "",
  table(CANONICAL),
  "",
  "## Warianty brancha LLM",
  "",
  "Ta sama metodologia pomiaru, rozne modele i rozne wejscia promptu.",
  "Szczegoly: `RUNBOOK.md` na branchu `demo/01-llm-only`.",
  "",
  table(VARIANTS),
  "",
  "## Jak czytac wiersze o defektach",
  "",
  "- **wykryty** - istnieje test, ktory nie przechodzi na kodzie z defektem",
  "  i przechodzi po nalozeniu patcha. Poprawne wykrycie.",
  "- **utrwalony** - istnieje test, ktory przechodzi przed naprawa i przestaje",
  "  po niej. Test zapisal blad jako oczekiwane zachowanie.",
  "- **mieszany** - jeden test wykryl defekt, a inny go utrwalil.",
  "- **nietkniety** - defekt nie zmienil wyniku zadnego testu.",
  "",
  "Porownanie jest robione **per test**, nie po statusie calego pliku - inaczej",
  "jedna niepowiazana awaria maskowalaby sygnal.",
  "",
  "## Dlaczego przy mutation score jest wiersz \"mierzone na\"",
  "",
  "Stryker przerywa, jesli poczatkowy przebieg testow nie jest zielony. Suite,",
  "ktory poprawnie wykrywa zasiany defekt, wlasnie nie przechodzi - wiec na",
  "kodzie z `src/` nie da sie go zmierzyc. Harness mierzy taki suite po",
  "nalozeniu wszystkich patchy z `patches/` i zapisuje, w ktorym stanie kodu",
  "liczba powstala. **Liczb z dwoch roznych stanow nie nalezy porownywac.**",
  "Suite niezielony w zadnym z tych stanow jest raportowany jako",
  "`niemierzalne`.",
  "",
  "Metodologia pomiaru: [../docs/METODOLOGIA.md](../docs/METODOLOGIA.md).",
  "",
  `Zrodla pomiarow: ${sources}.`,
  "",
].join("\n");

writeFileSync(resolve(repoRoot, "results/COMPARISON.md"), output);
console.log(`gotowe -> results/COMPARISON.md (${reports.size} plikow wynikowych)`);
console.log(table(CANONICAL));
