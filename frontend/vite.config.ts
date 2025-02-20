import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allows access from outside the container
    port: 3000,      // Ensures Vite runs on this port
    strictPort: true,
    watch: {
      usePolling: true, // Fixes file changes not reflecting inside Docker
    },
  }
})
