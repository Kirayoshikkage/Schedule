/* eslint-disable import/no-extraneous-dependencies */
import { createApp } from "vue";
import { createVfm } from "vue-final-modal";
import App from "./App.vue";
import router from "./router";

const vfm = createVfm();

createApp(App).use(router).use(vfm).mount("#app");
