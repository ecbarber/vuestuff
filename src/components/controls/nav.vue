<script setup lang="ts">
import { logOutUser } from "../../services/loginService";
import router from "../../router/index";
import { ref, reactive, watch } from "vue";
import { store } from "../../services/store";

const logOut = function () {
  logOutUser();
  router.push("/login");
};

var isLoggedIn = store.isLoggedIn as Boolean;
var isAdmin = store.isAdmin as Boolean;
var userName = store.userName as String;

watch(store, () => {
  isLoggedIn = reactive(store.isLoggedIn as Boolean);
  isAdmin = reactive(store.isAdmin as Boolean);
  userName = reactive(store.userName as String);
});

const myConst = store;
</script>
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">SR Incident Reports</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item" v-if="store.isLoggedIn">
            <RouterLink to="/incidents" class="nav-link">Incidents</RouterLink>
          </li>
          <li class="nav-item dropdown" v-if="store.isAdmin">
            <a
              class="nav-link dropdown-toggle"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Admin
            </a>
            <ul class="dropdown-menu">
              <li>
                <RouterLink to="/admin/managelocations" class="dropdown-item"
                  >Manage Locations</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/admin/manageseverity" class="dropdown-item"
                  >Manage Severity List</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/admin/managestatus" class="dropdown-item"
                  >Manage Status List</RouterLink
                >
              </li>
              <li>
                <router-link to="/admin/managepersonclass" class="dropdown-item"
                  >Manage Person Classes</router-link
                >
              </li>
              <li>
                <RouterLink to="/admin/managepersonrole" class="dropdown-item"
                  >Manage Person Roles</RouterLink
                >
              </li>
              <li>
                <RouterLink
                  to="/admin/managetreatmenttype"
                  class="dropdown-item"
                  >Manage Treatment Types</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/admin/users" class="dropdown-item"
                  >Manage System Users</RouterLink
                >
              </li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <span class="navbar-text" v-if="store.isLoggedIn"
            >Welcome {{ store.fullName }}</span
          >
          <li class="nav-item" v-if="store.isLoggedIn">
            <a href="#" class="nav-link text-primary" @click="logOut"
              >Log Out</a
            >
          </li>
          <li class="nav-item" v-if="!store.isLoggedIn">
            <RouterLink to="/login" class="nav-link">Log In</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
