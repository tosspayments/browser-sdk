import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['.pnp.*'],
      reporter: ['html', 'json', 'json-summary', 'text'],
      reportOnFailure: true,
    },
    passWithNoTests: true,
    watch: false,
  },
});
