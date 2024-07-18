<template>
    <navBar />
    <router-view />
  </template>
  
  <script>
  import navBar from "./components/navBar.vue";
  export default {
    components: { navBar },
  };
  </script>
  
  <style>
  * {
    font-family: "Poppins", sans-serif;
  }
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  </style>
  