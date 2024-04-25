export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}

// 菜单数据与按钮数据的ts类型
export interface Permisstion{
    id?:number,
    createTime?:string,
    updateTime?:string,
    pid:number,
    name:string,
    code:string|null,
    toCode?:string|null,
    type?:number,
    status?:null,
    level:number,
    children?:PermisstionList,
    select?:boolean,
}
export type PermisstionList=Permisstion[]
// 接口返回的数据类型
export interface PermisstionResponseData extends ResponseData{
    data:PermisstionList
}

// 添加和修改菜单的ts类型
export interface MenuParams{
    // 新增
    code:string|null,
    level:number,
    pid:number,
    name:string,
    // 修改
    id?:number
}