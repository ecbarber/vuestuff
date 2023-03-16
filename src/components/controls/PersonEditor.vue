<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import NativeModal from "../controls/nativemodal.vue";
import FormValidate from "./FormValidate.vue";
import type { tPerson } from "../../models/tPerson";
import { Person } from "../../models/tPerson";
import { MetaStore } from "@/services/metaStore";
import { store } from "../../services/store";
import {
  createPerson,
  getIncidentPersons,
  updatePerson,
} from "../../services/incidentService";
import dayjs from "dayjs";

const editModal = ref();
const editForm = ref();
const confirmDeleteModal = ref();

const pageState = reactive({
  personList: new Array<tPerson>(),
  loadingList: new Boolean(),
});

pageState.loadingList = false;

var currentPerson: tPerson = reactive({
  _id: "",
  first_name: "",
  last_name: "",
  email: "",
  phone_number: "",
  person_class: "",
  person_class_other: "",
  created_by: "",
  created_date: "",
  lastupdated_by: "",
  lastupdated_date: "",
  person_story: "",
  secondary_person_classes: [],
  treatment_type: "",
  person_role: "",
  person_role_other: "",
  stage_name: "",
});

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
});

const emit = defineEmits(["createPerson", "deletePerson", "updatePerson"]);

const filteredPersonsList = computed(() => {
  return pageState.personList?.filter(function (el: tPerson) {
    return el.is_deleted == false;
  });
});

function showEdit(personInstance: tPerson | undefined) {
  if (personInstance?._id) {
    currentPerson = reactive(personInstance);
  } else {
    currentPerson = reactive(new Person());
  }
  editModal.value.showMe(true);
}

function confirmDelete(personInstance: Object | undefined) {
  currentPerson = personInstance as tPerson;
  confirmDeleteModal.value.showMe(true);
}

function handleDelete(event: Event) {
  currentPerson.is_deleted = true;
  emit("deletePerson", props.incidentId, currentPerson);
  confirmDeleteModal.value.showMe(false);
}

function handleCreatePerson(incidentId: String, thePerson: tPerson) {
  thePerson.created_by = store.fullName;
  thePerson.created_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  thePerson.lastupdated_by = store.fullName;
  thePerson.lastupdated_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );

  createPerson(incidentId, thePerson).then(() => {
    refreshList();
  });
}

function handleUpdatePerson(incidentId: String, thePerson: tPerson) {
  thePerson.lastupdated_by = store.fullName;
  thePerson.lastupdated_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  updatePerson(incidentId, thePerson).then(() => {
    refreshList();
  });
}

async function savePerson(event: Event) {
  if (editForm.value.validatepage()) {
    if (currentPerson._id) {
      await handleUpdatePerson(props.incidentId, currentPerson);
    } else {
      await handleCreatePerson(props.incidentId, currentPerson);
    }
    editModal.value.showMe(false);
  }
}

const showHideTable = computed(() => {
  if (pageState.personList) {
    return pageState.personList.length > 0;
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

onMounted(() => {
  refreshList();
});

async function refreshList() {
  pageState.loadingList = true;
  pageState.personList = [];
  setTimeout(function () {
    getIncidentPersons(props.incidentId).then((data) => {
      pageState.personList = data.DATA;
      pageState.loadingList = false;
    });
  }, 500);
}
</script>
<template>
  <div class="border rounded-2 mt-2 p-2">
    <div class="row mt-2 ms-2 me-2">
      <div class="col align-items-middle">
        <h4>{{ titleText }}</h4>
      </div>
      <div class="col d-flex align-items-middle justify-content-end">
        <button
          class="btn btn-outline-danger"
          v-on:click.prevent="showEdit(new Person())"
        >
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
        <div class="alert alert-info" v-if="pageState.loadingList">
          Loading incident persons...
        </div>
        <table class="table table-bordered" v-if="showHideTable">
          <thead>
            <tr>
              <th></th>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Class</th>
              <th>Role</th>
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
              <td>{{ itm.person_role }}</td>
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

            <div class="row ms-1 me-1 p-3 align-items-center">
              <div class="col-2">
                <strong class="ms-2 align-middle">Class:</strong>
              </div>
              <div class="col">
                <div
                  class="form-check form-check-inline"
                  v-for="itm in MetaStore.personClassList"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="classOptions"
                    v-bind:value="itm.name"
                    v-model="currentPerson.person_class"
                  />
                  <label class="form-check-label" for="inlineRadio1">{{
                    itm.name
                  }}</label>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="form-floating mb-1"
                  v-if="currentPerson.person_class == 'Entertainer'"
                >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Stage Name"
                    aria-label="Stage Name"
                    v-model="currentPerson.stage_name"
                    required
                  />
                  <label>Stage Name</label>
                </div>
              </div>
            </div>

            <div class="row" v-if="currentPerson.person_class == 'Other'">
              <div class="col">
                <div class="form-floating mt-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="currentPerson.person_class_other"
                  />
                  <label class="form-label" for="selStatus">Other Class</label>
                </div>
              </div>
            </div>
            <div class="row mt-1 ms-1 me-1 p-3 align-items-center">
              <div class="col-2">
                <strong class="ms-2 align-middle">Role:</strong>
              </div>
              <div class="col">
                <div
                  class="form-check form-check-inline"
                  v-for="itm in MetaStore.personRoleList"
                >
                  <input
                    class="form-check-input"
                    type="radio"
                    name="roleOptions"
                    v-bind:value="itm.name"
                    v-model="currentPerson.person_role"
                  />
                  <label class="form-check-label" for="inlineRadio1">{{
                    itm.name
                  }}</label>
                </div>
              </div>
            </div>
            <div class="row mt-1" v-if="currentPerson.person_role == 'Other'">
              <div class="col">
                <div class="form-floating mt-1">
                  <input
                    type="text"
                    class="form-control"
                    v-model="currentPerson.person_role_other"
                  />
                  <label class="form-label" for="selStatus">Other Role</label>
                </div>
              </div>
            </div>
            <div
              class="row mt-1"
              v-if="currentPerson.person_role == 'Injured Party'"
            >
              <div class="col">
                <div class="form-floating mb-1">
                  <select
                    class="form-control"
                    placeholder="Person Class"
                    aria-label="Person Class"
                    v-model="currentPerson.treatment_type"
                    required
                    id="selPersonClass"
                  >
                    <option v-for="itm in MetaStore.treatmentTypeList">
                      {{ itm.name }}
                    </option>
                  </select>
                  <label>Treatment Type</label>
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
        v-on:click.prevent="savePerson($event)"
      >
        Submit
      </button>
    </template>
  </NativeModal>
</template>
<style scoped></style>
