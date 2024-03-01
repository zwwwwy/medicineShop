/**
 * @param {string} url
 * @param {string} method
 * @param {string/object/ArrayBuffer} data
 */
const {baseUrl, search} = require("../api/base");

function request(url, method, data) {
    wx.showLoading({
        title: "加载数据...",
        mask: true
    })
    const promise = new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: method,
            data: data,
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            },
            complete() {
                wx.hideLoading()
            }
        })
    })
    return promise;
}

function post_request(url, data) {
    wx.showLoading({
        title: "加载数据...",
        mask: true
    })
    const promise = new Promise((resolve, reject) => {
        wx.request({
            url: url,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {post: JSON.stringify(data)},
            success: function (data) {
                console.log('已经提交数据到数据库');
                resolve(data);
            },
            fail: function (error) {
                reject(error);
            },
            complete: res => {
                console.log('数据请求完成');
                wx.hideLoading();
            }
        })
    });
    return promise;
}


module.exports = {
    request,
    post_request
}