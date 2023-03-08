import {
  createRouter,
  createWebHistory,
  isNavigationFailure,
} from "vue-router";
//@ts-ignore
import NotFound from "../components/NotFound.vue";
//@ts-ignore
import EditIncidentView from "../views/EditIncidentView.vue";
//@ts-ignore
import IncidentReportsView from "../views/IncidentReportsView.vue";
//@ts-ignore
import ManageLocationsView from "../views/ManageLocations.vue";
//@ts-ignore
import ManageSeverityView from "../views/ManageSeverity.vue";
//@ts-ignore
import ManageStatusView from "../views/ManageStatus.vue";

import ManagePersonClassView from "../../views/ManagePersonClass.vue";
//@ts-ignore
import ManagePersonRoleView from "../views/ManagePersonRole.vue";
//@ts-ignore
import ManageTreatmentTypeView from "../views/ManageTreatmentType.vue";
//@ts-ignore
import LoginView from "../views/LoginView.vue";
//@ts-ignore
import SystemUsers from "../views/SystemUsers.vue";

import TestPageView from "../../views/TestPage.vue";

var isLoggedIn = localStorage.getItem("isLoggedIn") == "true";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/admin/managepersonclass",
      name: "managepersonclass",
      component: ManagePersonClassView,
    },
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
      path: "/admin/testpage",
      name: "testpage",
      component: TestPageView,
    },
    {
      path: "/:catchAll(.*)",
      component: NotFound,
    },
  ],
});

router.afterEach((to, from, failure) => {
  if (isNavigationFailure(failure)) {
    console.log("failed navigation", failure);
  }
});

router.beforeEach(async (to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path);

  `TO: ${to.fullPath} LOGGED IN : ${isLoggedIn}`;

  if (authRequired && !isLoggedIn) {
    return "/login";
  }
});

export default router;
