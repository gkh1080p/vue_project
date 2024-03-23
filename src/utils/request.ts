// 进行axios的二次封装，使用请求响应的拦截器
import axios from 'axios'
import { ElMessage } from 'element-plus';
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API,//基础路径的带/api
    timeout: 500
});
// 第二步，request实例添加亲求响应拦截器
request.interceptors.request.use((config: any) => {
    console.log(config)
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


