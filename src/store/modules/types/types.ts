import type { RouteRecordRaw } from "vue-router"
// 定义小仓库数据state类型
export interface UserState{
    userCookie:string|null,
    // 定义路由引进仓库的类型
    menuRoutes:RouteRecordRaw[]
}


