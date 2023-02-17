<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import type { tIncidentReport } from "../models/tIncidentReport";
import type { tPerson } from "../models/tPerson";
import { useRoute } from "vue-router";
import router from "../router/index";
import FormValidate from "../components/controls/FormValidate.vue";
import PersonEditor from "@/components/controls/PersonEditor.vue";
import { MetaStore } from "@/services/metaStore";
import {
  getIncident,
  createIncident,
  updateIncident,
  createPerson,
  updatePerson,
} from "../services/incidentService";

import dayjs from "dayjs";

const route = useRoute();
const editpage = ref();
const metaStore: MetaStore = new MetaStore();
var currentUserName = reactive<String>(localStorage.getItem("userName") ?? "");

const newIncident: tIncidentReport = {
  _id: "",
  location: "",
  created_by: "",
  created_date: "",
  lastupdated_by: "",
  lastupdated_date: "",
  reporting_party: "",
  reporting_party_email: "",
  status: "",
  severity: "",
  specific_location: "",
  is_deleted: false,
  incident_date: "",
  incident_description: "",
};
const incident = ref<tIncidentReport>(newIncident);

var incidentId = route.params.id as String;
let pageLabel = `Edit Incident (${incidentId})`;

if (!incidentId) {
  pageLabel = "New Incident";
} else {
  getItem(incidentId);
}

function getItem(incidentId: String) {
  getIncident(incidentId).then(function (response) {
    let obj = response.DATA;
    incident.value = fixDates(obj);
  });
}

function fixDates(inc: tIncidentReport) {
  inc.incident_date = dayjs(inc.incident_date.toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  inc.created_date = dayjs(inc.created_date.toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  inc.lastupdated_date = dayjs(inc.lastupdated_date.toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  return inc;
}

async function upDateIncident() {
  incident.value.lastupdated_by = currentUserName;
  incident.value.lastupdated_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  updateIncident(incidentId, incident.value);
}

async function createNewIncident() {
  incident.value.created_by = currentUserName;
  incident.value.created_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  incident.value.lastupdated_by = currentUserName;
  incident.value.lastupdated_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  createIncident(incident.value);
}

function cancelEdit() {
  router.push({ name: "incidents" });
}

function handleSubmit(event: Event) {
  if (editpage.value.validatepage()) {
    if (incidentId) {
      upDateIncident();
    } else {
      createNewIncident();
    }
  }
}

async function handlePersonDelete(incidentId: String, thePerson: tPerson) {
  console.log("handlePersonDelete: ", thePerson._id);
  thePerson.lastupdated_by = currentUserName;
  thePerson.lastupdated_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  updatePerson(incidentId, thePerson);
}

async function handleCreatePerson(incidentId: String, thePerson: tPerson) {
  console.log("thePerson._id: ", thePerson._id);
  thePerson.created_by = currentUserName;
  thePerson.created_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  thePerson.lastupdated_by = currentUserName;
  thePerson.lastupdated_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  createPerson(incidentId, thePerson);
}

async function handlePersonSubmit(incidentId: String, thePerson: tPerson) {
  console.log("thePerson._id: ", thePerson._id);
  if (thePerson._id) {
    thePerson.lastupdated_by = currentUserName;
    thePerson.lastupdated_date = dayjs(new Date().toString()).format(
      "YYYY-MM-DDTHH:mm"
    );
    updatePerson(incidentId, thePerson);
  } else {
    thePerson.created_by = currentUserName;
    thePerson.created_date = dayjs(new Date().toString()).format(
      "YYYY-MM-DDTHH:mm"
    );
    thePerson.lastupdated_by = currentUserName;
    thePerson.lastupdated_date = dayjs(new Date().toString()).format(
      "YYYY-MM-DDTHH:mm"
    );
    createPerson(incidentId, thePerson);
  }
}

onMounted(() => {});
</script>
<template>
  <div class="row mt-3 mb-1 justify-content-center">
    <div class="col-lg-8 col-md-12">
      <h2>{{ pageLabel }}</h2>
    </div>
  </div>
  <div class="row mt-1 mb-1 justify-content-center">
    <div class="col-lg-8 col-md-12">
      <p>
        This report is to be completed each and every time there is an incident
        or injury. What constitutes an incident are any thefts, significant
        damage on the property, fights, or any time you have to physically
        remove someone from the establishment or call the local authorities. Any
        injuries that occur must also be noted on this form. This form is to be
        sent to the Corporate office immediately upon completion.
      </p>
    </div>
  </div>
  <div class="row m-3 justify-content-center">
    <div class="col-lg-8 col-md-12 border p-4">
      <FormValidate ref="editpage">
        <template #body>
          <div class="row">
            <div class="col">
              <div class="form-floating">
                <select
                  class="form-control"
                  placeholder="Location"
                  aria-label="Location"
                  v-model="incident.location"
                  required
                  id="selLocation"
                >
                  <option v-for="itm in metaStore.locationList">
                    {{ itm.name }}
                  </option>
                </select>
                <label class="form-label" for="selLocation"
                  >Incident Location (Club or Facility)</label
                >
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Reporting Party"
                  aria-label="Reporting Party"
                  v-model="incident.reporting_party"
                  required
                />
                <label class="form-label">Reporting Party</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating">
                <input
                  type="datetime-local"
                  class="form-control"
                  placeholder="Incident Date"
                  aria-label="Incident Date"
                  v-model="incident.incident_date"
                  required
                />
                <label class="form-label">Incident Date / Time</label>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <div class="form-floating mt-1">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Incident Id"
                  aria-label="Incident Id"
                  readonly
                  disabled
                  v-model="incident._id"
                  id="txtIncidentId"
                />
                <label class="form-label" for="txtIncidentId"
                  >Incident Id</label
                >
              </div>
            </div>
            <div class="col">
              <div class="form-floating mt-1">
                <select
                  class="form-control"
                  placeholder="Incident Severity"
                  aria-label="Incident Severity"
                  v-model="incident.severity"
                  required
                  id="selSeverity"
                >
                  <option v-for="itm in metaStore.severityList">
                    {{ itm.name }}
                  </option>
                </select>
                <label class="form-label" for="selSeverity">Severity</label>
              </div>
            </div>
            <div class="col">
              <div class="form-floating mt-1">
                <select
                  class="form-control"
                  placeholder="Incident Status"
                  aria-label="Incident Status"
                  v-model="incident.status"
                  required
                  id="selStatus"
                >
                  <option v-for="itm in metaStore.statusList">
                    {{ itm.name }}
                  </option>
                </select>
                <label class="form-label" for="selStatus">Status</label>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <div class="form-floating mt-1">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location"
                  aria-label="Location"
                  v-model="incident.specific_location"
                  required
                />
                <label class="form-label"
                  >Specific Incident Location (Specify the area within the club
                  or facility where the incident occurred.)</label
                >
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <div class="form-floating mt-1">
                <textarea
                  type="text"
                  class="form-control"
                  placeholder="Description"
                  aria-label="Description"
                  v-model="incident.incident_description"
                  required
                ></textarea>
                <label class="form-label"
                  >Incident Description (Describe the incident in as much detail
                  as possible.)</label
                >
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <PersonEditor
                v-bind:persons-list="incident.persons"
                newButtonText="New Subject"
                titleText="Witnesses / Subjects / Parties"
                sub-title-text="Please list all persons relevant to this incident, including injured parties, employees, customers, etc."
                ref="personEditor"
                @create-person="createPerson"
                @delete-person="handlePersonDelete"
                @update-person="handlePersonSubmit"
                v-bind:incident-id="(incidentId as string)"
              ></PersonEditor>
            </div>
          </div>
          <div class="row mt-3 justify-content-center">
            <div class="col-6 text-center">
              <button
                type="reset"
                class="btn btn-outline-dark m-1 btn-min-width"
                @click="cancelEdit"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="btn btn-outline-primary m-1 btn-min-width"
                @click.prevent="handleSubmit"
              >
                Submit
              </button>
            </div>
          </div>
        </template>
      </FormValidate>
    </div>
  </div>
</template>
<style scoped>
.btn-min-width {
  width: 100px;
}
</style>
