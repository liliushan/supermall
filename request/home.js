
let baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
let homeRequest = (url)=>{
  wx:wx.showLoading({
    title: '正在加载数据',
  })
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + url,
      success: (res) => {
        resolve(res)
      }
    })
  })
}
export {homeRequest}