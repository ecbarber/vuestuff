import { useSSRContext } from "vue";
import type { iLogin, iLoginResponse } from "../interfaces/login";
import { store } from "../services/store";

export function loginUser(model: iLogin): iLoginResponse {
  const response: iLoginResponse = {
    userName: model.userName,
    passWord: model.passWord,
    success: false,
    message: "",
  };

  if (model.passWord == "Testing123!") {
    response.success = true;
    response.message = "Login successful!";
    store.isLoggedIn = true;
    store.userName = model.userName;
    if (
      model.userName.toLowerCase() == "admin" ||
      model.userName.toLowerCase() == "ebarber"
    ) {
      store.isAdmin = true;
    }
  } else {
    response.success = false;
    response.message = "Login failed!";
    store.isLoggedIn = false;
  }
  return response;
}

export function logOutUser() {
  store.isLoggedIn = false;
  store.userName = "";
}
