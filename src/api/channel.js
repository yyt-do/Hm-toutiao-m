// 频道相关模块
import request from '@/utils/request'
// 获取文章类表
export const getAllChannels = () =>{
  return request({
    method: 'GET',
    url:'/v1_0/channels',
  })
}
// 添加用户频道
export const AddChannels = (data) =>{
  return request({
    method: 'PATCH',
    url:'/v1_0/user/channels',
    data
  })
}
// 删除用户频道
export const DeleteChannels = (id) =>{
  // console.log(id);
  return request({
    method: 'DELETE',
    url:`/v1_0/user/channels/${id}`
  })
}

