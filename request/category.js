let baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1"
let categoryRequest = (url)=>{
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl+url,
      success: (res) => {
        resolve(res)
      }
    })
  })
}

export {
  categoryRequest
}