import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import '@/sass/init.sass'
import '@/sass/public.sass'
import '@/sass/button.sass'

// PrimeVue
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext';

const app = createApp(App)
  .use(store)
  .use(router)

  // PrimeVue
  .use(PrimeVue)
  .component('InputText', InputText)
  
  .mount('#app')


