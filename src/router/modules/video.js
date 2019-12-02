export default [
  {
    path: 'video',
    component: () =>
      import(/* webpackChunkName: 'video' */ '@/views/main/video/video'),
    redirect: '/main/video/index',
    children: [
      {
        path: 'index',
        component: () =>
          import(
            /* webpackChunkName: 'video~index' */ '@/views/main/video/video'
          )
      },
      {
        path: 'mv',
        component: () =>
          import(/* webpackChunkName: 'video~index' */ '@/views/main/video/mv')
      }
    ]
  }
]
