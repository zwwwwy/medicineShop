const {appLogin} = require("api/index");

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
                })
            }
        })
    },
    globalData: {
        userInfo: null,
        openid: null,
        session_key: null

    }
})
