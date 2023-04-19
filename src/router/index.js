import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import ProfileView from '../views/ProfileView.vue'
import ProfileEdittingView from '../views/ProfileView.vue'
import LoginView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/search_result',
      name: 'search_result',
      component: SearchView
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView
    },
    {
      path: '/profile/edit',
      name: 'profileEdit',
      component: ProfileEdittingView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      // path: '/about',
      // name: 'about',
      // // route level code-splitting
      // // this generates a separate chunk (About.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
