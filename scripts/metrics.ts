/**
 * Harness metryk. Jeden i ten sam pomiar dla kazdego brancha.
 *
 * Uwaga metodologiczna: ten plik powstal PRZED wygenerowaniem jakichkolwiek
 * testow. Metryka nie byla dopasowywana do wynikow.
 *
 * Uzycie:
 *   npx tsx scripts/metrics.ts [--no-mutation] [--label NAZWA] [--out PLIK]
 *
 * Wynik: results/<branch>.json (albo sciezka z --out)
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { globSync } from "node:fs";
import { dirname, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");

// --- pomocnicze ------------------------------------------------------------

function sh(command: string, args: string[]): { code: number; stdout: string } {
  try {
    const stdout = execFileSync(command, args, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
      maxBuffer: 64 * 1024 * 1024,
    });
    return { code: 0, stdout };
  } catch (error) {
    const e = error as { status?: number; stdout?: string; stderr?: string };
    return { code: e.status ?? 1, stdout: (e.stdout ?? "") + (e.stderr ?? "") };
  }
}

function currentBranch(): string {
  return sh("git", ["rev-parse", "--abbrev-ref", "HEAD"]).stdout.trim() || "detached";
}

/** Naklada kilka patchy, wykonuje pomiar, zawsze je cofa. */
function withPatches_<T>(patchFiles: string[], measure: () => T): T {
  const applied: string[] = [];
  for (const patch of patchFiles) {
    if (sh("git", ["apply", patch]).code === 0) applied.push(patch);
  }
  try {
    return measure();
  } finally {
    for (const patch of applied.reverse()) {
      sh("git", ["apply", "-R", patch]);
    }
  }
}

/** Naklada patch, wykonuje pomiar, zawsze cofa patch. */
function withPatch<T>(patchFile: string, measure: () => T): T {
  sh("git", ["apply", patchFile]);
  try {
    return measure();
  } finally {
    sh("git", ["apply", "-R", patchFile]);
  }
}

// --- vitest ----------------------------------------------------------------

interface RunResult {
  passed: boolean;
  numTests: number;
  numFailed: number;
  /** Status kazdego testu osobno, kluczowany pelna nazwa. */
  outcomes: Record<string, string>;
}

function runTests(patterns: string[] = []): RunResult {
  const outputFile = resolve(repoRoot, ".coverage/vitest-run.json");
  const result = sh("npx", [
    "vitest",
    "run",
    ...patterns,
    "--passWithNoTests",
    "--reporter=json",
    `--outputFile=${outputFile}`,
  ]);

  let numTests = 0;
  let numFailed = 0;
  const outcomes: Record<string, string> = {};

  if (existsSync(outputFile)) {
    const report = JSON.parse(readFileSync(outputFile, "utf8")) as {
      numTotalTests?: number;
      numFailedTests?: number;
      testResults?: { assertionResults?: { fullName?: string; status?: string }[] }[];
    };
    numTests = report.numTotalTests ?? 0;
    numFailed = report.numFailedTests ?? 0;
    for (const file of report.testResults ?? []) {
      for (const test of file.assertionResults ?? []) {
        if (test.fullName !== undefined && test.status !== undefined) {
          outcomes[test.fullName] = test.status;
        }
      }
    }
  }

  return { passed: result.code === 0, numTests, numFailed, outcomes };
}

interface CoverageEntry {
  lines: { pct: number };
  branches: { pct: number };
  functions: { pct: number };
  statements: { pct: number };
}

function measureCoverage(): Record<string, CoverageEntry> {
  sh("npx", [
    "vitest",
    "run",
    "--passWithNoTests",
    "--coverage",
    "--coverage.reporter=json-summary",
  ]);

  const summaryPath = resolve(repoRoot, ".coverage/coverage-summary.json");
  if (!existsSync(summaryPath)) {
    return {};
  }

  const raw = JSON.parse(readFileSync(summaryPath, "utf8")) as Record<string, CoverageEntry>;
  const out: Record<string, CoverageEntry> = {};
  for (const [key, value] of Object.entries(raw)) {
    const short = key === "total" ? "total" : key.split("/src/")[1] ?? key;
    out[short] = value;
  }
  return out;
}

// --- mutacje ---------------------------------------------------------------

/** W jakim stanie kodu udalo sie zmierzyc mutacje. */
type MutationState = "kod-z-defektami" | "kod-poprawiony" | "niemierzalne";

interface MutationSummary {
  state: MutationState;
  score: number;
  killed: number;
  survived: number;
  timeout: number;
  noCoverage: number;
  perFile: Record<string, number>;
}

const ALL_PATCHES = [
  "patches/fix-loyalty.patch",
  "patches/fix-cart-underflow.patch",
  "patches/fix-coupon-prototype.patch",
];

/**
 * Stryker wymaga, zeby POCZATKOWY przebieg testow byl zielony - inaczej
 * przerywa z "Initial test run failed" i nie produkuje raportu.
 *
 * W tym repozytorium to jest istotne ograniczenie, nie drobiazg: suite, ktory
 * poprawnie wykrywa zasiany defekt, wlasnie NIE przechodzi. Mierzymy wiec
 * mutacje w tym stanie kodu, w ktorym dany suite jest zielony, i zapisujemy
 * ktory to stan - inaczej porownywalibysmy liczby z dwoch roznych swiatow.
 *
 *   kod-z-defektami  - suite przechodzi na kodzie jak w src/
 *   kod-poprawiony   - suite przechodzi po nalozeniu wszystkich patchy
 *   niemierzalne     - nie przechodzi w zadnym z tych stanow
 */
function measureMutation(): MutationSummary {
  const reportPath = resolve(repoRoot, "reports/mutation/mutation.json");

  const runStryker = (state: MutationState): MutationSummary | undefined => {
    // Kluczowe: usuwamy raport PRZED przebiegiem. Bez tego, gdy Stryker
    // przerwie, odczytalibysmy raport z poprzedniego pomiaru - i przypisali
    // jednemu branchowi liczby innego. Zdarzylo sie.
    rmSync(reportPath, { force: true });

    const result = sh("npx", ["stryker", "run"]);
    if (!existsSync(reportPath)) {
      console.error(`  (stryker nie wyprodukowal raportu; exit=${result.code})`);
      return undefined;
    }
    return { ...parseMutationReport(reportPath), state };
  };

  if (runTests().passed) {
    const summary = runStryker("kod-z-defektami");
    if (summary !== undefined) return summary;
  }

  console.log("     suite nie jest zielony na src/ - probuje z nalozonymi patchami");
  const withPatches = withPatches_(ALL_PATCHES, () => {
    if (!runTests().passed) return undefined;
    return runStryker("kod-poprawiony");
  });
  if (withPatches !== undefined) return withPatches;

  return {
    state: "niemierzalne",
    score: 0,
    killed: 0,
    survived: 0,
    timeout: 0,
    noCoverage: 0,
    perFile: {},
  };
}

function parseMutationReport(reportPath: string): Omit<MutationSummary, "state"> {
  const report = JSON.parse(readFileSync(reportPath, "utf8")) as {
    files: Record<string, { mutants: { status: string }[] }>;
  };

  const tally = { killed: 0, survived: 0, timeout: 0, noCoverage: 0 };
  const perFile: Record<string, number> = {};

  for (const [path, file] of Object.entries(report.files)) {
    const local = { killed: 0, survived: 0, timeout: 0, noCoverage: 0 };
    for (const mutant of file.mutants) {
      const bucket =
        mutant.status === "Killed"
          ? "killed"
          : mutant.status === "Survived"
            ? "survived"
            : mutant.status === "Timeout"
              ? "timeout"
              : mutant.status === "NoCoverage"
                ? "noCoverage"
                : null;
      if (bucket !== null) {
        local[bucket] += 1;
        tally[bucket] += 1;
      }
    }
    const denominator = local.killed + local.timeout + local.survived + local.noCoverage;
    perFile[path.split("/src/")[1] ?? path] =
      denominator === 0 ? 0 : round2(((local.killed + local.timeout) / denominator) * 100);
  }

  const denominator = tally.killed + tally.timeout + tally.survived + tally.noCoverage;
  return {
    score: denominator === 0 ? 0 : round2(((tally.killed + tally.timeout) / denominator) * 100),
    ...tally,
    perFile,
  };
}

// --- oracle: Fails Without / Passes With ------------------------------------

type OracleVerdict = "caught" | "cemented" | "mixed" | "silent";

interface OracleResult {
  patch: string;
  testPattern: string;
  verdict: OracleVerdict;
  /** Testy, ktore nie przechodza przed naprawa i przechodza po - poprawne wykrycie. */
  caughtBy: string[];
  /** Testy, ktore przechodza przed naprawa i przestaja po - utrwalily blad. */
  cementedBy: string[];
}

/**
 * Rozstrzyga, co suite zrobil z defektem, porownujac wynik **kazdego testu
 * osobno** przed i po nalozeniu patcha:
 *
 *   caught    - istnieje test, ktory nie przechodzi na zabugowanym kodzie
 *               i przechodzi na poprawionym
 *   cemented  - istnieje test, ktory przechodzi na zabugowanym kodzie
 *               i przestaje przechodzic na poprawionym
 *   mixed     - jedno i drugie naraz, w roznych testach
 *   silent    - defekt nie zmienil wyniku zadnego testu
 *
 * Porownanie per test, a nie po statusie calego pliku, jest konieczne:
 * inaczej jedna niepowiazana awaria w tym samym pliku maskuje sygnal.
 */
function checkOracle(patchFile: string, testPattern: string): OracleResult {
  const before = runTests([testPattern]);
  const after = withPatch(patchFile, () => runTests([testPattern]));

  const caughtBy: string[] = [];
  const cementedBy: string[] = [];

  for (const [name, statusBefore] of Object.entries(before.outcomes)) {
    const statusAfter = after.outcomes[name];
    if (statusAfter === undefined) {
      continue;
    }
    if (statusBefore === "failed" && statusAfter === "passed") {
      caughtBy.push(name);
    }
    if (statusBefore === "passed" && statusAfter === "failed") {
      cementedBy.push(name);
    }
  }

  const verdict: OracleVerdict =
    caughtBy.length > 0 && cementedBy.length > 0
      ? "mixed"
      : caughtBy.length > 0
        ? "caught"
        : cementedBy.length > 0
          ? "cemented"
          : "silent";

  return { patch: patchFile, testPattern, verdict, caughtBy, cementedBy };
}

// --- rozmiar i czytelnosc suite ---------------------------------------------

interface SuiteShape {
  files: number;
  lines: number;
  /** Liczba przypadkow zgloszona przez vitest - obejmuje rozwiniete it.each. */
  testCases: number;
  /** Liczba deklaracji `it(` w zrodle - nie obejmuje it.each. */
  tests: number;
  assertions: number;
  assertionsPerTest: number;
  genericTestNames: number;
}

function measureSuiteShape(): SuiteShape {
  const files = globSync("tests/**/*.test.ts", { cwd: repoRoot });
  let lines = 0;
  let tests = 0;
  let assertions = 0;
  let genericTestNames = 0;

  for (const file of files) {
    const source = readFileSync(resolve(repoRoot, file), "utf8");
    lines += source.split("\n").length;
    tests += (source.match(/\bit\(/g) ?? []).length;
    assertions += (source.match(/expect\(/g) ?? []).length;
    // "Test 7 for 'cart'" - nazwa nie mowiaca nic o intencji
    genericTestNames += (source.match(/it\("Test \d+ for/g) ?? []).length;
  }

  return {
    files: files.length,
    lines,
    testCases: runTests().numTests,
    tests,
    assertions,
    assertionsPerTest: tests === 0 ? 0 : round2(assertions / tests),
    genericTestNames,
  };
}

function round2(value: number): number {
  return Math.round(value * 100) / 100;
}

// --- main ------------------------------------------------------------------

const args = process.argv.slice(2);
const skipMutation = args.includes("--no-mutation");
const labelIndex = args.indexOf("--label");
const label = labelIndex === -1 ? undefined : args[labelIndex + 1];
const outIndex = args.indexOf("--out");
const outOverride = outIndex === -1 ? undefined : args[outIndex + 1];

const branch = currentBranch();
console.log(`==> metryki dla brancha: ${branch}`);

console.log("==> kształt suite");
const suite = measureSuiteShape();

console.log("==> pokrycie (vitest + v8)");
const coverage = measureCoverage();

console.log("==> oracle: punkty lojalnosciowe (rozbieznosc kod <-> specyfikacja)");
const loyaltyOracle = checkOracle("patches/fix-loyalty.patch", "tests/loyalty");

console.log("==> oracle: awaria koszyka (underflow przy sekwencji wywolan)");
const cartOracle = checkOracle("patches/fix-cart-underflow.patch", "tests/cart");

console.log("==> oracle: kupon z lancucha prototypow (defekt niezasiany)");
const couponOracle = checkOracle("patches/fix-coupon-prototype.patch", "tests/cart");

let mutation: MutationSummary | null = null;
if (skipMutation) {
  console.log("==> mutacje: pominiete (--no-mutation)");
} else {
  console.log("==> mutacje (stryker) - to trwa najdluzej");
  mutation = measureMutation();
  console.log(`     stan pomiaru: ${mutation.state}`);
}

const report = {
  branch,
  label: label ?? branch,
  generatedAt: new Date().toISOString(),
  node: process.version,
  suite,
  coverage,
  oracles: {
    loyaltySpecDeviation: loyaltyOracle,
    cartUnderflowCrash: cartOracle,
    couponPrototypeChain: couponOracle,
  },
  mutation,
};

const outputPath =
  outOverride === undefined
    ? resolve(repoRoot, `results/${branch.replace(/\//g, "-")}.json`)
    : resolve(repoRoot, outOverride);
mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, JSON.stringify(report, null, 2) + "\n");

console.log(`\ngotowe -> ${outputPath}`);
console.log(
  `  pokrycie galezi: ${coverage["total"]?.branches.pct ?? "?"}%  ` +
    `mutation score: ${mutation?.score ?? "?"} (${mutation?.state ?? "-"})  ` +
    `testow: ${suite.tests}`,
);
console.log(
  `  oracle loyalty: ${loyaltyOracle.verdict}` +
    `   oracle cart: ${cartOracle.verdict}` +
    `   oracle kupon: ${couponOracle.verdict}`,
);
