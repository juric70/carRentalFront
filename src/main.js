import "./assets/main.css";
import { createVuetify } from "vuetify";
import router from "../router";
import store from "../store.js";
import axios from "axios";

import { createApp } from "vue";
import App from "./App.vue";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.withCredentials = true;
if (store.state.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.token}`;
}
const vuetify = new createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(store).mount("#app");
