<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0">

      </el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到后台管理系统</h2>
          <el-form-item prop="username" :rules="rules.username">
            <el-input :prefix-icon="UserFilled" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password" :rules="rules.password">
            <el-input :prefix-icon="Lock" type="password" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" class="login_button" type="primary" @click="login()">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { UserFilled, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { useRouter,useRoute } from 'vue-router';
import { ElNotification } from 'element-plus';
import { getTime } from '@/utils/time.ts'
// 获取路由器
let $router = useRouter()
// 引入用户相关的小仓库
import useUserStore from '@/store/modules/user'
let useStore = useUserStore()
// 响应式用户数据
let loginForm = reactive({
  username: 'admin',
  password: '111111'
})
// 加载图标
let loading = ref(false)
// 获取el-form组件
let loginForms=ref()
// 获取路由对象
let $route=useRoute()

// 发送亲求
const login = async () => {
  // 确认表单全部正确
  await loginForms.value.validate();
  // 加载效果
  loading.value = true
  try {
    //保证登录成功
    await useStore.userLogin(loginForm)
    loading.value = false;
    // 编程式导航
    // 判断路由路径中是否有query参数，如果有就往query参数跳，没有就不跳
    let redirect:any=$route.query.redirect;
    $router.push({path:redirect||'/'})
    ElNotification({
      type: 'success',
      message: `用户${loginForm.username},${getTime()}好`
    })
  } catch (error: any) {
    loading.value = false;
    ElNotification({
      type: 'error',
      message: error.message
    })
  }
}
// 自定义表单定义的规则
const validatorUserName=(rule:any,value:any,callback:any)=>{
    // rule校验规则对象
    // value表单元素文本内容
    // 如果符合条件则调用callback,不符合则调用callback时注入错误信息
    if(value.length>=5){
      callback();
    }else{
      callback(new Error('账号至少5位'))
    }

}
const validatorPassWord=(rule:any,value:any,callback:any)=>{
    // rule校验规则对象
    // value表单元素文本内容
    // 如果符合条件则调用callback,不符合则调用callback时注入错误信息
    if(value.length>=6){
      callback();
    }else{
      callback(new Error('密码长度至少为6位'))
    }

}
// 表单定制规则
const rules = {
  username: [
    // { required: true, message: "用户名不能为空", trigger: "blur" ,},
    {  trigger: 'blur' ,validator:validatorUserName},
  ],
  password: [
    {trigger:'blur',validator:validatorPassWord}
  ]
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login_form {
  position: relative;
  width: 80%;
  top: 30vh;
  background-color: rgba(25, 181, 212, 0.1);
  /* 深色半透明背景 */
  backdrop-filter: blur(5px);
  /* 毛玻璃效果 */
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  /* 半透明边框 */
  color: white;
  /* 设置文字颜色为白色 */
  padding: 40px;
  text-align: center;

  h1 {
    color: white;
    font-size: 40px
  }

  h2 {
    font-size: 20px;
    color: white;
    margin: 20px 0px;
  }

  .login_button {
    width: 100%;
  }
}
</style>