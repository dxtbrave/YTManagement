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
            roleCount:0
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
    },
    getters:{
      pageListData(state){
          return (pageName:string) => {
              return (state as any)[`${pageName}List`]
              // switch (pageName){
              //     case 'users':
              //         return state.usersList
              //     case 'role':
              //         return state.roleList
              // }
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