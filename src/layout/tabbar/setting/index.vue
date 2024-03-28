<template>
    <el-button type="primary" size="default" @click="updateRefsh()" icon="Refresh" circle></el-button>
    <el-button type="primary" size="default" @click="fullScreen" icon="FullScreen" circle></el-button>
    <el-button type="primary" size="default" @click="" icon="Tools" circle></el-button>
    <img :src="userStore.avatar" alt="" style="width: 40px;height: 40px;">
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
// 引入路由挑战模块
import { useRouter,useRoute } from 'vue-router';
let $router=useRouter()
import useUserStore from '@/store/modules/user';
let userStore=useUserStore()
// 获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting';
let LayOutSettingStore=useLayOutSettingStore()
// 刷新操作
const updateRefsh=()=>{
    LayOutSettingStore.refsh=!LayOutSettingStore.refsh
}
// 全屏操作
const fullScreen=()=>{
    // DOM对象的一个属性，若为全屏则为true，否则为false
    let full=document.fullscreenElement;
    if(!full){
        // 利用文档的根节点方法requestFullscreen方法进入全屏
        document.documentElement.requestFullscreen();
    }else{
        // 退出全屏
        document.exitFullscreen();
    }
}
// 获取路由对象
let $route=useRoute()
// 退出登录点击的回调
const logout=()=>{
    // 第一件事：向服务器发送亲求
    // 第二件事：仓库当中关于相关的数据清空
    // 第三件：跳转到登录页面
    userStore.userLogout()
    $router.push({path:'/login',query:{redirect:$route.path}})
}
</script>

<style lang="scss" scoped name="Setting">
img {
    border-radius: 50%;
    /* 将圆角半径设置为图片宽度/高度的一半 */
    overflow: hidden;
    /* 隐藏超出边界的内容 */
    margin-left: 5px;
    margin-right: 10px;
}
</style>