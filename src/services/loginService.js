import { useSSRContext } from "vue";
import { store } from "../services/store";
export function loginUser(model) {
    const response = {
        userName: model.userName,
        passWord: model.passWord,
        success: false,
        message: "",
    };
    if (model.passWord == "Testing123!") {
        response.success = true;
        localStorage.setItem("userName", model.userName);
        localStorage.setItem("isAdmin", "false");
        localStorage.setItem("isLoggedIn", "true");
        store.isLoggedIn = true;
        store.userName = model.userName;
        if (model.userName.toLowerCase() == "admin" ||
            model.userName.toLowerCase() == "ebarber") {
            store.isAdmin = true;
            localStorage.setItem("isAdmin", "true");
        }
    }
    else {
        response.success = false;
        response.message = "Login failed!";
        store.isLoggedIn = false;
        localStorage.setItem("userName", "");
        localStorage.setItem("isAdmin", "false");
        localStorage.setItem("isLoggedIn", "false");
    }
    return response;
}
export function logOutUser() {
    store.isLoggedIn = false;
    store.userName = "";
    localStorage.setItem("userName", "");
    localStorage.setItem("isAdmin", "false");
    localStorage.setItem("isLoggedIn", "false");
}
