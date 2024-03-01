const {appLogin} = require("../api/index");

function wxLogin() {
    const app = getApp()

    // 登录
    return new Promise((resolve, reject) => {
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                appLogin(res.code).then(res => {
                    console.log('登录成功，获取的用户信息为', res.data.data.result)
                    app.globalData.openid = res.data.data.result.openid
                    app.globalData.session_key = res.data.data.result.session_key
                    app.globalData.isLogged = true; // 添加这一行，表示已经登录
                    resolve(); // 登录成功，解析 Promise
                }).catch(err => {
                    reject(err); // 登录失败，拒绝 Promise
                })
            },
            fail: err => {
                reject(err); // wx.login 失败，拒绝 Promise
            }
        })
    })
}


module.exports = {
    wxLogin
}
