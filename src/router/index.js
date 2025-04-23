import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/layout'
import Home from '@/views/layout/home'
import category from '@/views/layout/category'
import cart from '@/views/layout/cart'
import user from '@/views/layout/user'
import store from '@/store'

const Search = () => import('@/views/search')
const SearchList = () => import('@/views/search/list')
const ProDetail = () => import('@/views/prodetail')
const Pay = () => import('@/views/pay')
const MyOrder = () => import('@/views/myorder')
const Login = () => import('@/views/login')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        { path: '/home', component: Home },
        { path: '/category', component: category },
        { path: '/cart', component: cart },
        { path: '/user', component: user }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchlist', component: SearchList },
    // 动态路由传参，确认将来是哪个商品，路由参数中携带id
    { path: '/prodetail/:id', component: ProDetail },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder }
  ]
})
// 定义一个数组，专门用于存放所有需要权限访问的页面
const authUrls = ['/pay', '/myorder']

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to, from, next)
  // 看to.path是否在authUrls中出现
  if (!authUrls.includes(to.path)) {
    next()
    return
  }
  // 是权限页面，需要判断token
  const token = store.getters.token
  // console.log(token)
  if (token) {
    next()
  } else {
    next('./login')
  }
})

export default router
