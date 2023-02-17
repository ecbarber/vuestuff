<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import NativeModal from "../controls/nativemodal.vue";
import FormValidate from "./FormValidate.vue";
import type { tPerson } from "../../models/tPerson";
import { MetaStore } from "@/services/metaStore";
const editModal = ref();
const editForm = ref();
const confirmDeleteModal = ref();
const metaStore = new MetaStore();

const newPerson: tPerson = {
  _id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  person_class: "",
  created_by: "",
  created_date: "",
  lastupdated_by: "",
  lastupdated_date: "",
  person_story: "",
  secondary_person_classes: [],
};

var currentPerson = reactive<tPerson>(newPerson);
const personStory = ref("this is the story");

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
  },
  personsList: Array<tPerson>,
});

const emit = defineEmits(["createPerson", "deletePerson", "updatePerson"]);

const filteredPersonsList = computed(() => {
  return props.personsList?.filter(function (el) {
    return el.is_deleted == false;
  });
});

function showEdit(personInstance: Object | undefined) {
  currentPerson = personInstance as tPerson;
  editModal.value.showMe(true);
}

function confirmDelete(personInstance: Object | undefined) {
  currentPerson = personInstance as tPerson;
  confirmDeleteModal.value.showMe(true);
}

function handleDelete(event: Event) {
  console.log("handle delete: ", currentPerson);
  currentPerson.is_deleted = true;
  emit("deletePerson", props.incidentId, currentPerson);
  confirmDeleteModal.value.showMe(false);
}

function createPerson(event: Event) {
  if (editForm.value.validatepage()) {
    emit("createPerson", props.incidentId, currentPerson);
    editModal.value.showMe(false);
  }
}

function updatePerson(event: Event) {
  if (editForm.value.validatepage()) {
    console.log("currentPerson._id: ", currentPerson._id);
    emit("updatePerson", props.incidentId, currentPerson);
    editModal.value.showMe(false);
  }
}

const showHideTable = computed(() => {
  if (props.personsList) {
    return props.personsList.length > 0;
  } else {
    return false;
  }
});

function cancelEdit() {
  editModal.value.showMe(false);
}

function cancelDelete() {
  confirmDeleteModal.value.showMe(false);
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
    <div class="row ms-2">
      <div class="col align-items-middle">
        <em>{{ subTitleText }}</em>
      </div>
    </div>
    <div class="row p-2">
      <div class="col align-items-middle">
        <table class="table table-bordered" v-if="showHideTable">
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
            <tr v-for="itm in filteredPersonsList">
              <td class="text-center">
                <a class="text-success" href="#" v-on:click="showEdit(itm)"
                  ><i class="bi bi-pencil-fill"></i
                ></a>
              </td>
              <td>{{ itm.last_name }}</td>
              <td>{{ itm.first_name }}</td>
              <td>{{ itm.email }}</td>
              <td>{{ itm.phone_number }}</td>
              <td>{{ itm.person_class }}</td>
              <td class="text-center">
                <a class="text-danger" href="#" v-on:click="confirmDelete(itm)"
                  ><i class="bi bi-person-x"></i
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <NativeModal ref="confirmDeleteModal" container-class="modal-container-sm">
    <template #header>
      <div class="container">
        <div class="row border p-2">
          <div class="col align-items-middle text-center">
            <h4 class="text-danger align-middle">Confirm Delete</h4>
          </div>
        </div>
      </div>
    </template>
    <template #body>
      <div class="container">
        <div class="row p-2">
          <div class="col text-center" v-if="currentPerson.person_class">
            Are you sure you wish to remove
            {{ currentPerson.person_class.toLowerCase() }}
            <strong>
              {{ currentPerson.first_name }}&nbsp;{{
                currentPerson.last_name
              }}</strong
            >
            from this incident?
          </div>
          <div v-if="!currentPerson.person_class">
            Are you sure you wish to remove this person record?
          </div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="container">
        <div class="text-center">
          <button
            class="btn btn-outline-dark m-1"
            v-on:click.prevent="cancelDelete"
          >
            Cancel
          </button>
          <button
            class="btn btn-outline-danger m-1"
            v-on:click.prevent="handleDelete"
          >
            Delete
          </button>
        </div>
      </div>
    </template>
  </NativeModal>
  <NativeModal ref="editModal">
    <template #header>
      <div class="container">
        <div class="row border rounded-2 p-2">
          <div class="col align-items-middle text-center">
            <h4 class="text-primary align-middle">Add or Edit a Person</h4>
          </div>
        </div>
      </div>
    </template>

    <template #body>
      <FormValidate ref="editForm">
        <template #body>
          <div class="container">
            <div class="row mt-1">
              <div class="col">
                <div class="form-floating mb-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Name"
                    required
                    v-model="currentPerson.first_name"
                    id="txtFirstName"
                  />
                  <label for="txtFirstName">First Name</label>
                </div>
              </div>

              <div class="col">
                <div class="form-floating mb-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Last Name"
                    required
                    v-model="currentPerson.last_name"
                    id="txtLastName"
                  />
                  <label for="txtLastName">Last Name</label>
                </div>
              </div>
            </div>

            <div class="row mt-1">
              <div class="col">
                <div class="form-floating mb-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Email Address"
                    v-model="currentPerson.email"
                    id="txtEmail"
                  />
                  <label for="txtEmail">Email Address</label>
                </div>
              </div>

              <div class="col">
                <div class="form-floating mb-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Phone Number"
                    v-model="currentPerson.phone_number"
                  />
                  <label for="txtPhone">Phone Number</label>
                </div>
              </div>
            </div>

            <div class="row mt-1">
              <div class="col">
                <div class="form-floating mb-1">
                  <select
                    class="form-control"
                    placeholder="Person Class"
                    aria-label="Person Class"
                    v-model="currentPerson.person_class"
                    required
                    id="selPersonClass"
                  >
                    <option v-for="itm in metaStore.personClassList">
                      {{ itm.name }}
                    </option>
                  </select>
                  <label for="selPersonClass">Person Class</label>
                </div>
              </div>
              <div class="col">
                <div class="form-floating mb-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="currentPerson._id"
                    disabled
                  />
                  <label>Person Id</label>
                </div>
              </div>
            </div>

            <div class="row mt-1">
              <div class="col">
                <div class="form-floating mb-1">
                  <textarea
                    class="form-control"
                    required
                    placeholder=""
                    v-model="currentPerson.person_story"
                    id="areaDescription"
                    style="height: 150px"
                  ></textarea>
                  <label for="areaDescription" class="ms-1 mb-1"
                    >Description of Involvement</label
                  >
                </div>
              </div>
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
        v-on:click.prevent="updatePerson"
      >
        Submit
      </button>
    </template>
  </NativeModal>
</template>
<style scoped></style>
