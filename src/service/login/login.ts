import myRequest from "@/service";

import {IAccount, ILoginResult} from "@/service/login/types";
import {IDataType} from '../types'

enum LoginAPI {
    AccountLogin = '/login',
    LoginUserInfo = '/users/', // 用法: /users/1
    UserMenus = '/role/' // 用法: role/1/menu
}

export function accountLoginRequest(account:IAccount){
    return myRequest.post<IDataType<ILoginResult>>({
        url:LoginAPI.AccountLogin,
        data:account
    })
}

export function requestUserInfoById(id: number) {
    return myRequest.get<IDataType>({
        url: LoginAPI.LoginUserInfo + id,
        showLoading: false
    })
}

export function requestUserMenusByRoleId(role_id:number){
    return myRequest.get<IDataType>({
        url:LoginAPI.UserMenus + role_id + '/menu',
        showLoading:false
    })
}