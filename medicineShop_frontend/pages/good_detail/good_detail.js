// pages/good_detail/good_detail.js
const {getGoodDetail} = require("../../api/index");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodDetail: {},
        autoplay: false,
        id: 0,
        popup_show: false,
        goodAmount: 1,
        goToCart: false, // goToCart用于接收用户是否点击了购物车图标，从而判断进入购物车还是结算页面
        goToBuy: false, // goToBuy用于接收用户是否点击了立即购买按钮，从而判断进入购物车还是结算页面
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.id)
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
        console.log(this.data.id)
        wx.switchTab({
            url: '/pages/cart/cart',
        })
    },
    // 点击加入购物车按钮
    clickCart() {
        this.setData({
            popup_show: true,
            goToCart: true
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
            // 将商品id和数量传给后端
            console.log(this.data.goToCart, this.data.goToBuy)
            this.setData({
                    goToCart: false
                }
            )
            wx.switchTab({
                url: '/pages/cart/cart',

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