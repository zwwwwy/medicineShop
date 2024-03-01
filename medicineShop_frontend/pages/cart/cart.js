const {getCart, getGoodDetail} = require("../../api/index")
const {wxLogin} = require("../../utils/login")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        initial: false,
        cartData: [],
        cartDetail: [],
        test_cartData: [
            {
                url: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good3.jpg",
                title: "东北制药 维生素C片100mg*100片 预防坏血病急慢性传染疾病紫癜",
                price: 10
            },
            {
                url: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/good3.jpg",
                title: "东北制药 维生素C片100mg*100片 预防坏血病急慢性传染疾病紫癜",
                price: 10
            },
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
        // app.js的行为看起来是异步的，经常先页面加载后在登陆
        // 这里在onShow中判断是否登陆，如果没有登陆，先登陆
        const app = getApp()
        const page = this

        function load() {
            console.log("进入购物车")
            // 此处应向后端请求用户openid的购物车信息（id+数量，管理数据应在后端）

            // 这里要先清空购物车信息防止重复加载
            page.setData({
                cartDetail: []
            })

            getCart(app.globalData.openid).then(res => {
                page.setData({
                    cartData: res.data.data.result
                })
                console.log("购物车商品id为：", page.data.cartData)
                for (let id in page.data.cartData) {

                    // 下面这个函数创建一个新对象将获取的信息和商品数量合并
                    // 商品数量就是page.data.cartData[id]
                    // 笑死，估计明天我就看不懂了
                    getGoodDetail(id).then(res => {
                        let resultWithAmount = {
                            ...res.data.data.result,
                            amount: page.data.cartData[id]
                        };
                        page.setData({
                            cartDetail: page.data.cartDetail.concat(resultWithAmount)
                        });
                        console.log("购物车商品信息为：", page.data.cartDetail);
                    })
                }
            })
        }

        if (app.globalData.isLogged) {
            load()
        } else {
            wxLogin().then(res => {
                load()
            })
        }

    },


    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    }
    ,

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    }
    ,

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    }
    ,

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    }
    ,

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})