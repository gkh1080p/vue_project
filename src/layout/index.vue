<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <logo></logo>
            <!-- 展示菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="$base_menu_background" text-color="#fff"
                active-text-color="#ffd04b">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">123</div>
        <!-- 内容展示区 -->
        <div class="layout_main">
            <p style="height: 10000px;">11</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import logo from './logo/index.vue'
import Menu from './menu/index.vue'

// 获取用户相关的小仓库
import useUserStore from "@/store/modules/user.ts"
let userStore=useUserStore()
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;
    background-color: aqua;

    .layout_slider {
        width: $base_menu_width;
        height: 100vh;
        background-color: $base_menu_background;
        color:#fff;
        .scrollbar {
            width: 100%;
            height: calc(100vh - $base_menu_logo_height);
            .el-menu{
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base_menu_width);
        height: $base_tabbar_height;
        background-color: red;
        top: 0;
        left: $base_menu_width ;
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base_menu_width);
        height: calc(100vh - $base_tabbar_height);
        background-color: yellow;
        left: $base_menu_width ;
        top: $base_tabbar_height;
        padding: 20px;
        overflow: auto
    }
}
</style>