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
      redirect: { name: 'shift' },
    },
    {
      path: '/shift',
      name: 'shift',
      component: () => import('../views/ShiftView'),
      props: (route) => ({
        is404: route.params.is404,
      }),
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView'),
    },
    {
      path: '*',
      redirect: { name: 'shift', params: { is404: true } },
    },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
})

export default router
