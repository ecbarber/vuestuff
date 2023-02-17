import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../components/NotFound.vue";
import { store } from "../services/store";
import { ref } from "vue";
import EditIncidentView from "../views/EditIncidentView.vue";
import IncidentReportsView from "../views/IncidentReportsView.vue";
import ManageLocationsView from "../views/ManageLocations.vue";
import ManageSeverityView from "../views/ManageSeverity.vue";
import ManageStatusView from "../views/ManageStatus.vue";
import ManagePersonClassView from "../views/ManagePersonClass.vue";
import LoginView from "../views/LoginView.vue";
var isLoggedIn = ref(localStorage.getItem("isLoggedIn") == "true");
var isAdmin = ref(localStorage.getItem("isAdmin") == "true");
var userName = ref(localStorage.getItem("userName") ?? "");
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            component: LoginView,
        },
        {
            path: "/",
            name: "incidentsx",
            component: IncidentReportsView,
        },
        {
            path: "/incidents",
            name: "incidents",
            component: IncidentReportsView,
        },
        {
            path: "/editincident/:id?",
            name: "editincident",
            component: EditIncidentView,
        },
        {
            path: "/admin/managelocations",
            name: "managelocations",
            component: ManageLocationsView,
        },
        {
            path: "/admin/manageseverity",
            name: "manageseverity",
            component: ManageSeverityView,
        },
        {
            path: "/admin/managestatus",
            name: "managestatus",
            component: ManageStatusView,
        },
        {
            path: "/admin/managepersonclass",
            name: "managepersonclass",
            component: ManagePersonClassView,
        },
        {
            path: "/:catchAll(.*)",
            component: NotFound,
        },
    ],
});
router.beforeEach(async (to) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ["/login"];
    const authRequired = !publicPages.includes(to.path);
    if (authRequired && !isLoggedIn) {
        return "/login";
    }
});
export default router;
