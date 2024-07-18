<template>
    <nav class="navbar">
      <router-link to="/" class="nav-link">Task Manager</router-link>
      <div class="nav-auth-links">
        <router-link v-if="!isAuthenticated" to="/signin" class="nav-link"
          >Login</router-link
        >
        <router-link v-if="!isAuthenticated" to="/signup" class="nav-link"
          >Sign Up</router-link
        >
        <router-link
          @click="handleLogout"
          v-if="isAuthenticated"
          to="/signin"
          class="nav-link"
          >Logout</router-link
        >
      </div>
    </nav>
  </template>
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  export default {
    name: "navBar",
    computed: {
      ...mapGetters("auth", ["isAuthenticated"]),
    },
    methods: {
      ...mapActions("auth", ["logout"]),
      handleLogout() {
        this.logout();
      },
    },
  };
  </script>
  
  <style scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background-color: #d51616;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
  }
  
  .nav-link {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    font-size: 18px;
    transition: color 0.3s ease, background-color 0.3s ease;
    padding: 5px 10px;
    border-radius: 3px;
  }
  
  .nav-link:hover {
    color: #00ff40;
    background-color: #d25cbe;
  }
  
  .nav-auth-links {
    display: flex;
    align-items: center;
  }
  </style>
  
  