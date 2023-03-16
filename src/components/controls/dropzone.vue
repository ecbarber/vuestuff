<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

const emit = defineEmits(["files-dropped"]);

let active = ref(false);
const dragDropArea = ref();

function setActive() {
  active.value = true;
  dragDropArea.value.classList.add("active");
}

function setInactive() {
  active.value = false;
  dragDropArea.value.classList.remove("active");
}

function onDrop(e: any) {
  setInactive(); // add this line too
  emit("files-dropped", [...e.dataTransfer.files]);
}

function preventDefaults(e: any) {
  e.preventDefault();
}

const events = ["dragenter", "dragover", "dragleave", "drop"];

onMounted(() => {
  events.forEach((eventName) => {
    document.body.addEventListener(eventName, preventDefaults);
  });
});

onUnmounted(() => {
  events.forEach((eventName) => {
    document.body.removeEventListener(eventName, preventDefaults);
  });
});
</script>

<template>
  <!-- add `data-active` and the event listeners -->
  <div
    ref="dragDropArea"
    :data-active="active"
    @dragenter.prevent="setActive"
    @dragover.prevent="setActive"
    @dragleave.prevent="setInactive"
    @drop.prevent="onDrop"
    class="border border-danger border-2 rounded"
    style="min-height: 200px"
  >
    <!-- share state with the scoped slot -->
    <slot :dropZoneActive="active"
      ><span class="align-middle">Drop Files Here</span></slot
    >
  </div>
</template>

<style scoped>
div.active {
  background-color: aqua;
  border: solid 2px blue;
}
</style>
