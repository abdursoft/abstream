import './assets/app.css'
import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'
import { createHead } from '@vueuse/head'

import App from './App.vue'
import router from './router'
import { definePreset } from '@primevue/themes'

import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import { createCustomI18n } from './I18'
import { siteData } from './server/api/apiRoutes'

const head = createHead()

const globalOptions = {
  mode: 'auto',
}

async function getDefaultLocaleFromBackend() {
  const response = await fetch(siteData)
  const data = await response.json()
  return data.site_data;
}

async function bootstrap() {
  const locale = await getDefaultLocaleFromBackend()
  document.documentElement.setAttribute(
    'dir',
    ['AR', 'UR', 'HE'].includes(( locale.default_language || 'EN').toUpperCase()) ? 'rtl' : 'ltr',
  )

  const i18n = createCustomI18n(locale)

  const MyPreset = definePreset(Aura, {
    semantic: {
      colorScheme: {
        light: {
          surface: {
            0: '#fafafa',
            50: '{zinc.50}',
            100: '{zinc.100}',
            200: '{zinc.200}',
            300: '{zinc.300}',
            400: '{zinc.400}',
            500: '{zinc.500}',
            600: '{zinc.600}',
            700: '{zinc.700}',
            800: '{zinc.800}',
            900: '{zinc.900}',
            950: '{zinc.950}',
          },
        },
        dark: {
          surface: {
            0: '#fefefe',
            50: '{slate.50}',
            100: '{slate.100}',
            200: '{slate.200}',
            300: '{slate.300}',
            400: '{slate.400}',
            500: '{slate.500}',
            600: '{slate.600}',
            700: '{slate.700}',
            800: '{slate.800}',
            900: '{slate.900}',
            950: '{slate.950}',
          },
        },
      },
      primary: {
        50: `{${locale?.site_color ?? 'teal'}.50}`,
        100: `{${locale?.site_color ?? 'teal'}.100}`,
        200: `{${locale?.site_color ?? 'teal'}.200}`,
        300: `{${locale?.site_color ?? 'teal'}.300}`,
        400: `{${locale?.site_color ?? 'teal'}.400}`,
        500: `{${locale?.site_color ?? 'teal'}.500}`,
        600: `{${locale?.site_color ?? 'teal'}.600}`,
        700: `{${locale?.site_color ?? 'teal'}.700}`,
        800: `{${locale?.site_color ?? 'teal'}.800}`,
        900: `{${locale?.site_color ?? 'teal'}.900}`,
        950: `{${locale?.site_color ?? 'teal'}.950}`,
      },
    },
  })

  const app = createApp(App)
  app.use(ToastService)
  app.use(createPinia())

  app.use(PrimeVue, {
    theme: {
      preset: MyPreset,
      options: {
        prefix: 'dark',
        darkModeSelector: '.myApp',
        cssLayer: false,
      },
    },
    ripple: true,
  })

  app.use(i18n, globalOptions)
  app.use(VueTelInput, globalOptions)
  app.directive('tooltip', Tooltip)
  app.use(router)
  app.use(head)

  app.mount('#app')
}

bootstrap()
