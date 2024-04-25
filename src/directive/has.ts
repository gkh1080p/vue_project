// 引入仓库
import pinia from "@/store";
import useUserStore from "@/store/modules/user";
let userStore=useUserStore(pinia)
export const isHasButton=(app:any)=>{
    // 按钮权限
    app.directive('has', {
        mounted(el:any,option:any) {
            // 挂载完毕执行一次
            // 进行判断
            if(!userStore.button.includes(option)){
                el.parentNode.removeChil(el)
            }
        },
    });
}