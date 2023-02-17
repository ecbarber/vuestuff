import type { tPersonRole } from "@/models/tPersonRole";
import axios from "axios";
import { store } from "../services/store";

export async function getItemList(): Promise<any> {
  let returnList = {};
  await axios.get(`${store.apiUrl}/personroles`).then((response) => {
    returnList = response.data;
  });
  return returnList;
}

export async function getItem(id: String | undefined): Promise<any> {
  let returnItem = {};
  await axios.get(`${store.apiUrl}/personrole/${id}`).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function createItem(item: tPersonRole): Promise<any> {
  let returnItem = {};
  await axios.post(`${store.apiUrl}/personrole`, item).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function updateItem(
  id: String | undefined,
  item: tPersonRole
): Promise<any> {
  let returnItem = {};
  await axios.put(`${store.apiUrl}/personrole/${id}`, item).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}
