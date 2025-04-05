import { defineRouter } from '#q-app/wrappers'
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from 'stores/auth'
/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default defineRouter(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  })
  // Router.beforeEach((to, from, next) => {
  //   const authStore = useAuthStore()
  //   const onBaoardCount = parseInt(localStorage.getItem('onBoardCount') || '0', 10)
  //   if (!authStore.isAuthenticated) {
  //     if (onBaoardCount < 2) {
  //       if (to.name !== 'onboard') {
  //         return next({ name: 'onboard' })
  //       }
  //     } else {
  //       if (to.name === 'onboard') {
  //         return next({ name: 'login' })
  //       }
  //     }
  //   } else {
  //     if (to.name === 'onboard' || (to.path && to.path.startsWith('/auth'))) {
  //       return next({ name: 'home' })
  //     }
  //   }
  //   return next()
  // })
  Router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (!authStore.isAuthenticated) {
    if (to.name === 'home') {
      return next({ name: 'login' })  // Redirect to login instead
    }
  }
  return next()
})
  return Router
})
