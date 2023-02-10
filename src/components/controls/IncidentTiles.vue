<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import type { tIncidentReport } from "../../models/tIncidentReport";
import router from "../../router/index";
import dayjs from "dayjs";
import { getAllLocations } from "../../services/locationService";
import { getSeverityList } from "../../services/severityService";
import { getStatusList } from "../../services/statusService";
import type { tLocation } from "../../models/tLocation";
import type { tStatus } from "@/models/tStatus";
import type { tSeverity } from "@/models/tSeverity";

const incidents = ref<Array<tIncidentReport>>();
const sortedIncidents = ref<Array<tIncidentReport>>();
const locations = ref<Array<tLocation>>();
const statusList = ref<Array<tStatus>>();
const severityList = ref<Array<tSeverity>>();

const locationFilter = ref();
const statusFilter = ref();
const severityFilter = ref();

var sortBy = ref("created_date");

function sortIncidents() {
  if (incidents.value) {
    sortedIncidents.value = incidents.value.slice().sort(function (a, b) {
      return a.created_date < b.created_date ? 1 : -1;
    });
  }
}

function filterIncidents() {
  if (locationFilter.value && statusFilter.value && severityFilter.value) {
    sortedIncidents.value = sortedIncidents.value?.filter(
      (el) =>
        el.location.toLowerCase() == locationFilter.value.toLowerCase() &&
        el.status.toLowerCase() == statusFilter.value.toLowerCase() &&
        el.severity.toLowerCase() == severityFilter.value.toLowerCase()
    );
  } else if (locationFilter.value && statusFilter.value) {
    sortedIncidents.value = sortedIncidents.value?.filter(
      (el) =>
        el.location.toLowerCase() == locationFilter.value.toLowerCase() &&
        el.status.toLowerCase() == statusFilter.value.toLowerCase()
    );
  } else if (statusFilter.value && severityFilter.value) {
    sortedIncidents.value = sortedIncidents.value?.filter(
      (el) =>
        el.status.toLowerCase() == statusFilter.value.toLowerCase() &&
        el.severity.toLowerCase() == severityFilter.value.toLowerCase()
    );
  } else if (locationFilter.value && severityFilter.value) {
    sortedIncidents.value = sortedIncidents.value?.filter(
      (el) =>
        el.location.toLowerCase() == locationFilter.value.toLowerCase() &&
        el.severity.toLowerCase() == severityFilter.value.toLowerCase()
    );
  } else if (locationFilter.value) {
    sortedIncidents.value = sortedIncidents.value?.filter(
      (el) => el.location.toLowerCase() == locationFilter.value.toLowerCase()
    );
  } else if (statusFilter.value) {
    sortedIncidents.value = sortedIncidents.value?.filter(
      (el) => el.status.toLowerCase() == statusFilter.value.toLowerCase()
    );
  } else if (severityFilter.value) {
    sortedIncidents.value = sortedIncidents.value?.filter(
      (el) => el.severity.toLowerCase() == severityFilter.value.toLowerCase()
    );
  }
}

function filterItems(arr: tIncidentReport[] | undefined, query: string) {
  return arr?.filter((el) => el.location.toLowerCase() == query.toLowerCase());
}

function clearFilter() {
  locationFilter.value = "";
  severityFilter.value = "";
  statusFilter.value = "";
  getIncidents();
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
  getIncidents();
});

function getIncidents() {
  axios({
    method: "get",
    url: "http://localhost:3000/api/incidents",
    responseType: "stream",
  })
    .then(function (response) {
      let obj = JSON.parse(response.data);
      incidents.value = obj.DATA;
    })
    .then(function () {
      sortIncidents();
    });
}

function gotoEdit(incidentId: String | undefined) {
  router.push({ name: "editincident", params: { id: incidentId?.toString() } });
}

function gotoNew() {
  let editPath = "/editIncident";
  router.push({ path: editPath });
}

function formatDate(dateString: string | Date) {
  return dayjs(dateString).format("MM/DD/YYYY");
}

function formatDateTime(dateString: string | Date) {
  return dayjs(dateString).format("MM/DD/YYYY HH:mm");
}
</script>
<template>
  <div class="container">
    <div class="row mt-2">
      <div
        class="col-md-2 p-2 mt-1 d-flex align-items-center justify-content-center"
      >
        <strong>Current Incident Reports</strong>
      </div>
      <div class="col-md-8 p-2 mt-1">
        <form class="row">
          <div class="col-sm-3">
            <select
              class="form-control"
              placeholder="Status"
              v-on:change="filterIncidents"
              v-model="locationFilter"
            >
              <option value="">-Filter by Location-</option>
              <option v-for="itm in locations">{{ itm.name }}</option>
            </select>
          </div>
          <div class="col-sm-3">
            <select
              class="form-control"
              placeholder="Status"
              v-on:change="filterIncidents"
              v-model="statusFilter"
            >
              <option value="">-Filter by Status-</option>
              <option v-for="itm in statusList">{{ itm.name }}</option>
            </select>
          </div>
          <div class="col-sm-3">
            <select
              class="form-control"
              placeholder="Severity"
              v-on:change="filterIncidents"
              v-model="severityFilter"
            >
              <option value="">-Filter by Severity-</option>
              <option v-for="itm in severityList">{{ itm.name }}</option>
            </select>
          </div>
          <div class="col-sm-3 text-right">
            <button
              class="btn btn-outline-primary"
              v-on:click.prevent="clearFilter"
            >
              Clear Filter
            </button>
          </div>
        </form>
      </div>
      <div class="col-md-2 p-2 mt-1 text-center">
        <button class="btn btn-outline-primary" v-on:click.prevent="gotoNew">
          New Incident
        </button>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col-md-12">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th class="text-center"></th>
              <th class="text-center">Report Created</th>
              <th class="text-center">Incident Date</th>
              <th>Location</th>
              <th>Reported By</th>
              <th>Status</th>
              <th>Severity</th>
              <th class="text-center"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="itm in sortedIncidents" class="">
              <td class="text-center">
                <button
                  type="button"
                  class="btn btn-sm btn-outline-success btn-min-width"
                  v-on:click.prevent="gotoEdit(itm._id)"
                >
                  Edit
                </button>
              </td>
              <td class="text-center align-middle">
                {{ formatDate(itm.created_date.toString()) }}
              </td>
              <td class="text-center align-middle">
                {{ formatDateTime(itm.incident_date.toString()) }}
              </td>
              <td class="align-middle">{{ itm.location }}</td>
              <td class="align-middle">{{ itm.reporting_party }}</td>
              <td class="align-middle">{{ itm.status }}</td>
              <td class="align-middle">{{ itm.severity }}</td>
              <td class="text-center align-middle">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-success">
                    Print View
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped>
th {
  font-weight: bold;
}
.btn-min-width {
  width: 80px;
}
</style>
