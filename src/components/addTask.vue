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
  .task-form-container {
      width: 100%;
      max-width: 400px;
      margin: 0 auto;
      padding: 20px;
      background-color: #f9f9f9;
      box-shadow: 0 4px 6px rgba(217, 19, 48, 0.1);
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
  }
  
  .task-input:focus {
      outline: none;
      border-color: #007BFF;
  }
  
  .submit-button {
      padding: 10px;
      font-size: 16px;
      color: #113ddc;
      background-color: #007BFF;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      transition: background-color 0.3s ease;
  }
  
  .submit-button:hover {
      background-color: #e92431;
  }
  </style>