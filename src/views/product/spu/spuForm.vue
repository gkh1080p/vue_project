<template>
    <el-form label-width="100px">
        <el-form-item label="SPU名称">
            <el-input v-model="SpuParams.spuName" placeholder="请你输入SPU的名称"></el-input>
        </el-form-item>
        <el-form-item label="SPU的品牌">
            <el-select v-model="SpuParams.tmId">
                <el-option v-for="(item) in AllTradeMarkData" :key="item.id" :label="item.tmName"
                    :value="item.id"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="SPU的描述">
            <el-input v-model="SpuParams.description" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="SPU的照片">
            <!-- v-model:file-list默认图片 -->
            <el-upload v-model:file-list="imgList"
             action="http://sph-api.atguigu.cn/admin/product/fileUpload"
                list-type="picture-card" :on-preview="handlePictureCardPreview" :before-upload="handlerUpload">
                <el-icon>
                    <Plus />
                </el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
                <img w-full :src="dialogImageUrl" alt="Preview Image" width="100%" height="100%" />
            </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
            <el-select v-model="saleAttrIdAndValueName" style="width: 30%; margin-right: 20px;"
                :placeholder="unSelectSaleAttr.length ? `还未选择的属性有${unSelectSaleAttr.length}个` : '全部选择完'">
                <el-option v-for="item in unSelectSaleAttr" :key="item.id" :label="item.name"
                    :value="`${item.id}:${item.name}`"></el-option>
            </el-select>
            <el-button @click="addSaleAttr" type="primary" icon="Plus"
                :disabled="saleAttrIdAndValueName ? false : true">添加销售属性</el-button>
            <!-- table展示销售属性与属性值的地方 -->
            <el-table border style="margin: 10px 0;" :data="saleAttr">
                <el-table-column label="序号" type="index" width="100px"></el-table-column>
                <el-table-column label="属性名" width="100px" prop="saleAttrName"></el-table-column>
                <el-table-column label="属性值">
                    <!-- row即为当前属性对象 -->
                    <template #="{ row }">
                        <el-tag style="margin:0 10px" v-for="(tag, index) in row.spuSaleAttrValueList" :key="tag.id"
                            closable @close="row.spuSaleAttrValueList.splice(index, 1)" type="primary">
                            {{ tag.saleAttrValueName }}
                        </el-tag>
                        <el-input ref="saleInput" @blur="toLook(row)" v-model="row.saleAttrValue"
                            v-if="row.flag == true" placeholder="请你输入属性值" size="small"
                            style="width: 100px;margin:0 10px"></el-input>
                        <el-button @click="toEdit(row)" v-else size="small" icon="Plus" type="success"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="100px">
                    <template #="{ $index }">
                        <el-button type="danger" icon="Delete" @click="saleAttr.splice($index, 1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form-item>
        <el-form-item label="">
            <el-button type="primary" @click="save" :disabled="saleAttr.length > 0 ? false : true">保存</el-button>
            <el-button type="info" @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts" name="SPUForm">
// @ts-nocheck
import type { UploadUserFile } from 'element-plus';
import { ref, computed, nextTick } from 'vue';
import type { SpuData } from "@/api/product/spu/type.ts"
// 引入请求
import { reqAllTradeMark, reqSpuImageList, reqSpuHasSaleAttr, reqAllSaleAttr, reqAddOrUpdateSpu } from "@/api/product/spu";
// 引入返回类型
import type { AllTradeMark, SpuHasImage, SaleAttrResponseData, HasSaleAttrResponseData } from "@/api/product/spu/type";
// 引入数据类型
import type { SaleAttrValue, TradeMark, SpuImage, SaleAttr, HasSaleAttr } from "@/api/product/spu/type";
import { ElMessage } from 'element-plus';
let $emit = defineEmits(['changeScene'])
// 当自定义事件，点击取消按钮，通知父组件切换场景为1，展示有的SPU数据
const cancel = () => {
    $emit('changeScene', {pager:0,params:'update'})
}
// 全部品牌的参数
let AllTradeMarkData = ref<TradeMark[]>([])
// 图片
let imgList = ref<any>([])
// 已有SPU销售属性值
let saleAttr = ref<SaleAttr[]>([])
// 项目全部SPU销售属性
let allSaleAttr = ref<HasSaleAttr[]>([])
// 定义综合类型最终集成所有数据进行提交
let SpuParams = ref<SpuData>({
    category3Id: 0,
    description: "",
    spuImageList: [
        // {
        //    id : 0,
        //    imgName : "string",
        //   imgUrl : "string",
        //   spuId : 0
        // }
    ],
    spuName: "",
    spuSaleAttrList: [
        // {
        //    baseSaleAttrId : 0,
        //    id : 0,
        //    saleAttrName : "string",
        //    spuId : 0,
        //    spuSaleAttrValueList : [
        //     {
        //        baseSaleAttrId : 0,
        //        id : 0,
        //        isChecked : "string",
        //        saleAttrName : "string",
        //        saleAttrValueName : "string",
        //        spuId : 0
        //     }
        //   ]
        // }
    ],
    tmId: 0   //品牌ID
})

// 控制照片放大的参数
let dialogVisible = ref<boolean>(false)
// 放大后的图片
let dialogImageUrl = ref<string>("")
// 将来收集还未选择的销售属性的ID与属性值的名字
let saleAttrIdAndValueName = ref<string>("")
const initHasSpuData = async (spu: SpuData) => {
    // 存储Spu对象
    SpuParams.value = spu
    // 获取全部品牌的参数
    let result_1: AllTradeMark = await reqAllTradeMark()
    // 获取某一个品牌旗下全部销售商品图片
    let result_2: SpuHasImage = await reqSpuImageList(spu.id as number)
    // 获取已有的SPU销售属性的数据
    let result_3: SaleAttrResponseData = await reqSpuHasSaleAttr(spu.id as number)
    // 获取整个项目全部SPU销售属性
    let result_4: HasSaleAttrResponseData = await reqAllSaleAttr()

    // 存储全部品牌数据
    AllTradeMarkData.value = result_1.data
    // 存储某一商品的全部图片
    imgList.value = result_2.data.map(item => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    // SPU销售属性的数据
    saleAttr.value = result_3.data
    // 项目全部SPU销售属性
    allSaleAttr.value = result_4.data
}
// 照片墙打印点击预览按钮的时候触发的钩子
const handlePictureCardPreview = (uploadFile: any) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
}

//上传之前触发的钩子-->约束钩子
const handlerUpload = (file: any) => {
    if (file.typ == 'image/png' || file.type == "image/jpeg" || file.type == "image/gif" || file.type == "image/jpg") {
        if (file.size / 1024 / 1024 < 3) {
            return true;
        } else {
            ElMessage({
                type: 'error',
                message: '上传文件大于3MB'
            })
            return false;
        }

    } else {
        ElMessage({
            type: 'error',
            message: '上传文件格式错误'
        })
        return false;
    }
}
// 计算出当前SPU还未拥有的销售属性
let unSelectSaleAttr = computed(() => {
    let unSelectArr = allSaleAttr.value.filter(item => {
        return saleAttr.value.every(item1 => {
            return item.name != item1.saleAttrName
        })
    })
    return unSelectArr
})
// 添加销售属性
const addSaleAttr = () => {
    const [baseSaleAttrIdString, saleAttrName] = saleAttrIdAndValueName.value.split(':');
    const baseSaleAttrId = parseInt(baseSaleAttrIdString)
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    // 追加
    saleAttr.value.push(newSaleAttr)
    // 清空收集的数组
    saleAttrIdAndValueName.value = "";
}
let saleInput = ref()
const toEdit = (row: SaleAttr) => {
    // 点击按钮的时候input组件出来
    row.flag = true
    row.saleAttrValue = ""
    nextTick(() => {
        saleInput.value.focus()
    })
}
// 表单元素失去焦点的事件回调
const toLook = (row: SaleAttr) => {
    // 收集属性的id和名字
    const { baseSaleAttrId, saleAttrValue } = row;
    // 整理完成服务器需要的属性形式
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: saleAttrValue,
    }
    // 判断是否为空
    if (saleAttrValue?.trim() == '') {
        ElMessage({
            type: "error",
            message: "请勿添加空值"
        })
        row.flag = false
        return;
    }
    // 判断属性值是否重复
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue
    })
    if (repeat) {
        ElMessage({
            type: "error",
            message: "请勿添加重复值"
        })
        row.flag = false
        return
    }
    // 追加新的属性值对象
    row.spuSaleAttrValueList.push(newSaleAttrValue)
    row.flag = false
}

// 保存按钮的回调
const save = async () => {
    // 整理参数
    // 1照片墙的数据
    SpuParams.value.spuImageList = imgList.value.map((item: any) => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
    // 2整理销售属性的数据
    SpuParams.value.spuSaleAttrList = saleAttr.value
    let result = await reqAddOrUpdateSpu(SpuParams.value);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? "修改成功" : "添加成功"
        })
        $emit('changeScene', {pager:0,params:SpuParams.value.id?"update":"add"})
    } else {
        ElMessage({
            type: 'error',
            message: SpuParams.value.id ? "修改失败" : "添加失败"
        })
    }
}
// 添加一个新的SPU的方法
const initAddSpu = async (id: number) => {
    // 清空数据
    Object.assign(SpuParams, {
        category3Id: 0,
        description: "",
        spuImageList: [
            // {
            //    id : 0,
            //    imgName : "string",
            //   imgUrl : "string",
            //   spuId : 0
            // }
        ],
        spuName: "",
        spuSaleAttrList: [
            // {
            //    baseSaleAttrId : 0,
            //    id : 0,
            //    saleAttrName : "string",
            //    spuId : 0,
            //    spuSaleAttrValueList : [
            //     {
            //        baseSaleAttrId : 0,
            //        id : 0,
            //        isChecked : "string",
            //        saleAttrName : "string",
            //        saleAttrValueName : "string",
            //        spuId : 0
            //     }
            //   ]
            // }
        ],
        tmId: 0   //品牌ID
    })
    //清空其他数据
    imgList.value=[];
    saleAttr.value=[];
    saleAttrIdAndValueName.value='';
    // 获取全部品牌的参数
    let result_1: AllTradeMark = await reqAllTradeMark()
    // 获取整个项目全部SPU销售属性
    let result_4: HasSaleAttrResponseData = await reqAllSaleAttr()
    // 存储全部品牌数据
    AllTradeMarkData.value = result_1.data
    // 项目全部SPU销售属性
    allSaleAttr.value = result_4.data
    //存储3级id
    SpuParams.value.category3Id = id
}
defineExpose({ initHasSpuData, initAddSpu })
</script>
