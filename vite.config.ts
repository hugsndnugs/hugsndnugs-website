import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES_BASE || '/hugsndnugs-website/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
