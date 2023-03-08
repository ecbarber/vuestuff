import { createApp } from "vue";
//@ts-ignore
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/js/dist/dropdown.js";
const app = createApp(App);
app.use(router);
app.mount("#app");
