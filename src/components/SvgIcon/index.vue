<template>
  <svg>
    <use :xlink:href="prefix+name" :width="width" :color="color" :height="height"></use>
  </svg>
</template>

<script setup lang="ts">
defineProps({
    prefix:{
        type:String,
        default:'#icon-'
    },
    name:String,
    color:{
        type:String,
        default:"red"
    },
    width:{
        type:String,
        default:"16px"
    },
    height:{
        type:String,
        default:'16px'
    }
})
</script>

<style lang="css" scoped>

</style>