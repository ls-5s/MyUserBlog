import request from '@/utils/request'

// 最新文章5篇
export const getLatestArticles = () => {
  return request.get('/class/latest')
}
