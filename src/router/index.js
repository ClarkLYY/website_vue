import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import BlogDetail from '../views/BlogDetail.vue'
import BlogEdit from '../views/BlogEdit.vue'
import Register from '../views/Register.vue'
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'Index',
    redirect: { name: 'Blog' }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/blog',
    name: 'Blog',
    // 懒加载
    component: () => import('../views/Blog.vue')
  },
  {
    path: '/blog/add', // 注意放在 path: '/blog/:blogId'之前
    name: 'BlogAdd',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  },
  {
    path: '/blog/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },
  {
    path: '/blog/:blogId/edit',
    name: 'BlogEdit',
    meta: {
      requireAuth: true
    },
    component: BlogEdit
  }
];
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
