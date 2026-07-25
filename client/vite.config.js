import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// The production site is served from a subfolder: https://tuinenko.be/react/
// `base` makes all built asset URLs resolve under /react/.
// In dev it stays "/" so `npm run dev` works normally.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/react/' : '/',
  plugins: [react()],
}))
