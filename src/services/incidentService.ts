import type { iIncidentReport, IncidentReport } from "@/models/IncidentReport";
import type { tPerson } from "@/models/tPerson";

import axios from "axios";
import { store } from "../services/store";
import dayjs from "dayjs";

export async function getAllIncidents(): Promise<any> {
  let returnList = {};
  await axios.get(`${store.apiUrl}/incidents`).then((response) => {
    returnList = response.data;
  });
  return returnList;
}

export async function getIncidentPersons(incidentId: string): Promise<any> {
  let returnList = {};
  await axios
    .get(`${store.apiUrl}/incidents/persons/byincident/${incidentId}`)
    .then((response) => {
      returnList = response.data;
    })
    .catch((error) => {
      return error;
    });
  return returnList;
}

export async function getIncident(
  id: String | undefined
): Promise<iIncidentReport> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${store.apiUrl}/incident/${id}`)
      .then((response) => {
        resolve(response.data as iIncidentReport);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function createIncident(incident: IncidentReport): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(`${store.apiUrl}/incident`, incident)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function updateIncident(
  id: String | undefined,
  incident: IncidentReport
): Promise<any> {
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

export async function updatePerson(
  incidentId: String | undefined,
  person: tPerson
): Promise<any> {
  let returnItem = {};
  axios
    .put(`${store.apiUrl}/incident/${incidentId}/updateperson`, person)
    .then((response) => {
      returnItem = response.data;
    });
  return returnItem;
}

export async function createPerson(
  incidentId: String | undefined,
  person: tPerson
): Promise<any> {
  axios
    .post(`${store.apiUrl}/incident/${incidentId}/addperson`, person)
    .then((response) => {
      return response.data;
    });
}

function fixDate(theDate: Date) {
  return dayjs(theDate.toString()).format("YYYY-MM-DDTHH:mm") as string;
}
