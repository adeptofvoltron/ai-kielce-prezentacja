/**
 * Liczy mediane i rozrzut z results/sweep/seed-*.json.
 *
 * Uzycie:
 *   npx tsx scripts/aggregate-sweep.ts
 *
 * Wynik: results/sweep/SUMMARY.md + results/sweep/summary.json
 */
import { globSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");

interface Report {
  label: string;
  suite: { tests: number };
  coverage: Record<string, { branches: { pct: number }; lines: { pct: number } }>;
  oracles: Record<string, { verdict: string }>;
}

const files = globSync("results/sweep/seed-*.json", { cwd: repoRoot }).sort();
if (files.length === 0) {
  console.error("brak results/sweep/seed-*.json - uruchom najpierw scripts/seed-sweep.sh");
  process.exit(1);
}

const reports = files.map(
  (file) => JSON.parse(readFileSync(resolve(repoRoot, file), "utf8")) as Report,
);

function median(values: number[]): number {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  const value =
    sorted.length % 2 === 0
      ? ((sorted[middle - 1] ?? 0) + (sorted[middle] ?? 0)) / 2
      : (sorted[middle] ?? 0);
  return Math.round(value * 100) / 100;
}

interface Stat {
  median: number;
  min: number;
  max: number;
}

function stat(values: number[]): Stat {
  return { median: median(values), min: Math.min(...values), max: Math.max(...values) };
}

const modules = ["pricing.ts", "invoiceId.ts", "loyalty.ts", "cart.ts", "total"];

const branchStats: Record<string, Stat> = {};
for (const module of modules) {
  const values = reports
    .map((report) => report.coverage[module]?.branches.pct)
    .filter((value): value is number => value !== undefined);
  if (values.length > 0) {
    branchStats[module] = stat(values);
  }
}

const testCounts = stat(reports.map((report) => report.suite.tests));

const verdictTally: Record<string, Record<string, number>> = {};
for (const report of reports) {
  for (const [name, oracle] of Object.entries(report.oracles)) {
    verdictTally[name] ??= {};
    verdictTally[name][oracle.verdict] = (verdictTally[name][oracle.verdict] ?? 0) + 1;
  }
}

const summary = { runs: reports.length, branchCoverage: branchStats, testCounts, verdictTally };
writeFileSync(
  resolve(repoRoot, "results/sweep/summary.json"),
  JSON.stringify(summary, null, 2) + "\n",
);

const coverageRows = Object.entries(branchStats)
  .map(([module, s]) => `| \`${module}\` | ${s.median}% | ${s.min}% | ${s.max}% |`)
  .join("\n");

const verdictRows = Object.entries(verdictTally)
  .map(([name, tally]) => {
    const parts = Object.entries(tally)
      .map(([verdict, count]) => `${verdict}: ${count}/${reports.length}`)
      .join(", ");
    return `| \`${name}\` | ${parts} |`;
  })
  .join("\n");

const output = `# Rozrzut miedzy ziarnami przeszukiwania

${reports.length} niezaleznych przebiegow, ziarna: ${reports.map((r) => r.label).join(", ")}.

## Pokrycie galezi (mierzone na src/)

| modul | mediana | min | max |
|---|---|---|---|
${coverageRows}

## Liczba wygenerowanych testow

mediana ${testCounts.median}, zakres ${testCounts.min}-${testCounts.max}.

## Werdykty wobec zasianych defektow

| oracle | rozklad |
|---|---|
${verdictRows}

Znaczenie werdyktow: [../../docs/METODOLOGIA.md](../../docs/METODOLOGIA.md).
`;

writeFileSync(resolve(repoRoot, "results/sweep/SUMMARY.md"), output);
console.log(`gotowe -> results/sweep/SUMMARY.md (${reports.length} przebiegow)`);
console.log(output);
