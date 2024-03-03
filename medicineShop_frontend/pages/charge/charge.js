const {getOrderIndex} = require("../../api/index")
const {areaList} = require('./areaList.js');

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodDetails: [],
        areaList: areaList,
        value: '',
        popupShow: false,
        addressShort: "请选择省市县",
        outerPopupShow: false,
        address: "请选择地址",
        totalPrice: 0,
        showPay:false,
        address1:false,
        address2:false,

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(query) {
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
                goodDetails: res.data.data.result
            })
            console.log(this.data.goodDetails)

            // 计算商品总价
            let totalPrice = 0;
            for (let id in this.data.goodDetails) {
                let item = this.data.goodDetails[id];
                totalPrice += item.price * item.amount;
            }

            console.log("商品总价是：", totalPrice);
            this.setData({totalPrice: totalPrice * 100});
        })
    },
    addressShortConfirm(event) {
        const names = event.detail.values.map(value => value.name);
        const combinedName = names.join('');
        console.log("用户在地址栏选择的是：", combinedName);
        this.setData({addressShort: combinedName, popupShow: false, address: combinedName, address1:true});
    },
    addressDetailChange(event) {
        console.log("用户输入的详细地址是：", event.detail);
        this.setData({address: this.data.addressShort + event.detail, address2:true});

    },
    showPopup() {
        this.setData({popupShow: true});
    },

    closePopup() {
        this.setData({popupShow: false});
    },
    showOuterPopup() {
        this.setData({outerPopupShow: true});
    },
    outerPopupClose() {
        this.setData({outerPopupShow: false});
    },
    onSubmit(){
        console.log("用户点击了提交按钮");
        wx.navigateTo({
            url: '/pages/pay/pay',
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