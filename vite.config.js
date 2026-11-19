import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: 'esbuild', // Force Vercel à utiliser esbuild pour compresser le CSS (évite l'erreur lightningcss)
  },
})