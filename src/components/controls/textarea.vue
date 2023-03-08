<script setup lang="ts">
const props = defineProps({
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
  <textarea>
    :id="id"
    :class="props.class"
    :value="props.modelValue"
    @input="updateValue"
    :placeholder="placeHolder"
    :required="required"
    :minlength="minLength"
    :maxlength="maxLength"
  >
  </textarea>
</template>

<style scoped></style>
