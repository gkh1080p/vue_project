<template>
  <div>
    <el-card style="height: 80px;margin:10px 0;">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名:">
          <el-input v-model="keyword" placeholder="请输入搜索的用户名" ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="large" icon="Search" :disabled="keyword.length?false:true" @click="search">搜索</el-button>
          <el-button type="success" size="large" icon="Refresh" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card>
      <el-button type="primary" icon="Coin" @click="addUser"  v-has="`btn.User.add`">添加用户</el-button>
      <el-button type="danger" icon="Delete" @click="deleteSelectUser" :disabled="selectIdArr.length?false:true">批量删除</el-button>
      <!-- 展示区 -->
      <el-table border style="margin:10px 0;" :data="userArr" @selection-change="selectChange">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column align="center" label="#" type="index"></el-table-column>
        <el-table-column align="center" label="ID" prop="id"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="用户名字" prop="username"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="用户名称" prop="name"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="用户角色" prop="roleName"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="创建时间" prop="createTime"></el-table-column>
        <el-table-column show-overflow-tooltip align="center" label="更新时间" prop="updateTime"></el-table-column>
        <el-table-column align="center" label="操作" width="320px">
          <template #="{ row }">
            <el-button type="primary" icon="Key" @click="setRole(row)" v-has="`btn.User.assgin`">分配角色</el-button>
            <el-button type="warning" icon="Edit" @click="updateUser(row)"  v-has="`btn.User.update`">编辑</el-button>
            <el-popconfirm :title="`你确定要删除${row.username}吗？`" @confirm="deleteUser(row.id)"  v-has="`btn.User.remove`">
              <template #reference>
                <el-button type="danger" icon="DeleteFilled">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
        :background="true" layout=" prev, pager, next, jumper,->, sizes,total" :total="total"
        @current-change="getHasUser" @size-change="handler" />
      <!-- 抽屉结构，完成添加新的用户账号，更新已有账号信息 -->
      <el-drawer v-model="drawer" direction="rtl">
        <template #header>
          <h3>{{ userParams.id ? '修改用户' : "添加用户" }}</h3>
        </template>
        <template #default>
          <el-form :model="userParams" :rules="rules" ref="formRef">
            <el-form-item label="用户姓名" prop="username">
              <el-input placeholder="请填写用户姓名" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="用户昵称" prop="name">
              <el-input placeholder="请填写用户昵称" v-model="userParams.name"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
              <el-input placeholder="请填写用户密码" v-model="userParams.password"></el-input>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button type="warning" icon="CloseBold" @click="drawer = false">取消</el-button>
          <el-button type="success" icon="Promotion" @click="save">确认添加</el-button>
        </template>
      </el-drawer>
      <el-drawer v-model="drawer2" direction="rtl">
        <template #header>
          <h2></h2>
        </template>
        <template #default>
          <el-form>
            <el-form-item label="用户姓名">
              <el-input :disabled="true" v-model="userParams.username"></el-input>
            </el-form-item>
            <el-form-item label="角色列表">
              <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                @change="handleCheckAllChange">全选</el-checkbox>
              <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="role in allRole" :key="role.id" :label="role" :value="role">{{ role.roleName
                  }}</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </template>
        <template #footer>
          <el-button type="info" @click="drawer2 = false">取消</el-button>
          <el-button type="success" @click="confirmClick">授权</el-button>
        </template>
      </el-drawer>
    </el-card>
  </div>
</template>

<script setup lang="ts" name="User">
// @ts-nocheck
// 引入仓库
import useLayOutSettingStore from '@/store/modules/setting';
import { ref, onMounted, reactive, nextTick } from 'vue';
// 引入请求
import { reqUserInfo, reqAddOrUpdateUser, reqAllRole, reqSetUserRole, reqRemoveAllUser, reqRemoveUser } from '@/api/acl/user/index.ts';
// 引入数据类型
import type { UserResponseData, Records, User, AllRoleResponseData, AllRole, SetRoleData } from '@/api/acl/user/type.ts'
import type { FormRules } from 'element-plus'
import { ElMessage} from 'element-plus';
// 默认页数
let pageNo = ref<number>(1)
// 一页展示几个
let pageSize = ref<number>(3)
// 用户总数
let total = ref<number>(0)
// 存储全部用户数据
let userArr = ref<Records>([])
// 抽屉1的标识符
let drawer = ref<boolean>(false)
// 抽屉2的标识符
let drawer2 = ref<boolean>(false)
// form表单实例
let formRef = ref()
// 全选复选框收集数据
let checkAll = ref<boolean>(false)
// 设置不确定状态，仅负责样式控制
let isIndeterminate = ref<boolean>(false)
// 定义响应式数据收集用户输入进来的关键字
let keyword=ref<string>('')
// 仓库实例
let settingStore=useLayOutSettingStore()
// 收集用户信息的响应式数据
let userParams = reactive<User>({
  username: "",
  password: "",
  name: "",
})
// 页码初始化加载
onMounted(() => {
  getHasUser()
})
// 切换一页最大页数
const handler = () => {
  getHasUser()
}
// 获取全部已有的用户数据
const getHasUser = async (page = 1) => {
  // 搜集当前啊页码
  pageNo.value = page
  let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value,keyword.value)
  if (result.code == 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}


// 添加用户按钮的回调
const addUser = () => {
  Object.assign(userParams, {
    id:0,
    username: "",
    password: "",
    name: "",
  })
  drawer.value = true
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
// 编辑按钮的回调
const updateUser = (row: User) => {
  Object.assign(userParams, row)
  drawer.value = true
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}

// 确认添加，按钮回调
const save = async () => {
  // 点击确认按钮时候确保表单校验全部成功
  await formRef.value.validate()
  // console.log(formRef.value.validate())
  // 点击确认，查看是否有id
  let result: any = await reqAddOrUpdateUser(userParams)
  if (result.code == 200) {
    // 关闭抽屉
    drawer.value = false
    ElMessage({
      type: "success",
      message: userParams.id ? '更新成功' : '添加成功',
    })
    // getHasUser(userParams.id?pageNo.value:1)
    // 浏览器自动刷新一下
    window.location.reload()
  } else {
    // 关闭抽屉
    drawer.value = false
    ElMessage({
      type: "error",
      message: userParams.id ? '更新失败' : '添加失败',
    })
  }
}
// 表单自定义规则的函数
const validatorUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户姓名不能为空'))
  } else {
    if (value.trim().length >= 5) {
      callback()
    } else {
      callback(new Error("用户姓名至少是五位"))
    }
  }
}
const validatorName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户昵称不能为空'))
  } else {
    if (value.trim().length >= 5) {
      callback()
    } else {
      callback(new Error("用户昵称至少是五位"))
    }
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户密码不能为空'))
  } else {
    if (value.trim().length >= 6) {
      callback()
    } else {
      callback(new Error("用户密码至少是六位"))
    }
  }
}
// 表单校验的规则对象
const rules = reactive<FormRules<typeof userParams>>({
  username: [{ trigger: "blur", validator: validatorUsername }],
  name: [{ trigger: "blur", validator: validatorName }],
  password: [{ trigger: "blur", validator: validatorPassword }]
})




// ###################################
// 获取全部职位的数据
let allRole = ref<AllRole>([])
// 某一用户所拥有的职位数据
let userRole = ref<AllRole>([])
// 分配角色按钮的回调
const setRole = async (row: User) => {
  // 弹出抽屉

  // 存储数据
  Object.assign(userParams, row)
  let result: AllRoleResponseData = await reqAllRole(row.id as number)
  if (result.code = 200) {
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
    drawer2.value = true
  }
}

// 全部，复选框的回调
const handleCheckAllChange = (val: boolean) => {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
// 不确定全选
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}

// 添加职业中的确定按钮
const confirmClick = async () => {
  let data: SetRoleData = {
    userId: userParams.id as number,
    roleIdList: userRole.value.map((item) => {
      return item.id as number
    })

  }
  let result = await reqSetUserRole(data)
  if (result.code == 200) {
    ElMessage({
      type: "success",
      message: "授权成功"
    })
    drawer2.value = false
    getHasUser(pageNo.value);
  } else {
    ElMessage({
      type: "error",
      message: "授权失败"
    })
  }
}

// 删除某一个用户
const deleteUser=async (id:number)=>{
  let result=await reqRemoveUser(id)
  if(result.code==200){
    ElMessage({
      type: "success",
      message: "删除成功"
    })
    window.location.reload()
    getHasUser(userArr.value.length>1?pageNo.value:pageNo.value-1);
  }else{
    ElMessage({
      type: "error",
      message: "删除失败"
    })
  }
}

// table复选框勾选的情况
let selectIdArr=ref<User[]>([])
const selectChange=(value:any)=>{
  selectIdArr.value=value
}
// 批量删除按钮的回调函数
let deleteSelectUser=async ()=>{
  let IdArr=selectIdArr.value.map(item=>item.id)
  let result:any=await reqRemoveAllUser(IdArr as number[])
  if(result.code==200){
    ElMessage({
      type: "success",
      message: "删除成功"
    })
    window.location.reload()
    getHasUser(userArr.value.length>1?pageNo.value:pageNo.value-1);
  }else{
    ElMessage({
      type: "error",
      message: "删除失败"
    })
  }
}

// 搜索按钮的回调函数
const search=()=>{
  getHasUser();
  // 清空关键字
  keyword.value=""
}
// 重置按钮的回调
const reset=()=>{
  settingStore.refsh=!settingStore.refsh
}
</script>

<style lang="scss" scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
