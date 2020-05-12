// pages/pay/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    good_list: [],
    fullPrice:0,
    fullCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    let address = wx.getStorageSync('chooseAddress')
    let good_list = wx.getStorageSync('cart') || []
    let new_good_list = good_list.filter(value=>value.isActive===true)
    this.setData({
      address: address,
      good_list: new_good_list
    })
    this.getTools(this.data.good_list)
  },
getTools(cartList){
    // 计算总价格个总数量
    let fullPrice = 0
    let fullCount = 0
    cartList.forEach(value => {
      if (value.isActive) {
        fullPrice = fullPrice + value.goods_price * value.count
        fullCount = fullCount + value.count
      }
    })
    this.setData({
      fullPrice: fullPrice,
      fullCount: fullCount,
    })
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