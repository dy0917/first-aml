<template>
  <div class="container" v-if="company">
    <Entity :company="company" :ref="company.id" />
    <div>
      <button class="btn btn-primary" v-on:click="save">Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Entity from "../components/Entity";
import _ from "lodash";
import uuid from "uuid/v1";
export default {
  name: "NewCompany",
  components: {
    Entity
  },
  data() {
    return {
      company: undefined
    };
  },
  async beforeMount() {
    this.loadLocalStore();
    const companies = this.getCompanies();
    if (Object.keys(companies).length === 0) {
      this.company = await this.$store.dispatch("companies/saveCompany", {
        company: {
          id: uuid(),
          childCompanies: [],
          isParentCompany: true
        }
      });
    } else {
      this.company = _.filter(this.getCompanies(), co => {
        return co.isParentCompany == true;
      })[0];
    }
  },
  computed: {
    ...mapGetters("companies", ["getCompanyById"]),
    ...mapGetters("individuals", ["getIndividualsByCompanyId"]),
    getCompany() {
      return this.getCompanyById(this.company.id);
    },
    ...mapGetters("companies", ["getCompanies"])
  },

  methods: {
    loadLocalStore() {
      this.$store.dispatch("companies/init");
      this.$store.dispatch("individuals/init");
    },
    save() {
      this.$refs[this.company.id].validate();
    }
  }
};
</script>
