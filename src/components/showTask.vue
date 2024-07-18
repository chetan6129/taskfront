<template>
    <div class="task-container">
      <div
        v-for="task in tasks"
        :key="task._id"
        :class="{ 'hide-task': shouldHideTask(task) }"
      >
        <div
          @click="UpdateTask(task._id)"
          class="task-card"
          :class="{ 'completed-task': task.completed }"
        >
          <span class="task-name">{{ task.name }}</span>
          <button @click.stop="handleDeleteTask(task._id)" class="delete-button">
            🗑️
          </button>
        </div>
      </div>
    </div>
  </template>
  
  
  
  <script>
  import { mapActions } from "vuex";
  
  export default {
    props: {
      tasks: {
        type: Array,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
    },
    methods: {
      ...mapActions(["updateTasks", "deleteTask"]),
      UpdateTask(taskId) {
        const token = localStorage.getItem("user");
        this.updateTasks({ taskId, token });
      },
      async handleDeleteTask(taskId) {
        const token = localStorage.getItem("user");
        await this.deleteTask({ taskId, token });
      },
      shouldHideTask(task) {
        return this.type === "completed" ? !task.completed : task.completed;
      },
    },
  };
  </script>
  
  <style scoped>
  .task-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 600px;
    margin: auto;
    padding: 20px;
  }
  
  .task-card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    transition: background-color 0.3s, transform 0.2s;
    cursor: pointer;
    border-left: 5px solid transparent;
    position: relative;
  }
  
  .task-card.completed-task {
    background-color: #e0ffe0;
    border-left-color: #4caf50;
  }
  
  .task-name {
    font-size: 18px;
    color: #333;
  }
  
  .delete-button {
    background: none;
    border: none;
    color: #e74c3c;
    cursor: pointer;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s;
  }
  
  .delete-button:hover {
    background-color: #f8d7da;
    border-radius: 50%;
  }
  
  .hide-task {
    display: none;
  }
  </style>