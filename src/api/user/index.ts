// 统一管理项目用户相关接口

import request from '@/utils/request.ts'
import { loginForm ,loginResponseDate,userResponse} from './type'
// 通过一管理接口
enum API{
    LOGIN_URL='/user/login',
    USERINFO_URL='/user/info',
}

// 暴露请求函数
// 登录的接口方法
export const reqLogin=(data:loginForm)=>{
    return request.post<any,loginResponseDate>(API.LOGIN_URL,data)
}
// 获取用户信息接口的方法
export const reqUserInfo=()=>request.get<any,userResponse>(API.USERINFO_URL)