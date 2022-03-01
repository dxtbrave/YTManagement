import {ILoginState} from './login/types'
import {ISystemState} from "@/store/system/types";

export interface IRootState {
    entireDepartment:any[]
    entireRole:any[]
}

export interface IRootWithModule{
    login:ILoginState
    system:ISystemState
}

export type IStoreType = IRootState & IRootWithModule