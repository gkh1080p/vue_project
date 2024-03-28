export function SET_TOKEN(value:string){
    localStorage.setItem('token',value)
}

export function GET_TOKEN(){
    return localStorage.getItem('token')
}
// 本地存储删除数据方法
export function REMOVE_TOKEN(){
    localStorage.removeItem('token')
}
