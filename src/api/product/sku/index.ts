import request from "@/utils/request";
import {SkuResponseData,SkuInfoData} from "./type.ts"

enum API{
    SKU_URL="/admin/product/list/",
    // 商品上架接口
    SKUUPLOAD_URL="/admin/product/onSale/",
    // 商品下架接口
    SKUDOWNLOAD_URL="/admin/product/cancelSale/",
    // 获取商品详细展示中的信息
    SKUINFO_URL="/admin/product/getSkuInfo/",
    // 删除数据
    DELETE_RUL="/admin/product/deleteSku/"
}

// 获取商品SKU的接口
export const reqSkuList=(page:number,limit:number)=>{
    return request.get<any,SkuResponseData>(API.SKU_URL+`${page}/${limit}`)
}
// 上架和下架的接口
export const reqUploadOrDownload=(skuId:number,isSale:number)=>{
    if(isSale==1){
        return request.get<any,any>(API.SKUDOWNLOAD_URL+skuId)
    }else{
        return request.get<any,any>(API.SKUUPLOAD_URL+skuId)
    }
}
// 获取商品详细的接口
export const reqSkuInfo=(skuId:number)=>{
    return request.get<any,SkuInfoData>(API.SKUINFO_URL+skuId)
}
// 删除数据的接口
export const reqRemoveSku=(skuId:number)=>{
    return request.delete<any,any>(API.DELETE_RUL+skuId)
}
