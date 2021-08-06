import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routesModules = import.meta.globEager('../views/**/*.ts');
const modules:Array<RouteRecordRaw> = [];
Object.keys(routesModules).forEach(key => {
  modules.push(...routesModules[key].default);
})
const routes:Array<RouteRecordRaw> = [
  {path: '/login', component: () => import('../views/login/index.vue'), meta: { layout: 'login' },},
  {path: '/home', component: () => import('../views/home/index.vue'), meta: { layout: 'content' }},
  ...modules
];

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

