// 对外暴露的路由
// 常量路由
export const routesAll=[
    {
        // 登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
    },
    {
        // 登录成功后
        path: '/',
        component: () => import("@/views/home/index.vue"),
        name: "home"
    },
    {
        // 404
        path:'/404',
        component: () => import('@/views/mistake/index.vue'),
        name: '404'
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/login',
        name: 'Any'
    }

]