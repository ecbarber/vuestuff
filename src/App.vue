<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Nav from "./components/controls/nav.vue";
</script>

<template>
  <div class="container-fluid">
    <Nav></Nav>
  </div>
  <div class="container d-flex align-items-center">
    <RouterView />
  </div>
</template>

<style scoped></style>
