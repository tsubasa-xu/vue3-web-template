export default [
  {
    path: '/index',
    name: 'index',
    component: () => import('@/pages/home/index.vue'),
    meta: {
      title: '首页',
      layout: 'content',
    },
  },
]
