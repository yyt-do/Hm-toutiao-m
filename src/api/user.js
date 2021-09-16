// 用户相关的请求模块
// 用户登录
import request from '@/utils/request'
const login = data => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
// 发送邮件
const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
// 获取登录用户信息
const getcurrentUser = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/profile'
  })
}
// 获取登录用户信息
const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
// 关注用户
const addFlow = userId => {
  return request({
    method: 'POST',
    url: '/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}
// 取消关注用户
const deleteFlow = userId => {
  return request({
    method: 'DELETE',
    url: `/v1_0/user/followings/${userId}`
  })
}
export { login, sendSms, getcurrentUser, getUserChannels, addFlow, deleteFlow }
