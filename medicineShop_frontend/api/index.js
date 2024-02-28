const {request} = require("../utils/request");
// 从request.js把export的request方法引入
const {baseUrl, swiper, goods, search, good_detail} = require("./base");

/**
 * 网络请求方法
 */

function getSwiper() {
    return request(baseUrl + swiper, "GET", {})
}

function getGoods(page) {
    return request(baseUrl + goods + '/' + page, "GET", {})
}


function searchGoods(name, page) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + search + '/' + page,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {post: JSON.stringify(name)},
            success: function (data) {
                console.log('已经提交数据到数据库');
                resolve(data);
            },
            fail: function (error) {
                reject(error);
            },
            complete: res => {
                console.log(res.data);
                console.log('---request complete---');
            }
        })
    });
}

function getGoodDetail(id) {
    return new Promise((resolve, reject) => {
        wx.request({
            url: baseUrl + good_detail + '/' + id,
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {post: JSON.stringify(id)},
            success: function (data) {
                console.log('已经提交数据到数据库');
                resolve(data);
            },
            fail: function (error) {
                reject(error);
            },
            complete: res => {
                console.log(res.data);
                console.log('---request complete---');
            }
        })
    });

}


module.exports = {
    getSwiper,
    getGoods,
    searchGoods,
    getGoodDetail
}