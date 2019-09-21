<template>
  <div class="container" v-if="company">
    <Entity :companyId="company.id" :ref="company.id" />
    <div>
      <button class="btn btn-primary" v-on:click="save">Save</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Entity from "../components/Entity";
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
    loadLocalStore() {},
    save() {
      if (this.$refs[this.company.id].validate()) {
      }
    }
  }
};
</script>
