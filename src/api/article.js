import request from '@/utils/request'
// 获取文章类表
export const getArticles = (params) =>{
  return request({
    method: 'GET',
    url:'/v1_1/articles',
    params
  })
}
// 获取文章新闻
export const getArticleByID = (articleId) =>{
  return request({
    method: 'GET',
    url:`/v1_0/articles/${articleId}`,
  })
}
// 收藏文章
export const addCollect   = (articleId) =>{
  return request({
    method: 'POST',
    url:'/v1_0/article/collections',
    data:{
      target:articleId
    }
  })
}
// 取消收藏文章
export const deleteCollect   = (articleId) =>{
  return request({
    method: 'DELETE',
    url:`/v1_0/article/collections/${articleId}`,
  })
}