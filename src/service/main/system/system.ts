import myRequest from "@/service";

import { IDataType } from '../../types'

export function getPageListData(url:string,queryInfo:any){
    return myRequest.post<IDataType>({
        url:url,
        data:queryInfo
    })
}