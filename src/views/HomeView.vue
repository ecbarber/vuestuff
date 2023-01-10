<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
</script>

<template>
  <div class="container m-3">
    <div class="row mb-2">
      <div class="col text-center pb-3">Welcome to VueStuff...</div>
    </div>
    <div class="row">
      <div class="col-md-4"></div>
      <div
        class="col-md-4 d-flex justify-content-center border border-light p-3"
      >
        <ul>
          <li>Vue 3</li>
          <li>TypeScript</li>
          <li>Bootstrap 5</li>
        </ul>
      </div>
      <div class="col-md-4"></div>
    </div>
  </div>
</template>
