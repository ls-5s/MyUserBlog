import request from '@/utils/request'
// 文章发布
export const publishArticle = (data) => {
  return request.post('/article/write',{
    username: data.username,
    title: data.title,
    type: data.type,
    content: data.content,
    markdownContent: data.markdownContent
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
// 删除文章
export const deleteArticle = (id) => {
  return request.delete('/article/delete', {
    params: {
      id
    }
  })
}
// 根据标题查询文章
export const searchArticle = (title) => {
  return request.get('/article/search', {
    params: {
      title
    }
  })
}
