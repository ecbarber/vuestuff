<script setup lang="ts">
import { ref, onMounted, computed, reactive } from "vue";
import type { User } from "../models/User";
import UserEditor from "../components/controls/UserEditor.vue";
import { getAllUsers } from "../services/userService";

const itemList = ref<Array<User>>();
const editControl = ref();

let loading = reactive<Boolean>(false);

function getUsers() {
  loading = true;
  getAllUsers().then((result) => {
    itemList.value = result.DATA;
    loading = false;
  });
}
function newUser() {
  editControl.value.newUser();
}

function editUser(itm: User) {
  editControl.value.EditUser(itm);
}

onMounted(() => {
  getUsers();
});
</script>
<template>
  <div class="container-fluid m-4 p-4">
    <div class="row justify-content-center">
      <div class="col-6 d-flex align-items-center">
        <strong>Manage System Users</strong>
      </div>
      <div class="col-2 text-center">
        <button class="btn btn-outline-success" v-on:click="newUser">
          Add User
        </button>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        class="col-8 border d-flex align-items-center rounded p-2 m-2 justify-content-center"
      >
        <button
          class="btn btn-outline-primary m-1"
          v-for="itm in itemList"
          v-on:click.prevent="editUser(itm)"
        >
          {{ itm.first_name }}&nbsp;{{ itm.last_name }}
        </button>
      </div>
    </div>
  </div>
  <UserEditor ref="editControl" v-on:refresh-list="getUsers"></UserEditor>
</template>
<style scoped></style>
