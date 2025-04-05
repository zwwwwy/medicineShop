/**
 * 存储接口的地址
 */

module.exports = {
    baseUrl: "http://localhost:5000", // 本地公共地址
    // baseUrl: "https://249ab13b.r2.cpolar.top", // 内网穿透地址
    login: "/api/login", // 登录接口
    swiper: "/api/swiper",  // 轮播图接口
    goods: "/api/goods", // 商品接口
    search: "/api/search", // 搜索接口
    good_detail: "/api/goods/detail", // 商品详情接口
    category: "/api/category", // 商品分类接口
    cart: "/api/cart", // 购物车接口
    addCart: "/api/cart/add", // 添加购物车接口
    changeCart: "/api/cart/change", // 改变购物车信息接口，仅用于步进器！！！！！！！
    stepper: "/api/stepper", // 步进器接口
    freshCart: "/api/cart/fresh", // 用来清理购物车里amount为0的商品
    deleteCart: "/api/cart/delete", // 删除购物车商品
    addOrder: "/api/order", // 添加订单接口
    orderIndex: "/api/order/index", // 订单结算页接口
    pay: "/api/pay", // 支付成功接口
    order: "/api/order/list", // 订单接口
    doctor: "/api/doctor", // 医生接口
    doctorDetail: "/api/doctor/detail", // 医生详情接口
    info: "/api/info", // 用户信息接口
    filter: "/api/platform/filter", // 平台数据接口

}