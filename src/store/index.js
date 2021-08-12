import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 当前登录用户的状态
    user:getItem('user')
  },
  mutations: {
    setUser(state,data){
      state.user = data
      // 防止页面刷新数据丢失，数据存储到本地存储
      setItem('user',state.user)
      // window.localStorage.setItem('user',JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
