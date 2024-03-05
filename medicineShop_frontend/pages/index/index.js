const {getSwiper, getGoods} = require("../../api/index");
const {wxLogin} = require("../../utils/login")

Page({
    data: {
        value: "",
        swiperOptions: {
            indicatorDots: true,
            // 点指示器
            autoplay: true,
            // 自动轮播
            interval: 3000,
            // 自动切换时间间隔
            duration: 1000,
            // 滑动动画时长
            swiperData: [],
            // 轮播图数据


        },

        page: 1,
        goodsData: [],
        // 商品数据

    },
    onLoad() {
        wxLogin().then(res => {
            console.log("登陆成功")
        })
        console.log("首页载入")
        getSwiper().then(res => {
            this.setData({
                swiperData: res.data.data.result
            })
        })
        this.http(this.data.page)
        console.log("轮播图载入完成")
    },

    http(page) {
        getGoods(page).then(res => {
            if (!res.data.msg) {
                this.setData({
                    goodsData: this.data.goodsData.concat(res.data.data.result)
                })
                console.log(this.data.goodsData)
            } else {
                wx.showToast({
                    title: res.data.msg,
                    icon: "cross",
                    duration: 2000
                })
            }
        })
    },
    onReachBottom() {
        // 更改页码
        this.setData({
            page: this.data.page + 1
        })
        this.http(this.data.page)
    },
    // 点击搜索框跳转至搜索页面,用搜索框的event api触发
    onFocus() {
        wx.navigateTo({
            url: "/pages/search/search"
        })
    }
})