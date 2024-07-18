<template>
    <div class="task-container">
      <div
        v-for="task in tasks"
        :key="task.id"
        :class="{ 'hide-task': shouldHideTask(task) }"
      >
        <div
          @click="UpdateTask(task._id)"
          class="not-completed-task"
          v-if="type === 'not-completed' && !task.completed"
        >
          {{ task.name }}
        </div>
        <div
          @click="UpdateTask(task._id)"
          class="completed-task"
          v-else-if="type === 'completed' && task.completed"
        >
          {{ task.name }}
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
      ...mapActions(["updateTasks"]),
      UpdateTask(taskId) {
        const token = localStorage.getItem("user");
        const task = this.tasks.find((t) => t._id === taskId);
        const updatedStatus = !task.completed;
  
        this.updateTasks({ taskId, token, updatePayload: { completed: updatedStatus } });
      },
      shouldHideTask(task) {
        if (this.type === "completed" && task.completed) {
          return false;
        } else if (this.type === "not-completed" && !task.completed) {
          return false;
        } else {
          return true;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .task-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .hide-task {
    display: none;
  }
  
  .completed-task,
  .not-completed-task {
    padding: 20px;
    border: 1px solid rgb(48, 199, 10);
    cursor: pointer;
  }
  
  .completed-task {
    background-color: #050505;
    text-decoration: line-through;
  }
  
  .not-completed-task {
    background-color: white;
  }
  </style>
  