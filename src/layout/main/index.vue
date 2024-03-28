<template>
  <router-view v-slot="{Component}">
    <transition name="fade">
        <component :is="Component" v-if="flag"></component>
    </transition>
  </router-view>
</template>

<script setup name="PageMain">
import { watch,ref ,nextTick} from 'vue';
import useLayOutSettingStore from '@/store/modules/setting.ts'
let LayOutSettingStore=useLayOutSettingStore()
let  flag=ref(true)
// 监听仓库内部数据是否发生变化，如果发生了说明用户点了刷新按钮
watch(()=>LayOutSettingStore.refsh,()=>{
  flag.value=false;
  // 重新创建,当dom更新完模板后，会执行nextTick()
  nextTick(()=>{
    flag.value=true
  })
})
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s, transform 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
  transform: scale(0.8);
}
</style>