import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/login/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue') // 路由懒加载
  },
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home')
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video')
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search/') // 路由懒加载
  },
  {
    path: '/article/:articleId', // 路由动态传参
    name: 'article',
    component: () => import('@/views/article/'), // 路由懒加载
    props:true //将路由参数映射到组件的props
  },
  {
    path: '/user/profile', // 路由动态传参
    name: 'userProfile',
    component: () => import('@/views/user-profile/'), // 路由懒加载
  },
  {
    path: '/user/chat', // 路由动态传参
    name: 'userChat',
    component: () => import('@/views/user-chat/'), // 路由懒加载
  }
]

const router = new VueRouter({
  routes
})

export default router
