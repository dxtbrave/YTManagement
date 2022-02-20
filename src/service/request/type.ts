import {AxiosRequestConfig, AxiosResponse} from "axios";

//拦截器类型接口
export interface MyRequestInterceptors<T = AxiosResponse > {
    requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
    requestInterceptorCatch?: (error: any) => any;
    responseInterceptor?: (res: T) => T;
    responseInterceptorCatch?: (error: any) => any;
}


// 请求参数类型接口
export interface MyRequestConfig<T = AxiosResponse > extends AxiosRequestConfig {
    interceptors?: MyRequestInterceptors<T>;
    showLoading?: boolean
}
