<template>
 <div class="container">
    <button @click="createCompany" class="btn">Create Company</button>
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
