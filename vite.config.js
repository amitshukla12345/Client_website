import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/katha-website-demo/',
  plugins: [react()],
})
