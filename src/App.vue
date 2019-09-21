<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap-vue/dist/bootstrap-vue.css";

export default {
  name: "app"
};
</script>

