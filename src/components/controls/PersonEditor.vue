<script setup lang="ts">
import { ref, reactive } from "vue";
import NativeModal from "../controls/nativemodal.vue";
import FormValidate from "./FormValidate.vue";
const editModal = ref();
const editForm = ref();
const props = defineProps({
  titleText: {
    type: String,
    default: "People Editor Title",
    required: false,
  },
  subTitleText: {
    type: String,
    default: "Please record all persons associated with this incident.",
    required: false,
  },
  newButtonText: {
    type: String,
    default: "New Person",
    required: true,
  },
  class: {
    type: String,
    default: "container border",
    required: false,
  },
  incidentId: {
    type: String,
    default: "",
    required: true,
  },
  personsList: Object,
});

function showEdit(personId: String | undefined) {
  editModal.value.showMe(true);
}

function handleSubmit(event: Event) {
  if (editForm.value.validatepage()) {
    // response = loginUser(loginModel.value);
    // if (response.success) {
    //   router.push("/");
    // }
  }
}

function cancelEdit() {
  editModal.value.showMe(false);
}
</script>
<template>
  <div class="border rounded-2 mt-2 p-2">
    <div class="row mt-2 ms-2 me-2">
      <div class="col align-items-middle">
        <h4>{{ titleText }}</h4>
      </div>
      <div class="col d-flex align-items-middle justify-content-end">
        <button class="btn btn-outline-danger" @click.prevent="showEdit">
          {{ newButtonText }}
        </button>
      </div>
    </div>
    <div class="row mt-2 ms-2">
      <div class="col align-items-middle">
        <em>{{ subTitleText }}</em>
      </div>
    </div>
    <div class="row p-2">
      <div class="col align-items-middle">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th></th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Class</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="itm in personsList">
              <td class="text-center">
                <a class="text-success" href="#"
                  ><i class="bi bi-pencil-fill"></i
                ></a>
              </td>
              <td>{{ itm.last_name }}</td>
              <td>{{ itm.first_name }}</td>
              <td>{{ itm.email }}</td>
              <td>{{ itm.phone_number }}</td>
              <td>{{ itm.person_class }}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <NativeModal ref="editModal">
    <template #header>Add person to incident.</template>
    <template #body>
      <FormValidate ref="editForm">
        <template #body>
          <div class="form-row mt-1">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="First Name"
                required
              />
            </div>
          </div>
          <div class="form-row mt-1">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Last Name"
                required
              />
            </div>
          </div>
          <div class="form-row mt-1">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Email Address"
              />
            </div>
          </div>
          <div class="form-row mt-1">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Phone Number"
              />
            </div>
          </div>
          <div class="form-row mt-1">
            <div class="col">
              <input
                type="text"
                class="form-control"
                placeholder="Person Class"
                required
              />
            </div>
          </div>
          <div class="form-row mt-1">
            <div class="col">
              <textarea
                class="form-control"
                name=""
                id=""
                cols="30"
                rows="10"
                required
              ></textarea>
            </div>
          </div>
        </template>
      </FormValidate>
    </template>
    <template #footer>
      <button class="btn btn-outline-dark m-1" v-on:click.prevent="cancelEdit">
        Cancel
      </button>
      <button
        class="btn btn-outline-primary m-1"
        v-on:click.prevent="handleSubmit"
      >
        Submit
      </button>
    </template>
  </NativeModal>
</template>
<style scoped></style>
