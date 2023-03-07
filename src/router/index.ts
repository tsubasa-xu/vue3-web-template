import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/store'
import { getTimeoutID, getUser, setAutoRefresh } from '@/store/mutations-const'

const routesModules = import.meta.glob<any>('../pages/**/router/**/*.ts', { eager: true })
const modules: Array<RouteRecordRaw> = []
Object.keys(routesModules).forEach((key: string) => {
  const obj: Array<RouteRecordRaw> = (routesModules[`${key}`].default as Array<RouteRecordRaw>).map((path: RouteRecordRaw) => {
    return path
  })
  modules.push(...obj)
})

const routes = [
  ...modules,
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

type checkPermissionType = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => void

const checkPermission: checkPermissionType = function (to, from, next) {
  const store = useStore()
  if (isNaN(store[getTimeoutID]))
    store[setAutoRefresh]()
  if (store[getUser].is_login) {
    return next()
  }
  else {
    window.$message.error('尚未登录，请先登录！')
    return next({ name: 'login' })
  }
}

router.beforeEach((to, from, next) => {
  if (to.matched.length === 0)
    return next({ name: 'result', params: { code: '404' } })
  if (to.meta.title) {
    useHead({
      title: to.meta.title,
    })
  }
  if (to.meta.noLogin) {
    return next()
  }
  else {
    if (to.meta.noCheck)
      return next()
    return checkPermission(to, from, next)
  }
})

export default router
