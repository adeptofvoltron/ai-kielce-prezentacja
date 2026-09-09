/**
 * Mechaniczna transformacja wyniku SynTesta na testy uruchamialne w vitest.
 *
 * SynTest generuje pliki mocha + chai, ktore:
 *   - mieszaja `import` (ESM) z `require.cache` (CJS), wiec nie uruchomia sie
 *     ani jako CJS, ani jako ESM,
 *   - celuja w skompilowany `dist/*.js`, a nie w zrodlo `src/*.ts`.
 *
 * Ten skrypt naprawia wylacznie te dwie rzeczy. NIE dotyka:
 *   - danych wejsciowych wygenerowanych przez algorytm,
 *   - asercji,
 *   - liczby ani kolejnosci testow.
 *
 * Dzieki temu branch SBST zawiera dokladnie to, co znalazlo przeszukiwanie,
 * a nie to, co poprawil czlowiek. Surowe wyjscie jest commitowane
 * w artifacts/syntest-raw/, wiec transformacja jest audytowalna:
 *
 *   diff artifacts/syntest-raw/test-cart.spec.js tests/cart.sbst.test.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");

interface TransformReport {
  output: string;
  imports: { bindings: string[]; module: string }[];
  tests: number;
  assertions: number;
}

/** Znajduje w bloku beforeEach mapowanie: ktore bindingi z ktorego modulu. */
function parseRequires(beforeEachBlock: string): { bindings: string[]; module: string }[] {
  const pattern = /\(\{([^}]*)\}\s*=\s*require\("[^"]*\/dist\/([^"]+)\.js"\)\)/g;
  const imports: { bindings: string[]; module: string }[] = [];

  for (const match of beforeEachBlock.matchAll(pattern)) {
    imports.push({
      bindings: (match[1] ?? "").split(",").map((name) => name.trim()).filter(Boolean),
      module: match[2] ?? "",
    });
  }
  return imports;
}

export function transform(inputPath: string, outputPath: string): TransformReport {
  let source = readFileSync(inputPath, "utf8");

  // 1. Dopisujemy API vitest. chai zostaje - vitest wykona je bez zmian,
  //    wiec asercje pozostaja bajt w bajt takie, jak je wygenerowal SBST.
  source = source.replace(
    /^\/\/ Imports\n/m,
    "// Imports\nimport { describe, it, beforeEach, vi } from 'vitest'\n",
  );

  // 2. Hack na require.cache -> vi.resetModules() + dynamiczne importy ze src/.
  //    SynTest wciaga tu tez bindingi z innych modulow (statement pool),
  //    wiec mapowanie binding -> modul czytamy z samego bloku, a nie z nazwy pliku.
  let imports: { bindings: string[]; module: string }[] = [];
  source = source.replace(/\tbeforeEach\(\(\) => \{[\s\S]*?\n\t\}\);\n/m, (block) => {
    imports = parseRequires(block);
    const lines = imports.map(
      (entry) => `\t\t({ ${entry.bindings.join(", ")} } = await import("../src/${entry.module}"));`,
    );
    return ["\tbeforeEach(async () => {", "\t\tvi.resetModules();", ...lines, "\t});", ""].join("\n");
  });

  // 3. TypeScript wymaga adnotacji typu na deklaracjach bindingow.
  //    SynTest emituje jedna linie `let X;` na binding.
  source = source.replace(/^\tlet ([A-Za-z0-9_$]+);$/gm, "\tlet $1: any;");

  // 4. Higiena: SynTest wkleja absolutne sciezki w komentarzach z metadanymi.
  //    Skracamy je do wzglednych, zeby commity byly niezalezne od maszyny.
  source = source.split(repoRoot + "/").join("");
  source = source.split(repoRoot).join(".");

  writeFileSync(outputPath, source);

  return {
    output: outputPath,
    imports,
    tests: (source.match(/^\tit\(/gm) ?? []).length,
    assertions: (source.match(/expect\(/g) ?? []).length,
  };
}

const [inputPath, outputPath] = process.argv.slice(2);
if (inputPath === undefined || outputPath === undefined) {
  console.error("uzycie: tsx scripts/syntest-to-vitest.ts <wejscie.spec.js> <wyjscie.test.ts>");
  process.exit(1);
}

const report = transform(inputPath, outputPath);
const modules = report.imports.map((entry) => entry.module).join(", ");
console.log(
  `  ${report.output}: ${report.tests} testow, ${report.assertions} asercji ` +
    `(importy: ${modules || "brak"})`,
);
