import Vue from "vue";
import { routes } from "./routes";
import Vuelidate from "vuelidate";
import VueRouter from "vue-router";
import BootstrapVue from "bootstrap-vue";
import store from "./store";
import App from "./App.vue";
Vue.use(BootstrapVue);
Vue.use(VueRouter);
Vue.use(Vuelidate);

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
