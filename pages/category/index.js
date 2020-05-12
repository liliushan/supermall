// pages/category/index.js
import {categoryRequest} from '../../request/category'
import {parseCategoryData} from '../../utils/parseCategoryData'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:0,
    categoryName:'',
    categoryGoods:'',
    scrollTop:'' //  设置滚动到顶部
  },
  /**
   *给分类列表添加点击事件--添加激活状态的样式
   * */ 
  addColor(e){
    this.setData({
      current:e.currentTarget.dataset.index,
      scrollTop:0
    })
  },
  /**
   * 生命周期函数--监听页面加载--请求数据
   */
  onLoad: function (options) {
    if(!wx.getStorageSync('categoryDate')){
      // 首先判断本地存储中是否有值--如果没有值就发送请求
      categoryRequest('/categories')
        .then(res=>{
          let fullres = new parseCategoryData(res)
          wx.setStorageSync('categoryDate', fullres)
          this.setData({
            categoryName:fullres.categoryName,
            categoryGoods:fullres.categoryGoods,
            
          })
        })
    }else{
      wx.getStorageSync('categoryDate')
      this.setData({
        //  从本地存储中去获取值渲染页面
        categoryName:wx.getStorageSync('categoryDate').categoryName,
        categoryGoods:wx.getStorageSync('categoryDate').categoryGoods,
        
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})