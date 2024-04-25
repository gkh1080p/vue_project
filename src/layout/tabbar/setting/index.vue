<template>
    <el-button type="primary" size="default" @click="updateRefsh()" icon="Refresh" circle></el-button>
    <el-button type="primary" size="default" @click="fullScreen" icon="FullScreen" circle></el-button>
    <el-popover placement="bottom" title="主题设置" :width="350" trigger="click" :visible="visible">
        <el-form>
            <el-form-item label="主题颜色">
                <el-color-picker v-model="color" show-alpha  @change="setColor" :predefine="predefineColors" />
            </el-form-item>
            <el-form-item label="暗黑模式">
                <el-switch v-model="dark" inline-prompt active-icon="MoonNight" inactive-icon="Sunny" @change="changeDark" />
            </el-form-item>
        </el-form>
        <template #reference>
            <el-button type="primary" size="default" @click="visible = !visible" icon="Tools" circle></el-button>
        </template>
    </el-popover>

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
import { useRouter, useRoute } from 'vue-router';
let $router = useRouter()
import useUserStore from '@/store/modules/user';
let userStore = useUserStore()
// 获取骨架的小仓库
import useLayOutSettingStore from '@/store/modules/setting';
let LayOutSettingStore = useLayOutSettingStore()
// 刷新操作
const updateRefsh = () => {
    LayOutSettingStore.refsh = !LayOutSettingStore.refsh
}
// 全屏操作
const fullScreen = () => {
    // DOM对象的一个属性，若为全屏则为true，否则为false
    let full = document.fullscreenElement;
    if (!full) {
        // 利用文档的根节点方法requestFullscreen方法进入全屏
        document.documentElement.requestFullscreen();
    } else {
        // 退出全屏
        document.exitFullscreen();
    }
}
// 获取路由对象
let $route = useRoute()
// 退出登录点击的回调
const logout = async () => {
    // 第一件事：向服务器发送亲求
    // 第二件事：仓库当中关于相关的数据清空
    // 第三件：跳转到登录页面
    await userStore.userLogout()
    $router.push({ path: '/login', query: { redirect: $route.path } })
}
// ##############################
// 主题切换
// 颜色模块
import { ref } from 'vue'
let visible=ref<boolean>(false)
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const dark = ref<boolean>(false)
const changeDark=()=>{
    // 获取根节点
    let html=document.documentElement
    // 判断html标签是否有类名
    dark.value?html.className='dark':html.className=''
}
// 主题颜色的设置
const setColor=()=>{
    // document.documentElement 是全局变量时
    const el = document.documentElement
    // const el = document.getElementById('xxx')

    // 获取 css 变量
    // getComputedStyle(el).getPropertyValue(`--el-color-primary`)

    // 设置 css 变量
    el.style.setProperty('--el-color-primary', color.value)
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