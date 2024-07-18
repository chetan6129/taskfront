import { createRouter, createWebHistory } from 'vue-router'
import homePage from '../views/homePage.vue'
import signUp from '../views/signUp.vue'
import signIn from '../views/signIn.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: homePage
  },
  {
    path: '/signup',
    name: 'signup',
    component: signUp
  },
  {
    path: '/signin',
    name: 'signin',
    component: signIn
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router