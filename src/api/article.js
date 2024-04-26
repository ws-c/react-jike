import {request} from '@/utils'
import { message } from 'antd'
// 获取频道
function fetchChannelsAPI(){
  return request({
    url:'/channels',
    method: 'GET',
  })
}
// 发布文章
const articleSubmitAPI = async (formValue) => {
  await request.post('/mp/articles?draft=false', formValue)
  message.success('发布文章成功')
}

async function getArticleListAPI (params) {
  const res = await request.get('/mp/articles', { params })
  return res
}

const deleteAticleAPI = async (id) => {
  await request.delete(`/mp/articles/${id}`)
  message.success('删除文章成功')
}

const getIdArticleAPI = async (articleId) => {
  const res = await request.get(`/mp/articles/${articleId}`)
  return res
}

const updateArticleAPI = async (articleId,params) => {
  await request.put(`/mp/articles/${articleId}?draft=false`,params)
  message.success('更新文章成功')
}
export {updateArticleAPI,getIdArticleAPI,fetchChannelsAPI, articleSubmitAPI, getArticleListAPI,deleteAticleAPI}