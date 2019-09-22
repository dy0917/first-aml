import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { shallowMount } from "@vue/test-utils";
import Entity from "@/components/Entity.vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("Entity.vue", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        individuals: {
          namespaced: true,
          getters: {
            getIndividualsByCompanyId: jest.fn()
          }
        }
      }
    });
  });
  it("renders li for each item in props.items", () => {
    const company = {
      id: "1234",
      childCompanies: [],
      isParentCompany: true
    };
    const wrapper = shallowMount(Entity, {
      store,
      localVue,
      propsData: { company },
      computed: {
        getIndividualsByCompanyId() {
          return jest.fn();
        }
      }
    });

    expect(wrapper.findAll("button")).toHaveLength(2);
  });
});
