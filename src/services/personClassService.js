import axios from "axios";
import { store } from "../services/store";
export async function getItemList() {
    console.log("SERVICE getItemList");
    let returnList = {};
    await axios.get(`${store.apiUrl}/personclasses`).then((response) => {
        returnList = response.data;
    });
    return returnList;
}
export async function getItem(id) {
    let returnItem = {};
    await axios.get(`${store.apiUrl}/personclass/${id}`).then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
export async function createItem(item) {
    let returnItem = {};
    await axios.post(`${store.apiUrl}/personclass`, item).then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
export async function updateItem(id, item) {
    let returnItem = {};
    await axios
        .put(`${store.apiUrl}/personclass/${id}`, item)
        .then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
