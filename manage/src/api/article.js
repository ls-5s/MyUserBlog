import request from '@/utils/request'
// 文章发布
export const publishArticle = (data) => {
  return request.post('/article/write',{
    username: data.username,
    title: data.title,
    type: data.type,
    content: data.content
  })
}
// 文章列表(获取个人所以文章)
export const getArticleList = (data) => {
  return request.get('/article/list',{
    params: {
      username: data.username
    }
  })
}
