// SPU管理模块
import request from "@/utils/request";
import type {SkuInfoData,SkuData,SpuData, HasSpuResponseData,AllTradeMark,SpuHasImage,SaleAttrResponseData,HasSaleAttrResponseData } from "./type";
enum API{
    // 获取已有的SPU数据
    HASSPU_URL='/admin/product/',
    // 获取全部品牌的数据
    ALLTRADEMARK_URL="/admin/product/baseTrademark/getTrademarkList",
    // 获取某个SPU下的全部的售卖商品的图片数据
    IMAGE_URL="/admin/product/spuImageList/",
    // 获取某一个spu下全部的已有的销售属性接口
    SPUHASSALEATTR_URL="/admin/product/spuSaleAttrList/",
    // 获取整个项目全部的销售属性【颜色，版本，尺寸】
    ALLSALEATTR_URL='/admin/product/baseSaleAttrList/',
    // 追加一个新的SPU
    ADDSPU_URL="/admin/product/saveSpuInfo",
    // 更新一个新的SPU
    UPDATESPU_URL="/admin/product/updateSpuInfo",
    // 追加一个新的SKU地址
    ADDSKU_URL="/admin/product/saveSkuInfo",
    // 查看某一个已有的SPU下全部的商品
    SKUINFO_URL="/admin/product/findBySpuId/",
    // 删除SPU
    DELETE_URL="/admin/product/deleteSpu/"
}

// 获取某一个三级分类下已有的SPU数据
export const reqHasSpu=(page:number,limit:number,category3Id:number|string)=>{
    return request.get<any,HasSpuResponseData>(API.HASSPU_URL+`${page}/${limit}?category3Id=${category3Id}`)
}
// 获取全部SPU全部品牌的数据
export const reqAllTradeMark=()=>{
    return request.get<any,AllTradeMark>(API.ALLTRADEMARK_URL)
}
// 获取某一个已有的SPU下全部商品的图片地址
export const reqSpuImageList=(spuId:number)=>{
    return request.get<any,SpuHasImage>(API.IMAGE_URL+spuId)
}
// 获取某一给已有SPU拥有多少个销售属性
export const reqSpuHasSaleAttr=(spuId:number)=>{
    return request.get<any,SaleAttrResponseData>(API.SPUHASSALEATTR_URL+spuId)
}
// 获取全部的销售属性
export const reqAllSaleAttr=()=>{
    return request.get<any,HasSaleAttrResponseData>(API.ALLSALEATTR_URL)
}
// 添加一个新的SPU接口
// dada为新增SPU对象,或修改 后的SPU对象
export const reqAddOrUpdateSpu=(data:SpuData)=>{
    if(data.id){
        return request.post<any,any>(API.UPDATESPU_URL,data)
    }else{
        return request.post<any,any>(API.ADDSPU_URL,data)
    }
}

// 添加一个新的SKU的方法
export const reqAddSku=(data:SkuData)=>{
    return request.post<any,any>(API.ADDSKU_URL,data)
}
// 查看一个SPU下全部的SKU
export const reqSkuList=(spuId:number|string)=>{
    return request.get<any,SkuInfoData>(API.SKUINFO_URL+spuId)
}
// 删除SPU
export const reqDeleteSpu=(spuId:number|string)=>{
    return request.delete<any,any>(API.DELETE_URL+spuId)
}