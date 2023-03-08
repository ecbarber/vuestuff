<script setup>
import { v4 as uuidv4 } from "uuid";
import { onMounted } from "vue";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  openBtnText: {
    type: String,
    required: true,
  },
  submitBtnText: {
    type: String,
    required: true,
  },
});
defineEmits(["submit"]);
const id = `a${uuidv4().replace(/-/g, "")}Modal`;
const targetId = `#${id}`;
var modal = null;
onMounted(() => {
  modal = new bootstrap.Modal(document.getElementById(id), {});
});
function hide() {
  modal.hide();
}
defineExpose({
  hide,
});
</script>
<template>
  <button
    type="button"
    class="btn btn-outline-primary my-1"
    data-bs-toggle="modal"
    :data-bs-target="targetId"
  >
    {{ openBtnText }}
  </button>

  <Teleport to="body">
    <div class="modal fade" :id="id" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">{{ header }}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              class="btn btn-outline-primary"
              @click="$emit('submit')"
            >
              {{ submitBtnText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
