/**
 * 获取用户的收获地址
 * 思路:
 * 1.首先给按钮绑定点击事件
 * 2.判断用户给予的权限
 * 3.如果权限为true说明可以获取用户收货地址
 * 4.如果权限为false说明不能获取用户收货地址,这个时候我们需要诱导用户重新授权
 * 5.获取收获地址后将收获地址进行本地存储
 * 6.从本地存储中获取收货地址如果获取到了那么渲染用户收货地址的信息如果没有获取到那么显示收货地址按钮
 */
function chooseAdress() {
      // 1.获取用户的授权
      wx.getSetting({
        success: res => {
          let auth = res.authSetting['scope.address']
          if (auth || auth === undefined) {
            // 2.当权限为true或者用户重来没有进行权限操作的时候都可以去获取收获地址
            wx.chooseAddress({
              complete: (res1) => {
                wx.setStorageSync('chooseAddress', res1)
              },
            })
          } else {
            // 3.当权限为false的时候诱导用户重新授权
            wx.openSetting({
              complete: (res2) => {
                // 4.授权完成后重新获取收获地址
                wx.chooseAddress({
                  complete: (res3) => {
                    //  5.将获取到的收获地址存储在本地存储中
                    wx.setStorageSync('chooseAddress', res3)
                  },
                })
              },
            })
          }
        }
      })
}
export {
  chooseAdress
}