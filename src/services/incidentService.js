import axios from "axios";
import { store } from "../services/store";
import dayjs from "dayjs";
export async function getAllIncidents() {
    let returnList = {};
    await axios.get(`${store.apiUrl}/incidents`).then((response) => {
        returnList = response.data;
    });
    return returnList;
}
export async function getIncident(id) {
    let returnItem = {};
    await axios.get(`${store.apiUrl}/incident/${id}`).then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
export async function createIncident(incident) {
    let returnItem = {};
    incident.created_by = store.userName;
    incident.created_date = fixDate(new Date());
    incident.lastupdated_by = store.userName;
    incident.lastupdated_date = fixDate(new Date());
    await axios.post(`${store.apiUrl}/incident`, incident).then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
export async function updateIncident(id, incident) {
    let returnItem = {};
    incident.lastupdated_by = store.userName;
    incident.lastupdated_date = fixDate(new Date());
    await axios
        .put(`${store.apiUrl}/incident/${id}`, incident)
        .then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
export async function updatePerson(incidentId, person) {
    console.log("inside incident service, update person:", person);
    let returnItem = {};
    await axios
        .put(`${store.apiUrl}/incident/${incidentId}/updateperson`, person)
        .then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
export async function createPerson(incidentId, person) {
    console.log("inside incident service, create person:", person);
    let returnItem = {};
    await axios
        .post(`${store.apiUrl}/incident/${incidentId}/addperson`, person)
        .then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
function fixDate(theDate) {
    return dayjs(theDate.toString()).format("YYYY-MM-DDTHH:mm");
}
