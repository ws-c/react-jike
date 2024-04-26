// 路由守卫
import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"
// 创建一个AuthRoute组件
function AuthRoute ({children}) {
  // 获取token
  const token = getToken()
  // 如果token存在，则渲染子组件
  if (token) {
    return <>{children}</>
  // 否则跳转到登录页面
  }else {
    return <Navigate to="/login" replace />
  }
}

// 导出AuthRoute组件
export default AuthRoute