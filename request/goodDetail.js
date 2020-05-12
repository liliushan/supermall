let baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
let goodDetailRequest = (url,data)=>{
  //  发送数据之前显示数据正在加载
  wx:wx.showLoading({
    title: '正在加载数据',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl+url,
      data:data,
      success: (res) => {
        resolve(res)
        // 数据获取成功后关闭Loading
        wx:wx.hideLoading({})
      }
    })
  })
}

export {
  goodDetailRequest
}