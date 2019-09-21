import Vue from "vue";
import _ from "lodash";

export default {
  namespaced: true,
  state: {
    individuals: {}
  },

  getters: {
    // getCompanies(state) {
    //   return () => {
    //     return state.companies;
    //   };
    // },
    getIndividualsByCompanyId(state) {
      return (companyId)=> {
        return _.filter(state.individuals, ind => {
          return ind.companyId === companyId;
        });
      };
    }
  },

  mutations: {
    saveIndividuals(state, { individuals }) {
      individuals.forEach(i => {
        Vue.set(state.individuals, i.id, i);
      });
    },

    deleteIndividual(state, { individual }) {
      Vue.delete(state.individuals, individual.id);
    }
  },
  actions: {
    removeIndividual({ commit }, { individual }) {
      commit("deleteIndividual", { individual });
    },
    updateIndividual({ commit }, { individual }) {
      commit("saveIndividuals", { individuals: [individual] });
    },
    addIndividual({ commit }, { individual }) {
      commit("saveIndividuals", { individuals: [individual] });
      return individual;
    },
    saveAll({ commit, getters }, { companyId }) {
      const individuals = getters.getIndividualsByCompanyId(companyId);
      individuals.forEach(i => {
        i.isEdit = false;
        i.isNew = false;
      });
      commit("saveIndividuals", { individuals });
    }
  }
};
