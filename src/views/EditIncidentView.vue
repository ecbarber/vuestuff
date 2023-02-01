<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { Ref } from "vue";
import axios from "axios";
import type { tIncidentReport } from "../models/tIncidentReport";
import { useRoute } from "vue-router";
import router from "../router/index";
import FormValidate from "../components/controls/FormValidate.vue";
import dayjs from "dayjs";

const route = useRoute();
const editpage = ref();
//remember to inialize incident ref
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
};

const incident = ref<tIncidentReport>(newIncident);

let incidentId: string | string[] = route.params.id;

let pageLabel = `Edit Incident (${incidentId})`;

if (!incidentId) {
  pageLabel = "New Incident";
} else {
  getIncident(incidentId);
}

function getIncident(incidentId: string | string[]) {
  axios({
    method: "get",
    url: `http://localhost:3000/api/incident/${incidentId}`,
    responseType: "stream",
  }).then(function (response) {
    let obj = JSON.parse(response.data);
    incident.value = fixDates(obj.DATA);
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
  console.log("updating: ", incident);
  const response = await axios.put(
    `http://localhost:3000/api/incident/${incidentId}`,
    incident.value
  );
}

async function createIncident() {
  const response = await axios.post(
    "http://localhost:3000/api/incident",
    incident.value
  );
}

function cancelEdit() {
  router.push({ path: "/" });
}

function handleSubmit(event: Event) {
  console.log("submit clicked");
  if (editpage.value.validatepage()) {
    if (incidentId) {
      upDateIncident();
    } else {
      createIncident();
    }
  }
}
</script>
<template>
  <div class="container-fluid m-4 p-4">
    <div class="row justify-content-around">
      <div class="col-8">
        <h2>{{ pageLabel }}</h2>
      </div>
    </div>
    <div class="row m-3 justify-content-center">
      <div class="col-8 border border-dark p-3">
        <FormValidate ref="editpage">
          <template #body>
            <div class="row mt-3 justify-content-center">
              <div class="col">
                <label class="form-label">Incident Id</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Incident Id"
                  aria-label="Incident Id"
                  readonly
                  disabled
                  v-model="incident._id"
                />
              </div>
              <div class="col">
                <label class="form-label">Severity</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Incident Severity"
                  aria-label="Incident Severity"
                  v-model="incident.severity"
                  required
                />
              </div>
              <div class="col">
                <label class="form-label">Status</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Incident Status"
                  aria-label="Incident Status"
                  v-model="incident.status"
                  required
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <label class="form-label"
                  >Incident Location (Club or Facility)</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location"
                  aria-label="Location"
                  v-model="incident.location"
                  required
                />
              </div>
              <div class="col">
                <label class="form-label">Reporting Party</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Reporting Party"
                  aria-label="Reporting Party"
                  v-model="incident.reporting_party"
                  required
                />
              </div>
              <div class="col">
                <label class="form-label">Incident Date / Time</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  placeholder="Incident Date"
                  aria-label="Incident Date"
                  v-model="incident.incident_date"
                  required
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <label class="form-label"
                  >Specific Incident Location (Specify the area within the club
                  or facility where the incident occurred.)</label
                >
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location"
                  aria-label="Location"
                  v-model="incident.specific_location"
                  required
                />
              </div>
            </div>

            <div class="row mt-3">
              <div class="col">
                <label class="form-label">Created By</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location"
                  aria-label="Location"
                  v-model="incident.created_by"
                  readonly
                  disabled
                />
              </div>
              <div class="col">
                <label class="form-label">Created Date</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  placeholder="Reporting Party"
                  aria-label="Reporting Party"
                  v-model="incident.created_date"
                  disabled
                />
              </div>
            </div>
            <div class="row mt-3">
              <div class="col">
                <label class="form-label">Last Edited By</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Location"
                  aria-label="Location"
                  v-model="incident.lastupdated_by"
                  disabled
                />
              </div>
              <div class="col">
                <label class="form-label">Last Edited Date</label>
                <input
                  type="datetime-local"
                  class="form-control"
                  placeholder="Reporting Party"
                  aria-label="Reporting Party"
                  v-model="incident.lastupdated_date"
                  readonly
                  disabled
                />
              </div>
            </div>
            <div class="row mt-3 justify-content-center">
              <div class="col-6 text-center">
                <button
                  type="reset"
                  class="btn btn-outline-dark m-1"
                  @click="cancelEdit"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  class="btn btn-outline-primary m-1"
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
  </div>
</template>
