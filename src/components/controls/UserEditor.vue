<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import NativeModal from "../controls/nativemodal.vue";
import FormValidate from "./FormValidate.vue";
import type { User } from "../../models/User";
import { MetaStore } from "@/services/metaStore";
import { getUser, createUser, updateUser } from "../../services/userService";

const editModal = ref();
const editForm = ref();

const editUser: User = {
  _id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  created_by: "",
  created_date: "",
  lastupdated_by: "",
  lastupdated_date: "",
  cell_phone_number: "",
  roles: [],
  user_name: "",
  home_location: "",
};

var currentUser = reactive<User>(editUser);
const emit = defineEmits(["refreshList"]);

function newUser() {
  currentUser = editUser;
  editModal.value.showMe(true);
}

defineExpose({ newUser, EditUser });

function EditUser(theUser: User) {
  currentUser = theUser;
  editModal.value.showMe(true);
}

function cancelEdit() {
  editModal.value.showMe(false);
}

function calculateUserName(first: String, last: String) {
  return first.toLowerCase().substring(0, 1) + last.toLowerCase();
}

function handleSubmit() {
  if (editForm.value.validatepage()) {
    currentUser.user_name = calculateUserName(
      currentUser.first_name,
      currentUser.last_name
    );
    if (currentUser._id) {
      updateUser(currentUser._id, currentUser);
    } else {
      createUser(currentUser);
      emit("refreshList");
    }
    editModal.value.showMe(false);
  }
}

function updateRoles(roleName: String, isChecked: boolean) {
  if (isChecked) {
    if (currentUser.roles.indexOf(roleName) === -1) {
      currentUser.roles.push(roleName);
    }
  } else {
    let idx = currentUser.roles.indexOf(roleName);
    if (idx > -1) {
      currentUser.roles = currentUser.roles.filter((itm) => itm != roleName);
    }
  }
}

function getCheckId(itm: any) {
  return `roleCheckBox-${itm._id}`;
}

function isRoleChecked(itm: any) {
  return currentUser.roles.includes(itm.name);
}

onMounted(() => {});

function submitUser() {}
</script>
<template>
  <NativeModal ref="editModal" container-class="modal-container-sm">
    <template #header>
      <div class="row justify-content-center">
        <div class="col-12">
          <strong>Add / Edit System User</strong>
        </div>
      </div>
    </template>
    <template #body>
      <FormValidate ref="editForm">
        <template #body>
          <div class="row">
            <div class="col">
              <div class="form-floating mb-1">
                <input
                  type="text"
                  class="form-control"
                  placeholder="First Name"
                  required
                  v-model="currentUser.first_name"
                />
                <label>First Name</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-floating mb-1">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Last Name"
                  required
                  v-model="currentUser.last_name"
                />
                <label>Last Name</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-floating mb-1">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Email Address"
                  required
                  v-model="currentUser.email"
                />
                <label>Email Address</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-floating mb-1">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Phone Number"
                  v-model="currentUser.phone_number"
                />
                <label>Phone Number</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-floating mb-1">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Cell Number"
                  v-model="currentUser.cell_phone_number"
                />
                <label>Cell Number</label>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="form-floating mb-1">
                <select
                  class="form-control"
                  placeholder="Home Location"
                  v-model="currentUser.home_location"
                >
                  <option v-for="itm in MetaStore.locationList">
                    {{ itm.name }}
                  </option>
                </select>
                <label>Home Location</label>
              </div>
            </div>
          </div>
          <div class="row mt-2 mb-2 border rounded">
            <div class="col-12"><strong>User Roles</strong></div>
            <div class="col-12 pt-1 pb-1">
              <div
                class="form-check form-check-inline form-switch check-width mt-1"
                v-for="itm in MetaStore.roleList"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-bind:id="getCheckId(itm)"
                  @change="(event) => updateRoles(itm.name,(event.target as HTMLInputElement).checked)"
                  :checked="isRoleChecked(itm)"
                />
                <label class="form-check-label" for="flexSwitchCheckDefault">{{
                  itm.name
                }}</label>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div class="col-6 text-center">
              <button
                class="btn btn-outline-primary m-1"
                v-on:click="cancelEdit"
              >
                Cancel
              </button>
              <button
                class="btn btn-outline-primary m-1"
                v-on:click.prevent="handleSubmit"
              >
                Submit
              </button>
            </div>
          </div>
        </template>
      </FormValidate>
    </template>
    <template #footer>
      <div></div>
    </template>
  </NativeModal>
</template>
<style scoped>
.check-width {
  width: 200px;
}
</style>
