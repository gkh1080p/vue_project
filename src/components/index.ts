// 对外暴露插件语法
import SvgIcon from '@/components/SvgIcon/index.vue'
import {App} from 'vue'
// 引入element-plus提供的图标组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 全局对象
const allGloablComponent:Record<string,any>={SvgIcon}
export default {
    // 务必叫做install方法
    install(app:App):void{
        Object.keys(allGloablComponent).forEach((key:string)=>{
            app.component(key, allGloablComponent[key]);
        })
        for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
            app.component(key, component)
          }
    }
}