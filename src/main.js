<<<<<<< Updated upstream
import './assets/main.css'
=======
import "./assets/main.css";
import { createVuetify } from "vuetify";
import router from "../router";
import store from "../store.js";
import axios from "axios";
>>>>>>> Stashed changes

import { createApp } from 'vue'
import App from './App.vue'
import Vuetify from 'vuetify/lib'

<<<<<<< Updated upstream
const vuetify = new Vuetify({})

createApp(App).use(vuetify).mount('#app')
=======
axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.withCredentials = true;
const vuetify = new createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(store).mount("#app");
>>>>>>> Stashed changes
