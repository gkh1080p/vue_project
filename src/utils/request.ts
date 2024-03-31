// 进行axios的二次封装，使用请求响应的拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user';
const request = axios.create({
    baseURL: "http://sph-api.atguigu.cn",//基础路径的带/api
    timeout: 3000
});
// 第二步，request实例添加亲求响应拦截器
request.interceptors.request.use((config: any) => {
    // 获取用户相关的小仓库，获取内部token登录成功后携带给服务器
    let UserStore=useUserStore()
    if(UserStore.token){
        config.headers.token=UserStore.token
    }
    // config配置对象，headers属性请求头，经常给服务器端携带公共参数

    // 返回配置对象
    return config
})
// 第三步，添加响应拦截器
request.interceptors.response.use((response) => {
    // 成功回调
    return response.data
}, error => {
    // 失败回调
    // 定义一个变量
    let message = '';
    let status = error.response.status;
    switch (status) {
        case 401:
            message = "Token过期"
            break;
        case 403:
            message = "无权访问"
            break;
        case 404:
            message = '请求地址错误'
            break;
        case 500:
            message = '服务器出现问题'
            break;
    }
    ElMessage({
        type:'error',
        message
    })
    return Promise.reject(error)
})


export default request;


