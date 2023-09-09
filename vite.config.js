import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NOD_ENV === 'production' ? 'react-gh-pages-sample' : '/',
  plugins: [react()],
})
