// pages/goods_list/index.js
import {
  goodListRequest
} from '../../request/goodList'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tab_title: ['综合', '销量', '价格'],
    goods_item: [],
    cid: 0, //  分类的id
    pagenum: 0, //  页码
    pagesize: 15,
    fullNum:0 //  总页数
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.cid = options.cid
    this.setData({
      //  让页码加 1 发送请求
      pagenum: this.data.pagenum + 1
    })
    goodListRequest('/goods/search', {
        cid: this.data.cid,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      })
      .then(res => {
        this.setData({
          fullNum:Math.ceil(res.data.message.total / this.data.pagesize) 
        })
        if (this.data.fullNum >= this.data.pagenum) {
          this.setData({
            goods_item: res.data.message.goods
          })
        }
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
    // 下拉刷新的时候首先清除数据
    this.setData({
      goods_item:[],
      pagenum:1 //  重新设置页码
    })
    goodListRequest('/goods/search', {
        cid: this.data.cid,
        pagenum: this.data.pagenum,
        pagesize: this.data.pagesize
      })
      .then(res => {
        this.setData({
          goods_item:res.data.message.goods
        })
        // stopPullDownRefresh()当数据请求成功后关闭下拉效果
        wx:wx.stopPullDownRefresh()
      })
    
  },

  /**
   * 页面上拉触底事件的处理函数
   * 下拉加载更多数据实现思路:
   * 1.首先利用total总数据 / 一页的个数算出总页数
   * 2.每一次拉到底部后让页数加1,然后重新发送请求获取数据
   * 3.获取数据后将数据添加到数组的尾部
   */
  onReachBottom: function () {
    this.setData({
      pagenum: this.data.pagenum + 1
    })
    if (this.data.fullNum >= this.data.pagenum) {
      goodListRequest('/goods/search', {
          cid: this.data.cid,
          pagenum: this.data.pagenum,
          pagesize: this.data.pagesize
        })
        .then(res => {
          this.setData({
            goods_item: [...this.data.goods_item, ...res.data.message.goods]
          })
        })
    } else {
      wx:wx.showToast({
        title: '没有下一页数据了',
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})