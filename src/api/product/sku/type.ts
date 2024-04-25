export interface ResponseData{
    code:number,
    message:string,
    ok:boolean,
}
// 定义SKU类型
export interface Attr{
    id?:number|string,
    attrId?: string | number,
    valueId?: string | number,
    valueName?:string|null,
}
export interface saleAttr{
    id?:number|string,
    saleAttrName?:string,
    saleAttrId?: string | number,
    saleAttrValueId?: string | number,
    saleAttrValueName?:string,
}
export interface SkuData {
    id?:number|string,
    category3Id?: string | number,
    spuId?: string | number,
    tmId?: string | number,
    skuName?: string,
    price?: string | number,
    weight?: string | number,
    skuDesc?: string,
    skuAttrValueList?: Attr[],
    skuSaleAttrValueList?: saleAttr[],
    skuDefaultImg?:string,
    createTime?:string|null,
    updateTime?: string|null,
    isSale?:number,
    skuImageList?:string|string
}

// 获取SKU数据接口的ts类型
export interface SkuResponseData extends ResponseData{
    data:[
        records:SkuData[],
        size:number,
        current:number,
        orders:any[],
        optimizeCountSql:boolean,
        hitCount:boolean,
        countId:null,
        maxLimit:null,
        searchCount:boolean,
        pages:number,
        total?:number|null,

    ]
}

// ##########################################
// 获取SKU商品详细接口的ts类型
export interface SkuInfoData extends ResponseData{
    data:SkuData
}