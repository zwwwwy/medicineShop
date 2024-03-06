// pages/grid/information/information.js
const {postInfo} = require("../../../api/index");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        radio: '1',
        radioMessage: '',
        message1: '',
        message2: '',
        checked1: false,
        checked2: false,
        checked3: false,
        show: false,
    },
    change1(e) {
        console.log(e.detail)
        this.setData({
            message1: e.detail,
            checked1: true
        })
    },
    change2(e) {
        console.log(e.detail)
        this.setData({
            message2: e.detail,
            checked2: true
        })
    },
    radioChange(e) {
        console.log(e.detail)
        this.setData({
            radioMessage: e.detail,
            checked3: true
        })
    },
    submitInfo() {
        postInfo(getApp().globalData.openid, {
            "家庭慢性病情况": this.data.message1,
            "过敏情况": this.data.message2,
            "是否有孩子": this.data.radioMessage
        }).then(res => {
            this.setData({
                show: true
            })
        })
    },
    submitted() {
        console.log('关闭')
        wx.switchTab({
            url: '/pages/index/index',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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