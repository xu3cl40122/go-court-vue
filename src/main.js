import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { createMetaManager } from 'vue-meta'


import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
// PrimeVue
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';
import ToastService from 'primevue/toastservice';



// global sass 
import '@/sass/init.sass'
import '@/sass/public.sass'
import '@/sass/button.sass'
import '@/sass/primevue.sass'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(createMetaManager())
  .use(VueLoading)

  // PrimeVue
  .use(PrimeVue)
  .use(ToastService)
  .component('InputText', InputText)

  app.mount('#app')


