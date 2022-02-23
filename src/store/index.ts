import { createStore ,Store , useStore as useVuexStore} from 'vuex'

import {IRootState , IStoreType} from "@/store/types";

import login from "@/store/login/login";

const store = createStore<IRootState>({
    state() {
        return {
            name:'dxt',
            age:18,
        }
    },
    modules:{
        login
    }
})

export function setupStore(){
    store.dispatch('login/loadLocalLogin')
}

export function useStore():Store<IStoreType>{
    return useVuexStore()
}

export default store