import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({

  server : {
    proxy : {
      '/api' : {
        target: 'https://bloodbanksnearme-backend.vercel.app',
        changeOrigin: true,
      }
    },
  },
  
  plugins: [react(), tailwindcss()  ],
})
