// 服务器返回数据的类型
export interface ResponseData {
    code: number,
    message: string,
    ok: boolean,
}
// SPU数据的类型
export interface SpuData {
    id?: number,
    spuName: string,
    description: string,
    category3Id: number | string,
    tmId: number | string,
    spuSaleAttrList: null | SaleAttr[],
    spuImageList: null | SpuImage[],
}
// 数组：元素都是包含已有SPU数据类型
export type Records = SpuData[];
// 定义获取已有SPU接口综合
export interface HasSpuResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        searchCount: boolean,
        pages: number,
    }
}


// ###################################
// 所有品牌数据类型data
export interface TradeMark {
    id: number,
    tmName: string,
    logoUrl: string,
}
// 品牌接口返回的数据类型
export interface AllTradeMark extends ResponseData {
    data: TradeMark[]
}
// ####################################
// 商品图片ts类型
export interface SpuImage {
    id?: number,
    imgName?: string,
    imgUrl?: string,
    createTime?: string,
    updateTime?: string,
    spuId?: number,
    name?: string | null,
    url?: string | null,
    isDefault ?:boolean,
}
// 已有的SPU照片墙返回类型
export interface SpuHasImage extends ResponseData {
    data: SpuImage[]
}
// ####################################
// 商品销售属性值ts类型
export interface SaleAttrValue {
    id?: number,
    createTime?: null | string,
    updateTime?: null | string,
    spuId?: number,
    baseSaleAttrId: number,
    saleAttrValueName: string | undefined,
    saleAttrName?: string,
    isChecked?: null | string,
}
// 存储已有的销售属性对象类型data
export type spuSaleAttrValueList = SaleAttrValue[]
// 销售属性对象类型
export interface SaleAttr {
    id?: number,
    createTime?: null | string,
    updateTime?: null | string,
    spuId?: number,
    baseSaleAttrId: number,
    saleAttrName: string,
    spuSaleAttrValueList: spuSaleAttrValueList,
    flag?: boolean,
    saleAttrValue?: string,
    saleIdAndValueId?:string,
}
// 服务器返回的数据类型
export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}
// ####################################
// 已有的全部SPU的返回数据ts类型
export interface HasSaleAttr {
    id: number,
    name: string,
}
// 返回类型
export interface HasSaleAttrResponseData extends ResponseData {
    data: HasSaleAttr[]
}


// 新增SKU的发送数据的类型
export interface Attr{
    attrId?: string | number,
    valueId?: string | number,
}
export interface saleAttr{
    saleAttrId?: string | number,
    saleAttrValueId?: string | number
}
export interface SkuData {
    category3Id: string | number,
    spuId: string | number,
    tmId: string | number,
    skuName: string,
    price: string | number,
    weight: string | number,
    skuDesc: string,
    skuAttrValueList?: Attr[],
    skuSaleAttrValueList?: saleAttr[],
    skuDefaultImg:string
}

// 获取数据接口的ts类型
export interface SkuInfoData extends ResponseData{
    data:SkuData[]
}