import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import SignUpForm from './components/SignUpForm.vue'
import LogInForm from './components/LogInForm.vue'
import App from './App.vue'

const routes = [
  {
    path: '/',
    name: 'SignUpForm',
    component:SignUpForm,
  },
  {
    path: '/login',
    name: 'LogInForm',
    component:LogInForm,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

createApp(App).use(router).mount('#app')
