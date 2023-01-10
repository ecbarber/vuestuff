<script setup lang="ts">
import { ref, defineExpose } from "vue";
const props = defineProps({
  inputType: {
    type: String,
    required: true,
    default: "text",
  },
  id: {
    type: String,
    required: false,
  },
  class: {
    type: String,
    default: "form-control",
  },
  modelValue: {
    type: String,
  },
  placeHolder: {
    type: String,
    default: "",
    required: false,
  },
  required: {
    type: Boolean,
    required: false,
  },
  minLength: {
    type: String,
    required: false,
  },
  maxLength: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (e: Event) => {
  emit("update:modelValue", (e.target as HTMLInputElement).value);
};
</script>

<template>
  <label></label>
  <input
    :type="inputType"
    :id="id"
    :class="class"
    :value="modelValue"
    @input="updateValue"
    :placeholder="placeHolder"
    :required="required"
    :minlength="minLength"
    :maxlength="maxLength"
  />
</template>

<style scoped></style>
