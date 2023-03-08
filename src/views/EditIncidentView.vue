<script setup lang="ts">
import { ref, onMounted, reactive, computed } from "vue";
import { IncidentReport, type iIncidentReport } from "../models/IncidentReport";
import type { tPerson } from "../models/tPerson";
import { useRoute } from "vue-router";
import router from "../router/index";
import FormValidate from "../components/controls/FormValidate.vue";
import PersonEditor from "@/components/controls/PersonEditor.vue";
import { MetaStore } from "@/services/metaStore";
import { store } from "@/services/store";
import {
  getIncident,
  createIncident,
  updateIncident,
  createPerson,
  updatePerson,
} from "../services/incidentService";
import dayjs from "dayjs";
import { IncidentHistory } from "@/models/IncidentHistory";

var pageState = reactive({
  isLoading: false,
  showSavedMessage: false,
});

var incident = reactive(new IncidentReport());

const route = useRoute();
const editpage = ref();

var currentUserName = localStorage.getItem("userName") as string;
var incidentId = route.params.id as String;
let pageLabel = `Edit Incident (${incidentId})`;

if (!incidentId) {
  pageState.isLoading = true;
  pageLabel = "New Incident";
  incident.isLoading = true;
  incident.reporting_party = store.fullName;
  incident.reporting_party_email = store.email;
  incident.location = store.home_location;
  incident.isLoading = false;
  pageState.isLoading = false;
} else {
  refreshIncident();
}

async function refreshIncident() {
  incident = reactive(new IncidentReport());
  pageState.isLoading = true;
  incident.persons = [];
  getIncident(incidentId).then((response) => {
    incident = reactive(response);
    pageState.isLoading = false;
  });
}

function fixDates(inc: IncidentReport) {
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
  const hist: IncidentHistory = new IncidentHistory();
  hist.user = currentUserName;
  hist.timeStamp = incident.lastupdated_date;
  hist.action = "Incident Edited";
  hist.description = "Incident updated.";
  incident.history?.push(hist);
  incident.lastupdated_by = currentUserName;
  incident.lastupdated_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  updateIncident(incidentId, incident);
}

async function createNewIncident() {
  pageState.isLoading = true;
  incident.created_by = currentUserName;
  incident.created_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  incident.lastupdated_by = currentUserName;
  incident.lastupdated_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );

  const hist: IncidentHistory = new IncidentHistory();
  hist.user = currentUserName;
  hist.timeStamp = incident.created_date;
  hist.action = "Incident Created";
  hist.description = "New incident created.";
  incident.history?.push(hist);

  createIncident(incident).then((result) => {
    console.log("createIncidentResult: ", result.data.DATA);
    incident = reactive(result.data.DATA);
    var incId = incident._id;
    // router.push({ path: `/editincident/${incId}` }).then(() => {
    //   router.go;
    // });
    window.location.href = `/editincident/${incId}`;
  });
}

function cancelEdit() {
  router.push({ name: "incidents" });
}

function handleSubmit(event: Event, closeEdit: Boolean) {
  if (editpage.value.validatepage()) {
    if (incidentId) {
      upDateIncident();
    } else {
      createNewIncident();
    }
    if (closeEdit) {
      router.push({ name: "incidents" });
    } else {
      pageState.showSavedMessage = true;
    }
  }
}

async function handlePersonDelete(incidentId: String, thePerson: tPerson) {
  thePerson.lastupdated_by = currentUserName;
  thePerson.lastupdated_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  updatePerson(incidentId, thePerson);
}

async function handleCreatePerson(incidentId: String, thePerson: tPerson) {
  refreshIncident();
}

async function handlePersonSubmit(incidentId: String, thePerson: tPerson) {
  if (thePerson._id) {
    //this branch is working...
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
<template vcloak>
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
  <div class="row m-1 justify-content-center" v-if="pageState.showSavedMessage">
    <div class="col-lg-8 col-md-12">
      <div class="alert alert-success text-center">
        <strong>Changes Saved</strong>
      </div>
    </div>
  </div>

  <div class="row m-1 justify-content-center">
    <div class="col-lg-8 col-md-12 border p-4" v-if="!pageState.isLoading">
      <FormValidate ref="editpage">
        <template #body>
          <div class="row">
            <div class="col">
              <div class="form-floating">
                <select
                  required="true"
                  class="form-control"
                  placeholder="Location"
                  v-model="incident.location"
                >
                  <option v-for="itm in MetaStore.locationList">
                    {{ itm.name }}
                  </option>
                </select>
                <label class="form-label"
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
                  type="text"
                  class="form-control"
                  placeholder="Reporting Party Email"
                  aria-label="Reporting Party Email"
                  v-model="incident.reporting_party_email"
                  required
                />
                <label class="form-label">Reporting Party Email</label>
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
          <div
            class="row ms-1 me-1 mt-3 border rounded p-2 d-flex align-items-center"
          >
            <div class="col-1">
              <strong class="align-middle">Severity:</strong>
            </div>
            <div class="col">
              <div
                class="form-check form-check-inline"
                v-for="itm in MetaStore.severityList"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  name="severityOptions"
                  id="inlineRadio1"
                  v-bind:value="itm.name"
                  v-model="incident.severity"
                />
                <label class="form-check-label" for="inlineRadio1">{{
                  itm.name
                }}</label>
              </div>
            </div>
            <div class="col-4">
              <div
                class="form-floating mt-1"
                v-if="incident.severity == 'Other'"
              >
                <input
                  type="text"
                  class="form-control"
                  v-model="incident.severity_other"
                />
                <label class="form-label">Other Severity</label>
              </div>
            </div>
          </div>
          <div
            class="row ms-1 me-1 mt-3 border rounded p-2 d-flex align-items-center"
          >
            <div class="col-1">
              <strong class="align-middle">Status:</strong>
            </div>
            <div class="col">
              <div
                class="form-check form-check-inline"
                v-for="itm in MetaStore.statusList"
              >
                <input
                  class="form-check-input"
                  type="radio"
                  name="statusOptions"
                  id="inlineRadio1"
                  v-bind:value="itm.name"
                  v-model="incident.status"
                />
                <label class="form-check-label" for="inlineRadio1">{{
                  itm.name
                }}</label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-floating mt-1" v-if="incident.status == 'Other'">
                <input
                  type="text"
                  class="form-control"
                  v-model="incident.status_other"
                />
                <label class="form-label" for="selStatus">Other Status</label>
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
            <div class="col">
              <div class="form-floating mt-1">
                <select
                  class="form-control"
                  placeholder="Incident Status"
                  aria-label="Incident Status"
                  v-model="incident.assigned_to"
                  required
                  id="selStatus"
                >
                  <option v-for="itm in MetaStore.userList">
                    {{ itm.first_name + " " + itm.last_name }}
                  </option>
                </select>
                <label class="form-label" for="selStatus">Assigned To</label>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <div class="form-floating mt-1">
                <textarea
                  class="form-control"
                  placeholder="Description"
                  aria-label="Description"
                  v-model="incident.incident_description"
                  required
                  style="height: 200px"
                ></textarea>
                <label class="form-label"
                  >Incident Description (Describe the incident in as much detail
                  as possible.)</label
                >
              </div>
            </div>
          </div>
          <div class="row mt-3" v-if="incidentId != ''">
            <div class="col">
              <PersonEditor
                newButtonText="New Subject"
                titleText="Witnesses / Subjects / Parties"
                sub-title-text="Please list all persons relevant to this incident, including injured parties, employees, customers, etc."
                ref="personEditor"
                @create-person="handleCreatePerson"
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
                class="btn btn-outline-success m-1 btn-min-width"
                @click.prevent="handleSubmit($event, false)"
              >
                Save
              </button>
              <button
                type="submit"
                class="btn btn-outline-primary m-1 btn-min-width"
                @click.prevent="handleSubmit($event, true)"
              >
                Save & Close
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
  width: 120px;
}
</style>
