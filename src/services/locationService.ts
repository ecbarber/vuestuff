import type { tLocation } from "@/models/tLocation";
import axios from "axios";
import { store } from "../services/store";

export async function getAllLocations(): Promise<any> {
  let returnList = {};
  await axios.get(`${store.apiUrl}/locations`).then((response) => {
    returnList = response.data;
  });
  return returnList;
}

export async function getLocation(id: String | undefined): Promise<any> {
  let returnItem = {};
  await axios.get(`${store.apiUrl}/location/${id}`).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function createLocation(location: tLocation): Promise<any> {
  let returnItem = {};
  await axios.post(`${store.apiUrl}/location`, location).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function updateLocation(
  id: String | undefined,
  location: tLocation
): Promise<any> {
  let returnItem = {};
  await axios
    .put(`${store.apiUrl}/location/${id}`, location)
    .then((response) => {
      returnItem = response.data;
    });
  return returnItem;
}
