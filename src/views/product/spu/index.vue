<template>
  <div>
    <!-- 三级分类的结构 -->
    <Category></Category>
    <!-- 底部卡片 -->
    <el-card style="margin: 20px 0;">
      <el-button icon="Plus" type="primary">添加SPU</el-button>
      <el-table border style="margin: 20px 0;">
        <el-table-column label="序号" type="index" width="100px" align="center"></el-table-column>
        <el-table-column label="SPU名称"></el-table-column>
        <el-table-column label="SPU描述"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
      <div class="demo-pagination-block">
        <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
          :page-sizes="[3, 5, 7, 9]" :small="small" :disabled="disabled" :background="true"
          layout="  prev, pager, next, jumper,->,sizes,total," :total="total" />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
// 分页器默认页码
let currentPage=ref<number>(1)
// 每一页展示几个
let pageSize=ref<number>(3)
// 总数据量
let total=ref<number>(200)
</script>





<style lang="scss" scoped></style>