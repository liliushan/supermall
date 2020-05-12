//index.js
//获取应用实例
const app = getApp()

import {
  homeRequest
} from '../../request/home.js'
Page({
  data: {
    swiperList: [],
    navList: [],
    floorList: []
  },
  // 生命周期函数:开始加载页面的时候调用---一般在这里获取数据
  onLoad() {
    Promise.all([
      homeRequest("/home/swiperdata"),
      homeRequest("/home/catitems"),
      homeRequest("/home/floordata")
    ]).then(res => {
      this.setData({
       swiperList:res[0].data.message,
        navList:res[1].data.message,
        floorList:res[2].data.message
      })
      wx.hideLoading()  //  当数据都回来后关闭正在加载loadding的样式
    })
  },
  onPullDownRefresh() {
    // 下拉的时候清空数据
    this.setData({
      swiperList: [],
      navList: [],
      floorList: []
    })
    Promise.all([
      homeRequest("/home/swiperdata"),
      homeRequest("/home/catitems"),
      homeRequest("/home/floordata")
    ]).then(res => {
      this.setData({
        swiperList:res[0].data.message,
         navList:res[1].data.message,
         floorList:res[2].data.message
       })
      wx: wx.stopPullDownRefresh() //  关闭下拉刷新效果
      wx.hideLoading()  //  当数据都回来后关闭正在加载loadding的样式
    })
  }
})