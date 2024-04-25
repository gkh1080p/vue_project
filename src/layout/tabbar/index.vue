<template>
    <div class="tabbar">
        <div class="tabbar_left">
           <Breadcrumb></Breadcrumb>
        </div>
        <div class="tabbar_right">
            <Setting></Setting>
        </div>
    </div>
</template>

<script setup lang="ts" name="Tabbar">

import Breadcrumb from './breadcrumb/index.vue'
import Setting from './setting/index.vue'
</script>

<style lang="scss" scoped>
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    // background-image: linear-gradient(to bottom right, #62e8f1, #fdffff); 
    .tabbar_left {
        display: flex;
        align-items: center;
        padding: 10px;
    }

    .tabbar_right {
        display: flex;
        align-items: center;
      
    }
}
</style>