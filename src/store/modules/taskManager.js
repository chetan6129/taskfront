import axios from "axios";

const state = {
  tasks: [],
};

const actions = {
  async fetchTasks({ commit }, token) {
    try {
      const response = await axios.get("https://taskmanager-api-backend.onrender.com/task/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      let res = response.data.tasks;
      commit("setTasks", res);
    } catch (e) {
      console.log("Error" + e);
    }
  },
  async addTasks({ commit }, {name, token}) {
    // console.log(token);
    // console.log(name);
    const response = await axios.post(
      `https://taskmanager-api-backend.onrender.com/task/`,
      {
        name,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    let res = response.data;
    commit("newTasks", res);
  },
  async updateTasks({ commit }, { taskId, token, updatePayload }) {
    try {
      const response = await axios.patch(
        `https://taskmanager-api-backend.onrender.com/task/${taskId}`,
        updatePayload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      let res = response.data;
      commit("updateTask", res);
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  },
  async deleteTask({ commit }, { taskId, token }) {
    try {
      await axios.delete(`${process.env.BASE_URL}/task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      commit("removeTask", taskId);
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  },
  
};

const getters = {
  allTasks: (state) => state.tasks,
};

const mutations = {
  setTasks: (state, tasks) => (state.tasks = tasks),
  newTasks: (state, task) => state.tasks.unshift(task),
  updateTask: (state, task) => {
    const index = state.tasks.findIndex((tasks) => tasks._id === task._id);
    if (index !== -1) {
      state.tasks.splice(index, 1, task);
    }
  },
  removeTask: (state, taskId) => {
    state.tasks = state.tasks.filter(task => task._id !== taskId);
  },  
};

export default {
  state,
  actions,
  getters,
  mutations,
};