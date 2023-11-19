import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import SignUpForm from './components/SignUpForm.vue'
import LogInForm from './components/LogInForm.vue'
import HomePage from './components/HomePage.vue'
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
  },
  {
    path: '/homepage',
    name: 'HomePage',
    component:HomePage,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

createApp(App).use(router).mount('#app')
