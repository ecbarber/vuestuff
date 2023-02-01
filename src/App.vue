<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Nav from "./components/controls/nav.vue";
</script>

<template>
  <div class="container-fluid">
    <Nav></Nav>
  </div>
  <div class="container-fluid">
    <RouterView />
  </div>
</template>

<style scoped>
body {
  background-color: #000;
}
</style>
