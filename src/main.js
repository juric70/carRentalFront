
import "./assets/main.css";
import { createVuetify } from "vuetify";
import router from "../router";
import store from "../store.js";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.withCredentials = true;
const vuetify = new createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(store).mount("#app");

