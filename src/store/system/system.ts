import {Module} from 'vuex'
import type {ISystemState} from './types'
import {IRootState} from "@/store/types";

import {getPageListData} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
    namespaced: true,
    state() {
        return {
            usersList: [],
            usersCount: 0,
            roleList:[],
            roleCount:0,
            goodsList:[],
            goodsCount:0,
            menuList:[],
            menuCount:0
        }
    },
    mutations:{
        changeUsersList(state,usersList:any[]){
            state.usersList = usersList
        },
        changeUsersCount(state,usersCount:number){
            state.usersCount = usersCount
        },
        changeRoleList(state,roleList:any[]){
            state.roleList = roleList
        },
        changeRoleCount(state,roleCount:number){
            state.roleCount = roleCount
        },
        changeGoodsList(state,goodsList:any[]){
            state.goodsList = goodsList
        },
        changeGoodsCount(state,goodsCount:number){
            state.goodsCount = goodsCount
        },
        changeMenuList(state,menuList:any[]){
            state.menuList = menuList
        },
        changeMenuCount(state,menuCount:number){
            state.menuCount = menuCount
        },
    },
    getters:{
      pageListData(state){
          return (pageName:string) => {
              return (state as any)[`${pageName}List`]
          }
      },
        pageListCount(state){
          return (pageName:string) => {
              return (state as any)[`${pageName}Count`]
          }
        }
    },
    actions: {
        async getPageListAction({commit}, payload: any) {
            // 1.获取pageUrl
            const pageName = payload.pageName
            const pageUrl = `/${pageName}/list`
            // switch (pageName){
            //     case 'users':
            //         pageUrl = '/users/list'
            //         break
            //     case 'role':
            //         pageUrl = '/role/list'
            //         break
            // }

            // 2.对页面发送请求
            const pageResult = await getPageListData(pageUrl, payload.queryInfo)

            // 3.将数据存储到state中
            const {list,totalCount} = pageResult.data

            const changePageName = pageName.slice(0,1).toUpperCase() + pageName.slice(1)

            commit(`change${changePageName}List`,list)
            commit(`change${changePageName}Count`,totalCount)
            // switch (pageName){
            //     case 'users':
            //         commit(`changeUserList`,list)
            //         commit(`changeUserCount`,totalCount)
            //         break
            //     case 'role':
            //         commit(`changeRoleList`,list)
            //         commit(`changeRoleCount`,totalCount)
            //         break
            // }

        }
    }
}

export default systemModule