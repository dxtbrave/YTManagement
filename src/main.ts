import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

import rootApp from './App.vue'

import myRequest from '@/service'


import router from './router'
import store from './store'

const app = createApp(rootApp)

app.use(globalRegister)
app.use(router)
app.use(store)

app.mount('#app')

// console.log(process.env.VUE_APP_BASE_URL);

// interface DataType {
//     data: any
//     returnCode: string
//     success:boolean
// }

// myRequest.get<DataType>({
//     url:'/home/multidata',
//     interceptors:{
//         requestInterceptor: config => {
//             return config
//         }
//     }
// }).then(res=>{
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
// })
