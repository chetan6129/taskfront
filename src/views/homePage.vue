<template>
    <div class="task-tracker-container">
      <h3 class="title" style="color: aliceblue;">Task Manager</h3>
      <addTask v-if="isAuthenticated" />
      <div id="tasks" v-if="isAuthenticated">
        <h4>Tasks to be finished</h4>
        <showTask :tasks="completedTask" type="not-completed" class="task-section" />
        <h4>Finished tasks</h4>
        <showTask :tasks="completedTask" type="completed" class="task-section" />
      </div>
      <div v-else class="welcome-message">
        <h4 style="color: black;">Welcome to the Task Manager!</h4>
        <p style="color: black;">Please log in or sign up to manage your tasks.</p>
      </div>
    </div>
  </template>
  
  
  <script>
  import { mapGetters, mapActions } from "vuex";
  import showTask from "../components/showTask.vue";
  import addTask from "../components/addTask.vue";
  import VueJwtDecode from "vue-jwt-decode";
  
  export default {
    name: "TaskTracker",
    computed: {
      ...mapGetters(["allTasks"]),
      ...mapGetters("auth", ["isAuthenticated"]),
      completedTask() {
        return this.allTasks;
      },
    },
    methods: {
      ...mapActions("auth", ["login"]),
      ...mapActions(["fetchTasks"]),
    },
  
    mounted() {
      this.login();
      let token = localStorage.getItem("user");
      if (token != null) {
        try {
          let decoded = VueJwtDecode.decode(token);
          this.user = decoded;
          this.fetchTasks(token);
        } catch (error) {
          console.log(error, "error from decoding token");
        }
      }
    },
    components: {
      showTask,
      addTask,
    },
  };
  </script>
  <style scoped>
  .task-tracker-container {
    color: #FFFFFF;
    max-width: 800px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
    background-color: #8A99A8;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
  }
  
  .task-section {
    margin-bottom: 20px;
  }
  
  .welcome-message {
    text-align: center;
    color: #555;
    padding: 20px;
    background: #A2ADB9;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(1, 1, 1, 1);
  }
  </style>