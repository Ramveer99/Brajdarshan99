import { readFileSync } from 'node:fs'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { apiDevPlugin } from './vite-api-dev.js'

function loadVercelEnv(): Record<string, string> {
  try {
    const vercel = JSON.parse(readFileSync('vercel.json', 'utf-8')) as { env?: Record<string, string> };
    return vercel.env ?? {};
  } catch {
    return {};
  }
}

// https://vite.dev/config/
export default defineConfig(async ({ mode }) => {
  const vercelEnv = loadVercelEnv();
  const plugins = [react(), tailwindcss(), apiDevPlugin(vercelEnv)];
  try {
    // @ts-ignore
    const m = await import('./.vite-source-tags.js');
    plugins.push(m.sourceTags());
  } catch {}

  const env = { ...vercelEnv, ...loadEnv(mode, process.cwd(), ['VITE_', 'NEXT_PUBLIC_', 'SUPABASE_', 'FULLSTACK_']) };
  const processEnvDefines: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    processEnvDefines[`process.env.${key}`] = JSON.stringify(value);
  }

  return {
    plugins,
    envPrefix: ['VITE_', 'NEXT_PUBLIC_'],
    define: processEnvDefines,
  };
})
