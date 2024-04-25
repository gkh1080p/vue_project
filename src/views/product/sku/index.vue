<template>
  <div>
    <el-card>
      <el-table border :data="skuArr">
        <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
        <el-table-column label="名称" show-overflow-tooltip width="200px" prop="skuName"></el-table-column>
        <el-table-column label="描述" show-overflow-tooltip width="200px" prop="skuDesc"></el-table-column>
        <el-table-column label="图片" width="200px">
          <template #="{ row }">
            <img :src="row.skuDefaultImg" alt="" height="100px">
          </template>
        </el-table-column>
        <el-table-column label="重量" width="200px" prop="weight"></el-table-column>
        <el-table-column label="价格" width="200px" prop="price"></el-table-column>
        <el-table-column fixed="right" label="操作" width="300px">
          <template #="{ row }">
            <el-button @click="load(row)" :title="row.isSale == 1 ? '商品为上架状态，点击下架商品' : '商品为下架状态，点击上架商品'"
              :type="row.isSale == 1 ? 'warning' : 'success'" :icon="row.isSale == 1 ? 'Bottom' : 'Top'" v-has="`btn.Sku.updown`"></el-button>
            <el-button type="primary" icon="EditPen"></el-button>
            <el-button type="info" icon="WarningFilled" @click="findSku(row)" v-has="`btn.Sku.detail`"></el-button>
            <el-popconfirm title="你确定要删除吗?" @confirm="deleteSku(row)"  v-has="`btn.Sku.remove`">
              <template #reference>
                <el-button type="danger" icon="delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination style="margin: 20px 10px;" v-model:current-page="pageNo" v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]" :background="true" layout=" prev, pager, next, jumper,->,sizes,total "
        :total="total" @current-change="getHasSKu" @size-change="handler" />
    </el-card>
    <!-- 抽屉组件 -->
    <el-drawer v-model="drawer" title="SKU商品详细展示">
      <template #header>
        <h4>查看商品详细</h4>
      </template>
      <template #default>
        <el-row style="margin: 20px;">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ SKuInfo.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 20px;">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ SKuInfo.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 20px;">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ SKuInfo.price }}</el-col>
        </el-row>
        <el-row style="margin: 20px;">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in SKuInfo.skuAttrValueList" :key="item.id" :type="tags[Randoms(0, tags.length - 1)]"
              style="margin: 0 10px;">{{ item.valueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 20px;">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag v-for="item in SKuInfo.skuSaleAttrValueList" :key="item.id"
              :type="tags[Randoms(0, tags.length - 1)]" style="margin: 0 10px;">{{ item.saleAttrValueName }}</el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 20px;">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in SKuInfo.skuImageList" :key="item.id">
                <img :src="item.imgUrl" alt="" style="width: 100%; height:100%">
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
      <template #footer>
        <h4>set title by slot</h4>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts" name="Sku">
// @ts-nocheck
import { ref, onMounted } from "vue"
// 引入请求
import { reqSkuList, reqUploadOrDownload, reqSkuInfo, reqRemoveSku } from "@/api/product/sku/index.ts";
// 引入数据类型
import type { SkuResponseData, SkuData, SkuInfoData } from "@/api/product/sku/type.ts"
import { ElMessage } from "element-plus";
let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
// 总数据条数
let total = ref<number>(0)
// 总数据数组
let skuArr = ref<SkuData[]>([])
// 控制抽屉显示与隐藏的字段
let drawer = ref<boolean>(false)
// 商品详细信息
let SKuInfo = ref<SkuData>({})
// 随机颜色
let tags = ref(["primary", "success", "info", "warning", "danger"])
// 挂载的时候获取一遍数据
onMounted(() => {
  getHasSKu()
})
// 获取数据
const getHasSKu = async (pager = 1) => {
  pageNo.value = pager
  let result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code == 200) {
    total.value = (result.data.total as number)
    skuArr.value = result.data.records
  }
}
const handler = () => {
  getHasSKu()
}
const load = async (row: SkuData) => {
  let result = await reqUploadOrDownload(row.id as number, row.isSale as number)
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "操作成功"
    })
    getHasSKu(pageNo.value)
  } else {
    ElMessage({
      type: "error",
      message: "操作失败"
    })
  }
}
// 查看商品详情的按钮
const findSku = async (row: SkuData) => {
  drawer.value = true
  let result: SkuInfoData = await reqSkuInfo(row.id as number)
  // 存起来
  SKuInfo.value = result.data
}
// 删除SKU
const deleteSku=async (row:SkuData)=>{
  let result=await reqRemoveSku(row.id as number)
  if(result.code==200){
    ElMessage({
      type:"success",
      message:"删除成功"
    })
    getHasSKu(skuArr.value.length>1?pageNo.value:pageNo.value-1)
  }else{
    ElMessage({
      type:"error",
      message:result.data
    })
  }
}




// 随机数
function Randoms(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


</script>





<style lang="scss" scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>