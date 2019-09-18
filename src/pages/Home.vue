<template>
 <div class="container">
  <div class="row">
    <button @click="createCompany" class="btn">Create Company</button>
  </div>
</div>
</template>

<script>
export default {
  name: "Index",
  methods:{
    createCompany(){
       this.$router.push('newCompany');
    }

  }
};
</script>
