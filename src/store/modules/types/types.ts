import type { RouteRecordRaw } from "vue-router"
// 定义小仓库数据state类型
export interface UserState{
    token:string|null,
    // 定义路由引进仓库的类型
    menuRoutes:RouteRecordRaw[],
    username:string,
    avatar:string,
    button:string[]
}


// 定义category中分类的对象返回值类型
import type { CategoryObj } from "@/api/product/attr/type"
export interface CategoryState{
    c1Arr:CategoryObj[],
    c2Arr:CategoryObj[],
    c3Arr:CategoryObj[],
    c1Id:number|string,
    c2Id:number|string,
    c3Id:number|string,
    scene:number
}


