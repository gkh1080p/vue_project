// 角色管理模块
import request from "@/utils/request";
import type {RoleResponseData,RoleData,MenuResponseData} from "@/api/acl/role/type.ts"
enum API{
    // 获取全部职位的接口
    ALLROLE_URL="/admin/acl/role/",
    // 新增职位
    ADDROLE_URL="/admin/acl/role/save",
    // 修改职位
    UPDATEROLE_URL="/admin/acl/role/update",
    // 获取全部的菜单与按钮的数据
    ALLPERMISSTION="/admin/acl/permission/toAssign/",
    // 给角色分配权限
    SETPERMISSTION_URL="/admin/acl/permission/doAssign",
    // 删除职业
    DELETE_URL="/admin/acl/role/remove/"

}

// 获取全部的角色
export const reqAllRoleList=(page:number,limit:number,roleName?:string)=>{
    return request.get<any,RoleResponseData>(API.ALLROLE_URL+`${page}/${limit}/?roleName=${roleName}`)
}
// 新增角色
export const reqAddOrUpdateRole=(data:RoleData)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATEROLE_URL,data)
    }else{
        return request.post<any,any>(API.ADDROLE_URL,data)
    }
}
// 获取全部菜单与按钮权限的数据
export const reqAllMenuList=(roleId:number)=>{
    return request.get<any,MenuResponseData>(API.ALLPERMISSTION+roleId);
}
// 给角色分配权限
export const reqSetPermisstion=(id:number,permissionId:number[])=>{
    return request.post(API.SETPERMISSTION_URL+`?roleId=${id}&permissionId=${permissionId}`);
}
// 删除职业
export const reqRemove=(id:number)=>{
    return request.delete<any,any>(API.DELETE_URL+id)
}