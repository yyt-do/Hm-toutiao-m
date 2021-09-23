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
    console.log(err);
    return data
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
request.interceptors.response.use(
  // 响应成功
  response => {
    return response
  },
  // 响应失败
  async error => {
    if (error.response && error.response.status === 401) {
      // 校验是否有 refresh_token
      const user = store.state.user

      if (!user || !user.refresh_token) {
        // router.push('/login')
        redirectLogin()

        // 代码不要往后执行了
        return
      }

      // 如果有refresh_token，则请求获取新的 token
      try {
        const res = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        })

        // 如果获取成功，则把新的 token 更新到容器中
        store.commit('setUser', {
          ...user,
          token: res.data.data.token // 最新获取的可用 token
        })

        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return request(error.config)
      } catch (err) {
        // 如果获取失败，直接跳转 登录页
        console.log('请求刷线 token 失败', err)
        // router.push('/login')
        redirectLogin()
      }
    } else if (error.response.status === 500) {
      Notify('服务端异常，请稍后重试')
    }
    return Promise.reject(error)
  }
)
function redirectLogin () {
  router.push({
    name: 'login',
    query: { 
      // router.currentRoute和在组件中使用this.$router是一个东西
      redirect: router.currentRoute.fullPath
    }
  })
}
// 导出请求模块
export default request