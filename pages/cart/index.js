// pages/cart/index.js
import {
  chooseAdress
} from '../../utils/chooseAddress'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    good_list: [],
    isActive: false,
    fullPrice: 0,
    fullCount: 0
  },

  //  获取用户收获地址
  getchooseAdress() {
    chooseAdress()
  },
  // 页面显示的时候执行
  onShow: function () {
    let address = wx.getStorageSync('chooseAddress')
    let good_list = wx.getStorageSync('cart') || []
    this.setData({
      address: address,
      good_list: good_list
    })
    this.getTools(this.data.good_list)
  },
  //  处理单选事件
  checked(e) {
    // 获取点击商品的索引
    let i = e.currentTarget.dataset.index
    // 修改商品的值
    this.data.good_list[i].isActive = !this.data.good_list[i].isActive
    // 将修改后的值重新存入data和本地存储
    this.setData({
      good_list: this.data.good_list
    })
    wx.setStorageSync('cart', this.data.good_list)
    this.getTools(this.data.good_list)
  },
  // 处理全选
  allChecked(){
    this.data.isActive = !this.data.isActive
    this.setData({
      isActive:this.data.isActive
    })
    this.data.good_list.forEach(value=>{
      value.isActive = this.data.isActive
    })
    this.setData({
      good_list:this.data.good_list
    })
    this.getTools(this.data.good_list)
  },
  /**
 *计算底部的工具栏:全选,合计,结算 
 */ 
getTools(cartList){
    // 计算总价格个总数量
    let fullPrice = 0
    let fullCount = 0
    let flag = true
    cartList.forEach(value => {
      if (value.isActive) {
        fullPrice = fullPrice + value.goods_price * value.count
        fullCount = fullCount + value.count
      }else{
        flag = false
      }
    })
    flag = cartList.length?flag:false
    this.setData({
      fullPrice: fullPrice,
      fullCount: fullCount,
      isActive: flag
    })

},
// 商品数量增加
countAdd(e){
  let index = e.currentTarget.dataset.index
  this.data.good_list[index].isActive = true
  this.data.good_list[index].count = this.data.good_list[index].count + parseInt(e.target.dataset.num)
  this.setData({
    good_list:this.data.good_list
  })
  this.getTools(this.data.good_list)
},
// 商品数量减少
reduce(e){
  let index = e.currentTarget.dataset.index
  this.data.good_list[index].isActive = true
  if(this.data.good_list[index].count>1){
    this.data.good_list[index].count = this.data.good_list[index].count + parseInt(e.target.dataset.num)
    this.setData({
      good_list:this.data.good_list
    })
    this.getTools(this.data.good_list)
  }else{
    // 商品删除
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success: (res)=> {
        if (res.confirm) {
          this.data.good_list.splice(index,1)
          this.setData({
            good_list:this.data.good_list
          })
          this.getTools(this.data.good_list)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
},
//  结算
settlement(){
  if(this.data.good_list.length===0){
    wx.showToast({
      title: '没有添加商品',
      icon: 'none',
      duration: 2000
    })
  }else if(!this.data.address){
    wx.showToast({
      title: '没有添加收货地址',
      icon: 'none',
      duration: 2000
    })
  }else{
    console.log('可以支护了')
  }
} 
})