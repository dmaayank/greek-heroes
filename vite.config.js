import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/greek/', // This MUST match your repository name
  plugins: [react()],
})