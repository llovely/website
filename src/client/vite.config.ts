import { defineConfig, UserConfigExport, loadEnv } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const envDir = '../env'
  const env = loadEnv(mode, envDir, ['WS_PORT', 'WS_CLIENT_PORT', 'VITE_NAME'])

  const generalConfig: UserConfigExport = {
    plugins: [
      /*
       * This plugin is being used SOLELY to generate the 'manifest.json' file
       * with dynamic Manifest key values (from environment variables).
       *
       * The generated service worker is unnecessary, but I don't have much of
       * a choice but to use it.
       */
      VitePWA({
        manifestFilename: 'manifest.json',
        includeAssets: [
          'favicon.ico',
          'favicon-16x16.png',
          'favicon-32x32.png',
          'apple-touch-icon.png',
          'safari-pinned-tab.svg',
          'browserconfig.xml',
          'mstile-150x150.png',
          'robots.txt'
        ],
        manifest: {
          name: `${env.VITE_NAME} Website`,
          short_name: `${env.VITE_NAME}`,
          description: `${env.VITE_NAME}'s personal website.`,
          lang: 'en',
          scope: '/',
          icons: [
            {
              src: 'android-chrome-192x192.png',
              sizes: '192x192',
              type: 'image/png'
            },
            {
              src: 'android-chrome-512x512.png',
              sizes: '512x512',
              type: 'image/png'
            }
          ],
          start_url: '/',
          display: 'standalone',
          theme_color: '#000000', // should match 'theme-color' in 'index.html'
          background_color: '#000000'
        },
      }),
      react()
    ],
    envDir: envDir
  }

  let commandConfig: UserConfigExport = undefined
  if (command === 'serve') { // command === 'dev'
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

  return { ...generalConfig, ...commandConfig }
})
