<script setup lang="ts">
import { ref, onMounted } from "vue";
import type { tIncidentReport } from "../models/tIncidentReport";
import type { tPerson } from "../models/tPerson";
import type { tLocation } from "../models/tLocation";
import type { tStatus } from "@/models/tStatus";
import type { tSeverity } from "@/models/tSeverity";
import { useRoute } from "vue-router";
import router from "../router/index";
import FormValidate from "../components/controls/FormValidate.vue";
import {
  getIncident,
  createIncident,
  updateIncident,
} from "../services/incidentService";
import { getAllLocations } from "../services/locationService";
import { getSeverityList } from "../services/severityService";
import { getStatusList } from "../services/statusService";
import dayjs from "dayjs";
import { store } from "../services/store";

const route = useRoute();
const editpage = ref();
const locations = ref<Array<tLocation>>();
const statusList = ref<Array<tStatus>>();
const severityList = ref<Array<tSeverity>>();

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
  incident.value.lastupdated_by = store.userName;
  incident.value.lastupdated_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  updateIncident(incidentId, incident.value);
}

async function createNewIncident() {
  incident.value.created_by = store.userName;
  incident.value.created_date = dayjs(new Date().toString()).format(
    "YYYY-MM-DDTHH:mm"
  );
  incident.value.lastupdated_by = store.userName;
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

function getLists() {
  getAllLocations()
    .then((result) => {
      locations.value = result.DATA;
    })
    .then(() => {
      getStatusList()
        .then((resp) => {
          statusList.value = resp.DATA;
        })
        .then(() => {
          getSeverityList().then((resp) => {
            severityList.value = resp.DATA;
          });
        });
    });
}

onMounted(() => {
  getLists();
});
</script>
<template>
  <div class="row m-3 justify-content-center">
    <div class="col-lg-8 col-md-12">
      <h2>{{ pageLabel }}</h2>
    </div>
  </div>
  <div class="row m-3 justify-content-center">
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
              <select
                class="form-control"
                placeholder="Incident Severity"
                aria-label="Incident Severity"
                v-model="incident.severity"
                required
              >
                <option v-for="itm in severityList">{{ itm.name }}</option>
              </select>
            </div>
            <div class="col">
              <label class="form-label">Status</label>
              <select
                class="form-control"
                placeholder="Incident Status"
                aria-label="Incident Status"
                v-model="incident.status"
                required
              >
                <option v-for="itm in statusList">{{ itm.name }}</option>
              </select>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <label class="form-label"
                >Incident Location (Club or Facility)</label
              >
              <select
                class="form-control"
                placeholder="Location"
                aria-label="Location"
                v-model="incident.location"
                required
              >
                <option v-for="itm in locations">{{ itm.name }}</option>
              </select>
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
                >Specific Incident Location (Specify the area within the club or
                facility where the incident occurred.)</label
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
              <label class="form-label"
                >Incident Description (Describe the incident in as much detail
                as possible.)</label
              >
              <textarea
                type="text"
                class="form-control"
                placeholder="Description"
                aria-label="Description"
                v-model="incident.incident_description"
                required
              ></textarea>
            </div>
          </div>
          <div class="row mt-3">
            <div class="col">
              <table class="table table-bordered">
                <thead>
                  <tr>
                    <th>Last Name</th>
                    <th>First Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="itm in incident.persons">
                    <td>{{ itm.last_name }}</td>
                    <td>{{ itm.first_name }}</td>
                    <td>{{ itm.email }}</td>
                    <td>{{ itm.phone_number }}</td>
                    <td>{{ itm.person_class }}</td>
                  </tr>
                </tbody>
              </table>
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
