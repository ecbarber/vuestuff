import { reactive } from "vue";
export const store = reactive({
  isLoggedIn: false,
  userName: "",
  apiUrl: "http://localhost:3000/api",
  isAdmin: false,
});
