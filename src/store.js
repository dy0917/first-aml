import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    companies: [
      {
        id: "1",
        childCompanies: ["2"],
        individuals: [
          {
            id: "1",
            name: "Mary Smith",
            type: "Director",
            share: null
          },
          {
            id: "22",
            name: "Joe Bloggs",
            type: "Shareholder",
            share: 25
          },
          {
            id: "3",
            name: "Joe Bloggs",
            type: "Shareholder",
            share: 25
          },
          {
            id: "4",
            name: "XYZ",
            type: "Trust",
            share: 50
          }
        ]
      },
      {
        id: "2",
        individuals: [
          {
            id: "5",
            name: "Mary Smith",
            type: "Director",
            share: null
          },
          {
            id: "6",
            name: "Joe Bloggs",
            type: "Shareholder",
            share: 25
          },
          {
            id: "7",
            name: "Joe Bloggs",
            type: "Shareholder",
            share: 25
          },
          {
            id: "8",
            name: "XYZ",
            type: "Trust",
            share: 50
          }
        ]
      }
    ]
  },

  getters: {
    getCompanyById(state) {
      return function(id) {
        return _.filter(state.companies, c => {
          return c.id == id;
        })[0];
      };
    }
  },

  mutations: {},
  actions: {
      
  }
});
