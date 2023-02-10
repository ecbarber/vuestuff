<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import Nav from "./components/controls/nav.vue";
import router from "./router";

const showNav = ref<boolean>();
watch(router.currentRoute, () => {
  showNav.value =
    router.currentRoute.value.name != "editincident" &&
    router.currentRoute.value.name != "login";
});
</script>

<template>
  <div class="container-fluid" v-show="showNav">
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
