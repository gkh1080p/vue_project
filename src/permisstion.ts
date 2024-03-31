// 路由鉴权，项目中的路由什么条件下可以访问，什么条件下不能访问
import router from './router/index.ts';
// 进度条插件
import nprogress from 'nprogress';
import "nprogress/nprogress.css"

// 获取用户小仓库
import useUserStore from './store/modules/user.ts';
import pinia from './store/index.ts';

import { GET_TOKEN } from './utils/token.ts';
import  setting from "./setting.ts"
let userStore=useUserStore(pinia)




// 全局守卫：项目当中任意路由的切换都会触发这个钩子
// 全局前置守卫
 router.beforeEach(async (to:any,from:any,next:any)=>{
    // 访问某一个路由之前会触发的一个钩子
    // to要访问的对象
    // from从哪个路由来
    // next路由的放行函数
    nprogress.start();
    // 获取token
    userStore.token=GET_TOKEN()
    let token=userStore.token
    // 获取用户的名字
    let username=userStore.username
    // 用户登录判断
    if(token){
        // 登录成功访问login不能访问
        if(to.path=='/login'){
            next({path:'/'})
        }else{
            // 登录成功后访问其余六个
            // 有用户信息--放行，没有用户信息--不能放行
            if(username){
                next()
            }else{
                // 没有用户信息，发送亲求
                try {
                    userStore.userInfo()
                    next()
                } catch (error) {
                    // token过期，获取不到用户信息
                   await userStore.userLogout();
                    next({path:'/',query:{redirect:to.path}})
                }

            }
        }
    }else{
        // 用户未登录状态
        if(to.path=='/login'){
            next()
        }else{
            next({path:"/login",query:{redirect:to.path}})
        }
    }

})
// h后置守卫
router.afterEach((to:any,next:any)=>{
    nprogress.done();
    document.title=setting.title+'-'+to.meta.title
})



// 问题1：进度条插件  ---nprogress
// 问题2：路由鉴权
// 全部路由组件：登录|404|任意路由|首页|数据大屏|权限管理（三个子路由）|商品管理（四个子路由）

// 用户未登录：用户可以访问login，其余路由不能访问（指向login）
// 用户登录成功：不可以访问login，其余路由可以访问
