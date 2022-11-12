import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap'
import './assets/main.css'
import router from './routers/index'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toaster from '@meforma/vue-toaster'
import vClickOutside from 'click-outside-vue3'

const pinia = createPinia()

createApp(App).use(VueAxios, axios).use(pinia).use(router).use(Toaster).use(vClickOutside).mount('#app')
