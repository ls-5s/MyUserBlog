import request from '@/utils/request'
// 发布学习路径详情
export const postlearn = (data) => {
  return request.post('/learn/path', {
    stack: data.stack,
    prerequisites: data.prerequisites,
    time: data.time,
    resources: data.resources,
    introduction: data.introduction,
    content: data.content
  })
}
// 发布技术栈
export const postlearnstack = (data) => {
  return request.post('/learn/stack', {
    category: data.category,
    stack: data.stack,
    time: data.time,
    introduction: data.introduction
  })
}
