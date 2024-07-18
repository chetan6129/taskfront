<template>
    <nav class="navbar">
      <router-link to="/" class="nav-link logo">Task Manager</router-link>
      <div class="nav-auth-links">
        <router-link v-if="!isAuthenticated" to="/signin" class="nav-link">Login</router-link>
        <router-link v-if="!isAuthenticated" to="/signup" class="nav-link">Sign Up</router-link>
        <router-link
          @click="handleLogout"
          v-if="isAuthenticated"
          to="/signin"
          class="nav-link logout"
        >Logout</router-link>
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
    background-color: #23292F;
    padding: 15px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
  }
  
  .nav-link {
    color: #fff;
    text-decoration: none;
    margin: 0 10px;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background-color 0.3s, color 0.3s;
  }
  
  .nav-link:hover {
    background-color: #687a8d;
    color: #fff;
  }
  
  .logo {
    font-weight: bold;
    font-size: 1.5em;
  }
  
  .nav-auth-links {
    display: flex;
    align-items: center;
  }
  </style>
  
  