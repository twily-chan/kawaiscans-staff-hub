import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  // If VITE_GITHUB_REPO is set (e.g. "user/repo"), use "/repo/" as base.
  // Otherwise default to "/"
  const repoName = env.VITE_GITHUB_REPO ? `/${env.VITE_GITHUB_REPO.split('/')[1]}/` : '/';

  return {
    plugins: [react()],
    // This ensures assets like .js and .css load correctly on GitHub Pages (e.g. /my-repo/assets/...)
    base: mode === 'production' ? repoName : '/',
  }
})