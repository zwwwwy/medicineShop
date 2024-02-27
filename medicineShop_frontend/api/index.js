const {request} = require("../utils/request");
// 从request.js把export的request方法引入
const {baseUrl, swiper, goods} = require("./base.js");

/**
 * 网络请求方法
 */

function getSwiper() {
    return request(baseUrl + swiper, "GET", {})
}

function getGoods(page) {
    return request(baseUrl + goods + '/' + page, "GET", {})
}
// 懒得看小程序怎么请求数据了，这里直接骚操作了

module.exports = {
    getSwiper,
    getGoods
}