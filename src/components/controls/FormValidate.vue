<script setup lang="ts">
import { ref } from "vue";
const formToValidate = ref();
function validatepage() {
  var result = formToValidate.value.checkValidity();
  formToValidate.value.classList.add("was-validated");
  return result;
}
defineExpose({
  validatepage,
});
</script>
<template>
  <form ref="formToValidate" class="needs-validation" novalidate>
    <slot name="body"></slot>
  </form>
</template>
