import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// VITE_BASE=/aguertil/ pour GitHub Pages ; « / » par défaut (Netlify, local)
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
