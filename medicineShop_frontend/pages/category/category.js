const {getCategory} = require("../../api/index");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeKey: 0,
        goodsData: [],
        page: 1,
        category_name: ["中成药", "感冒药", "消炎药", "维生素", "冷链", "其他"],
        current_category: "中成药"
    },
    onChange(event) {
        this.setData({
            goodsData: [],
            page: 1,
            current_category: this.data.category_name[event.detail]
        });
        console.log("用户点击的导航页内容为：", this.data.current_category)
        this.http(this.data.current_category, this.data.page);
    },
    http(tag, page) {
        getCategory(tag, page).then(res => {
            if (!res.data.msg) {
                this.setData({
                    goodsData: this.data.goodsData.concat(res.data.data.result)
                })
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: "cross",
                    duration: 2000
                })
            }
        })

    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.http(this.data.current_category, this.data.page)

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
        // 更改页码
        this.setData({
            page: this.data.page + 1
        })
        this.http(this.data.current_category, this.data.page)

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})