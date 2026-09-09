/**
 * Skleja results/*.json w jedna tabele porownawcza.
 *
 * Uzycie:
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
  mutation: {
    state?: string;
    score: number;
    survived: number;
    noCoverage: number;
  } | null;
}

const ORDER = ["main", "demo-01-llm-only", "demo-02-sbst-only", "demo-03-hybrid"];

const files = globSync("results/*.json", { cwd: repoRoot });
const reports: Report[] = files
  .map((file) => JSON.parse(readFileSync(resolve(repoRoot, file), "utf8")) as Report)
  .sort((a, b) => {
    const rank = (r: Report) => {
      const index = ORDER.indexOf(r.branch.replace(/\//g, "-"));
      return index === -1 ? ORDER.length : index;
    };
    return rank(a) - rank(b);
  });

if (reports.length === 0) {
  console.error("brak plikow results/*.json - uruchom najpierw npm run metrics");
  process.exit(1);
}

function cell(value: string | number | undefined): string {
  return value === undefined ? "-" : String(value);
}

const VERDICT_LABEL: Record<string, string> = {
  caught: "wykryty",
  cemented: "utrwalony",
  mixed: "mieszany",
  silent: "nietkniety",
};

const rows: string[][] = [
  ["metryka", ...reports.map((r) => r.label)],
  ["---", ...reports.map(() => "---")],
  ["pokrycie galezi (src)", ...reports.map((r) => cell(r.coverage["total"]?.branches.pct) + "%")],
  ["pokrycie linii (src)", ...reports.map((r) => cell(r.coverage["total"]?.lines.pct) + "%")],
  [
    "mutation score",
    ...reports.map((r) =>
      r.mutation === null || r.mutation.state === "niemierzalne"
        ? "niemierzalne"
        : `${r.mutation.score}%`,
    ),
  ],
  [
    "mutacje mierzone na",
    ...reports.map((r) => (r.mutation === null ? "-" : (r.mutation.state ?? "-"))),
  ],
  [
    "mutanty przezyle",
    ...reports.map((r) =>
      r.mutation === null || r.mutation.state === "niemierzalne" ? "-" : cell(r.mutation.survived),
    ),
  ],
  ["liczba testow", ...reports.map((r) => cell(r.suite.testCases ?? r.suite.tests))],
  ["linii kodu testow", ...reports.map((r) => cell(r.suite.lines))],
  ["asercji na test", ...reports.map((r) => cell(r.suite.assertionsPerTest))],
  ["nazwy bez intencji", ...reports.map((r) => cell(r.suite.genericTestNames))],
  [
    "rozbieznosc ze spec (loyalty)",
    ...reports.map((r) => VERDICT_LABEL[r.oracles["loyaltySpecDeviation"]?.verdict ?? ""] ?? "-"),
  ],
  [
    "awaria koszyka (cart)",
    ...reports.map((r) => VERDICT_LABEL[r.oracles["cartUnderflowCrash"]?.verdict ?? ""] ?? "-"),
  ],
  [
    "kupon z prototypu (niezasiany)",
    ...reports.map((r) => VERDICT_LABEL[r.oracles["couponPrototypeChain"]?.verdict ?? ""] ?? "-"),
  ],
];

const table = rows.map((row) => "| " + row.join(" | ") + " |").join("\n");

const output = `# Porownanie branchy

Wygenerowane przez \`npm run compare\` z plikow \`results/*.json\`.
Zrodla pomiarow: ${reports.map((r) => `\`${r.branch}\` (${r.generatedAt})`).join(", ")}.

${table}

## Jak czytac wiersze o defektach

- **wykryty** - suite nie przechodzi na zabugowanym kodzie i przechodzi po
  nalozeniu patcha. To poprawne wykrycie defektu (Fails Without / Passes With).
- **utrwalony** - suite przechodzi na zabugowanym kodzie i przestaje przechodzic
  po jego naprawie. Testy zapisaly blad jako oczekiwane zachowanie.
- **mieszany** - jeden test wykryl defekt, a inny go utrwalil.
- **nietkniety** - defekt nie zmienil wyniku zadnego testu.

Porownanie jest robione **per test**, nie po statusie calego pliku - inaczej
jedna niepowiazana awaria maskowalaby sygnal.

## Dlaczego przy mutation score jest kolumna "mierzone na"

Stryker przerywa, jesli poczatkowy przebieg testow nie jest zielony. Suite,
ktory poprawnie wykrywa zasiany defekt, wlasnie nie przechodzi - wiec na kodzie
z \`src/\` nie da sie go zmierzyc. Harness mierzy takie suite po nalozeniu
wszystkich patchy z \`patches/\` i zapisuje, w ktorym stanie kodu liczba
powstala. Liczb z dwoch roznych stanow nie nalezy porownywac bezposrednio.

Metodologia pomiaru: [../docs/METODOLOGIA.md](../docs/METODOLOGIA.md).
`;

writeFileSync(resolve(repoRoot, "results/COMPARISON.md"), output);
console.log(`gotowe -> results/COMPARISON.md (${reports.length} branchy)`);
console.log(rows.map((row) => row.join("\t")).join("\n"));
