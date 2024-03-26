// 对外暴露的路由

// import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';
// import path from 'path';

// 常量路由
export const routesAll = [
    {
        // 登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',//路由信息
            hidden: true,//代表路由的标题在菜单中是否隐藏，true表示隐藏

        },
    },
    {
        // 登录成功后
        path: '/',
        component: () => import("@/layout/index.vue"),
        name: "home",
        meta: {
            title: 'layout',//路由信息
            hidden: false,//代表路由的标题在菜单中是否隐藏，true表示隐藏
        },
        children: [
            {
                path: '/home',
                component: () => import("@/views/home/index.vue"),
                meta: {
                    title: '首页',//路由信息
                    hidden: false,//代表路由的标题在菜单中是否隐藏，true表示隐藏
                    icon:'HomeFilled',
                },
            },
        ]
    },
    {
        // 404
        path: '/404',
        component: () => import('@/views/mistake/index.vue'),
        name: '404',
        meta: {
            title: '404',//路由信息
            hidden: true,//代表路由的标题在菜单中是否隐藏，true表示隐藏
        },
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login',
        name: 'Any',
        meta: {
            title: '任意路由',//路由信息
            hidden: true,//代表路由的标题在菜单中是否隐藏，true表示隐藏
        },
    }

]