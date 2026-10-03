import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@/": new URL("./", import.meta.url).pathname,
    },
  },
  test: {
    coverage: {
      provider: "v8",
      include: ["app/**/*.{ts,tsx}", "lib/**/*.{ts,tsx}"],
      exclude: ["app/**/data/**"],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80,
      },
    },
  },
});
