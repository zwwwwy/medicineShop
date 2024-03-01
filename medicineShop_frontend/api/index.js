const {request, post_request} = require("../utils/request");
// 从request.js把export的request方法引入
const {
    baseUrl, login, swiper, goods,
    search, good_detail, category, cart,addCart
} = require("./base");

/**
 * 网络请求方法
 */

function appLogin(code) {
    return post_request(baseUrl + login, code)
}

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

function getCart(openid) {
    return post_request(baseUrl + cart, openid);
}

function addCartGood(openid, goodId, goodAmount) {
    return post_request(baseUrl + addCart, {openid, goodId, goodAmount});
}
module.exports = {
    appLogin,
    getSwiper,
    getGoods,
    searchGoods,
    getGoodDetail,
    getCategory,
    getCart,
    addCartGood
}