import { createStore ,Store , useStore as useVuexStore} from 'vuex'

import {IRootState , IStoreType} from "@/store/types";

import login from "@/store/login/login";
import system from "@/store/system/system";

const store = createStore<IRootState>({
    state() {
        return {
            name:'dxt',
            age:18,
        }
    },
    modules:{
        login,
        system
    }
})

export function setupStore(){
    store.dispatch('login/loadLocalLogin')
}

export function useStore():Store<IStoreType>{
    return useVuexStore()
}

export default store