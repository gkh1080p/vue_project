<template>
  <div>
    <el-card>
      <!-- 卡片的添加按钮 -->
      <el-button type="primary" size="default" icon='Plus' @click="addTrademark" v-has="`btn.Trademark.add`">添加品牌</el-button>
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
            <el-button type="primary" icon="Edit" @click="updateTrademark(row)"  v-has="`btn.Trademark.update`"></el-button>
            <el-popconfirm title="你确定要删除吗?" icon="Delete" @confirm="removeTradeMark(row.id)" v-has="`btn.Trademark.remove`">
              <template #reference>
                <el-button type="danger">Delete</el-button>
              </template>
            </el-popconfirm>

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
      
    </el-card>

    <!-- 对话框组件，在添加品牌和修改品牌的时候使用结构 -->
    <!-- 
    v-model:属性用户控制对话框的显示与隐藏的true显示，false隐藏
    title:设置对话框左上角标题
   -->
    <el-dialog v-model="dialogFormVisible" :title="title">
      <el-form style="width: 70%; margin: 10px 80px;" :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input placeholder="请输入品牌名称" v-model="trademarkParams.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">

          <el-upload class="avatar-uploader" action="http://sph-api.atguigu.cn/admin/product/fileUpload"
            :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" width="200px" />
            <el-icon v-else class="avatar-uploader-icon" style="width: 200px;height: 200px; border: 2px dashed;">
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
// @ts-nocheck
import { ref, onMounted, reactive, nextTick } from 'vue';
// 请求封装引进
import { reqHasTrademark, reqAddorUpdateTrademark,reqDeleteTrademark } from '@/api/product/trademark/index.ts'
import type { Records, TradeMarkResponseData, TradeMark } from '@/api/product/trademark/type.ts'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

// 弹框展示文字
let title = ref<string>("")
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
// 获取表单检验的ref
let formRef = ref()
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
  title.value = "添加品牌"
  dialogFormVisible.value = true
  // 方式1
  // formRef.value?.clearValidate("tmName")
  // formRef.value?.clearValidate("logoUrl")
  // 方式2
  nextTick(() => {
    formRef.value.clearValidate("tmName")
    formRef.value.clearValidate("logoUrl")
  })
}
// 修改商品
function updateTrademark(row: TradeMark) {
  // trademarkParams.tmName=row.tmName
  // trademarkParams.logoUrl=row.logoUrl
  // trademarkParams.id=row.id
  Object.assign(trademarkParams, row)
  title.value = "修改品牌"
  dialogFormVisible.value = true
  nextTick(() => {
    formRef.value.clearValidate("tmName")
    formRef.value.clearValidate("logoUrl")
  })
}
// 对话框底部取消按钮
function cancel() {
  dialogFormVisible.value = false
}
// 对话框底部确认按钮
const confirm = async () => {
  await formRef.value.validate()
  let result: any = await reqAddorUpdateTrademark(trademarkParams);

  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: "success",
      message: trademarkParams.id ? "修改品牌成功" : "添加品牌成功"
    })
    getHasTrademark((total.value / limit.value))

  } else {
    ElMessage({
      type: "error",
      message: trademarkParams.id ? "修改品牌失败" : "添加品牌失败"
    })
  }
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
  // 图片上传成功后清理掉对应的验证消息
  formRef.value.clearValidate("logoUrl");
}


// 表单校验
// 表单校验中自定义函数
const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    // 校验未通过返回错误信息
    callBack(new Error("品牌名称位数需要大于两位"))
  }
}
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error("LOGO图片务必上传"))
  }
}
// 校验规则
const rules = ({
  tmName: [
    { required: true, trigger: 'blur', validator: validatorTmName }
  ],
  logoUrl: [
    { require: true, trigger: "change", validator: validatorLogoUrl }
  ]
})

// 气泡确认框确认回调---删除按钮
const removeTradeMark=async (id:number)=>{
  // 点击取人按钮
  let result=await reqDeleteTrademark(id)
  console.log(result)
  if(result.code==200){
    ElMessage({
      type:"success",
      message:"删除品牌成功"
    })
    // 再次获取已有品牌
    getHasTrademark(trademarkArr.value.length>1?pageNo.value:pageNo.value-1)
  }else{
      ElMessage({
        type:'error',
        message:'删除商品失败'
      })
    }
}
</script>

<style lang="scss" scoped></style>