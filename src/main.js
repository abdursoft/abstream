import './assets/app.css'
import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import Tooltip from 'primevue/tooltip'

import App from './App.vue'
import router from './router'
import { definePreset } from '@primevue/themes'

import VueTelInput from 'vue3-tel-input'
import 'vue3-tel-input/dist/vue3-tel-input.css'
import { i18n } from './I18'

const app = createApp(App)
app.use(ToastService)
app.use(createPinia())

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
      50: '{indigo.50}',
      100: '{indigo.100}',
      200: '{indigo.200}',
      300: '{indigo.300}',
      400: '{indigo.400}',
      500: '{indigo.500}',
      600: '{indigo.600}',
      700: '{indigo.700}',
      800: '{indigo.800}',
      900: '{indigo.900}',
      950: '{indigo.950}',
    },
  },
})

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

const globalOptions = {
  mode: 'auto',
}

app.use(i18n, globalOptions)
app.use(VueTelInput, globalOptions)
app.directive('tooltip', Tooltip)
app.use(router)

app.mount('#app')
