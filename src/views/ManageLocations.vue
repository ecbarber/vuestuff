<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Ref } from "vue";
import axios from "axios";
import type { tLocation } from "../models/tLocation";
import { useRoute } from "vue-router";
import router from "../router/index";
import FormValidate from "../components/controls/FormValidate.vue";
import dayjs from "dayjs";

const locations = ref<Array<tLocation>>();
let enableCancel: Boolean = false;
let newItem: Boolean = false;

const newLocation: tLocation = {
  _id: "",
  name: "",
  is_deleted: false,
};

let location = ref<tLocation>(newLocation);

onMounted(() => {
  console.log("Location List Mounted...");
  getLocations();
});

function getLocation(id: String | undefined) {
  axios({
    method: "get",
    url: `http://localhost:3000/api/location/${id}`,
    responseType: "stream",
  }).then(function (response) {
    let obj = JSON.parse(response.data);
    location.value = obj.DATA;
    enableCancel = true;
  });
}

function getLocations() {
  axios({
    method: "get",
    url: "http://localhost:3000/api/locations",
    responseType: "stream",
  }).then(function (response) {
    let obj = JSON.parse(response.data);
    locations.value = obj.DATA;
  });
}

function cancelEdit() {
  let location = ref<tLocation>(newLocation);
  enableCancel = false;
}

function newUnit() {
  let location = ref<tLocation>(newLocation);
  newItem = true;
  enableCancel = true;
}
</script>
<template v-cloak>
  <div class="container-fluid m-4 p-4">
    <div class="row justify-content-center">
      <div class="col-3 col-sm-6">
        <div class="row align-items-center">
          <div class="col-4 mt-2">
            <label class="control-label float-end">Filter Locations:</label>
          </div>
          <div class="col-5 mt-2">
            <input class="form-control" type="text" />
          </div>
          <div class="col-3 mt-2">
            <button class="btn btn-outline-dark btn-sm">Clear Filter</button>
          </div>
        </div>
        <div class="row" v-for="itm in locations">
          <div class="col d-grid gap-2">
            <button
              class="btn btn-outline-success btn-block mt-1"
              @click="getLocation(itm._id)"
            >
              {{ itm.name }}
            </button>
          </div>
        </div>
      </div>

      <div class="col-3 col-sm-6 border p-4">
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
                  :disabled="!enableCancel || newItem"
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
                    :disabled="!enableCancel"
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
                >
                  Cancel
                </button>
                <button
                  class="btn btn-outline-primary m-1 btn-width"
                  :disabled="!enableCancel"
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
