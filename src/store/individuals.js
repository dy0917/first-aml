import Vue from "vue";
import _ from "lodash";

export default {
  namespaced: true,
  state: {
    individuals: {}
  },

  getters: {
    getIndividualsByCompanyId(state) {
      return companyId => {
        return _.filter(state.individuals, ind => {
          return ind.companyId === companyId;
        });
      };
    }
  },

  mutations: {
    saveIndividuals(state, { individuals }) {
      individuals.forEach(i => {
        if (i.id) {
          Vue.set(state.individuals, i.id, i);
        }
      });
      JSON.stringify(state.individuals);
      localStorage.setItem("individuals", JSON.stringify(state.individuals));
    },

    deleteIndividual(state, { individual }) {
      Vue.delete(state.individuals, individual.id);
    }
  },
  actions: {
    init({ commit }) {
      try {
        const individuals = Object.values(
          JSON.parse(localStorage.getItem("individuals"))
        );
        if (individuals) {
          commit("saveIndividuals", { individuals });
        }
      } catch (e) {
        return false;
      }
    },
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
