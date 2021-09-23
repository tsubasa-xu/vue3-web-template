import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { notify } from '../plugins/notification';

const routesModules = import.meta.globEager('../views/**/router/index.ts');
const modules:Array<RouteRecordRaw> = [];

Object.keys(routesModules).forEach(key => {
  modules.push(...routesModules[key].default);
});

const routes:Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
    meta: {
      layout: 'login',
      title: '登录',
      noCheck: true,
    },
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue'),
    meta: {
      layout: 'content',
      title: '首页',
      noCheck: true,
    },
  },
  ...modules
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const check_power = () => {
  return true;
};

router.beforeEach((to: any, from: any, next: any) => {
  if (to.meta.noCheck || check_power()) {
    document.title = to.meta.title;
    next();
    return;
  } else {
    notify.error({content: '对不起，请先登录后重试', title: '登录状态异常'});
    next({ name: 'login' });
    return;
  }
});

export default router;
