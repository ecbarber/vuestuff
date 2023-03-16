import type { iAttachment, Attachment } from "@/models/Attachment";
import axios from "axios";
import { store } from "../services/store";

export async function createAttachment(attachment: Attachment): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .post(`${store.apiUrl}/attachment`, attachment)
      .then((response) => {
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function incidentAttachments(incId: String): Promise<any> {
  return new Promise((resolve, reject) => {
    axios
      .get(`${store.apiUrl}/incident-attachments/${incId}`)
      .then((response) => {
        console.log("XXXXX>>>>>>>", response.data);
        resolve(response);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
