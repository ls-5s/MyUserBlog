import request from '@/utils/request'

// 最新文章5篇
export const getLatestArticles = () => {
  return request.get('/class/latest')
}
// 文章数量
export const getArticleCount = () => {
  return request.get('/class/count')
}

// 后台个人中心的所有数据
export const getAboutInfo = (id) => {
  return request.get('/about/about', {
    params: { id }  // 使用对象属性简写
  })
}
// 根据id查询文章详情
export const getArticleDetail = (id) => {
  return request.get('/article/detail', {
    params: {
      id
    }
  })
}
// 文章列表(获取个人所以文章)
export const getArticleList = (data) => {
  return request.get('/article/list', {
    params: {
      username: data.username
    }
  })
}
