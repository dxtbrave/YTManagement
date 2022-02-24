import {Module} from "vuex";

import {accountLoginRequest, requestUserInfoById ,requestUserMenusByRoleId} from "@/service/login/login";
import LocalCache from '@/utils/catch'
import {mapMenusToRoutes} from '@/utils/map-menus'
import router from "@/router";

import {IAccount} from "@/service/login/types";
import {ILoginState} from "@/store/login/types";
import {IRootState} from "@/store/types";
import store from "@/store";

const loginModule: Module<ILoginState, IRootState> = {
    namespaced: true,
    state() {
        return {
            token: '',
            userInfo: {},
            userMenus:[]
        }
    },
    getters: {},
    mutations: {
        changeToken(state, token: string) {
            state.token = token
        },
        changeUserInfo(state,userInfo:any){
            state.userInfo = userInfo
        },
        changeUserMenus(state,userMenus:any){
            state.userMenus = userMenus
        }
    },
    actions: {
        async accountLoginAction({commit}, payload: IAccount) {
            // 1.实现登录逻辑
            const loginResult = await accountLoginRequest(payload)
            const {id, token} = loginResult.data
            commit('changeToken', token)
            LocalCache.setCache('token', token)

            // 2.请求用户信息
            const userInfoResult = await requestUserInfoById(id)
            const userInfo = userInfoResult.data
            commit('changeUserInfo', userInfo)
            LocalCache.setCache('userInfo', userInfo)

            // 3.请求用户菜单
            const userMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
            const userMenus = userMenusResult.data
            commit('changeUserMenus',userMenus)
            LocalCache.setCache('userMenus',userMenus)

            // 跳转到首页
            router.push('/main')


        },
        loadLocalLogin({commit}){
            const token = LocalCache.getCache('token')
            if (token){
                commit('changeToken',token)
            }
            const userInfo = LocalCache.getCache('userInfo')
            if (userInfo){
                commit('changeUserInfo',userInfo)
            }
            const userMenus = LocalCache.getCache('userMenus')
            if (userMenus){
                commit('changeUserMenus',userMenus)
            }
            // 1.userMenus -> routes
            const routes = mapMenusToRoutes(userMenus)
            // console.log(routes)

            // 2.将routes -> router.main.children
            routes.forEach(route => {
                router.addRoute('main',route)
            })
        }
        // phoneLoginAction({commit}, payload: any) {
        //     console.log('执行phoneLoginAction')
        // }
    }
}

export default loginModule