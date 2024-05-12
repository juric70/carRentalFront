import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'

const vuetify = new Vuetify({})

createApp(App).use(vuetify).mount('#app')
