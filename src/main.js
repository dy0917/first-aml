import Vue from 'vue'
import {routes} from './routes'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
Vue.use(BootstrapVue);
Vue.use(VueRouter);

const router = new VueRouter({
  routes // short for `routes: routes`
})


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
