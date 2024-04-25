// 书写属性API的文件
import request from '@/utils/request.ts'

// 映入数据类型
import type { CategoryResponseData ,AttrResponseData,Attr} from './type'

enum API{
    C1_URL="/admin/product/getCategory1" ,
    C2_URL="/admin/product/getCategory2/",
    C3_URL="/admin/product/getCategory3/",
    // 获取分类下的属性接口
    ATTR_RUL="/admin/product/attrInfoList/",
    // 添加或者修改已有的属性接口
    ADDORUPDATEATTR_URL="/admin/product/saveAttrInfo",
    // 删除某一个属性的接口
    DELETEATTR_URL='/admin/product/deleteAttr/'
}

// 一级分类接口方法
export const reqC1=()=>request.get<any,CategoryResponseData>(API.C1_URL)

// 二级分类接口方法
export const reqC2=(id:number)=>request.get<any,CategoryResponseData>(API.C2_URL+id)

// 三级分类接口方法
export const reqC3=(id:number)=>request.get<any,CategoryResponseData>(API.C3_URL+id)

// 获取对应的分类下已有的属性与属性接口
export const reqAttr=(id_1:number|string,id_2:number|string,id_3:number|string)=>{
    return request.get<any,AttrResponseData>(API.ATTR_RUL+`${id_1}/${id_2}/${id_3}`);
}

// 新增或者修改已有属性的接口
export const reqAddOrUpdateAttr=(data:Attr)=>{
    return request.post<any,any>(API.ADDORUPDATEATTR_URL,data)
}

// 删除一个属性
export const reqRemoveAttr=(attrId:number)=>{
    return request.delete<any,any>(API.DELETEATTR_URL+attrId)
}