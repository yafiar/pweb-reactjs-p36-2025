import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // ⬅️ gunakan path absolut dari root project
    },
  },
  server: {
    port: 5173,
  },
})
