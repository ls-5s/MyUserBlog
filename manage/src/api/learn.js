import request from '@/utils/request'

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
