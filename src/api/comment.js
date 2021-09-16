import request from '@/utils/request'
// 获取评论
export const getComments = (params) =>{
  return request({
    method: 'GET',
    url:'/v1_0/comments',
    params
  })
}
// 发布评论
export const addComments = (data) =>{
  return request({
    method: 'POST',
    url:'/v1_0/comments',
    data
  })
}