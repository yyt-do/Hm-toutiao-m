import axios from "axios";
// 非组件模块获取store
import store from '@/store/'
// 引入处理后台返回大数据问题
import jsonBig from 'json-bigint'
// 创建axios实例
const request = axios.create({
  baseURL: '/api'
})
/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题
 */
 request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (err) {
    return {}
  }
}]
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