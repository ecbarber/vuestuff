import type { User } from "@/models/User";
import axios from "axios";
import { store } from "../services/store";

export async function getAllUsers(): Promise<any> {
  let returnList = {};
  await axios.get(`${store.apiUrl}/users`).then((response) => {
    returnList = response.data;
  });
  return returnList;
}

export async function getUser(id: String | undefined): Promise<any> {
  let returnItem = {};
  await axios.get(`${store.apiUrl}/user/${id}`).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function findByUserName(
  userName: String | undefined
): Promise<any> {
  let returnItem = {};
  await axios
    .get(`${store.apiUrl}/user/username/${userName}`)
    .then((response) => {
      returnItem = response.data;
    });
  return returnItem;
}

export async function createUser(theUser: User): Promise<any> {
  let returnItem = {};
  await axios.post(`${store.apiUrl}/user`, theUser).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}

export async function updateUser(
  id: String | undefined,
  user: User
): Promise<any> {
  let returnItem = {};
  await axios.put(`${store.apiUrl}/user/${id}`, user).then((response) => {
    returnItem = response.data;
  });
  return returnItem;
}
