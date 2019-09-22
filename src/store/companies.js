import Vue from "vue";
import _ from "lodash";

export default {
  namespaced: true,
  state: {
    companies: {}
  },

  getters: {
    getCompanies(state) {
      return () => {
        return state.companies;
      };
    },
    getCompanyById(state) {
      return function(id) {
        return state.companies[id];
      };
    }
  },

  mutations: {
    saveCompanies(state, { companies }) {
      if (companies) {
        companies.forEach(i => {
          if (i.id) {
            Vue.set(state.companies, i.id, i);
          }
        });
        //not good practise
        localStorage.setItem("companies", JSON.stringify(state.companies));
      }
    },

    deleteIndividual(state, { company }) {
      Vue.delete(state.companies, company.id);
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
    init({ commit }) {
      try {
        const companies = Object.values(
          JSON.parse(localStorage.getItem("companies"))
        );
        if (companies) {
          commit("saveCompanies", { companies });
        }
      } catch (e) {
        return false;
      }
    },
    saveAll({ commit }, { companyId }) {
      commit("saveAll", { companyId });
    },
    saveCompany({ commit }, { company }) {
      commit("saveCompanies", { companies: [company] });
      return company;
    },
    removeCompany({ commit }, { company }) {
      commit("deleteIndividual", { company });
    }
  }
};
