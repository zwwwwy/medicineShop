// pages/good_detail/good_detail.js
const {getGoodDetail, addCartGood, getStepper} = require("../../api/index");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodDetail: {},
        autoplay: false,
        id: 0,
        popup_show: false,
        goodAmount: 1, // 这个是当前步进器的值
        goToCart: false, // goToCart用于接收用户是否点击了购物车图标，从而判断进入购物车还是结算页面
        goToBuy: false, // goToBuy用于接收用户是否点击了立即购买按钮，从而判断进入购物车还是结算页面
        stepperMax: 100, // 这个是步进器的最大值，应该是后端返回的库存
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log("用户点击的商品id为：", options.id)
        getGoodDetail(options.id).then(res => {
            console.log("商品详情", res.data)
            this.setData(
                {
                    goodDetail: res.data.data.result,
                    id: options.id
                }
            )
        })
    },
    // 点击左侧的购物车图标
    clickCartIcon() {
        wx.switchTab({
            url: '/pages/cart/cart',
        })
    },
    // 点击加入购物车按钮
    clickCart() {
        // 这里应该读取后端中本用户的购物车信息和商品库存，限制步进器的最大值
        // 我觉得不需要读取其他用户的，毕竟只是加入购物车，如果按照这个逻辑写的话
        // 当其他用户的购物车超出库存步进器也会自动调整的吧。

        //那么这里需要传入商品id和openid，后端返回库存和购物车数量，在这里做差(这样结算页面不用重做)
        this.setData({
            popup_show: true,
            goToCart: true
        })

        // 如果用户手太快了这里是获取不到购物车信息的，可以在这里加上一个登陆验证，参见cart.js
        // 为了省时间先不写了
        getStepper(getApp().globalData.openid, this.data.id).then(res => {
            console.log("库存和购物车数量", res.data)
            this.setData({
                stepperMax: res.data.data.result.stock - res.data.data.result.cart_amount
            })
        })

    },
    // 点击立即购买按钮
    clickBuy() {
        this.setData({
            popup_show: true,
            goToBuy: true
        })
    },
    // 点击弹出页面的关闭按钮
    popupClose() {
        this.setData({
            popup_show: false,
            goToCart: false,
            goToBuy: false
        })
        console.log(this.data.goToCart, this.data.goToBuy)
    },
    // 点击弹出页面的确定按钮
    clickSubmit() {
        console.log("用户在弹出页面点击确定")
        this.setData({
            popup_show: false,
        })


        if (this.data.goToCart) {
            // 用户点击了加入购物车
            // 将商品id、数量和用户openid传给后端，然后在后端整合数据
            this.setData({
                    goToCart: false
                }
            )
            console.log("id和数量：", this.data.id, this.data.goodAmount)
            addCartGood(getApp().globalData.openid, this.data.id, this.data.goodAmount).then(res => {
                wx.switchTab({
                    url: '/pages/cart/cart',

                })
            })

        }
        if (this.data.goToBuy) {
            // 用户点击了立即购买
            // 将商品id和数量传给后端
            console.log(this.data.goToCart, this.data.goToBuy)
            this.setData({
                goToBuy: false
            })
        }
    },
    // 用户在弹出页面修改了商品数量
    goodAmountChange(event) {
        this.setData({
            goodAmount: event.detail
        })
        console.log("用户修改商品数量为", this.data.goodAmount)
    }


})