import {Module} from 'vuex'
import type {ISystemState} from './types'
import {IRootState} from "@/store/types";

import {getPageListData,deletePageDate,createPageData,editPageData} from '@/service/main/system/system'

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

            // 2.对页面发送请求
            const pageResult = await getPageListData(pageUrl, payload.queryInfo)

            // 3.将数据存储到state中
            const {list,totalCount} = pageResult.data

            const changePageName = pageName.slice(0,1).toUpperCase() + pageName.slice(1)

            commit(`change${changePageName}List`,list)
            commit(`change${changePageName}Count`,totalCount)
        },
        async deletePageDataAction({dispatch},payload:any){
            // 1.获取pageName 和 page Id
            // pageName -> /users
            // id -> /users/id
            const {pageName,id} = payload
            const pageUrl = `/${pageName}/${id}`

            // 2.调用删除网路请求
            await deletePageDate(pageUrl)

            // 3.重新请求最新的数据
            dispatch('getPageListAction',{
                pageName,
                queryInfo:{
                    offset:0,
                    size:10
                }
            })
        },
        async createPageDataAction({dispatch},payload:any){
            // 1.创建数据的请求
            const { pageName,newData } = payload
            const pageUrl = `/${pageName}`
            await createPageData(pageUrl,newData)

            // 2.请求最新的数据
            dispatch('getPageListAction',{
                pageName,
                queryInfo:{
                    offset:0,
                    size:10
                }
            })
        },
        async editPageDataAction({dispatch},payload:any){
            // 编辑数据的请求
            const { pageName,editData , id } = payload
            const pageUrl = `/${pageName}/${id}`
            await editPageData(pageUrl,editData)

            // 2.请求最新的数据
            dispatch('getPageListAction',{
                pageName,
                queryInfo:{
                    offset:0,
                    size:10
                }
            })
        }
    }
}

export default systemModule