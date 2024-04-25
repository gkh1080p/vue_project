import request from "@/utils/request";
import type {User, UserResponseData,AllRoleResponseData,SetRoleData} from "./type.ts"
enum API{
    // 获取全部已有账号的信息
    ALLUSER_URL="/admin/acl/user/",
    // 新增,与修改
    ADDUSER_URL="/admin/acl/user/save",
    UPDATEUSER_URL="/admin/acl/user/update",
    // 获取全部职位，和当前账号拥有的职位接口
    ALLROLE_URL="/admin/acl/user/toAssign/",
    // 给已有的角色分配职务
    SETROLE_URL="/admin/acl/user/doAssignRole",
    // 删除某一个账号
    DELETEUSER_URL="/admin/acl/user/remove/",
    // 批量删除的按钮 
    DELETEALLUSER_URL="/admin/acl/user/batchRemove",

}




// 获取全部已有账号信息接口
export const reqUserInfo=(page:number,limit:number,username:string)=>{
    return request.get<any,UserResponseData>(API.ALLUSER_URL+`${page}/${limit}/?username=${username}`)
}
// 添加一个用户和修改一个用户
export const reqAddOrUpdateUser=(data:User)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEUSER_URL,data)
    }else{
        return request.post<any,any>(API.ADDUSER_URL,data)
    }
}

// 获取全部职位以及包含当前用户的已有的职位
export const reqAllRole=(id:number)=>{
    return request.get<any,AllRoleResponseData>(API.ALLROLE_URL+id)
}

// 给已有用户分配身份
export const reqSetUserRole=(data:SetRoleData)=>{
    return request.post<any,any>(API.SETROLE_URL,data)
}

//删除某一个账号的信息
export const reqRemoveUser=(id:number)=>{
    return request.delete<any,any>(API.DELETEUSER_URL+id)
}
// 批量删除
export const reqRemoveAllUser=(data:number[])=>{
    return request.delete<any,any>(API.DELETEALLUSER_URL,{data})
}