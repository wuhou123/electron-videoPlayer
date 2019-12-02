/* eslint-disable */

import VueRouter from 'vue-router'
import MainLayout from '@/views/main/main-layout.vue'
import recommendRoutes from '@/router/modules/recommend.js'
import personalFMRoutes from '@/router/modules/personalFM.js'
import personalizedContentRoutes from '@/router/modules/personalizedContent.js'
import videoRoutes from '@/router/modules/video.js'
import songListDetailRoutes from '@/router/modules/songListDetail.js'
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
    children: [
      ...recommendRoutes,
      ...personalFMRoutes,
      ...personalizedContentRoutes,
      ...videoRoutes,
      ...songListDetailRoutes,
      ...playRoutes
    ]
  },
  { path: '/login', component: Login }
]

export default new VueRouter({
  routes
})
