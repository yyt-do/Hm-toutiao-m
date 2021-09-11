import axios from "axios";
// 非组件模块获取store
import store from '@/store/'
// 创建axios实例
const request = axios.create({
  baseURL: '/api'
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
  const user = store.state.user
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)
// 响应拦截器
// 导出请求模块
export default request