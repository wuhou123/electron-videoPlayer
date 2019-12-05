/* eslint-disable */

import VueRouter from 'vue-router'
import MainLayout from '@/views/main/main-layout.vue'
import personalFMRoutes from '@/router/modules/personalFM.js'
import videoRoutes from '@/router/modules/video.js'
import playRoutes from '@/router/modules/play.js'

import Login from '@/views/login/login.vue'
const routes = [
  {
    path: '/',
    redirect: '/main/video'
  },
  {
    path: '/main',
    component: MainLayout,
    children: [...personalFMRoutes, ...videoRoutes, ...playRoutes]
  },
  { path: '/login', component: Login }
]

export default new VueRouter({
  routes
})
