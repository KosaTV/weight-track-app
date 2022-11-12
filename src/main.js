import {createApp} from "vue";
import "./assets/scss/main.scss";
import App from "./App.vue";
import Popup from "./components/Popup.vue";

const app = createApp(App);
app.component("Popup", Popup);
app.mount("#app");
