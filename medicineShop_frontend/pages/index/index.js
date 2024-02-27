const {getSwiper, getGoods} = require("../../api/index");
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
        navData: [
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/zcy_red.png",
                text: "中成药",
                url: "/pages/grid/zcy/zcy"
            },
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/kgm_red.png",
                text: "抗过敏",
                url: "/pages/grid/kgm/kgm"
            },
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/kbd_red.png",
                text: "抗病毒",
                url: "/pages/grid/kbd/kbd"
            },
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/kss_red.png",
                text: "抗生素",
                url: "/pages/grid/kss/kss"
            }
        ],
        // 上面这个是导航宫格的数据，本地图像读取不了，所以放在服务器了
        page: 1,
        goodsData: [],
        // 商品数据

    },
    onLoad() {

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
            console.log(res)
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