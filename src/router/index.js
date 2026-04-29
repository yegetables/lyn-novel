import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NovelEdit from '../views/NovelEdit.vue'
import Settings from '../views/Settings.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/novel/:id',
    name: 'NovelEdit',
    component: NovelEdit
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
