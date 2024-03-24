// 登录接口需要携带ts类型
export interface loginForm{
    username:string,
    password:string,
}

// 登录接口放回的类型
interface dataType{
    token:string
}

export interface loginResponseDate{
    code:number,
    data:dataType
}

// 获取用户信息的返回类型
interface info{
    userId: number,
    avatar:string,
    username: string,
    password: string,
    desc: string,
    roles: string[],
    buttons: string[],
    routes: string[],
    token: string,
}
interface user{
    checkUser:info
}
export interface userResponse{
    code:number,
    data:user,
}