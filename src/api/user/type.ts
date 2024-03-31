// 定义用户相关的接口类型
export interface loginFormData{
    username:string,
    password:string
}
// 定义全部接口返回数据都有的ts类型
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean,
}

// 定义登录接口
export interface loginResponseData extends ResponseData{
    data:string
}

// 定义获取用户信息信息放回的类型
export interface userInfoResponseData extends ResponseData{
    data:{
        routes:string[],
        buttons:string[],
        roles:string[],
        name:string,
        avatar:string
    }
}