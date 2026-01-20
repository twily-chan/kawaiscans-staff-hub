import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // Custom domain 'kawaiscans.org' maps to the root, so base must be '/'
    base: '/',
  }
})