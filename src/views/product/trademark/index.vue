<template>
  <div>
    <el-card>
      <!-- 卡片的添加按钮 -->
      <el-button type="primary" size="default" icon='Plus' @click="addTrademark">添加品牌</el-button>
      <!-- 
      table
        --border:设置表格纵向是否有表格
      table-column
        -label:某一个列表名字
        -width:宽度
        —align:设置1列的文字对齐方式
     -->
      <el-table style="width: 100%;margin: 10px 0;" border :data="trademarkArr">
        <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
        <!-- table-column默认是div展示数据 -->
        <el-table-column label="品牌名称">
          <template #="{ row }">
            <pre>{{ row.tmName }}</pre>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO">
          <template #="{ row }">
            <img :src="row.logoUrl" style="width: 100px;height: 100px;" alt="未有图片">
          </template>
        </el-table-column>
        <el-table-column label="品牌操作">
          <template #="{ row }">
            <el-button type="primary" icon="Edit" @click="updateTrademark"></el-button>
            <el-button type="danger" icon="Delete"></el-button>

          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器组件
        v-model:current-page  设置分页器当前的页码
        v-model:page-size 设置每一页展示的数据
        :page-sizes 用于设置下拉菜单的属性
        
      -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]"
        :disabled="false" :background="true" layout=" prev, pager, next, jumper,->,total, sizes," :total="total"
        @current-change="getHasTrademark" @size-change="getHasTrademark(1)" />
      <template #footer> content</template>
    </el-card>

    <!-- 对话框组件，在添加品牌和修改品牌的时候使用结构 -->
    <!-- 
    v-model:属性用户控制对话框的显示与隐藏的true显示，false隐藏
    title:设置对话框左上角标题
   -->
    <el-dialog v-model="dialogFormVisible" title="添加品牌">
      <el-form style="width: 70%; margin: 10px 80px;">
        <el-form-item label="品牌名称" label-width="80px">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="80px">
          <!-- upload属性API
          action  --上传文件的地址
        -->
          <el-upload class="avatar-uploader" action="http://sph-api.atguigu.cn/admin/product/fileUpload"
            :show-file-list="true" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" width="200px" />
            <el-icon v-else class="avatar-uploader-icon" style="width: 200px;height: 200px; border: 2px solid;">
              <Upload />
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 具名插槽 -->
      <template #footer>
        <el-button type="danger" @click="cancel()">取消</el-button>
        <el-button type="primary" @click="confirm()">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">

import { ref, onMounted, reactive } from 'vue';
// 请求封装引进
import { reqHasTrademark, reqAddorUpdateTrademark } from '@/api/product/trademark/index.ts'
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type.ts'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'
import { SuccessFilled } from '@element-plus/icons-vue';

// 当前页面
let pageNo = ref<number>(1)
// 每一页展示的数据
let limit = ref<number>(3)
// 存储已有品牌的总数
let total = ref<number>(0)
// 储存已有品牌的数据总数
let trademarkArr = ref<Records>([])
// 控制对话框的显示与隐藏
let dialogFormVisible = ref(false)
// 获取已有品牌的接口封装成一个函数
const getHasTrademark = async (pager = 1) => {
  ``
  pageNo.value = pager;
  let result: TradeMarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
  if (result.code === 200) {
    total.value = result.data.total
    trademarkArr.value = result.data.records
  }
}
// 挂载的时候发一次请求
onMounted(() => {
  getHasTrademark()
});

// 商品增删改
// 定义收集新增品牌数据
let trademarkParams = reactive<TradeMark>({
  tmName: '',
  logoUrl: ''
})
// 新增商品
function addTrademark() {
  trademarkParams.tmName = ""
    trademarkParams.logoUrl = ""
  dialogFormVisible.value = true
}
// 修改商品
function updateTrademark() {
  dialogFormVisible.value = true
}
// 对话框底部取消按钮
function cancel() {
  dialogFormVisible.value = false

}
// 对话框底部确认按钮
const confirm = async () => {
  let result: any = await reqAddorUpdateTrademark(trademarkParams);
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: "success",
      message: "添加品牌成功"
    })
    getHasTrademark()
  
  } else {
    ElMessage({
      type: "error",
      message: "添加失败"
    })
  }
  console.log(result)
}

// 上传图片之前触发的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type == 'image/gif' || rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/jpg') {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: "error",
        message: "上传文件过大",
      })
      return false
    }
  } else {
    ElMessage({
      type: "error",
      message: "上传文件格式务必为PNG|JPG|GIF"
    })
    return false
  }
}
// 图片上传成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
  // response即为当前这次上传图片post请求服务器返回的数据
  trademarkParams.logoUrl = response.data;
}
</script>

<style lang="scss" scoped></style>