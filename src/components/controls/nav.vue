<script setup lang="ts">
import { logOutUser } from "../../services/loginService";
import router from "../../router/index";
import { ref } from "vue";

const logOut = function () {
  logOutUser();
  router.push("/login");
};

var isLoggedIn = ref<boolean>(localStorage.getItem("isLoggedIn") == "true");
var isAdmin = ref<boolean>(localStorage.getItem("isAdmin") == "true");
var userName = ref<string>(localStorage.getItem("userName") ?? "");
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
          <li class="nav-item" v-if="isLoggedIn">
            <RouterLink to="/incidents" class="nav-link"
              >Current Incidents</RouterLink
            >
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <RouterLink to="/incidents" class="nav-link"
              >All Incidents</RouterLink
            >
          </li>
          <li class="nav-item dropdown" v-if="isAdmin">
            <a
              class="nav-link dropdown-toggle"
              href="#"
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
                <RouterLink to="/admin/managepersonclass" class="dropdown-item"
                  >Manage Person Classes</RouterLink
                >
              </li>
              <li>
                <RouterLink to="/admin/managepersonrole" class="dropdown-item"
                  >Manage Person Roles</RouterLink
                >
              </li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <span class="navbar-text" v-if="isLoggedIn"
            >Welcome "{{ userName }}"</span
          >
          <li class="nav-item" v-if="isLoggedIn">
            <a href="#" class="nav-link" @click="logOut">Log Out</a>
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <RouterLink to="/login" class="nav-link">Log In</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
