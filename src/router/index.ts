import { createRouter, createWebHashHistory } from 'vue-router'
import{ routesAll} from './routes.ts'
let router = createRouter({
    history: createWebHashHistory(),    
    routes:routesAll,
    scrollBehavior () {
        return {
            left:0,
            top:0
        }
    },
})


export default router;