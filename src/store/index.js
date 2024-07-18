import { createStore } from 'vuex'
import TaskManager from './modules/taskManager'
import auth from './modules/auth'

// Create a new store instance.
const store = createStore({
  modules:{
    TaskManager,
    auth
  }
})
export default store;