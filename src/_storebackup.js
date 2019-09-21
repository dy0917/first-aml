import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: {
    }
  },

  getters: {
    getCompanies(state) {
      return () => {
        return state.companies;
      };
    },
    getCompanyById(state) {
      return function(id) {
        return _.filter(state.companies, c => {
          return c.id == id;
        })[0];
      };
    }
  },

  mutations: {
    saveCompanies(state, { companies }) {
      companies.forEach(i => {
        Vue.set(state.companies, i.id, i);
      });
    },

    saveCompanies(state, { companies }) {
      companies.forEach(i => {
        Vue.set(state.companies, i.id, i);
      });
    },

    addIndividual(state, { companyId, individual }) {
      // mutate state
      const company = state.companies[companyId];

      company.individuals.push(individual);
    },
    removeIndividual(state, { companyId, individual }) {
      // mutate state
      const company = state.companies[companyId];
      company.individuals.splice(company.individuals.indexOf(individual), 1);
    },

    editIndividual(state, { companyId, individual }) {
      // mutate state
      const company = state.companies[companyId];
      const selectedIndividual = _.filter(company.individuals, i => {
        return i.id == individual.id;
      })[0];
      selectedIndividual.isEdit = true;
    },

    saveAll(state, { companyId }) {
      // mutate state
      const company = state.companies[companyId];
      company.individuals.forEach(i => {
        i.isEdit = false;
        i.isNew = false;
      });
    }
  },
  actions: {
    addIndividual({ commit }, { companyId, individual }) {
      commit("addIndividual", { companyId, individual });
    },
    removeIndividual({ commit }, { companyId, individual }) {
      commit("removeIndividual", { companyId, individual });
    },
    editIndividual({ commit }, { companyId, individual }) {
      commit("editIndividual", { companyId, individual });
    },

    saveAll({ commit }, { companyId }) {
      commit("saveAll", { companyId });
    },
    addCompany({ commit }, { company }) {
      commit("saveCompanies", { companies: [company] });
      return company;
    }
  }
});
