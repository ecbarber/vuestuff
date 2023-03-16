<script setup lang="ts">
import { ref, onMounted, computed, reactive } from "vue";
import type { tPersonRole } from "../models/tPersonRole";
import FormValidate from "../components/controls/FormValidate.vue";
import {
  getRoleList,
  getRoleItem,
  createRoleItem,
  updateRoleItem,
} from "../services/personRoleService";

var pageState = reactive({
  enableCancel: false,
  loading: false,
  isNewItem: false,
  filterString: "",
});

var itemList = new Array<tPersonRole>();

function getAllItems() {
  pageState.loading = true;
  getRoleList().then((result) => {
    itemList = result.DATA;
  });
  pageState.loading = false;
}

const filteredItems = computed(() => {
  return filterItems(itemList, pageState.filterString);
});

const newItem: tPersonRole = {
  _id: "",
  name: "",
  is_deleted: false,
  display_order: 0,
};

let item = reactive<tPersonRole>(newItem);

const editpage = ref();

onMounted(() => {
  getAllItems();
});

function getAnItem(id: String | undefined) {
  pageState.loading = true;
  getRoleItem(id).then((result) => {
    item = reactive(result.DATA);
    pageState.enableCancel = true;
  });
  pageState.loading = false;
}

function cancelEdit() {
  item._id = "";
  item.name = "";
  item.is_deleted = false;
  item.display_order = 0;
  pageState.enableCancel = false;
  pageState.isNewItem = false;
}

function newUnit() {
  let sev = ref<tPersonRole>(newItem);
  pageState.isNewItem = true;
  pageState.enableCancel = true;
}

function handleSubmit(event: Event) {
  if (editpage.value.validatepage()) {
    if (item._id == "") {
      createRoleItem(item).then((response) => {
        cancelEdit();
        getAllItems();
      });
    } else {
      var data = updateRoleItem(item._id, item).then((response) => {
        cancelEdit();
        getAllItems();
      });
    }
  }
}

function filterItems(arr: Array<tPersonRole> | undefined, query: string) {
  return arr?.filter((el) =>
    el.name.toLowerCase().includes(query.toLowerCase())
  );
}

function clearFilter() {
  pageState.filterString = "";
}
</script>
<template v-cloak>
  <div class="container-fluid m-4 p-4">
    <div class="row justify-content-center">
      <div class="col-8">
        <div class="alert alert-info text-center" v-if="pageState.loading">
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
            <input
              class="form-control"
              type="text"
              v-model="pageState.filterString"
            />
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
          <div class="col-md-3 col-sm-12 d-grid gap-2" v-for="itm in itemList">
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
                <h4>Edit Person Roles</h4>
              </div>
              <div class="col">
                <button
                  class="btn btn-success"
                  :disabled="pageState.enableCancel"
                  @click.prevent="newUnit"
                >
                  New Person Role
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="form-label">Person Role Id</label>
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
                <label class="form-label">Person Role Description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location Name"
                  aria-label="Location Name"
                  v-model="item.name"
                  required
                  :disabled="!pageState.isNewItem && !pageState.enableCancel"
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
                  :disabled="!pageState.isNewItem && !pageState.enableCancel"
                />
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="form-check mt-2">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexCheckDefault"
                    :value="item.is_deleted"
                    :disabled="!pageState.isNewItem && !pageState.enableCancel"
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
                  :disabled="!pageState.enableCancel"
                  @click.prevent="cancelEdit"
                >
                  Cancel
                </button>
                <button
                  class="btn btn-outline-primary m-1 btn-width"
                  :disabled="!pageState.enableCancel"
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
