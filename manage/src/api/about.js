import request from '@/utils/request'

//后台个人中心的所有数据
export const about = (data) => {
  return request.post('/about/about', {
    about: data.about,
    id: data.id
  })
}

