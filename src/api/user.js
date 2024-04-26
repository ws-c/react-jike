import {request} from '@/utils'
// 用户登录
function loginAPI(loginForm){
  return request({
    url:'/authorizations',
    method: 'POST',
    data: loginForm
  })
}
// 用户信息
function getProfileAPI(){
  return request({
    url:'/user/profile',
    method: 'GET',
  })
}
export {loginAPI, getProfileAPI}