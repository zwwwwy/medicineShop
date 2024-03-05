const {getOrderIndex, payInfo} = require("../../api/index")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        success: false,
        fail: false,
        goodDetails: [],
        orderId:0,
        address: "",
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            address: options.address,
        })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        getOrderIndex(getApp().globalData.openid).then(res => {
            this.setData({
                goodDetails: res.data.data.result,
                orderId: res.data.data.orderId
            })
        })
    },

    paySuccess() {
        console.log('支付成功')
        this.setData({
            success: true
        })
        payInfo(getApp().globalData.openid, this.data.goodDetails, this.data.orderId, 1, this.data.address).then(res => {
            console.log(res)
        })
    },
    payFail() {
        console.log('支付失败')
        this.setData({
            fail: true
        })
        payInfo(getApp().globalData.openid, this.data.goodDetails, this.data.orderId, -1, this.data.address).then(res => {
            console.log(res)
        })
    },
    hasPaid() {
        console.log('关闭')
        wx.switchTab({
            url: '/pages/index/index',
        })
    },
    toCart(){
        wx.switchTab({
            url: '/pages/cart/cart',
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})