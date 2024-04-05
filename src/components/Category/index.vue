<template>
    <div>
        <el-card>
        <el-form :inline="true">
            <el-form-item label="一级分类">
                <el-select :disabled="CategoryStore.scene==0?false:true" placeholder="请选择" style="width: 200px" v-model.number="CategoryStore.c1Id" @change="handle">
                    <!-- label即为列表名字 -->
                    <el-option v-for="c1 in CategoryStore.c1Arr" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select :disabled="CategoryStore.scene==0?false:true" placeholder="请选择" style="width: 200px" v-model.number="CategoryStore.c2Id" @change="handle1">
                    <el-option v-for="c2 in CategoryStore.c2Arr" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select :disabled="CategoryStore.scene==0?false:true" placeholder="请选择" style="width: 200px"  v-model.number="CategoryStore.c3Id">
                    <el-option v-for="c3 in CategoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
    </div>
</template>

<script setup lang="ts" name="Category">
import { onMounted } from 'vue';
// 引入分类相关的仓库
import useCategoryStore from '@/store/modules/category.ts'

let CategoryStore=useCategoryStore()

onMounted(()=>{
    CategoryStore.getC1()
})
// 此方法为1级菜单选中值的时候会触发
const handle=()=>{
    CategoryStore.getC2()
    CategoryStore.clear1()

}
// 此方法为2级菜单那选中时触发的函数
const handle1=()=>{
    CategoryStore.getC3()
    CategoryStore.clear2()
}
</script>

<style lang="scss" scoped>

</style>