import { createApp } from "vue";
import "./assets/style.css";
import App from "./App.vue";
import router from "./router/router";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import axios from "axios"; // បន្ថែមបន្ទាត់នេះ

// បញ្ជូនសោសម្ងាត់ (Token) ដោយស្វ័យប្រវត្តិទៅ Backend ពេលហៅ API
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const app = createApp(App);
app.use(router);
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true
});
app.mount("#app");