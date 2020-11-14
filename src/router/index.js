import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'

import { auth } from '../firebase'
import Achievements from '../components/Achievements'
import Profile from '../components/Profile'
import Certificates from '../components/Certificates'
import Projects from '../components/Projects'
import Admin from '../views/Admin'
import Dash from '../components/Dashboard'
import adminComponent from '../components/Admin'
import Report from '../components/Report'

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
    path: '/admin/',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'admin',
        component: adminComponent,
      },
      {
        path: 'report',
        component: Report,
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      disallowAuthed: true
    }
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
    path: '/dashboard/',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true, adminAuth: true, residentAuth: false,
    },
    children: [
      {
        path: 'profile',
        component: Profile,

      },
      {
        path: 'achievements',
        component: Achievements,

      },
      {
        path: 'dashboard',
        component: Dash,

      },
      {
        path: 'certificates',
        component: Certificates,

      },
      {
        path: 'projects',
        component: Projects,

      },


    ]
  },

]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
  /*routes: [
    {
      path: '/dashboard/', component: Dashboard,
      children: [
        {
          path: Profile,
          component: Profile
        },
        {
          path: Achievements,
          component: Achievements
        }
      ]
    }
  ]*/
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const isDisallowAuthed = to.matched.some((route) => route.meta.disallowAuthed)

  if (requiresAuth && !auth.currentUser && isDisallowAuthed) {
    next('/login')





  } else {
    next()
  }
})

export default router