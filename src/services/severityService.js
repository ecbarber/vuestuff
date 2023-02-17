import axios from "axios";
import { store } from "../services/store";
export async function getSeverityList() {
    let returnList = {};
    await axios.get(`${store.apiUrl}/severitys`).then((response) => {
        returnList = response.data;
    });
    return returnList;
}
export async function getSeverity(id) {
    let returnItem = {};
    await axios.get(`${store.apiUrl}/severity/${id}`).then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
export async function createSeverity(item) {
    let returnItem = {};
    await axios.post(`${store.apiUrl}/severity`, item).then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
export async function updateSeverity(id, item) {
    let returnItem = {};
    await axios.put(`${store.apiUrl}/severity/${id}`, item).then((response) => {
        returnItem = response.data;
    });
    return returnItem;
}
