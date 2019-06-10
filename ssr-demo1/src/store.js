/* store.js */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default function createStore() {
  let store = new Vuex.Store({
    state: {
      homeInfo: ''
    },
    actions: {
      getHomeInfo({ commit }) {
        let req = {
          "userName": "niya",
          "userPwd": "123456"
        }
        return axios({
          method: 'POST',
          url: 'http://127.0.0.1:3002/api/login',
          data: req
        }).then((res) => {
          commit('setHomeInfo', res.data)
        })
      }
    },
    mutations: {
      setHomeInfo(state, res) {
        state.homeInfo = res
      }
    }
  })

  return store
}