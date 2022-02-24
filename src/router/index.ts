import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import LocalCache from '@/utils/catch'
import { firstMenu } from '@/utils/map-menus'

const login = () => import('@/views/login/login.vue')
const main = () => import('@/views/main/main.vue')
const notFound = () => import('@/views/not-found/not-found.vue')
const routes : RouteRecordRaw[] =[
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name:'login',
        component: login
    },
    {
        path: '/main',
        name:'main',
        component: main,
        // children:[] -> 根据userMenus来决定
    },
    {
        path:'/:pathMatch(.*)*',
        name:'not-found',
        component:notFound
    }
]
    


const router = createRouter({
    routes,
    history:createWebHistory()
})

router.beforeEach((to)=>{
    if (to.path !== '/login'){
        const token = LocalCache.getCache('token')
        if (!token){
            return '/login'
        }

    }
    if (to.path === '/main'){
        return firstMenu.url
    }
})


export default router