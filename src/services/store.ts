import { reactive } from "vue";
export const store = reactive({
  isLoggedIn: false,
  userName: "",
  fullName: "",
  email: "",
  apiUrl: "http://localhost:3000/api",
  isAdmin: false,
  home_location: "",
  loadFromLocalStorage() {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") == "true";
    this.isAdmin = localStorage.getItem("isAdmin") == "true";
    this.userName = localStorage.getItem("userName") ?? "";
    this.fullName = localStorage.getItem("fullName") ?? "";
    this.email = localStorage.getItem("email") ?? "";
    this.home_location = localStorage.getItem("home_location") ?? "";
  },
});
