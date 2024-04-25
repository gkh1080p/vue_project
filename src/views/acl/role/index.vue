<template>
    <div>
        <!-- 搜索模块 -->
        <el-card style="height: 80px;margin:10px 0;">
            <el-form :inline="true" class="form">
                <el-form-item label="职位搜索:">
                    <el-input placeholder="请输入搜索的职位名" v-model="keyword"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" size="large" icon="Search" @click="search"
                        :disabled="keyword.length ? false : true">搜索</el-button>
                    <el-button type="success" size="large" icon="Refresh" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card>
            <el-button v-has="`btn.Role.add`" type="primary" icon="Coin" @click="addRoleUser">添加职位</el-button>
            <!-- 展示区 -->
            <el-table border style="margin:10px 0;" :data="allRole">
                <el-table-column align="center" label="#" type="index"></el-table-column>
                <el-table-column align="center" label="ID" prop="id"></el-table-column>
                <el-table-column show-overflow-tooltip align="center" label="角色名称" prop="roleName"></el-table-column>
                <el-table-column show-overflow-tooltip align="center" label="创建时间" prop="createTime"></el-table-column>
                <el-table-column show-overflow-tooltip align="center" label="更新时间" prop="updateTime"></el-table-column>
                <el-table-column align="center" label="操作" width="320px">
                    <template #="{ row }">
                        <el-button type="primary" icon="Key" @click="setPermisstion(row)" v-has="`btn.Role.assgin`">分配角色</el-button>
                        <el-button type="warning" icon="Edit" @click="updateRole(row)" v-has="`btn.Role.edit`">编辑</el-button>
                        <el-popconfirm :title="`你确定要删除${row.roleName}吗？`" @confirm="removeRole(row)" v-has="`btn.Role.remove`">
                            <template #reference>
                                <el-button type="danger" icon="DeleteFilled">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页器 -->
            <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 12]"
                :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
                @current-change="getHasRole" @size-change="sizeChange" />
            <!-- 抽屉-新增职位和修改职位 -->
            <el-drawer v-model="drawer">
                <template #header>
                    <h2>{{ userRoleParams.id ? '修改角色' : '新增角色' }}</h2>
                </template>
                <template #default>
                    <el-form ref="formRole" :model="userRoleParams" :rules="rules">
                        <el-form-item label="职位名称" prop="roleName">
                            <el-input placeholder="请输入职位名称" v-model="userRoleParams.roleName"></el-input>
                        </el-form-item>
                    </el-form>
                </template>
                <template #footer>
                    <el-button  type="info" @click='cencle'>取消</el-button>
                    <el-button type="success" :disabled="userRoleParams.roleName ? false : true"
                        @click="save">确认</el-button>
                </template>
            </el-drawer>
            <!-- 抽屉2-权限分配 -->
            <el-drawer v-model="drawer2">
                <template #header>
                    <h2>分配权限</h2>
                </template>
                <template #default>
                    <div class="custom-tree-node-container">
                        <el-tree ref="tree" style="max-width: 600px" :data="menuArr" show-checkbox node-key="id"
                            default-expand-all :expand-on-click-node="false" :props="defaultProps"
                            :default-checked-keys="TreeArr" />
                    </div>
                </template>
                <template #footer>
                    <el-button type="info" @click="drawer2 = false">取消</el-button>
                    <el-button type="success" @click="handler">确认</el-button>
                </template>
            </el-drawer>
        </el-card>
    </div>

</template>

<script setup lang="ts" name="Role">
// @ts-nocheck
import { ref, onMounted, reactive, nextTick } from 'vue'
// 引入请求
import { reqAllRoleList, reqAddOrUpdateRole, reqAllMenuList, reqSetPermisstion, reqRemove } from "@/api/acl/role/index.ts"
// 引入类型
import type { RoleResponseData, Records, RoleData, MenuResponseData, MenuList } from "@/api/acl/role/type.ts"
// 引入仓库
import useLayOutSettingStore from '@/store/modules/setting';
import { ElMessage } from 'element-plus';
// 库的实例
let settingStore = useLayOutSettingStore()
// 默认页数
let pageNo = ref<number>(1)
// 一页展示几个
let pageSize = ref<number>(3)
// 用户总数
let total = ref<number>(300)
// 搜索职位关键字
let keyword = ref<string>("")
// 存储全部的职位
let allRole = ref<Records>([])
// 抽屉的显示与隐藏
let drawer = ref<boolean>(false)
// 抽屉2权限分配
let drawer2 = ref<boolean>(false)
// 收集单个职位的信息
let userRoleParams = reactive<RoleData>({
    roleName: "",
})
// 新增or修改的表单对象实例
let formRole = ref<any>()
// 定义数组存储用户权限的数据
let menuArr = ref<MenuList>([])
// 准备一个数组，手机勾选岗位的id（四级id）
let TreeArr = ref<number[]>([])
// 树形结构的实例
let tree = ref<any>()

// 封装获取职位的请求
const getHasRole = async (page = 1) => {
    pageNo.value = page
    let result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
    if (result.code == 200) {
        allRole.value = result.data.records
        total.value = result.data.total
    }
}
// 组件挂载
onMounted(() => {
    getHasRole()
})
// 更换一页共有多少个时触发
const sizeChange = () => {
    getHasRole()
}
// 搜索按钮的回调
const search = () => {
    getHasRole()
    keyword.value = ""
}
// 重置按钮的回调
const reset = () => {
    settingStore.refsh = !settingStore.refsh
}
// 新增按钮的回调
const addRoleUser = () => {
    drawer.value = true
    // 清空数组
    Object.assign(userRoleParams, {
        id: 0,
        roleName: ''
    })
    nextTick(() => {
        formRole.value.clearValidate('roleName')
    })
}
// 新增按钮中取消按钮
const cencle = () => {
    drawer.value = false
}
//编辑按钮的回调
const updateRole = (row: RoleData) => {
    drawer.value = true
    Object.assign(userRoleParams, row)

}
// 校验规则
const validatorRoleName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error("职位名称至少两位"))
    }
}
const rules = {
    roleName: [{ required: true, trigger: "blur", validator: validatorRoleName }]
}
// 新增或编辑中的确认按钮回调
const save = async () => {
    // 表单校验结构
    await formRole.value.validate()
    // 添加职位
    let result: any = await reqAddOrUpdateRole(userRoleParams)
    if (result.code = 200) {
        ElMessage({
            type: "success",
            message: userRoleParams.id ? '修改成功' : '添加成功'
        })
        drawer.value = false
        getHasRole(userRoleParams.id ? pageNo.value : 1)
    }
}
// #######################################
// 权限模块
// 树形控件的数据
const defaultProps = {
    children: 'children',
    label: 'name'
}
// 设置权限,已有职位的数据
const setPermisstion = async (row: RoleData) => {
    drawer2.value = true
    // 手机当前要分类权限的数据
    Object.assign(userRoleParams, row)
    let result: MenuResponseData = await reqAllMenuList(userRoleParams.id as number)
    if (result.code == 200) {
        menuArr.value = result.data
        TreeArr.value = filterSelectArr(menuArr.value, [])
    }
}
const filterSelectArr = (allData: any, initArr: number[]) => {
    allData.forEach((item: any) => {
        if (item.select && item.level == 4) {
            initArr.push(item.id)
        }
        if (item.children && item.children.length > 0) {
            filterSelectArr(item.children, initArr)
        }
    });
    return initArr
}
// 分配权限中的确认按钮的回调
const handler = async () => {
    let arr = [...tree.value.getCheckedKeys(), ...tree.value.getHalfCheckedKeys()]
    // 下发权限
    let result: any = await reqSetPermisstion(userRoleParams.id as number, arr)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: "分配权限成功成功"
        })
        drawer2.value = false
        window.location.reload()
        getHasRole(pageNo.value)
    }
}
// 删除按钮的回调
const removeRole = async (row: any) => {
    let resutle = await reqRemove(row.id)
    if (resutle.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getHasRole(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }

}
</script>

<style lang="scss" scoped>
.form {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>