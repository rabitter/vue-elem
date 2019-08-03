// 导入axios
import axios from 'axios'

// 定义axios的默认baseURL
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

// 添加请求拦截器
axios.interceptors.request.use(function(config){
  // 在请求发送前做的一些操作
  let token = localStorage.getItem('mytoken')
  if(token){
    config.headers['Authorization'] = token
  }
  return config
},function(error){
  // 当请求失败时进行的操作
  return Promise.reject(error)
})


// 发送登录请求
export const checkUser = params => {
  return axios.post('login',params).then(res => res.data)
}

// 获取用户列表请求
export const getUserList = (params) => {
  return axios.get('users',params).then(res => res.data)
}