// pages/grid/doctor/doctor.js
const {getDoctor} = require('../../../api/index');
// 发送{tag:"标签"}数据类型

Page({

    /**
     * 页面的初始数据
     */
    data: {
        activeKey: 0,
        doctorData: [],
        page: 1,
        category_name: ["外科", "内科", "耳鼻喉科", "儿科", "中医科"],
        current_category: "外科"

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.http({tag:this.data.current_category}, this.data.page)
    },
    onChange(event) {
        this.setData({
            doctorData: [],
            page: 1,
            current_category: this.data.category_name[event.detail]
        });
        console.log("用户点击的导航页内容为：", this.data.current_category)
       this.http({tag:this.data.current_category}, this.data.page)
    },
    http(tag, page) {
        getDoctor(tag, page).then(res => {
            if (!res.data.msg) {
                this.setData({
                    doctorData: this.data.doctorData.concat(res.data.data.result)
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