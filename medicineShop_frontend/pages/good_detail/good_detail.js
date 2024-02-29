// pages/good_detail/good_detail.js
const { getGoodDetail } = require("../../api/index");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodDetail: {},
        autoplay:false,
        id:0,
        popup_show:false,
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
                    goodDetail: res.data.data.result,
                    id:options.id
                }
            )
        })
    },
    // 点击左侧的购物车图标
    clickCartIcon(){
        console.log(this.data.id)
        wx.switchTab({
          url: '/pages/cart/cart',
        })
    },
    clickCart(){
        this.setData({
            popup_show:true
        })
    },
    clickBuy(){
        this.setData({
            popup_show:true
        })
    },
    popupClose(){
        this.setData({
            popup_show:false
        })
    }


})