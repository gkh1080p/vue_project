// 创建用户相关小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user/index.ts';
import type { loginFormData ,loginResponseData,userInfoResponseData} from '@/api/user/type.ts'

import type { UserState } from './types/types';
// 方法1引入读写cookie的函数
// import { getCookie, setCookie, deletecookie } from '../../utils/cookie';
// 方法2引入token方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token.ts'
// 引入路由（常量路由）
import { routesAll,asyncRoute,anyRoute } from '@/router/routes'
// 引入路由器
import router from '@/router';
// 引入深拷贝方法
import cloneDeep from 'lodash/cloneDeep'
// 动态路由过滤函数
let filterAsyncRoute=(asyncRoute:any,routes:any)=>{
    return asyncRoute.filter((item:any)=>{
        if(routes.includes(item.name)){
            if(item.children&&item.children.length>0){
               item.children= filterAsyncRoute(item.children,routes)
            }
            return true
        }
    })
}
// 创建小仓库 --token写法
let useUserStore = defineStore('User', {
    //存储数据的地方
    state: (): UserState => {
        return {
            token: GET_TOKEN(),
            menuRoutes: routesAll,//仓库存储生成菜单需要数组（路由）
            username: '',
            avatar: '',
            button:[],
        }
    },
    // 异步逻辑的地方
    actions: {
        // 登录亲求
        async userLogin(data: loginFormData) {
            const result: loginResponseData = await reqLogin(data)
            
            // 登录请求成功200，失败201
            if (result.code === 200) {
                // 进行本地存储,进行持久化
                this.token = (result.data as string)
                SET_TOKEN(result.data as string)
                // 返回一个true保正async函数返回一个成功的promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
        // 获取用户信息
        async userInfo() {
            // 获取用户信息进行仓库当中用户头像，名字
            let result:userInfoResponseData = await reqUserInfo()

            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                this.button=result.data.buttons
                // 计算当前用户需要的异步路由,进行深拷贝
                let userAsyncRoute=filterAsyncRoute(cloneDeep(asyncRoute),result.data.routes)
                // 菜单数据
                this.menuRoutes=[...routesAll,...userAsyncRoute,...anyRoute];
                [...userAsyncRoute,...anyRoute].forEach((item:any) => {
                    router.addRoute(item)
                });
                this.token = GET_TOKEN()
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 退出登录
        async userLogout() {
            let result:any=await reqLogout()
            if(result.code==200){
                this.token = '',
                this.username = '',
                this.avatar = '',
                REMOVE_TOKEN()
                return 'ok';
            }else{
                return Promise.reject(new Error(result.message))
            }
        },
    },
    getters: {

    }
})

// // 创建小仓库 ---cookie方法
// let useUserStore = defineStore('User', {
//     //存储数据的地方
//     state: ():UserState => {
//         return {
//             userCookie:,
//             menuRoutes:routesAll,//仓库存储生成菜单需要数组（路由）
//         }
//     },
//     // 异步逻辑的地方
//     actions: {
//         async userLogin(data: loginForm) {
//             this.userCookie = getCookie(data.username) as string || ''
//             // 登录亲求
//             let result:loginResponseDate = await reqLogin(data)
//             // 登录请求成功200，失败201
//             if (result.code === 200) {
//                 // 进行本地存储,进行持久化
//                 setCookie(data.username, result.data.token as string, 7)
//                 this.userCookie = getCookie(data.username) as string
//                 // 返回一个true保正async函数返回一个成功的promise
//                 return 'ok'
//             } else {
//                 return Promise.reject(new Error(result.data.message))
//             }
//         }
//     },
//     getters: {

//     }
// })


export default useUserStore;