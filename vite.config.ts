import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// Explicitly declare process structure to avoid TS errors
declare const process: { env: any; cwd: () => string };

export default defineConfig(({ mode }) => {
  // Use a safe fallback for cwd if process.cwd is missing in some environments
  const cwd = typeof process !== 'undefined' && process.cwd ? process.cwd() : '.';
  const env = loadEnv(mode, cwd, '');
  
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  };
});