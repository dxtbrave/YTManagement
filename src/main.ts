import { createApp } from 'vue'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

import rootApp from './App.vue'

import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(rootApp)

app.use(globalRegister)
app.use(store)
setupStore()
app.use(router)



app.mount('#app')

// import myRequest from '@/service'
// interface DataType {
//     data: any
//     returnCode: string
//     success:boolean
// }
//
// myRequest.get<DataType>({
//     url:'/home/multidata',
//     interceptors:{
//         requestInterceptor: config => {
//             return config
//         }
//     }
// }).then(res=>{
//
// })
