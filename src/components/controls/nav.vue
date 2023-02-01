<script setup lang="ts">
import { store } from "../../services/store";
import { logOutUser } from "../../services/loginService";
import router from "../../router/index";
const logOut = function () {
  logOutUser();
  router.push("/login");
};
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
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item" v-if="store.isLoggedIn">
            <RouterLink to="/incidents" class="nav-link">Incidents</RouterLink>
          </li>
          <li class="nav-item" v-if="store.isLoggedIn">
            <RouterLink to="/editincident" class="nav-link"
              >Edit Incident</RouterLink
            >
          </li>
          <li class="nav-item dropdown">
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
                <a class="dropdown-item" href="/admin/managelocations"
                  >Manage Locations</a
                >
              </li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <span class="navbar-text" v-if="store.isLoggedIn"
            >Welcome "{{ store.userName }}"</span
          >
          <li class="nav-item" v-if="store.isLoggedIn">
            <a href="#" class="nav-link" @click="logOut">Log Out</a>
          </li>
          <li class="nav-item" v-if="!store.isLoggedIn">
            <RouterLink to="/login" class="nav-link">Log In</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
