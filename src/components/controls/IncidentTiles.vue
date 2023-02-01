<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import type { tIncidentReport } from "../../models/tIncidentReport";
import router from "../../router/index";
import dayjs from "dayjs";

const incidents = ref<Array<tIncidentReport>>();

onMounted(() => {
  console.log("Incident List Mounted...");
  getIncidents();
});

function getIncidents() {
  axios({
    method: "get",
    url: "http://localhost:3000/api/incidents",
    responseType: "stream",
  }).then(function (response) {
    let obj = JSON.parse(response.data);
    incidents.value = obj.DATA;
  });
}

function gotoEdit(incidentId: String | undefined) {
  let editPath = "/editIncident/" + incidentId;
  router.push({ path: editPath });
}

function formatDate(dateString: string | Date) {
  return dayjs(dateString).format("MM/DD/YYYY");
}
</script>
<template>
  <div class="container">
    <div class="row">
      <div class="col-3 mt-3" v-for="itm in incidents">
        <div
          class="btn btn-outline-primary"
          style="width: 18rem"
          v-on:click="gotoEdit(itm._id)"
        >
          <div class="card-body text-center">
            <span class="card-title font-weight-bold">
              {{ itm.location }} - {{ formatDate(itm.created_date.toString()) }}
            </span>
            <br />
            <span>{{ itm.status }}</span
            ><br />
            <span>{{ itm.severity }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
th {
  font-weight: bold;
}
</style>
