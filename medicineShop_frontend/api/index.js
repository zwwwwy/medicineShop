const {request, post_request} = require("../utils/request");
// 从request.js把export的request方法引入
const {baseUrl, swiper, goods, search, good_detail, category} = require("./base");

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
    return post_request(baseUrl + search + '/' + page, name)
}

function getGoodDetail(id) {
    return post_request(baseUrl + good_detail + '/' + id, id);
}


function getCategory(tag, page) {
    return post_request(baseUrl + category + '/' + page, tag);
}

module.exports = {
    getSwiper,
    getGoods,
    searchGoods,
    getGoodDetail,
    getCategory
}