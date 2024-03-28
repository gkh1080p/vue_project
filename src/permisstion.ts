// 路由鉴权，项目中的路由什么条件下可以访问，什么条件下不能访问
import router from './router/index.ts';
// 进度条插件
import nprogress from 'nprogress';
import "nprogress/nprogress.css"
// 全局守卫：项目当中任意路由的切换都会触发这个钩子
// 全局前置守卫
console.log(1111)
router.beforeEach((to:any,from:any,next:any)=>{
    // 访问某一个路由之前会触发的一个钩子
    // to要访问的对象
    // from从哪个路由来
    // next路由的放行函数
    nprogress.start();
    next()
})
// h后置守卫
router.afterEach((to:any,next:any)=>{
    nprogress.done();
})



// 进度条插件  ---nprogress