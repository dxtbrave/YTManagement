import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const login = () => import('@/views/login/login.vue')
const main = () => import('@/views/main/main.vue')
const routes : RouteRecordRaw[] =[
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: login
    },
    {
        path: '/main',
        component: main
    }
]
    


const router = createRouter({
    routes,
    history:createWebHistory()
})

export default router