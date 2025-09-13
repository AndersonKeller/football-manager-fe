import { createApp } from "vue";
import "./style.css";
import "vue3-toastify/dist/index.css";
import "./toastify.css";
import App from "./App.vue";
import router from "./routes";
import Vue3Toastify, { toast } from "vue3-toastify";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia);
app.use(Vue3Toastify, {
  autoClose: 3000,
  position: "top-center",
  theme: "dark",
  limit: 1,
  transition: toast.TRANSITIONS.FLIP,
});
app.mount("#app");
