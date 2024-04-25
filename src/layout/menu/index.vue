<template>
  <template v-for="(item) in menuList" :key="item.path">
    <!-- 如果没有子路由就用这个板块 -->
    <el-menu-item v-if="!item.children&&!item.meta.hidden" :index="item.path" @click="goRoute">
      <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
      <template #title>
       <span>{{item.meta.title}}</span>
      </template>
    </el-menu-item>


    <!-- 如果路由孩子只有一个也通过该形式进行展示 -->
    <el-menu-item v-if="item.children&&item.children.length==1&&!item.meta.hidden" :index="item.children[0].path" @click="goRoute">
      <el-icon>
          <component :is="item.children[0].meta.icon"></component>
        </el-icon>
      <template #title>
       <span>{{item.children[0].meta.title}}</span>
      </template>
    </el-menu-item>


    <!-- 有多个子路由，且个数大于一个 -->
    <el-sub-menu v-if="item.children&&item.children.length>1&&!item.meta.hidden" :index="item.path" >
      <template #title>
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{item.meta.title}}</span>
      </template>
      <Menu :menuList="item.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

// 获取父亲穿过来的全部路由数组
defineProps(['menuList'])
// // 获取一个路由对象
let $router=useRouter();
const goRoute=(vc:any)=>{
  $router.push(vc.index)
}
</script>

<script lang="ts">
export default {
  name:'Menu',
}
</script>

<style lang="scss" scoped>

</style>