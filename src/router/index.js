import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

// 引入登录组件
import Login from '@/views/Login'

// 引入首页组件
import Home from '@/views/Home'

// 引入欢迎登录组件
import Welcome from '@/views/welcome/Welcome'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: 'welcome',
      children: [
        {
          name: 'Welcome',
          path: 'welcome',
          component: Welcome
        }
      ]
    }
  ]
})
