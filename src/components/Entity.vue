<template>
  <form style="width: 100%;">
    <button class="btn btn-primary" v-on:click="addIndividual">Add individual</button>
    <button class="btn btn-primary" v-on:click="addChildCompany">Add company</button>
    <button
      class="btn btn-danger"
      v-on:click="removeCompany"
      v-if="!getCompany.isParentCompany"
    >Remove company</button>

    <ul>
      <li v-for="individual in getIndividualsByCompanyId(companyId)" v-bind:key="individual.id">
        <Individual :individual="individual" :ref="individual.id" />
      </li>
      <Entity v-for="cc in getCompany.childCompanies" v-bind:key="cc" :companyId="cc" :ref="cc" />
    </ul>
  </form>
</template>

<script>
import { mapGetters } from "vuex";
import uuid from "uuid/v1";
import Individual from "./Individual";
import _ from "lodash";
export default {
  name: "Entity",
  components: {
    Individual
  },
  props: {
    companyId: String,
    required: true
  },
  computed: {
    ...mapGetters("companies", ["getCompanyById"]),
    ...mapGetters("individuals", ["getIndividualsByCompanyId"]),
    getCompany() {
      return this.getCompanyById(this.$props.companyId);
    },
    companyIndividuals() {
      return this.getIndividualsByCompanyId(this.$props.companyId);
    },
    getUid() {
      return uuid();
    }
  },
  methods: {
    addIndividual() {
      this.$store.dispatch("individuals/addIndividual", {
        individual: {
          isEdit: true,
          id: uuid(),
          isNew: true,
          companyId: this.$props.companyId
        }
      });
    },

    async removeCompany() {
      const parentCompany = this.getCompanyById(
        this.getCompany.parentCompanyId
      );
      parentCompany.childCompanies = _.filter(
        parentCompany.childCompanies,
        cc => {
          return cc !== this.getCompany.id;
        }
      );
      await this.$store.dispatch("companies/saveCompany", {
        company: parentCompany
      });

      this.$store.dispatch("companies/removeCompany", {
        company: this.getCompany
      });
    },

    async addChildCompany() {
      const childCompany = await this.$store.dispatch("companies/saveCompany", {
        company: {
          id: uuid(),
          childCompanies: [],
          parentCompanyId: this.getCompany.id
        }
      });
      await this.$store.dispatch("companies/saveCompany", {
        company: this.getCompany.childCompanies.push(childCompany.id)
      });
    },
    validate() {
      this.companyIndividuals.forEach(i => {
        this.$refs[i.id][0].validate();
      });
      const inValidIndividuals = this.companyIndividuals.filter(i => {
        return !this.$refs[i.id][0].validate();
      });
      if (inValidIndividuals.length === 0) {
        this.$store.dispatch("individuals/saveAll", {
          companyId: this.$props.companyId
        });
      }
      this.getCompany.childCompanies.forEach(cc => {
        this.$refs[cc][0].validate();
      });
    }
  }
};
</script>
