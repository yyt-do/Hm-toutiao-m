import axios from "axios";
// 创建axios实例
const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net'
})
// 请求拦截器
// 响应拦截器
// 导出请求模块
export default request