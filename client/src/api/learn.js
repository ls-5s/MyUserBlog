import request from '@/utils/request'

// 获取学习栈
export const getLearnStack = (category) => {
  return request.get('/learn/stack', {
    params: {
      category: category
    }
  })
}
// 获取学习路径
export const getLearnPath = () => {
  return request.get('/learn/path')
}
