// 品牌管理模块接口

import request from "@/utils/request";
// 引入类型
import type { TradeMark, TradeMarkResponseData } from "./type";
import { ElStep } from "element-plus";
// 品牌管理模块接口
enum API{
    // 获取已有品牌接口
    TRADEMARK_URL="/admin/product/baseTrademark/",
    // 添加一个品牌
    ADDTRADEMARK_URL="/admin/product/baseTrademark/save",
    // 修改已有品牌
    UPDATEDTRADEMARK_URL="/admin/product/baseTrademark/update",
}

// 获取已有品牌的接口方法
// page:获取第几页，默认为1
// limit：获取已有品牌的个数
export const reqHasTrademark=(page:number,limit:number)=>request.get<any,TradeMarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`)

// 添加与修改已有品牌的方法
export const reqAddorUpdateTrademark=(data:TradeMark)=>{
    // 修改已有品牌的数据
    if(data.id){
        return request.put<any,any>(API.UPDATEDTRADEMARK_URL,data);
    }else{
        return request.post<any,any>(API.ADDTRADEMARK_URL,data)
    }
}




