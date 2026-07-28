/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // `npm run build:lib` (tsc, see tsconfig.build.json) owns `dist/` — that's
    // the publishable package output. The demo app build gets its own
    // directory so the two never clobber each other via emptyOutDir.
    outDir: 'dist-app',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    css: false,
    // Running 40+ jsdom environments across parallel workers exhausts
    // Windows thread/handle limits and fails every file with an unrelated
    // "failed to find the current suite" error — serial execution is
    // reliable and the suite is small enough that it's still fast.
    fileParallelism: false,
    // junit: consumed by Azure Pipelines' PublishTestResults@2 task so
    // individual pass/fail results show up in the build's "Tests" tab
    // (separate from the "Code Coverage" tab, which reads the cobertura
    // report below).
    reporters: ['default', 'junit'],
    outputFile: { junit: './test-results/junit.xml' },
    coverage: {
      provider: 'v8',
      reportsDirectory: 'coverage',
      // text: terminal summary. html: browsable local report
      // (coverage/index.html). cobertura: the format Azure Pipelines'
      // PublishCodeCoverageResults@2 task natively understands — without
      // it, coverage never surfaces in the Azure DevOps build UI.
      reporter: ['text', 'html', 'cobertura'],
      // Vitest reports 0% for every file matched by `include` that no test
      // ever imports (not just files that happen to get exercised) by
      // default — there's no toggle for that anymore, older configs used
      // an `all: true` option that was removed once this became the only
      // behavior.
      include: ['src/components/**/*.{ts,tsx}', 'src/lib/**/*.ts'],
      exclude: [
        '**/*.stories.tsx',
        '**/*.test.tsx',
        '**/*.snapshot.test.tsx',
        '**/__snapshots__/**',
      ],
    },
  },
})
