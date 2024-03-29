<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { tStatus } from "../models/tStatus";
import FormValidate from "../components/controls/FormValidate.vue";
import {
  getStatusList,
  getStatus,
  createStatus,
  updateStatus,
} from "../services/statusService";

const itemList = ref<Array<tStatus>>();

const filteredItems = computed(() => {
  const qry: string = filterString.value.toString();
  return filterItems(itemList.value, qry);
});

let enableCancel = ref<boolean>(false);
let loading = ref<boolean>(false);
let isNewItem = ref<boolean>(false);
let filterString = ref<String>("");

const newItem: tStatus = {
  _id: "",
  name: "",
  is_deleted: false,
  display_order: 0,
};

let item = ref<tStatus>(newItem);
const editpage = ref();

onMounted(() => {
  getAllItems();
});

function getAnItem(id: String | undefined) {
  loading.value = true;
  getStatus(id).then((result) => {
    item.value = result.DATA;
    enableCancel.value = true;
  });
  loading.value = false;
}

function getAllItems() {
  loading.value = true;
  getStatusList().then((result) => {
    itemList.value = result.DATA;
  });
  loading.value = false;
}

function cancelEdit() {
  item.value._id = "";
  item.value.name = "";
  item.value.is_deleted = false;
  enableCancel.value = false;
  isNewItem.value = false;
}

function newUnit() {
  let sev = ref<tStatus>(newItem);
  isNewItem.value = true;
  enableCancel.value = true;
}

function handleSubmit(event: Event) {
  if (editpage.value.validatepage()) {
    if (item.value._id == "") {
      createStatus(item.value).then((response) => {
        cancelEdit();
        getAllItems();
      });
    } else {
      var data = updateStatus(item.value._id, item.value).then((response) => {
        cancelEdit();
        getAllItems();
      });
    }
  }
}

function filterItems(arr: tStatus[] | undefined, query: string) {
  return arr?.filter((el) =>
    el.name.toLowerCase().includes(query.toLowerCase())
  );
}

function clearFilter() {
  filterString.value = "";
}
</script>
<template v-cloak>
  <div class="container-fluid m-4 p-4">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="alert alert-info text-center" v-if="loading">
          Loading...
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-8 col-sm-9 border">
        <div class="row align-items-center">
          <div class="col-4 mt-2">
            <label class="control-label float-end">Filter Items:</label>
          </div>
          <div class="col-5 mt-2">
            <input class="form-control" type="text" v-model="filterString" />
          </div>
          <div class="col-3 mt-2">
            <button
              class="btn btn-outline-dark btn-sm"
              v-on:click="clearFilter"
            >
              Clear Filter
            </button>
          </div>
        </div>
        <div class="row mt-3">
          <div
            class="col-md-3 col-sm-12 d-grid gap-2"
            v-for="itm in filteredItems"
          >
            <button
              class="btn btn-outline-success btn-lg mt-1"
              @click="getAnItem(itm._id)"
            >
              {{ itm.name }}
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-3 col-sm-12 border p-4">
        <FormValidate ref="editpage">
          <template #body>
            <div class="row align-items-center">
              <div class="col">
                <h4>Edit Status List</h4>
              </div>
              <div class="col">
                <button
                  class="btn btn-success"
                  :disabled="enableCancel"
                  @click.prevent="newUnit"
                >
                  New Status Item
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="form-label">Status Id</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location Id"
                  aria-label="Location Id"
                  v-model="item._id"
                  required
                  disabled
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="form-label">Status Description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location Name"
                  aria-label="Location Name"
                  v-model="item.name"
                  required
                  :disabled="!isNewItem && !enableCancel"
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="form-label">Display Order</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Display Order"
                  aria-label="Display Order"
                  v-model="item.display_order"
                  required
                  :disabled="!isNewItem && !enableCancel"
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="form-check mt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    v-model="item.is_deleted"
                    :disabled="!newItem && !enableCancel"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    Deleted?
                  </label>
                </div>
              </div>
            </div>
            <div class="row justify-content-center mt-4">
              <div class="col-8">
                <button
                  class="btn btn-outline-dark m-1 btn-width"
                  :disabled="!enableCancel"
                  @click.prevent="cancelEdit"
                >
                  Cancel
                </button>
                <button
                  class="btn btn-outline-primary m-1 btn-width"
                  :disabled="!enableCancel"
                  @click.prevent="handleSubmit"
                >
                  Save
                </button>
              </div>
            </div>
          </template>
        </FormValidate>
      </div>
    </div>
  </div>
</template>
<style scoped>
.btn-width {
  width: 120px;
}
</style>
