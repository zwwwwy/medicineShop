// pages/express/express.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stepStatus: 1,
        expressStatus: 1,
        steps: [
            {
                text: '',
                desc: '支付成功',
            },
            {
                text: '',
                desc: '待发货',
            },
            {
                text: '',
                desc: '待收货',
            },
            {
                text: '',
                desc: '订单完成',
            },
        ],
        express: [
            {
                text: 'xxxx揽收',
                desc: '订单号: 1234567890'
            },
            {
                text: '准备发往xxx',
                desc: '配送员: xxx'
            }
        ]
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