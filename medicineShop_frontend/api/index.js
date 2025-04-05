const {request, post_request} = require("../utils/request");
// 从request.js把export的request方法引入
const {
    baseUrl, login, swiper, goods,
    search, good_detail, category, cart,
    addCart, changeCart, stepper, freshCart,
    deleteCart, addOrder, orderIndex, pay,
    order, doctor, doctorDetail, info, filter
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

// 清理购物车里amount为0的商品
function getCartFresh(openid) {
    return post_request(baseUrl + freshCart, openid);
}

// 删除购物车商品
function deleteCartGood(openid, goodId) {
    return post_request(baseUrl + deleteCart, {openid, goodId});
}

// 添加订单
function addOrderGood(openid, orderList) {
    return post_request(baseUrl + addOrder, {openid, orderList});
}

// 获取订单结算页的信息
function getOrderIndex(openid) {
    return post_request(baseUrl + orderIndex, openid)
}

// 向后端发送支付信息
function payInfo(openid, data, orderId, orderStatus, address) {
    return post_request(baseUrl + pay, {openid, data, orderId, orderStatus, address})
}

// 获取status状态的订单信息，status可以取值为'all, -1, 0, 1, 2, 3或包含前文所指数字的列表
function getOrder(openid, status) {
    return post_request(baseUrl + order, {openid, status})
}

// 获取对应tag的医生信息
function getDoctor(tag, page) {
    return post_request(baseUrl + doctor+'/'+page, tag)
}

function getDoctorDetail(id) {
    return post_request(baseUrl + doctorDetail, id)
}

function postInfo(openid, data){
    return post_request(baseUrl + info, {"openid":openid, "data":data})
}

function getFilter() {
    return request(baseUrl + filter, "GET", {})
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
    changeCartGood,
    getCartFresh,
    deleteCartGood,
    addOrderGood,
    getOrderIndex,
    payInfo,
    getOrder,
    getDoctor,
    getDoctorDetail,
    postInfo,
    getFilter
}