import request from '@/utils/request'
// 获取搜索联想建议
export const getSearchSuggest = (q) =>{
  return request({
    method: 'GET',
    url:'/v1_0/suggestion',
    params:{
      q
    }
  })
}
// 获取搜索结果
export const getSearchResult = (params) =>{
  return request({
    method: 'GET',
    url:'/v1_0/search',
    params
  })
}
// 获取搜索历史
export const getSearchHistory = () =>{
  return request({
    method: 'GET',
    url:'/v1_0/search/histories'
  })
}