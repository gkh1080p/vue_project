import request from "@/utils/request";
import type {PermisstionResponseData,MenuParams} from "./type.ts"
enum API{
    // 获取全部菜单与按钮的标识数据
    ALLPERMISSTION_URL="/admin/acl/permission",
    // 新增菜单
    ADD_URL="/admin/acl/permission/save",
    // 修改菜单
    UPDATE_URL="/admin/acl/permission/update",
    DELETE_URL="/admin/acl/permission/remove/"

}

// 获取菜单数据
export const reqAllPermisstion=()=>{
    return request.get<any,PermisstionResponseData>(API.ALLPERMISSTION_URL)
}
// 更新与新增的请求
export const reqAddOrUpdateMenu=(data:MenuParams)=>{
    if(data.id){
        return request.put<any,any>(API.UPDATE_URL,data)
    }else{
        return request.post<any,any>(API.ADD_URL,data)
    }
}
// 删除菜单
export const reqRemove=(id:number)=>{
    return request.delete<any,any>(API.DELETE_URL+id)
}