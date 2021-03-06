// service统一出口
import MyRequest from "./request"
import {BASE_URL, TIME_OUT} from './request/config'

import LocalCache from '@/utils/catch'

const myRequest = new MyRequest({
    baseURL: BASE_URL,
    timeout: TIME_OUT,
    interceptors: {
        requestInterceptor: (config) => {
            // console.log('实例请求拦截成功');
            // 携带token的拦截
            const token = LocalCache.getCache('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
        },
        requestInterceptorCatch: (err) => {
            return err
        },
        responseInterceptor: (config) => {
            // console.log('实例响应拦截成功');
            return config
        },
        responseInterceptorCatch: (err) => {
            return err
        }
    }

})

export default myRequest