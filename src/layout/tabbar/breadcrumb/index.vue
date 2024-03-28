<template>
    <!-- 图标 -->
    <el-icon style="margin-right: 10px" @click="chagneIcon" >
        <component :is=" LayOutSettingStore.fold?'Connection':'Crop'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb :separator-icon="ArrowRight">
        <!-- 需要根据路由动态的展示 -->
        <el-breadcrumb-item v-for="(item) in $route.matched" ::key="item.path" 
        v-show="item.meta.title" :to="item.path">
            <el-icon style="margin: 2px 5px;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
    </el-breadcrumb>

</template>

<script setup lang="ts" name="Breadcrumb">
import { ArrowRight } from '@element-plus/icons-vue'
import useLayOutSettingStore from '@/store/modules/setting.ts'
//获取路由对象
import { useRoute } from 'vue-router';
let $route=useRoute()
// 获取layout配置相关仓库
let LayOutSettingStore=useLayOutSettingStore()
const chagneIcon=()=>{
    LayOutSettingStore.fold=!LayOutSettingStore.fold
}
</script>

<style lang="scss" scoped></style>