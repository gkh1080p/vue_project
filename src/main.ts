import { createApp } from 'vue'
import './style.css'
import App from '@/App.vue'
import 'virtual:svg-icons-register'

// UI组件库

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// svg全局封装组件

const app=createApp(App)
// 引入自定义插件对象，注册全局组件
import gloalComponent from '@/components'
app.use(gloalComponent);
app.use(ElementPlus, {
    locale: zhCn
})
// scss引入 ，引入模板的全局样式
import '@/styles/index.scss'

app.mount('#app')
