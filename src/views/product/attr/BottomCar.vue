<template>
  <el-card style="margin:10px 0">
    <div v-show="categoryStore.scene===0">
      <el-button @click="addAttr" type="primary" size="default" icon="Plus" :disabled="categoryStore.c3Id?false:true">添加属性</el-button>
      <el-table border style="margin: 15px 0;" :data="attrArr">
      <el-table-column label="序号" width="80px" type="index" align="center" ></el-table-column>
      <el-table-column label="属性名称" width="150px" prop="attrName"></el-table-column>
      <el-table-column label="属性值名称">
        <template #="{row}">
          <el-tag v-for="item in row.attrValueList" :key="item.id" style="margin:10px;">{{ item.valueName }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200px">
        <!-- row表示已有属性对象 -->
        <template #="{row}">
          <!-- 修改已有属性与属性值 -->
          <el-button type="primary" icon="Edit" @click="updateAttr(row)"></el-button>
          <el-popconfirm title="你确定要删除吗？" @confirm="deleteAttr(row.id)" >
            <template #reference>
              <el-button type="danger" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div v-show="categoryStore.scene==1">
      <el-form :inline="true">
        <el-form-item label="属性名称">
          <el-input placeholder="请输入属性的名称" v-model="attrParams.attrName"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="addAttrValue" type="primary" icon="Plus" :disabled="attrParams.attrName?false:true">添加属性值</el-button>
      <el-button type="warning" @click="cencel">取消</el-button>
     <el-table border style="margin: 20px 0;" :data="attrParams.attrValueList">
        <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
        <el-table-column label="属性名称">
          <template #="{row,$index}">
            <el-input v-if="row.flag" @blur="toLook(row,$index)" ref="inputField" placeholder="请你输入属性值名称" v-model="row.valueName"></el-input>
            <div v-else @click="toEdit(row)">{{row.valueName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="属性操作">
          <template #="{$index}">
            <el-button @click="deleteValue($index)"  type="danger" icon="Delete" style="margin:0 10px;"></el-button>
          </template>
        </el-table-column>
     </el-table>
     <el-button @click="save" type="primary" icon="Coin" :disabled="attrParams.attrValueList.length>0?false:true">保存</el-button>
      <el-button type="warning" @click="cencel">取消</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts" name="BottomCar">
import useCategoryStore from "@/store/modules/category.ts"
import {watch,ref,reactive} from 'vue'
import {reqAttr,reqAddOrUpdateAttr,reqRemoveAttr} from '@/api/product/attr'
import type {AttrResponseData,Attr,AttrValue} from '@/api/product/attr/type.ts'
import { ElMessage } from "element-plus";
import { nextTick ,onBeforeUnmount} from 'vue';

let categoryStore=useCategoryStore()
let attrArr=ref<Attr[]>([])
// 收集新增的属性的内容数据
let attrParams=reactive<Attr>({
  attrName: "",  //新增属性名
  attrValueList: [],//新增的属性值数组
  categoryId:"",
  categoryLevel: 3,
})
// 获取属性值名称的输入表单标签对象，以实现自动添加焦点
let inputField=ref(null)
// // 定义一个响应式数据控制编辑模式与查看模式的切换
// let flag=ref<boolean>(true)
// scene为0显示展示面板，为1展示编辑面板
// categoryStore.scene=1

// 当三级分类发生变化的时候，触发监听
watch(()=>categoryStore.c3Id,async ()=>{
  attrArr.value=[]
  // 判断三级分类是否有值
  if(!categoryStore.c3Id) return
// 获取分类
  getAttr()

})

// 获取属性与属性方法
const getAttr=async ()=>{
  const {c1Id,c2Id,c3Id}=categoryStore
  let result:AttrResponseData=await reqAttr(c1Id,c2Id,c3Id)
  if(result.code==200){
    attrArr.value=result.data
  }
}

// 添加属性
const addAttr=()=>{
  Object.assign(attrParams,{
    attrName: "",  //新增属性名
    attrValueList: [],//新增的属性值数组
    categoryId:"",
    categoryLevel: 3,
  })
  categoryStore.scene=1;
}
// 修改属性
const updateAttr=(row:Attr)=>{
  Object.assign(attrParams,JSON.parse(JSON.stringify(row)))
  categoryStore.scene=1
}

// 取消按钮的回调
const cencel=()=>{
  categoryStore.scene=0;
}

// 添加属性值按钮的回调
const addAttrValue=()=>{
  attrParams.categoryId=categoryStore.c3Id
  attrParams.attrValueList.push({
    valueName:'',
    flag:true,
  })
  nextTick(() => {
    (inputField.value! as HTMLElement).focus()
  });

}
// 保存按钮的回调
const save=async ()=>{
  let result=await reqAddOrUpdateAttr(attrParams)
  if(result.code==200){
    categoryStore.scene=0
    // 提示信息
    ElMessage({
      type:'success',
      message:attrParams.id?'修改成功':"添加成功"
    })
  }else{
    ElMessage({
      type:'error',
      message:attrParams.id?'修改失败':'添加成功'
    })
  }
  getAttr()
}

// 属性值名称显示
const toLook=(row:AttrValue,$index:number)=>{
  //第一种情况 当添加了一个以后，属于非法语句
  if(row.valueName.trim()==""){
   ElMessage({
    type:"error",
    message:"属性值不能为空"
   })
   attrParams.attrValueList.splice($index,1);
   return;
  }
  // 第二种情况，不能出现相同的属性值
  let repect=attrParams.attrValueList.find((item)=>{
    // 切记把当前失去焦点的属性对象啊你个从当前数组扣除去
      if(item!=row){
        return item.valueName==row.valueName
      }
  })
  if(repect){
    ElMessage({
      type:'error',
      message:'属性值重复了'
    })
   attrParams.attrValueList.splice($index,1);
  }

  row.flag=false
}
// 编辑属性值名称
const toEdit=(row:AttrValue)=>{
  row.flag=true
  nextTick(() => {
    (inputField.value! as HTMLElement).focus()
  });
}
// 删除属性值按钮
const deleteAttr=async (id:number)=>{
  let result=await reqRemoveAttr(id);
  if(result.code==200){
    ElMessage({
      type:'success',
      message:"删除成功"
    })
    getAttr();
  }else{
    ElMessage({
      type:'error',
      message:"删除失败"
    })
  }
}

// 属性值的删除
const deleteValue=($index:number)=>{
  attrParams.attrValueList.splice($index,1);
}

// 当路由组件被销毁的时候清空仓库
onBeforeUnmount(()=>{
  categoryStore.$reset()
})
</script>

<style lang="scss" scoped>

</style>