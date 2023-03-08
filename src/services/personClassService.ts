import type { tPersonClass } from "@/models/tPersonClass";
import axios from "axios";
import { store } from "../services/store";

export async function getItemList(): Promise<any> {
  let returnList = {};
  await axios.get(`${store.apiUrl}/personclasses`).then((response) => {
    returnList = response.data;
  });
  return returnList;
}

export async function getItem(id: String | undefined): Promise<any> {
  let returnItem = {};
  await axios.get(`${store.apiUrl}/personclass/${id}`).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function createItem(item: tPersonClass): Promise<any> {
  let returnItem = {};
  await axios.post(`${store.apiUrl}/personclass`, item).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function updateItem(
  id: String | undefined,
  item: tPersonClass
): Promise<any> {
  let returnItem = {};
  await axios
    .put(`${store.apiUrl}/personclass/${id}`, item)
    .then((response) => {
      returnItem = response.data;
    });
  return returnItem;
}
