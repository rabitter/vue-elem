// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

// 引入主页
import App from './App'

// 引入路由
import router from './router'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入样式
import '@/styles/index.scss'

// 引入数据仓库store
import store from '@/store/store'

Vue.config.productionTip = false

Vue.use(ElementUI)

/* 注册一个全局守卫，作用是在路由跳转前，对路由进行判断，防止未登录的用户跳转到其他页面去 */
router.beforeEach((to,from,next) => {
  // 尝试获取token
  let token = localStorage.getItem('mytoken')
  // 如果有token说明用户已经登录，则让其正常跳转即可
  if(token){
    next()
  }else{
    // 如果用户想跳转到除登陆的其他页面，则强制将页面转到登录页
    if(to.path != '/login'){
      next({path:'/login'})
      // 如果访问的是登录页面让其正常访问即可
    }else {
      next()
    }
  }
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
