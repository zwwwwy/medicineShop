// pages/user/user.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navData: [
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/dsh.png",
                text: "待收货",
                url: "/pages/grid/unReceived/unReceived"
            },
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/qbdd.png",
                text: "全部订单",
                url: "/pages/grid/allOrder/allOrder"
            },
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/doctor.png",
                text: "远程问诊",
                url: "/pages/grid/communication/communication"
            },
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/info.png",
                text: "健康信息",
                url: "/pages/grid/information/information"
            }

        ],
        openid: '123'

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
        let app = getApp();
        this.setData({
            openid: app.globalData.openid
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