import { defineConfig, UserConfigExport, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const envDir = '../env'
  const env = loadEnv(mode, envDir, 'WS_');

  const generalConfig: UserConfigExport = {
    plugins: [react()],
    envDir: envDir,
  }
  
  let commandConfig: UserConfigExport = undefined
  if (command === 'serve') { // AKA 'dev'
    commandConfig = {
      server: {
        // host: true,
        port: Number(env.WS_CLIENT_PORT),
        strictPort: true,
        proxy: {
          '/contact-form-email': {
            target: `http://localhost:${env.WS_PORT}`,
            changeOrigin: true,
            // secure: true,
            // ws: true,
          }
        },
      }
    }
  } else {  // command === 'build'
    commandConfig = {}
  }

  return {...generalConfig, ...commandConfig}
})
