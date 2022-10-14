import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Welcome from '../views/welcome/Welcome.vue'
import Pve from '../views/pve/Pve.vue'
import Pvp from '../views/pvp/Pvp.vue'
import OnlinePK from '../views/test/Pve.vue'

Vue.use(VueRouter)

const routes = [
  {
    //路径为空时跳到index(默认)
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    component: Index,
    redirect: '/welcome',//打开网站默认为游戏欢迎页面
    children: [
      {
        path: '/welcome',
        component: Welcome,
      },
      {
        path: '/pve',
        component: Pve,
      },
      {
        path: '/pvp',
        component: Pvp,
      },
      {
        path: '/test',
        component: OnlinePK,
      },
    ]
  },
]

const router = new VueRouter({
  routes,
  mode: 'history',
})

export default router
