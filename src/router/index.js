import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Register from '../views/Register.vue'
import { auth } from '../firebase'
import Achievements from '../components/Achievements'
import Profile from '../components/Profile'
import Certificates from '../components/Certificates'
import Projects from '../components/Projects'

import BoardList from '../views/BoardList'
import ShowBoard from '../views/ShowBoard'
import AddBoard from '../views/AddBoard'
import EditBoard from '../views/EditBoard'
//const loggedOutLinks = document.querySelectorAll('.logged-out');
//const loggedInLinks = document.querySelectorAll('.logged-in');


Vue.use(VueRouter)

//import Profile from '../components/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/dashboard/achievements',
    name: 'Achievements',
    component: Achievements,
    view: Dashboard,
  },
  {
    path: '/',
    name: 'Certificates',
    component: Certificates
  },
  {
    path: '/',
    name: 'Projects',
    component: Projects
  },
  {
    path: '/',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/board',
    name: 'BoardList',
    component: BoardList,

  },
  {
    path: '/show-board/:id',
    name: 'ShowBoard',
    component: ShowBoard,

  },
  {
    path: '/add-board',
    name: 'AddBoard',
    component: AddBoard,
    meta: {
      requiresAuth: true
    }

  },
  {
    path: '/edit-board/:id',
    name: 'EditBoard',
    component: EditBoard,

  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true, adminAuth: true, residentAuth: false,
    }
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)

  if (requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router