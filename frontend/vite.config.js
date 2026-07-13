import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isGhPages = mode === 'ghpages'
  return {
    base: isGhPages ? '/' : command === 'build' ? '/' : '/',
    plugins: [
      tailwindcss(),
      react()
    ],
    build: {
      outDir: isGhPages ? path.resolve(__dirname, 'dist') : '',
      emptyOutDir: true
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:8000',
          changeOrigin: true,
        },
      },
    },
  }
})
