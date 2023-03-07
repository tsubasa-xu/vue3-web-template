export default [
  {
    path: '/login',
    name: 'login',
    component: () => import('../index.vue'),
    meta: {
      layout: 'none',
      title: '登录',
      noCheck: true,
    },
  },
]
