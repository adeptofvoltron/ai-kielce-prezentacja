/**
 * Buduje pule ziaren dla SynTesta z pliku ziaren semantycznych.
 *
 * Uzycie:
 *   node scripts/filter-seeds.mjs <wejscie.js> <wyjscie.js> [--only PREFIKS]
 *
 * Robi dwie rzeczy, obie mechaniczne:
 *
 * 1. ODRZUCA literaly ze znakami spoza alfabetu samplera SynTesta.
 *    Sampler pracuje na ustalonym 100-znakowym alfabecie (`string-alphabet`,
 *    domyslna wartosc w @syntest/base-language/dist/lib/Configuration.js).
 *    Literal z innym znakiem wywoluje ostrzezenie "Cannot search for
 *    character missing from the sampling alphabet", a w wersji 0.1.0 potrafi
 *    wywrocic dekoder: TestExecutor.js:85 czyta `test.err.name` bez
 *    sprawdzenia, czy `test.err` istnieje, wiec awaria bez obiektu bledu
 *    zabija proces potomny i przebieg konczy sie BEZ zadnego wygenerowanego
 *    testu. Patrz docs/SPIKE.md.
 *
 * 2. Opcjonalnie ZAWEZA pule do jednej grupy (`--only CART_`).
 *    Plik ziaren jest pogrupowany po modulach (INVOICE_ID_*, SHIPPING_*,
 *    LOYALTY_*, CART_*). Rozmiar puli ma znaczenie: constant pool jest
 *    losowany, wiec im wiecej literalow, tym mniejsza szansa trafienia
 *    w ten konkretny, ktorego potrzebuje dana galaz. Przy sprzegnieciu
 *    wartosci miedzy wywolaniami (ten sam SKU dwa razy w jednej sekwencji)
 *    rozcienczenie puli jest zabojcze.
 *
 * Oryginalny artefakt LLM-a zostaje nietkniety w seeds/.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

/** Domyslny alfabet samplera, czytany z definicji opcji narzedzia. */
function toolAlphabet() {
  const source = readFileSync(
    require.resolve("@syntest/base-language/dist/lib/Configuration.js"),
    "utf8",
  );
  const anchor = source.indexOf("0123456789abcdefghijklmnopqrstuvwxyz");
  if (anchor < 0) {
    throw new Error("nie znalazlem domyslnego alfabetu w Configuration.js");
  }
  const start = source.lastIndexOf('"', anchor);
  let end = start + 1;
  while (end < source.length) {
    if (source[end] === "\\") {
      end += 2;
      continue;
    }
    if (source[end] === '"') break;
    end += 1;
  }
  return new Set(JSON.parse(source.slice(start, end + 1)));
}

/** Nazwa stalej, w ktorej siedzi literal - sluzy do zawezania po grupie. */
function groupOf(path) {
  let current = path;
  while (current) {
    if (current.isVariableDeclarator?.() && current.node.id?.type === "Identifier") {
      return current.node.id.name;
    }
    current = current.parentPath;
  }
  return "";
}

const args = process.argv.slice(2);
const onlyIndex = args.indexOf("--only");
const onlyPrefix = onlyIndex === -1 ? undefined : args[onlyIndex + 1];
const positional =
  onlyIndex === -1
    ? args
    : args.filter((_, i) => i !== onlyIndex && i !== onlyIndex + 1);
const [inputPath, outputPath] = positional;

if (inputPath === undefined || outputPath === undefined) {
  console.error("uzycie: node scripts/filter-seeds.mjs <wejscie.js> <wyjscie.js> [--only PREFIKS]");
  process.exit(1);
}

const alphabet = toolAlphabet();
const ast = parser.parse(readFileSync(inputPath, "utf8"), { sourceType: "module" });

const keptStrings = [];
const keptNumbers = [];
const dropped = [];
let seenStrings = 0;

// Jedno przejscie, bez modyfikowania drzewa - zbieramy tylko wartosci.
traverse(ast, {
  StringLiteral(path) {
    if (onlyPrefix !== undefined && !groupOf(path).startsWith(onlyPrefix)) return;
    seenStrings += 1;

    const outside = [...new Set([...path.node.value].filter((c) => !alphabet.has(c)))];
    if (outside.length > 0) {
      dropped.push({
        line: path.node.loc.start.line,
        value: path.node.value,
        chars: outside.map((c) => "U+" + c.codePointAt(0).toString(16).toUpperCase()),
      });
      return;
    }
    keptStrings.push(path.node.value);
  },
  NumericLiteral(path) {
    if (onlyPrefix !== undefined && !groupOf(path).startsWith(onlyPrefix)) return;
    keptNumbers.push(path.node.value);
  },
});

const unique = [...new Set(keptStrings)];
const uniqueNumbers = [...new Set(keptNumbers)];

const header = [
  "/*",
  " * WYGENEROWANE - nie edytowac. Zrodlo: " + inputPath,
  onlyPrefix === undefined ? " * Pula pelna." : " * Pula zawezona do grupy: " + onlyPrefix + "*",
  " *",
  " * Powstaje przez scripts/filter-seeds.mjs. SynTest skanuje ten plik",
  " * i zbiera z niego literaly do context constant poola; struktura pliku",
  " * i nazwy zmiennych nie maja dla niego znaczenia.",
  " */",
  "",
].join("\n");

const body =
  "const SEED_STRINGS = [\n" +
  unique.map((v) => "  " + JSON.stringify(v) + ",").join("\n") +
  "\n];\n\nconst SEED_NUMBERS = [\n" +
  uniqueNumbers.map((v) => "  " + v + ",").join("\n") +
  "\n];\n";

writeFileSync(outputPath, header + body);

if (onlyPrefix !== undefined) {
  console.log(`    pula zawezona do grupy: ${onlyPrefix}*`);
}
console.log(`    literalow tekstowych rozpatrzonych: ${seenStrings}`);
console.log(`    odrzuconych (znaki spoza alfabetu): ${dropped.length}`);
for (const entry of dropped) {
  console.log(
    `      linia ${entry.line}: ${JSON.stringify(entry.value).slice(0, 40)} <- ${entry.chars.join(", ")}`,
  );
}
console.log(`    w puli: ${unique.length} tekstowych, ${uniqueNumbers.length} liczbowych`);
