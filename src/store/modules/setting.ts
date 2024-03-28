// 小仓库：关于layout组件相关配置的小仓库
import {defineStore} from "pinia";

 let useLayOutSettingStore=defineStore('SettingSotre',{
    state:()=>{
        return {
            fold:false,
            refsh:false,
        }
    }
})

export default useLayOutSettingStore;