<template>
  <ul>
     <li v-for=" individual in getCompanyById(companyId).individuals" v-bind:key="individual.id">
        {{individual.name}}   
    </li>
     <Entity v-for="cc in getCompanyById(companyId).childCompanies" v-bind:key="cc" :companyId="cc"/>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Entity",
  props: {
    companyId: String,
    required: true
  },
  computed: {
    ...mapGetters(['getCompanyById']),
  }
};
</script>
