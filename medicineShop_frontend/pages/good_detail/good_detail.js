// pages/good_detail/good_detail.js
const { getGoodDetail } = require("../../api/index");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodDetail: {},
        autoplay:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        console.log(options.id)
        getGoodDetail(options.id).then(res => {
            console.log("商品详情",res.data)
            this.setData(
                {
                    goodDetail: res.data.data.result
                }
            )
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