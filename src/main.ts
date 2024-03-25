import { createApp } from 'vue'
import App from '@/App.vue'
import 'virtual:svg-icons-register'

// scss引入 ，引入模板的全局样式
import '@/styles/index.scss'
// 引入router@4
import router from './router'
// UI组件库
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入自定义插件对象，注册全局组件
import gloalComponent from '@/components'
// 引入pinia仓库
import pinia from './store/index.ts'
const app=createApp(App)
// svg全局封装组件
app.use(gloalComponent);
// 加载UI组件库
app.use(ElementPlus, {
    locale: zhCn
})
// 加载路由
app.use(router);
// 加载仓库pinia
app.use(pinia)
app.mount('#app')
