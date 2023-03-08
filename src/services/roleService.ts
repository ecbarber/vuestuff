import type { Role } from "@/models/Role";
import axios from "axios";
import { store } from "../services/store";

export async function getList(): Promise<any> {
  let returnList = {};
  await axios.get(`${store.apiUrl}/roles`).then((response) => {
    returnList = response.data;
  });
  return returnList;
}

export async function getRoleItem(id: String | undefined): Promise<any> {
  let returnItem = {};
  await axios.get(`${store.apiUrl}/role/${id}`).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function createRoleItem(item: Role): Promise<any> {
  let returnItem = {};
  await axios.post(`${store.apiUrl}/role`, item).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function updateRoleItem(
  id: String | undefined,
  item: Role
): Promise<any> {
  let returnItem = {};
  await axios.put(`${store.apiUrl}/role/${id}`, item).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}
