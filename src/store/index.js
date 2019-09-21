import Vue from "vue";
import Vuex from "vuex";
import companies from "./companies";
import individuals from "./individuals";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    companies: companies,
    individuals: individuals
  }
});
