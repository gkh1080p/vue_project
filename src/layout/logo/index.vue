<template>
  <div class="logo" v-if="setting.logoHidden">
    <img :src="setting.logo" alt="" >
    <p v-if="!LayOutSettingStore.fold">{{setting.title}}</p>
  </div>
</template>

<script setup lang="ts" name="Logo">
// 引入设置标题与logo配置文件
import setting from '@/setting.ts'
import useLayOutSettingStore from '@/store/modules/setting';
let LayOutSettingStore=useLayOutSettingStore()
</script>

<style lang="scss" scoped>
.logo{
  width: 100%;
  height: $base_menu_logo_height;
  display:flex;
  color:#fff;
  align-items:center;
  padding:10px;
  img{
    width: 40px;
    height: 40px;
  }
  p{
    font-size:$base_log_title_fontSize;
    text-align: center;
    width: calc(100% - 40px);
  }
}
</style>