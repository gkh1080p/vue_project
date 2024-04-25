// 账号信息的ts类型
export interface ResponseData{
    code:number,
    message:string|null,
    ok:boolean
}
export interface User{
    id?:number,
    createTime?:string,
    updateTime?:string,
    username:string,
    password:string,
    name:string,
    phone?:string|null,
    roleName?:string,
}
// 数组包含全部的用户信息
export type Records=User[]
// 获取全部用户信息接口返回
export interface UserResponseData extends ResponseData{
    data:{
        records:Records,
        total:number,
        size:number,
        current:number,
        order?:any[],
        optimizeCountSql?:boolean,
        hitCount?:false,
        countId?:null,
        maxLimit?:null,
        searchCount?:boolean,
        pages:number
    }
}



// #################################
// 代表一个职位的ts类型
export interface RoleData{
    id?:number,
    createTime?:string,
    updateTime?:string,
    roleName:string,
    remark:null|boolean
}
// 全部职位的列表
export type AllRole=RoleData[];
// 请求返回类型
export interface AllRoleResponseData extends ResponseData{
    data:{
        assignRoles:AllRole,
        allRolesList:AllRole
    }
}

// ###############################################
// 给用户分配职位接口的ts类型
export interface SetRoleData{
    roleIdList:number[],
    userId:number
}



