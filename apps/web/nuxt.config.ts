// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
    'motion-v/nuxt',
    "nuxt-charts"
  ],
  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'vi', name: 'Vietnamese', file: 'vi.json' }
    ]
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  alias: {
    '@app': fileURLToPath(new URL('./app', import.meta.url)),
    '@public': fileURLToPath(new URL('./public', import.meta.url)),
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  css: ['@app/assets/css/main.css'],
})
// {
//   "name": "@app/web",
//   "type": "module",
//   "private": true,
//   "scripts": {
//     "build": "nuxt build",
//     "dev": "nuxt dev",
//     "generate": "nuxt generate",
//     "preview": "nuxt preview",
//     "postinstall": "nuxt prepare",
//     "lint": "eslint .",
//     "test": "vitest run",
//     "test:watch": "vitest"
//   },
//   "dependencies": {
//     "@nuxt/ui": "^4.4.0",
//     "@nuxtjs/color-mode": "^3.5.2",
//     "@pinia/nuxt": "^0.11.3",
//     "@tailwindcss/vite": "^4.1.18",
//     "@vee-validate/i18n": "^4.15.1",
//     "@vee-validate/zod": "^4.15.1",
//     "idb": "^8.0.2",
//     "nuxt": "^4.3.0",
//     "pinia": "^3.0.4",
//     "socket.io-client": "^4.8.1",
//     "tailwindcss": "^4.1.18",
//     "vee-validate": "^4.15.1",
//     "vue": "^3.5.27",
//     "vue-router": "^4.6.4",
//     "zod": "^3.25.76"
//   },
//   "devDependencies": {
//     "@vueuse/core": "^14.1.0",
//     "@vueuse/nuxt": "^14.1.0",
//     "jsdom": "^25.0.1",
//     "typescript": "^5.8.2",
//     "vitest": "^2.1.3"
//   }
// }