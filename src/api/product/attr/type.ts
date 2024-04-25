// ts类型

// 全部类型共有属性
export interface ResponseData{
    code:number,
    message:string,
    ok:boolean
}
// 数据类型data
export interface CategoryObj{
    id:number|string,
    name:string,
    category1Id?:number,
    category2Id?:number

}

// 返回值类型
export interface CategoryResponseData extends ResponseData{
    data:CategoryObj[]
}







// ############################################################
// 属性值对象的ts类型
export interface AttrValue{
    id?:number,
    valueName:string,
    attrId?:number,
    flag?:boolean
}
// 存储每一个属性值的数组类型
export type AttrValueList=AttrValue[]
// 属性对象
export interface Attr {
    id?:number,
    attrName:string,
    categoryId:number|string,
    categoryLevel:number,
    createTime?:string,
    updateTime?:string,
    attrValueList:AttrValueList,
    attrIdAndValueId?:string,
}
// 存储每一个属性对象的数组ts类型
export type AttrList=Attr[];
// 属性接口返回的数据类型ts类型
export interface AttrResponseData extends ResponseData{
    data:Attr[]
}