import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      include: ["src/**/*.ts"],
      reporter: ["text", "json-summary", "html"],
      reportsDirectory: ".coverage",
      // Kluczowe dla tego repozytorium: suite, ktory poprawnie wykrywa defekt,
      // NIE przechodzi. Domyslnie vitest pomija wtedy raport pokrycia, co
      // zerowaloby metryki wlasnie tym branchom, ktore dzialaja prawidlowo.
      reportOnFailure: true,
    },
  },
});
