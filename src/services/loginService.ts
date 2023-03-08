import { reactive, useSSRContext } from "vue";
import type { iLogin, iLoginResponse } from "../interfaces/login";
import { store } from "../services/store";
import { findByUserName } from "../services/userService";
import { User } from "../models/User";

export async function loginUser(model: iLogin): Promise<iLoginResponse> {
  var response: iLoginResponse = {
    userName: "",
    passWord: "",
    success: false,
    message: "",
    fullName: "",
  };

  if (model.passWord == "Testing123!") {
    response.success = true;

    let theUser = reactive({
      id: "",
      first_name: "",
      last_name: "",
      user_name: "",
      email: "",
      home_location: "",
    });

    await findByUserName(model.userName).then((result) => {
      theUser = result.DATA;
      if (theUser) {
        localStorage.setItem("userName", theUser.user_name);
        localStorage.setItem(
          "fullName",
          `${theUser.first_name} ${theUser.last_name}`
        );
        localStorage.setItem("isAdmin", "false");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("email", theUser.email);
        localStorage.setItem("home_location", theUser.home_location);

        store.isAdmin = false;
        store.isLoggedIn = true;
        store.userName = theUser.user_name;
        store.fullName = `${theUser.first_name} ${theUser.last_name}`;
        store.email = theUser.email;
        store.home_location = theUser.home_location;

        response.message = "Login Success";
        response.success = true;
        response.userName = "ebarber";
        response.fullName = store.fullName;
      } else {
        response.success = false;
        response.message = "Login failed!";
        localStorage.setItem("userName", "");
        localStorage.setItem("isAdmin", "false");
        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("email", "");
        localStorage.setItem("home_location", "");
        store.userName = "";
        store.isAdmin = false;
        store.isLoggedIn = false;
        store.email = "";
        store.home_location = "";
      }
    });

    if (
      model.userName.toLowerCase() == "admin" ||
      model.userName.toLowerCase() == "ebarber"
    ) {
      localStorage.setItem("isAdmin", "true");
      store.isAdmin = true;
    }
  } else {
    response.success = false;
    response.message = "Login failed!";
    localStorage.setItem("userName", "");
    localStorage.setItem("isAdmin", "false");
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("email", "");
    localStorage.setItem("home_location", "");
    store.userName = "";
    store.isAdmin = false;
    store.isLoggedIn = false;
    store.email = "";
    store.home_location = "";
  }
  return response;
}

export function logOutUser() {
  localStorage.setItem("userName", "");
  localStorage.setItem("isAdmin", "false");
  localStorage.setItem("isLoggedIn", "false");
  localStorage.setItem("email", "");
  store.userName = "";
  store.isAdmin = false;
  store.isLoggedIn = false;
  store.email = "";
}
