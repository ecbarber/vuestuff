<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import axios from "axios";
import type { IncidentReport } from "../../models/IncidentReport";
import router from "../../router/index";
import dayjs from "dayjs";
import { getAllLocations } from "../../services/locationService";
import { getSeverityList } from "../../services/severityService";
import { getStatusList } from "../../services/statusService";
import type { tLocation } from "../../models/tLocation";
import type { tStatus } from "@/models/tStatus";
import type { tSeverity } from "@/models/tSeverity";
import { store } from "../../services/store";

var incidents: Array<IncidentReport>;
const sortedIncidents = ref<Array<IncidentReport>>();
const locations = ref<Array<tLocation>>();
const statusList = ref<Array<tStatus>>();
const severityList = ref<Array<tSeverity>>();

const locationFilter = ref();
const statusFilter = ref();
const severityFilter = ref();

const listState = reactive({
  showAll: false,
  incidentLabel: `Showing Incidents for ${store.fullName}`,
});
listState.showAll = false;
listState.incidentLabel = `Showing Incidents for ${store.fullName}`;

var sortBy = ref("created_date");

function filterIncidentsByCurrentUser() {
  if (listState.showAll) {
    listState.incidentLabel = "Showing All Incidents";
  } else {
    listState.incidentLabel = `Showing Incidents for ${store.fullName}`;
  }
  getIncidents();
  filterIncidents();
}

function sortIncidents() {
  if (incidents) {
    sortedIncidents.value = incidents.slice().sort(function (a, b) {
      return a.created_date < b.created_date ? 1 : -1;
    });
  }
}

function filterIncidents() {
  sortIncidents();
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

function filterItems(arr: IncidentReport[] | undefined, query: string) {
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
  locationFilter.value = "";
  severityFilter.value = "";
  statusFilter.value = "";
  getLists();
  getIncidents();
});

function getIncidents() {
  if (listState.showAll) {
    axios.get(`${store.apiUrl}/incidents`).then((response) => {
      incidents = response.data;
      sortIncidents();
    });
  } else {
    axios
      .get(
        `${store.apiUrl}/incidents/foruser/${store.fullName}/${store.home_location}`
      )
      .then((response) => {
        incidents = response.data;
        sortIncidents();
      });
  }
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
  <div class="container-fluid">
    <div class="row mt-2 border">
      <div
        class="col-md-2 p-2 mt-1 d-flex align-items-center justify-content-center"
      >
        <strong>Incident Reports</strong>
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

    <div class="row mt-2 pt-2 pb-2 border justify-content-end">
      <div class="col">
        <div class="form-check form-switch">
          <input
            class="form-check-input"
            type="checkbox"
            id="chkAllIncidents"
            v-model="listState.showAll"
            v-on:change="filterIncidentsByCurrentUser"
          />
          <label class="form-check-label" for="chkAllIncidents">{{
            listState.incidentLabel
          }}</label>
        </div>
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
              <th>Assigned To</th>
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
              <td class="align-middle">{{ itm.assigned_to }}</td>
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
