<template>
  <div>
    <!-- 三级分类的结构 -->
    <Category :scene="scene"></Category>
    <!-- 底部卡片 -->
    <el-card style="margin: 20px 0;">
      <div v-show="scene==0">
        <el-button icon="Plus" type="primary" :disabled="categoryStore.c3Id?false:true" @click="addSpu">添加SPU</el-button>
      <el-table border style="margin: 20px 0;" :data="records">
        <el-table-column label="序号" type="index" width="100px" align="center"></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作">
          <template #="{row}">
            <el-button type="primary" icon="Plus" title="添加SKU" style="margin:10px 15px" @click="addSku(row)" v-has="`btn.Spu.addsku`"></el-button>
            <el-button type="info" icon="Edit" title="修改SPU" style="margin:10px 15px" @click="updateSpu(row)"  v-has="`btn.Spu.update`"></el-button>
            <el-button type="success" icon="View" title="查看SKU列表" style="margin:10px 15px" @click="findSku(row)"  v-has="`btn.Spu.skus`"></el-button>
            <el-popconfirm title="你确定要删除吗?" @confirm="deleteSpu(row)"  v-has="`btn.Spu.remove`">
              <template #reference>
                <el-button type="danger" icon="Delete" title="删除SPU" style="margin:10px 15px" @click=""></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]"  :background="true"
          layout="  prev, pager, next, jumper,->,sizes,total," :total="total"
          @current-change="getHasSpu" @size-change="getHasSpu(1)"
          />
      </div>
      </div>
      <!--添加|修改SPU的组件 -->
      <SpuForm ref="spu" v-show="scene==1" @changeScene="changeScene"></SpuForm>
      <!-- 添加SKU的组件 -->
      <SkuForm ref="sku" v-show="scene==2" @changeScene="changeScene"></SkuForm>
      <!-- dialog对话框：展示已有的SKU数据 -->
      <el-dialog title="SKU列表" v-model="show" >
        <el-table border :data="skuArr">
          <el-table-column label="SKU名称" prop="skuName"></el-table-column>
          <el-table-column label="SKU价格" prop="price"></el-table-column>
          <el-table-column label="SKU重量" prop="weight"></el-table-column>
          <el-table-column label="SKU图片">
            <template #={row}>
              <img :src="row.skuDefaultImg" alt=""  height="100px">
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="IndexSpu">
import {ref,watch,onBeforeUnmount} from 'vue'
// 引入仓库
import useCategoryStore from '@/store/modules/category';
let categoryStore=useCategoryStore()
// 引入请求
import {reqHasSpu,reqSkuList,reqDeleteSpu} from "@/api/product/spu/index.ts"
// 引入类型
import type {HasSpuResponseData,Records, SpuData,SkuInfoData,SkuData} from "@/api/product/spu/type.ts"
// 引入相应的子组件
import SpuForm from './spuForm.vue'
import SkuForm from './skuForm.vue'
import { ElMessage } from 'element-plus';
// 分页器默认页码
let currentPage=ref<number>(1)
// 每一页展示几个
let pageSize=ref<number>(3)
// 总数据量
let total=ref<number>(0)
// 存储SPU数据
let records=ref<Records>([])
// 获取子组件实例
let spu=ref<any>()
// 场景显示标志
let scene=ref<number>(0)  //0表示显示SPU数据，1表示添加修改SPU，2表示SKU操作
// 存储全部的SKU数据
let skuArr=ref<SkuData[]>([])
// 控制对话框的显示与隐藏
let show=ref<boolean>(false)
//监听三级分类ID的变化
watch(()=>categoryStore.c3Id,()=>{
  if(!categoryStore.c3Id) return;
  getHasSpu()
})  

// 根据3级id获取数据
const getHasSpu=async (pager=1)=>{
  currentPage.value=pager
  // 防止多次发送请求
  if(!categoryStore.c3Id) return;
  let result:HasSpuResponseData=await reqHasSpu(currentPage.value,pageSize.value,categoryStore.c3Id)
  if(result.code==200){
    records.value=result.data.records;
    total.value=result.data.total
  }
}

// 添加新的SPU按钮的回调
const addSpu=()=>{
  // 场景标志为1
  scene.value=1
  categoryStore.scene=1
  // 初始化数组
  spu.value.initAddSpu(categoryStore.c3Id);
}
// 修改已有SPU的按钮方法
const updateSpu=(row:SpuData)=>{
  // 场景标志为1
  scene.value=1
  // 禁用分级组件
  categoryStore.scene=1
  // 传递给子组件
  spu.value.initHasSpuData(row)

}
// 子组件SpuForm绑定自定义事件：目的是让子组件通知父组件切换场景为0
const changeScene=(obj:any)=>{
  scene.value=obj.pager
  categoryStore.scene=0
  if(obj.params=="update"){
    getHasSpu(currentPage.value)
  }else{
    getHasSpu()
  }
}


// ########################
// sku方法
let sku=ref<any>()
const addSku=(row:SpuData)=>{
  scene.value=2
  categoryStore.scene=1
  sku.value.initSkuData(categoryStore.c1Id,categoryStore.c2Id,row)
}

// #############################
// 查看SKU
const findSku=async (row:SpuData)=>{
  let result:SkuInfoData=await reqSkuList(row.id as number)
  if(result.code==200){
    skuArr.value=result.data
    show.value=true
  }
}
const deleteSpu=async(row:SpuData)=>{
  let result:any=await reqDeleteSpu(row.id as number)
  if(result.code==200){
    ElMessage({
      type:'success',
      message:"删除成功"
    })
    getHasSpu(records.value.length>1?currentPage.value:currentPage.value-1)
  }else{
    ElMessage({
      type:'error',
      message:"删除失败"
    })
  }
}
onBeforeUnmount(()=>{
  categoryStore.$reset();
})
</script>

<style lang="scss" scoped></style>