export default [
  {
    path: 'play',
    component: () =>
      import(/* webpackChunkName: 'video' */ '@/views/main/play'),
    redirect: '/main/play/index',
    children: [
      {
        path: 'index',
        component: () =>
          import(/* webpackChunkName: 'video~index' */ '@/views/main/play')
      }
    ]
  }
]
