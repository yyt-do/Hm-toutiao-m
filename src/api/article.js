import request from '@/utils/request'
// 获取文章类表
export const getArticles = (params) =>{
  return request({
    method: 'GET',
    url:'/v1_1/articles',
    params
  })
}