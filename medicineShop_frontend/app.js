const {appLogin} = require("api/index");
// app.js的行为看起来是异步的，经常出现页面加载后在登陆的情况！！！
//如果确保要先登录在加载，参考cart.js中onShow的写法

App({
    onLaunch() {
        // 展示本地存储能力
        const logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                appLogin(res.code).then(res => {
                    console.log('登录成功，获取的用户信息为', res.data.data.result)
                    this.globalData.openid = res.data.data.result.openid
                    this.globalData.session_key = res.data.data.result.session_key
                    this.globalData.isLogged = true;
                })
            }
        })
    },
    globalData: {
        userInfo: null,
        isLogged: false,
        openid: null,
        session_key: null

    }
})
