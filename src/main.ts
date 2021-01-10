import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueI18n from "vue-i18n";
import en from "./lang/locals/en.json";
import arb from "./lang/locals/arabic.json";

Vue.config.productionTip = false;
Vue.use(VueI18n);

const messages = {
  en: en,
  arb: arb
};
// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: "en", // set locale
  messages // set locale messages
});

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount("#app");
