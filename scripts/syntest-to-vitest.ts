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
 * a nie to, co poprawil czlowiek. Diff przed/po jest w RUNBOOK.md.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { basename, resolve } from "node:path";

const repoRoot = resolve(import.meta.dirname, "..");

interface TransformReport {
  input: string;
  output: string;
  module: string;
  bindings: string[];
  tests: number;
  assertions: number;
}

export function transform(inputPath: string, outputPath: string): TransformReport {
  let source = readFileSync(inputPath, "utf8");

  // Nazwa modulu z "test-<modul>.spec.js" -> import z "../src/<modul>".
  const moduleName = basename(inputPath).replace(/^test-/, "").replace(/\.spec\.js$/, "");

  // 1. Dopisujemy API vitest. chai zostaje - vitest wykona je bez zmian,
  //    wiec asercje pozostaja bajt w bajt takie, jak je wygenerowal SBST.
  source = source.replace(
    /^\/\/ Imports\n/m,
    "// Imports\nimport { describe, it, beforeEach, vi } from 'vitest'\n",
  );

  // 2. TypeScript wymaga adnotacji typu na deklaracjach bindingow.
  let bindings: string[] = [];
  source = source.replace(/^\tlet ([A-Za-z0-9_$, ]+);$/m, (_match, names: string) => {
    bindings = names.split(",").map((name) => name.trim());
    return "\tlet " + bindings.map((name) => `${name}: any`).join(", ") + ";";
  });

  // 3. Hack na require.cache -> vi.resetModules() + dynamiczny import ze zrodla TS.
  source = source.replace(
    /\tbeforeEach\(\(\) => \{[\s\S]*?\n\t\}\);\n/m,
    "\tbeforeEach(async () => {\n" +
      "\t\tvi.resetModules();\n" +
      `\t\t({ ${bindings.join(", ")} } = await import("../src/${moduleName}"));\n` +
      "\t});\n",
  );

  // 4. Higiena: SynTest wkleja absolutne sciezki w komentarzach z metadanymi.
  //    Skracamy je do sciezek wzglednych, zeby commity byly niezalezne od maszyny.
  source = source.split(repoRoot + "/").join("");
  source = source.split(repoRoot).join(".");

  writeFileSync(outputPath, source);

  return {
    input: inputPath,
    output: outputPath,
    module: moduleName,
    bindings,
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
console.log(
  `  ${report.module}: ${report.tests} testow, ${report.assertions} asercji ` +
    `-> ${report.output}`,
);
