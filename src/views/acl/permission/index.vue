<template>
    <el-card>
        <el-table :data="PermisstionArr" style="width: 100%; margin-bottom: 20px" row-key="id" border>
            <el-table-column label="名称" prop="name"></el-table-column>
            <el-table-column label="权限值" prop="code"></el-table-column>
            <el-table-column label="修改时间" prop="updateTime"></el-table-column>
            <el-table-column label="操作" width="320px">
                <template #="{ row }">
                    <el-button v-has="`btn.Permission.add`" type="primary" icon="Plus" :disabled="row.level == 4 ? true : false"
                        @click="addPermisstion(row)">{{ row.level == 3 ? '添加功能' : "添加菜单" }}</el-button>
                    <el-button v-has="`btn.Permission.update`" type="warning"  icon="Edit" :disabled="row.level == 1 ? true : false"
                        @click="updatePermisstion(row)">编辑</el-button>
                    <el-popconfirm v-has="`btn.Permission.remove`" :title="`你确认要删除${row.name}吗？`" @confirm="deleteMenu(row)">
                        <template #reference>
                            <el-button type="danger" icon="Delete" :disabled="row.level == 1 ? true : false">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <!-- 对话框 -->
    <el-dialog v-model="dialogVisible" :title="`${menuData.id ? '修改菜单' : '新增菜单'}`" width="800">
        <el-form label-width="100px">
            <el-form-item label="名称">
                <el-input v-model="menuData.name" placeholder="请输入名称"></el-input>
            </el-form-item>
            <el-form-item label="权限值">
                <el-input v-model="menuData.code" placeholder="请输入权限值"></el-input>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button type="info" @click="dialogVisible = false">取消</el-button>
            <el-button type="success" @click="save">确定</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts" name="permission">
import { onMounted, ref, reactive } from 'vue';
// 引入请求
import { reqAllPermisstion, reqAddOrUpdateMenu,reqRemove } from '@/api/acl/menu/index.ts';
// 引入类型定义
import { PermisstionResponseData, PermisstionList, Permisstion, MenuParams } from "@/api/acl/menu/type.ts"
import { ElMessage } from 'element-plus';
// 存储菜单的数组
let PermisstionArr = ref<PermisstionList>([])
// 对话框的标识符
let dialogVisible = ref<boolean>(false)
// 携带参数
let menuData = reactive<MenuParams>({
    code: '',
    level: 0,
    name: "",
    pid: 0
})
// 页面挂载
onMounted(() => {
    getHasPermisstion()
})
// 获取展示数据
const getHasPermisstion = async () => {
    let result: PermisstionResponseData = await reqAllPermisstion()
    PermisstionArr.value = result.data
}
// 添加菜单or添加功能的按钮的回调
const addPermisstion = (row: Permisstion) => {
    Object.assign(menuData, {
        id: 0,
        code: '',
        level: 0,
        name: "",
        pid: 0
    })
    dialogVisible.value = true
    menuData.level = row.level + 1
    menuData.pid = (row.id as number)
}
// 编辑已有的菜单
const updatePermisstion = (row: Permisstion) => {
    dialogVisible.value = true
    Object.assign(menuData, row)
}
// 确定按钮的回调
const save = async () => {
    // 新增或者修改菜单
    let result = await reqAddOrUpdateMenu(menuData)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: menuData.id ? '修改成功' : "添加成功"
        })
        dialogVisible.value = false
        getHasPermisstion()
    }
}
const deleteMenu=async (row:Permisstion)=>{
    let result=await reqRemove(row.id as number)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message:"删除成功"
        })
        getHasPermisstion()
    }
}
</script>

<style lang="scss" scoped></style>