import type { tStatus } from "@/models/tStatus";
import axios from "axios";
import { store } from "../services/store";

export async function getStatusList(): Promise<any> {
  let returnList = {};
  await axios.get(`${store.apiUrl}/statuslist`).then((response) => {
    returnList = response.data;
  });
  return returnList;
}

export async function getStatus(id: String | undefined): Promise<any> {
  let returnItem = {};
  await axios.get(`${store.apiUrl}/status/${id}`).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function createStatus(item: tStatus): Promise<any> {
  let returnItem = {};
  await axios.post(`${store.apiUrl}/status`, item).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function updateStatus(
  id: String | undefined,
  item: tStatus
): Promise<any> {
  let returnItem = {};
  await axios.put(`${store.apiUrl}/status/${id}`, item).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}
