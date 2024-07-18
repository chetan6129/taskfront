<template>
    <div class="task-form-container">
      <h4>Add a Task</h4>
      <form @submit="onSubmit" class="task-form">
        <input
          type="text"
          v-model="name"
          placeholder="Add a task here"
          class="task-input"
        />
        <input type="submit" value="Add" class="submit-button" />
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from "vuex";
  export default {
    name: "AddTask",
    data() {
      return {
        name: "",
      };
    },
    methods: {
      ...mapActions(["addTasks"]),
      onSubmit(e) {
        let token = localStorage.getItem("user");
        e.preventDefault();
        this.addTasks({ name: this.name, token });
        this.name = "";
      },
    },
  };
  </script>
  
  <style scoped>
  h4 {
    color: white;
  }
  .task-form-container {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      background-color: #23292F;
      box-shadow: 0 4px 6px rgba(1.5, 1.5, 1.5, 1.5);
      border-radius: 10px;
      text-align: center;
  }
  
  .task-form {
      display: flex;
      flex-direction: column;
      gap: 10px;
  }
  
  .task-input {
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      border-radius: 5px;
      transition: border-color 0.3s ease;
      background-color: #ADB8C2;
  }
  
  .task-input:focus {
      outline: none;
      border-color: #007BFF;
  }
  
  .submit-button {
      padding: 10px;
      font-size: 16px;
      color: #fff;
      background-color: #3D4752;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
      background-color: #687A8D;
  }
  </style>