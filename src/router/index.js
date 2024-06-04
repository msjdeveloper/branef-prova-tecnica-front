import { createRouter, createWebHistory } from 'vue-router'
import CompanyView from '../views/CompanyView.vue'

const routes = [
  {
    path: '/',
    name: 'company',
    component: CompanyView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
