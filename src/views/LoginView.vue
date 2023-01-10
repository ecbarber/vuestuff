<script setup lang="ts">
import Login from "../components/controls/loginform.vue";
import { ref } from "vue";
</script>
<template>
  <div class="container m-4">
    <div class="row d-flex justify-content-center">
      <div class="col-6">
        <Login
          Title="Please log in..."
          class="container border border-light"
        ></Login>
      </div>
    </div>
  </div>
</template>

<style></style>
