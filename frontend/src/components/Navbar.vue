<template>
  <nav class="navbar navbar-expand-md custom-nav">
    <div class="container">
      <RouterLink
        class="navbar-brand"
        :style="{ color: 'lightgreen' }"
        v-bind:to="{ name: 'home' }"
        >{{ brandName }}</RouterLink
      >

      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink
            class="nav-link"
            aria-current="page"
            v-bind:to="{ name: 'home' }"
            >Home</RouterLink
          >
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" v-bind:to="{ name: 'books' }"
            >Books</RouterLink
          >
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <RouterLink class="nav-link" v-bind:to="{ name: 'dashboard' }"
            >My Dashboard</RouterLink
          >
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <RouterLink class="nav-link" v-bind:to="{ name: 'login' }"
            >Login</RouterLink
          >
        </li>
        <li class="nav-item" v-if="!isLoggedIn">
          <RouterLink class="nav-link" v-bind:to="{ name: 'register' }"
            >Register</RouterLink
          >
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button class="nav-link" @click="logoutUser">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "@/stores/authStore.js";
import { mapState, mapActions } from "pinia";

export default {
  name: "Navbar",
  data() {
    return {
      brandName: "Book App",
    };
  },
  computed: {
    ...mapState(useAuthStore, ["isLoggedIn"]),
  },
  methods: {
    ...mapActions(useAuthStore, ["logout"]),
    logoutUser() {
      this.logout();
    },
  },
};
</script>

<style scoped>
.custom-nav {
  background-color: var(--color-primary);
  padding: 15px;
}

.navbar-brand {
  color: white;
  padding: 0;
  margin: 0;
  font-size: 23px;
  font-weight: bold;
}

.nav-link {
  color: #fff;
  padding: 10px 23px !important;
  text-align: center;
}

.nav-link:hover {
  color: var(--color-secondary);
}

.nav-link-active {
  color: var(--color-secondary);
}
</style>
