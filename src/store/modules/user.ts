// 创建用户相关小仓库
import { defineStore } from 'pinia'
// 引入接口
import { reqLogin } from '@/api/user/index.ts';
// 引入数据类型
import type { loginForm ,loginResponseDate } from '@/api/user/type';
import type { UserState } from './types/types';
// 引入读写cookie的函数
import { getCookie, setCookie, deletecookie } from '../../utils/cookie';
// 引入路由（常量路由）
import {routesAll} from '@/router/routes'
// 创建小仓库
let useUserStore = defineStore('User', {
    //存储数据的地方
    state: ():UserState => {
        return {
            userCookie:" ",
            menuRoutes:routesAll,//仓库存储生成菜单需要数组（路由）
        }
    },
    // 异步逻辑的地方
    actions: {
        async userLogin(data: loginForm) {
            this.userCookie = getCookie(data.username) as string || ''
            // 登录亲求
            let result:loginResponseDate = await reqLogin(data)
            // 登录请求成功200，失败201
            if (result.code === 200) {
                // 进行本地存储,进行持久化
                setCookie(data.username, result.data.token as string, 7)
                this.userCookie = getCookie(data.username) as string
                // 返回一个true保正async函数返回一个成功的promise
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        }
    },
    getters: {

    }
})


export default useUserStore;