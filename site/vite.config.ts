import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { sitemapPlugin } from './sitemap.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), sitemapPlugin()],
})
