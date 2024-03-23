// 对外暴露插件语法
import SvgIcon from '@/components/SvgIcon/index.vue'
import {App} from 'vue'

const allGloablComponent:Record<string,any>={SvgIcon}
export default {
    // 务必叫做install方法
    install(app:App):void{
        Object.keys(allGloablComponent).forEach((key:string)=>{
            app.component(key, allGloablComponent[key]);
        })
    }
}