<template>
    <div class="layout_container">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ flod: LayOutSettingStore.fold ? true : false }">
            <logo></logo>
            <!-- 展示菜单 -->
            <el-scrollbar class="scrollbar">
                <el-menu background-color="#434a50" text-color="#fff" active-text-color="#ffd04b"
                    :default-active="$route.path" :collapse="LayOutSettingStore.fold">
                    <Menu :menuList="userStore.menuRoutes"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ flod: LayOutSettingStore.fold ? true : false }">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main" :class="{ flod: LayOutSettingStore.fold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts" name="Layout">

import logo from './logo/index.vue';
import Menu from './menu/index.vue';
// 引入右侧内容的展示区
import Main from './main/index.vue';
import { useRoute } from 'vue-router'
// 引入top栏
import Tabbar from './tabbar/index.vue';
// 获取用户相关的小仓库
import useUserStore from "@/store/modules/user.ts"
import useLayOutSettingStore from '@/store/modules/setting';
let userStore = useUserStore()
let LayOutSettingStore = useLayOutSettingStore();



// 获取路由对象
let $route = useRoute()

</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base_menu_width;
        height: 100vh;
        background-color: $base_menu_background;
        color: #fff;
        transition: all 0.4s;
        .scrollbar {
            width: 100%;
            height: calc(100vh - $base_menu_logo_height);

            .el-menu {
                border-right: none;
            }
        }

        &.flod {
            width: $base_menu_min_width;
        }
    }


    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base_menu_width);
        height: $base_tabbar_height;
        top: 0;
        left: $base_menu_width ;
        transition: all 0.4s;
        &.flod {
            width: calc(100vw - $base_menu_min_width);
            left: $base_menu_min_width ;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base_menu_width);
        height: calc(100vh - $base_tabbar_height);
        background-color: yellow;
        left: $base_menu_width ;
        top: $base_tabbar_height;
        padding: 20px;
        overflow: auto;
        transition: all 0.4s;
        &.flod {
            width: calc(100vw - $base_menu_min_width);
            left: $base_menu_min_width ;
        }
    }

}
</style>