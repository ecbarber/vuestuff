import { createRouter, createWebHistory } from "vue-router";
import NotFound from "../components/NotFound.vue";
import EditIncidentView from "@/views/EditIncidentView.vue";
import IncidentReportsView from "@/views/IncidentReportsView.vue";
import ManageLocationsView from "@/views/ManageLocations.vue";
import ManageSeverityView from "@/views/ManageSeverity.vue";
import ManageStatusView from "@/views/ManageStatus.vue";
import ManagePersonClassView from "@/views/ManagePersonClass.vue";
import ManagePersonRoleView from "@/views/ManagePersonRole.vue";
import ManageTreatmentTypeView from "@/views/ManageTreatmentType.vue";
import LoginView from "@/views/LoginView.vue";
import SystemUsers from "@/views/SystemUsers.vue";
var isLoggedIn = localStorage.getItem("isLoggedIn") == "true";
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
            path: "/admin/managepersonrole",
            name: "managepersonrole",
            component: ManagePersonRoleView,
        },
        {
            path: "/admin/managetreatmenttype",
            name: "managepersonclass",
            component: ManageTreatmentTypeView,
        },
        {
            path: "/admin/users",
            name: "manageusers",
            component: SystemUsers,
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
    `TO: ${to.fullPath} LOGGED IN : ${isLoggedIn}`;
    if (authRequired && !isLoggedIn) {
        return "/login";
    }
});
export default router;
