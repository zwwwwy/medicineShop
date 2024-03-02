const {request, post_request} = require("../utils/request");
// 从request.js把export的request方法引入
const {
    baseUrl, login, swiper, goods,
    search, good_detail, category, cart,
    addCart,changeCart, stepper
} = require("./base");

/**
 * 网络请求方法
 */

// 用户登录
function appLogin(code) {
    return post_request(baseUrl + login, code)
}

// 获取轮播图数据
function getSwiper() {
    return request(baseUrl + swiper, "GET", {})
}

// 获取分页的商品数据
function getGoods(page) {
    return request(baseUrl + goods + '/' + page, "GET", {})
}


// 搜索商品(分页)
function searchGoods(name, page) {
    return post_request(baseUrl + search + '/' + page, name)
}

// 按id查询单个商品详情
function getGoodDetail(id) {
    return post_request(baseUrl + good_detail + '/' + id, id);
}


// 获取分类商品（分页）
function getCategory(tag, page) {
    return post_request(baseUrl + category + '/' + page, tag);
}

// 按openid获取用户购物车的信息（商品id:数量）
function getCart(openid) {
    return post_request(baseUrl + cart, openid);
}

// 添加商品到购物车
function addCartGood(openid, goodId, goodAmount) {
    return post_request(baseUrl + addCart, {openid, goodId, goodAmount});
}

// 改变购物车信息（这里应该用于点击步进器的时候，因为添加购物车只要考虑加入就可以了）
// 本函数默认商品已经存在于购物车了！！！！不能用于除步进器以外的任何地方
function changeCartGood(openid, goodId, goodAmount) {
    return post_request(baseUrl + changeCart, {openid, goodId, goodAmount});
}

// 获取商品库存和购物车数量，用来计算步进器的最大取值
function getStepper(openid, goodId) {
    return post_request(baseUrl + stepper, {openid, goodId});
}

module.exports = {
    appLogin,
    getSwiper,
    getGoods,
    searchGoods,
    getGoodDetail,
    getCategory,
    getCart,
    addCartGood,
    getStepper,
    changeCartGood
}