import axios from "axios";
import type {AxiosInstance} from "axios";

import {ElLoading} from 'element-plus'
import {ILoadingInstance} from "element-plus/es/el-loading/src/loading.type";

const DEFAULT_LOADING: boolean = true


// 导入拦截器接口
// 第一个接口： 定义拦截器内部所需方法 (被扩展的拦截器interceptors内的四种方法)
// 第二个接口： 继承AxiosRequestConfig (在接口中除了定义所需的config以外，还添加了可选类型interceptors)
import type {MyRequestInterceptors, MyRequestConfig} from "./type";

class MyRequest {
    instance: AxiosInstance;
    interceptors?: MyRequestInterceptors;
    showLoading: boolean
    loading?: ILoadingInstance

    constructor(config: MyRequestConfig) {
        this.instance = axios.create(config);
        this.showLoading = config.showLoading ?? DEFAULT_LOADING
        this.interceptors = config.interceptors;

        // 从config中取出的拦截器是对应的实例的拦截器
        this.instance.interceptors.request.use(
            this.interceptors?.requestInterceptor,
            this.interceptors?.requestInterceptorCatch
        );
        this.instance.interceptors.response.use(
            this.interceptors?.responseInterceptor,
            this.interceptors?.responseInterceptorCatch
        );

        // 添加所有的实例都有的拦截器
        this.instance.interceptors.request.use(
            (config) => {
                // console.log('所有实例都有的拦截器，请求拦截成功1');

                if (this.showLoading) {
                    this.loading = ElLoading.service({
                        lock: true,
                        text: '正在加载.....'
                    })
                }

                return config;
            },
            (err) => {
                return err;
            }
        );
        this.instance.interceptors.response.use(
            (res) => {
                // console.log('所有实例都有的拦截器，响应拦截成功1');

                // 将loading移除
                this.loading?.close()

                const data = res.data
                if (data.returnCode === '-1001') {
                    console.log('请求失败~，错误信息')
                } else {
                    return res.data;
                }
            },
            (err) => {
                // console.log('所有的实例都有的拦截器：响应失败拦截')
                if (err.response.status === 404) {
                    console.log('404的错误')
                }
                return err;
            }
        );
    }

    request<T>(config: MyRequestConfig<T>): Promise<T> {
        return new Promise((resolve, reject) => {

            // 1.单个请求对请求config的处理
            if (config.interceptors?.requestInterceptor) {
                config = config.interceptors.requestInterceptor(config)
            }

            // 2.判断是否需要显示loading
            if (config.showLoading === false) {
                this.showLoading = config.showLoading
            }

            this.instance.request<any,T>(config).then((res) => {
                // 1.单个请求对数据的处理
                if (config.interceptors?.responseInterceptor) {
                    res = config.interceptors?.responseInterceptor(res)
                }

                // 2.将showLoading设置true，这样不会影响下一个请求
                this.showLoading = DEFAULT_LOADING

                // 将结果resolve返回出去
                resolve(res)

            })
                .catch(err => {

                    // 将showLoading设置true，这样不会影响下一个请求
                    this.showLoading = DEFAULT_LOADING
                    reject(err)
                    return err
                })
        })
    }

    get<T>(config:MyRequestConfig<T>):Promise<T>{
        return this.request<T>({...config,method:'GET'})
    }
    post<T>(config:MyRequestConfig<T>):Promise<T>{
        return this.request<T>({...config,method:'POST'})
    }
    delete<T>(config:MyRequestConfig<T>):Promise<T>{
        return this.request<T>({...config,method:'DELETE'})
    }
    patch<T>(config:MyRequestConfig<T>):Promise<T>{
        return this.request<T>({...config,method:'PATCH'})
    }

}

export default MyRequest;
