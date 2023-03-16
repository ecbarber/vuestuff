<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import NativeModal from "../controls/nativemodal.vue";
import FormValidate from "./FormValidate.vue";
import dropzone from "./dropzone.vue";
import { MetaStore } from "@/services/metaStore";
import { store } from "../../services/store";
import { fixDate } from "../../services/fixDate";
import {
  createAttachment,
  incidentAttachments,
} from "../../services/attachmentService";
import type { iAttachment } from "../../models/Attachment";

const imageExtensions = ["image/jpeg", "image/jpg", "image/png"];

const videoExtensions = [
  "video/mp4",
  "video/x-msvideo",
  "video/quicktime",
  "video/x-ms-wmv",
  "video/avi",
];

const docExtensions = ["application/pdf"];

const validExtensions = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "video/mp4",
  "video/x-msvideo",
  "video/quicktime",
  "video/x-ms-wmv",
  "video/avi",
  "application/pdf",
];

const addFilesModal = ref();
const editForm = ref();
const previewImage = ref();
const input = ref();
var images: null;

var pageState = reactive({
  isLoading: false,
  showSavedMessage: false,
  attachmentList: Array<iAttachment>(),
});

onMounted(() => {
  refreshList();
});

async function refreshList() {
  pageState.attachmentList = [];
  setTimeout(function () {
    incidentAttachments(props.incidentId).then((data) => {
      console.log("attachments: ", data);
      pageState.attachmentList = data.data;
      pageState.isLoading = false;
    });
  }, 500);
}

var currentFile = reactive({
  _id: "",
  incidentId: "",
  file_name: "",
  path: "",
  description: "",
  file_type: "",
  created_by: "",
  created_date: "",
  lastupdated_by: "",
  lastupdated_date: "",
  file_data: "" as string,
});

const props = defineProps({
  titleText: {
    type: String,
    default: "People Editor Title",
    required: false,
  },
  subTitleText: {
    type: String,
    default: "Please record all persons associated with this incident.",
    required: false,
  },
  newButtonText: {
    type: String,
    default: "Add A File",
    required: true,
  },
  class: {
    type: String,
    default: "container border",
    required: false,
  },
  incidentId: {
    type: String,
    default: "",
  },
});

function showEdit() {
  addFilesModal.value.showMe(true);
}

function cancelEdit() {
  currentFile.description = "";
  currentFile.file_name = "";
  currentFile.file_type = "";
  currentFile.file_data = "";
  addFilesModal.value.showMe(false);
}

function saveAttachment(event: Event) {
  if (editForm.value.validatepage()) {
    createAttachment(currentFile)
      .then((response) => {
        addFilesModal.value.showMe(false);
      })
      .then(() => {
        refreshList();
      });
  }
}

function filesDropped(e: any) {
  let theFile = e[0];
  previewFile(theFile);
}

function fileUploaded() {
  previewFile(input.value.files[0]);
}

function browseForFile() {
  input.value.click();
}

function getIconClass(fileType: String) {
  if (imageExtensions.includes(fileType as string)) {
    return "bi bi-file-image";
  }
  if (videoExtensions.includes(fileType as string)) {
    return "bi bi-camera-reels";
  }
  if (docExtensions.includes(fileType as string)) {
    return "bi bi-file-pdf";
  }
}
function previewFile(file: any) {
  if (!validExtensions.includes(file.type)) {
    alert("Unsupported File Type");
    return;
  }

  if (
    !imageExtensions.includes(file.type) &&
    !videoExtensions.includes(file.type)
  ) {
    previewImage.value.classList.add("hidden");
  }

  currentFile.created_by = store.fullName;
  currentFile.lastupdated_by = store.fullName;
  currentFile.incidentId = props.incidentId;
  currentFile.file_name = file.name;
  currentFile.file_type = file.type;
  currentFile.created_date = fixDate(new Date());
  currentFile.lastupdated_date = fixDate(new Date());

  let fr = new FileReader();
  fr.readAsDataURL(file);
  fr.onload = () => {
    //currentFile.file_data = fr.result as string;
    currentFile.file_data = "";
  };

  let fileReader = new FileReader();
  fileReader.onload = () => {
    fileURL.value = fileReader.result;
    previewImage.value.src = fileURL.value;
  };
  fileReader.readAsDataURL(file);
}
const fileURL = ref();

function uploadFile() {}
</script>
<template>
  <div class="border rounded-2 mt-2 p-2">
    <div class="row mt-2 ms-2 me-2">
      <div class="col align-items-middle">
        <h4>{{ titleText }}</h4>
      </div>
      <div class="col d-flex align-items-middle justify-content-end">
        <button class="btn btn-outline-danger" v-on:click.prevent="showEdit()">
          {{ newButtonText }}
        </button>
      </div>
    </div>
    <div class="row ms-2">
      <div class="col align-items-middle">
        <em>{{ subTitleText }}</em>
      </div>
    </div>
    <div class="row ms-2">
      <table
        class="table table-bordered table-striped"
        v-if="pageState.attachmentList.length > 0"
      >
        <thead>
          <tr>
            <th></th>
            <th>File Name</th>
            <th>File Type</th>
            <th>Description</th>
            <th>Uploaded By</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="itm in pageState.attachmentList">
            <td class="text-center">
              <i v-bind:class="getIconClass(itm.file_type)"></i>
            </td>
            <td>{{ itm.file_name }}</td>
            <td>{{ itm.file_type }}</td>
            <td>{{ itm.description }}</td>
            <td>{{ itm.created_by }}</td>
            <td>{{ itm.created_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <NativeModal ref="addFilesModal">
    <template #header
      ><div class="container">
        <div class="row border rounded-2 p-2">
          <div class="col align-items-middle text-center">
            <h4 class="text-primary align-middle">Add or Edit an Attachment</h4>
          </div>
        </div>
      </div></template
    >
    <template #body
      ><FormValidate ref="editForm">
        <template #body>
          <div class="container">
            <div class="row">
              <div class="col text-center">
                <dropzone
                  v-on:files-dropped="filesDropped"
                  v-if="currentFile.file_name === ''"
                ></dropzone>
                <img
                  ref="previewImage"
                  class="img-thumbnail"
                  style="max-height: 300px"
                />
              </div>
            </div>
            <div class="row mt-1 d-flex align-items-center">
              <div class="col-10">
                <div class="form-floating mb-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="First Thing"
                    required
                    id="txtFileName"
                    v-model="currentFile.file_name"
                    readonly
                    disabled
                  />
                  <label for="txtFileName">File Name</label>
                </div>
                <input ref="input" type="file" hidden @change="fileUploaded" />
              </div>
              <div class="col text-center d-grid gap-2">
                <button
                  class="btn btn-outline-primary"
                  v-on:click.prevent="browseForFile"
                >
                  Browse
                </button>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col">
                <div class="form-floating mb-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="File Description"
                    required
                    id="txtDescription"
                    v-model="currentFile.file_type"
                    readonly
                    disabled
                  />
                  <label for="txtDescription">File Type</label>
                </div>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col">
                <div class="form-floating mb-1">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="File Description"
                    required
                    id="txtDescription"
                    v-model="currentFile.description"
                  />
                  <label for="txtDescription">File Description</label>
                </div>
              </div>
            </div>
          </div>
        </template>
      </FormValidate>
    </template>
    <template #footer>
      <button class="btn btn-outline-dark m-1" v-on:click.prevent="cancelEdit">
        Cancel
      </button>
      <button
        class="btn btn-outline-primary m-1"
        v-on:click.prevent="saveAttachment($event)"
      >
        Submit
      </button>
    </template>
  </NativeModal>
</template>

<style scoped>
.hidden {
  visibility: hidden;
}
</style>
