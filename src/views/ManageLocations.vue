<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { tLocation } from "../models/tLocation";
import FormValidate from "../components/controls/FormValidate.vue";
import {
  getAllLocations,
  getLocation,
  createLocation,
  updateLocation,
} from "../services/locationService";

const locations = ref<Array<tLocation>>();

//const filteredLocations = ref<Array<tLocation>>();
const filteredLocations = computed(() => {
  const qry: string = filterString.value.toString();
  return filterItems(locations.value, qry);
});

let enableCancel = ref<boolean>(false);
let loading = ref<boolean>(false);
let newItem = ref<boolean>(false);
let filterString = ref<String>("");

const newLocation: tLocation = {
  _id: "",
  name: "",
  is_deleted: false,
};

let location = ref<tLocation>(newLocation);
const editpage = ref();

onMounted(() => {
  getLocations();
});

function getALocation(id: String | undefined) {
  loading.value = true;
  getLocation(id).then((result) => {
    location.value = result.DATA;
    enableCancel.value = true;
  });
  loading.value = false;
}

function getLocations() {
  loading.value = true;
  getAllLocations().then((result) => {
    locations.value = result.DATA;
  });
  loading.value = false;
}

function cancelEdit() {
  location.value._id = "";
  location.value.name = "";
  location.value.is_deleted = false;
  enableCancel.value = false;
  newItem.value = false;
}

function newUnit() {
  let location = ref<tLocation>(newLocation);
  newItem.value = true;
  enableCancel.value = true;
}

function handleSubmit(event: Event) {
  if (editpage.value.validatepage()) {
    if (location.value._id == "") {
      createLocation(location.value).then((response) => {
        cancelEdit();
        getLocations();
      });
    } else {
      var data = updateLocation(location.value._id, location.value).then(
        (response) => {
          cancelEdit();
          getLocations();
        }
      );
    }
  }
}

function filterItems(arr: tLocation[] | undefined, query: string) {
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
            <label class="control-label float-end">Filter Locations:</label>
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
            v-for="itm in filteredLocations"
          >
            <button
              class="btn btn-outline-success btn-lg mt-1"
              @click="getALocation(itm._id)"
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
                <h4>Edit Location</h4>
              </div>
              <div class="col">
                <button
                  class="btn btn-success"
                  :disabled="enableCancel"
                  @click.prevent="newUnit"
                >
                  New Location
                </button>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="form-label">Location Id</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location Id"
                  aria-label="Location Id"
                  v-model="location._id"
                  required
                  disabled
                />
              </div>
            </div>
            <div class="row">
              <div class="col">
                <label class="form-label">Location Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location Name"
                  aria-label="Location Name"
                  v-model="location.name"
                  required
                  :disabled="!newItem && !enableCancel"
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
                    v-model="location.is_deleted"
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
