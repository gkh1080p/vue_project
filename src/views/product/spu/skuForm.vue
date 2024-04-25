<template>
  <div>
    <el-form label-width="100px">
      <el-form-item label="SKU名称">
        <el-input v-model="skuParams.skuName" placeholder="请输入SKU名称"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input v-model="skuParams.price" placeholder="请输入价格" type="number"></el-input>
      </el-form-item>
      <el-form-item label="重量(克)">
        <el-input v-model="skuParams.weight" placeholder="请输入重量"></el-input>
      </el-form-item>
      <el-form-item label="SKU描述">
        <el-input v-model="skuParams.skuDesc" placeholder="请输入SKU描述"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true">
          <el-form-item v-for="item in attrArr" :key="item.id" :label="item.attrName" style="width: 200px;">
            <el-select v-model="item.attrIdAndValueId">
              <el-option :value="`${item.id}:${attrValue.id}`" v-for="(attrValue) in item.attrValueList" :key="attrValue.id" :label="attrValue.valueName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性属性">
        <el-form :inline="true">
          <el-form-item v-for="item in saleArr" :key="item.id" :label="item.saleAttrName" style="width: 200px;">
            <el-select  v-model="item.saleIdAndValueId">
              <el-option :value="`${item.id}:${saleAttrValue.id}`" v-for="saleAttrValue in item.spuSaleAttrValueList" :key="saleAttrValue.id" :label="saleAttrValue.saleAttrValueName"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称">
        <el-table border :data="imgArr" ref="table">
          <el-table-column type="selection" width="80px" align="center"></el-table-column>
          <el-table-column label="图片">
            <template #="{row}">
              <img :src="row.imgUrl" alt="" width="100px" height="100px">
            </template>
          </el-table-column>
          <el-table-column label="名称" prop="imgName"></el-table-column>
          <el-table-column label="操作">
            <template #="{row}">
              <el-button ref="btn"  :type="row.isDefault ? 'success' : 'warning'" @click="handler(row)"> 设置为默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="Coin" @click="save">保存</el-button>
        <el-button type="info" icon="DeleteFilled" @click="cencel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="skhForm">
// 引入类型
// 返回类型
import type { SpuData,SaleAttrResponseData,SpuHasImage } from '@/api/product/spu/type';
// 数据类型
import type {SaleAttr,  SpuImage,SkuData} from '@/api/product/spu/type';
import type {AttrResponseData,Attr} from "@/api/product/attr/type.ts"
// 引入请求API
import {reqAttr} from "@/api/product/attr/index.ts"
import { reqSpuImageList,reqSpuHasSaleAttr,reqAddSku } from '@/api/product/spu/index.ts';
// 引入常用方法
import {ref,reactive} from "vue"
import { ElMessage } from 'element-plus';
// 获取table组件实例
let table=ref( )
// 平台属性
let attrArr=ref<Attr[]>([])
// 销售属性
let saleArr=ref<SaleAttr[]>([])
// 照片墙属性
let imgArr=ref<SpuImage[]>([])
// 手机SKU数据用于提交
let skuParams=reactive<SkuData>( {
    category3Id: "",
    spuId: "",
    tmId: "",
    skuName: "",
    price: "",
    weight: "",
    skuDesc: "",
    skuAttrValueList: [
        {
            attrId: "",
            valueId: "",
        }
    ],
    skuSaleAttrValueList: [
        {
            saleAttrId: "",
            saleAttrValueId: ""
        }
    ],
    skuDefaultImg:""
})
// 自定义事件的方法
let $emit=defineEmits(["changeScene"])
// 取消按钮的回调
const cencel=()=>{
  $emit('changeScene',{pager:0,params:'update'})
}

// 当前子组件的方法对外暴露
const initSkuData=async(c1Id:number,c2Id:number,spu:SpuData)=>{
  // 手机数据
  skuParams.category3Id=spu.category3Id;
  skuParams.spuId=spu.id as number;
  skuParams.tmId=spu.tmId;
  // 获取平台属性需要三个ID
  console.log(c1Id,c2Id,spu)
  let result_1:AttrResponseData=await reqAttr(c1Id,c2Id,spu.category3Id)
  let result_2:SaleAttrResponseData=await reqSpuHasSaleAttr(spu.id as number)
  let result_3:SpuHasImage=await reqSpuImageList(spu.id as number)
  
  // 存储数据
  attrArr.value=result_1.data
  saleArr.value=result_2.data;
  imgArr.value=result_3.data

}


// 设置默认图片的方法
const handler=(row:any)=>{
  // btn.value.type="success"
  // 点击的时候，全部复选框不勾选
  imgArr.value.forEach((item)=>{
    table.value.toggleRowSelection(item,false)
    item.isDefault=false
  })
  // 选中的图片才勾选
  table.value.toggleRowSelection(row,true)
  // 让按钮变颜色
  row.isDefault=true
  skuParams.skuDefaultImg=row.imgUrl
}
// 保存按钮的方法
const save=async ()=>{
  // 整理参数
  skuParams.skuAttrValueList=attrArr.value.reduce((prev:any,next:any)=>{
    if(next.attrIdAndValueId){
      let [attrId,valueId]=next.attrIdAndValueId.split(":")
      prev.push({
        attrId,
        valueId
      })
    }
    return prev
  },[])
  // 销售属性
   skuParams.skuSaleAttrValueList=saleArr.value.reduce((prev:any,next:any)=>{
    if(next.saleIdAndValueId){
      let [saleAttrId,saleAttrValueId]=next.saleIdAndValueId.split(':')
      prev.push({
        saleAttrId,
        saleAttrValueId
      })
    }
    return prev
   },[])
  //  发送请求
   let result:any=await reqAddSku(skuParams)
   if(result.code==200){
    ElMessage({
      type:'success',
      message:"添加成功"
    })
    $emit('changeScene', {pager:0,params:"updata"})
   }else{
    ElMessage({
      type:'error',
      message:"添加失败"
    })
   }

}
defineExpose({initSkuData})
</script>