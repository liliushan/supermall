// pages/goos_detail/index.js
import {goodDetailRequest} from '../../request/goodDetail'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_id:0,
    detailInfo:{}
  },
  // 预览图片
  preview(e){
    let urls = this.data.detailInfo.pics.map(value=>value.pics_mid)
    // previewImage重新启动一个页面全屏显示图片
    wx.previewImage({
      current:urls[e.currentTarget.dataset.index], //显示当前的图片
      urls: urls //  图片src数组
    })
  },
  // 加入购物车
  addCart(){
    // 1.首先获取本地存储中所有的数据 数组格式
     let cart = wx.getStorageSync('cart') || []
     let index = cart.findIndex(value=>value.pics[0].goods_id === this.data.detailInfo.pics[0].goods_id)
     if(index=== -1){
       this.data.detailInfo.count = 1 // 添加一个属性记录商品的个数
       this.data.detailInfo.isActive = true // 记录按钮是否选中
       cart.push(this.data.detailInfo)
     }else{
       cart[index].count++
     } 
     wx.setStorageSync('cart', cart)
     wx.showToast({
       title: '加入购物车~~',
      //  mask可以防抖防止用户点击过快,只有当等待时间完成后才能触发下一次点击事件
       mask:true
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      goods_id:options.goods_id
    })
    goodDetailRequest('/goods/detail',{
      goods_id:options.goods_id
    })
      .then(res=>{
        this.setData({
          detailInfo:{
            pics:res.data.message.pics,
            goods_price:res.data.message.goods_price,
            goods_name:res.data.message.goods_name,
            goods_introduce:res.data.message.goods_introduce
          }
        })
      })
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
    // 实现了下拉刷新功能
    this.setData({
      detailInfo:{}
    })
    goodDetailRequest('/goods/detail',{
      goods_id:this.data.goods_id
    })
      .then(res=>{
        this.setData({
          detailInfo:{
            pics:res.data.message.pics,
            goods_price:res.data.message.goods_price,
            goods_name:res.data.message.goods_name,
            goods_introduce:res.data.message.goods_introduce
          }
        })
        wx.stopPullDownRefresh()  //  当数据请求回来后关闭下拉刷新
      })
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