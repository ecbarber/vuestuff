<script setup lang="ts">
import { ref, reactive } from "vue";
import textbox from "./textbox.vue";
import FormValidate from "./FormValidate.vue";
import type { iLogin, iLoginResponse } from "../../interfaces/login";
import { loginUser } from "../../services/loginService";
import router from "../../router/index";

const loginpage = ref();

const props = defineProps({
  Title: {
    type: String,
    default: "Please log in...",
    required: false,
  },
  class: {
    type: String,
    default: "container border",
  },
});

const loginModel = ref<iLogin>({
  userName: "",
  passWord: "",
});

var response = reactive({
  userName: "",
  passWord: "",
  success: false,
  message: "",
});

async function handleSubmit(event: Event) {
  if (loginpage.value.validatepage()) {
    response = await loginUser(loginModel.value);
    if (response.success) {
      router.push("/");
    }
  }
}
</script>
<template>
  <FormValidate ref="loginpage">
    <template #body>
      <div :class="class">
        <div class="row mt-3">
          <div class="col d-flex justify-content-center">
            <h4>{{ Title }}</h4>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <textbox
              input-type="text"
              id="txtUserName"
              place-holder="Enter User Name..."
              v-model="loginModel.userName"
              :required="true"
              min-length="4"
            ></textbox>
          </div>
          <div class="col-md-4"></div>
        </div>
        <div class="row">
          <div class="col-md-4"></div>
          <div class="col-md-4">
            <textbox
              input-type="password"
              id="txtPassword"
              place-holder="Enter Password..."
              v-model="loginModel.passWord"
              :required="true"
              min-length="8"
            ></textbox>
          </div>
        </div>
        <div class="row mt-4 mb-4">
          <div class="col d-flex justify-content-center">
            <a href="#" class="btn btn-outline-success" @click="handleSubmit"
              >Submit Login</a
            >
          </div>
        </div>
      </div>
    </template>
  </FormValidate>
</template>
<style scoped></style>
