import type { tTreatmentType } from "@/models/tTreatmentType";
import axios from "axios";
import { store } from "./store";

export async function getTreatmentTypeList(): Promise<any> {
  let returnList = {};
  await axios.get(`${store.apiUrl}/treatmenttypes`).then((response) => {
    returnList = response.data;
  });
  return returnList;
}

export async function getTreatmentTypeItem(
  id: String | undefined
): Promise<any> {
  let returnItem = {};
  await axios.get(`${store.apiUrl}/treatmenttype/${id}`).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function createTreatmentTypeItem(
  item: tTreatmentType
): Promise<any> {
  let returnItem = {};
  await axios.post(`${store.apiUrl}/treatmenttype`, item).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function updateTreatmentTypeItem(
  id: String | undefined,
  item: tTreatmentType
): Promise<any> {
  let returnItem = {};
  await axios
    .put(`${store.apiUrl}/treatmenttype/${id}`, item)
    .then((response) => {
      returnItem = response.data;
    });
  return returnItem;
}
