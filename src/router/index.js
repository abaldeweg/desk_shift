import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: { name: 'home' },
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView'),
      props: (route) => ({
        is404: route.params.is404,
      }),
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: () => import('../views/ScheduleView'),
    },
    {
      path: '/call',
      name: 'call',
      component: () => import('../views/CallView'),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView'),
    },
    {
      path: '*',
      redirect: { name: 'home', params: { is404: true } },
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
