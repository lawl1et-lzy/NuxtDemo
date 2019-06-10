// import Vue from 'vue'
import axios from '../plugins/util/Api/Api.js'

const http = 'http://127.0.0.1:3000/api'
class Api {
  // 登录
  static login (data) {
    return axios({
      method: 'POST',
      url: `${http}/login`,
      data
    })
  }
  // 注册
  static register (data) {
    return axios({
      method: 'POST',
      url: `${http}/register`,
      data
    })
  }
  // 商品
  static getGoods (data) {
    return axios({
      method: 'POST',
      url: `${http}/product`,
      data
    })
  }
  // 购物车数据
  static getCartList (data) {
    return axios({
      method: 'POST',
      url: `${http}/cartList`,
      data
    })
  }
  // 加入购物车
  static addCart (data) {
    return axios({
      method: 'POST',
      url: `${http}/cartAdd`,
      data
    })
  }
  // 删除购物车数据
  static delCart (data) {
    return axios({
      method: 'POST',
      url: `${http}/cartDel`,
      data
    })
  }
  // 获取用户地址
  static getAddress (data) {
    return axios({
      method: 'POST',
      url: `${http}/address`,
      data
    })
  }
  // 设置默认地址
  static setDefaultAddress (data) {
    return axios({
      method: 'POST',
      url: `${http}/setAddress`,
      data
    })
  }
  // 删除默认地址
  static delAddress (data) {
    return axios({
      method: 'POST',
      url: `${http}/delAddress`,
      data
    })
  }
  // 购物车确认
  static cartConfirm (data) {
    return axios({
      method: 'POST',
      url: `${http}/cartConfirm`,
      data
    })
  }
  // 获取订单列表
  static getOrderList (data) {
    return axios({
      method: 'POST',
      url: `${http}/getOrderList`,
      data
    })
  }
  // 确认订单
  static addOrderList (data) {
    return axios({
      method: 'POST',
      url: `${http}/addOrderList`,
      data
    })
  }
  static test(){
    return  axios({
	    method: 'get',
	    url: 'https://api.myjson.com/bins/1dkbio'
	})
  }
}

export default Api
