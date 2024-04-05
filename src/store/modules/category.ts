import { defineStore } from "pinia";
import { reqC1, reqC2,reqC3 } from "@/api/product/attr";
// 类型定义
import type { CategoryResponseData} from "@/api/product/attr/type";
import type { CategoryState } from "./types/types";
let useCategoryStore=defineStore('category',{
    state:():CategoryState=>{
        return {
            c1Arr:[],
            c1Id:"",
            c2Arr:[],
            c2Id:"",
            c3Arr:[],
            c3Id:"",
            scene:0,

        }
    },
    actions:{
        // 获取1级分类的方法
        async getC1(){
            let result:CategoryResponseData=await reqC1()
            if(result.code==200){
                this.c1Arr=result.data
            }
            return result
        },
        // 获取2级分类的数据的方法
        async getC2(){
            let result:CategoryResponseData=await reqC2(this.c1Id as number)
            if(result.code==200){
                this.c2Arr=result.data
            }
            return result
        },
        async getC3(){
            let result:CategoryResponseData=await reqC3(this.c2Id as number)
            if(result.code==200){
                this.c3Arr=result.data
            }
            return result
        },
        clear1(){
            this.c2Arr=[],
            this.c2Id="",
            this.c3Arr=[],
            this.c3Id=""
        },
        clear2(){
            this.c3Arr=[],
            this.c3Id=""
        }
    },
    getters:{
       
    }
})

export default useCategoryStore;