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
  },
})
