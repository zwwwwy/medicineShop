const {getCart, getGoodDetail, getCartFresh} = require("../../api/index")
const {wxLogin} = require("../../utils/login")
const {changeCartGood} = require("../../api/index");

Page({

    /**
     * 页面的初始数据
     */
    data: {
        initial: false,
        cartData: [],
        cartDetail: [],
        sumPrice: 0,
        nodata: false
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

        //下面两行是为了每次进入购物车页面的时候把buyList的changed属性重置

        function load() {
            console.log("进入购物车")
            // 此处应向后端请求用户openid的购物车信息（id+数量，管理数据应在后端）

            // 这里要先清空购物车信息防止重复加载
            getCartFresh(app.globalData.openid)
            page.setData({
                cartDetail: []
            })

            getCart(app.globalData.openid).then(res => {
                console.log(res.data)
                if (res.data.msg) {
                    console.log("购物车为空")
                    page.setData({
                        nodata: true
                    })
                } else {
                    page.setData({
                        cartData: res.data.data.result,
                        nodata: false
                    })

                    console.log("购物车商品id为：", page.data.cartData)
                    for (let id in page.data.cartData) {

                        // 下面这个函数创建一个新对象将获取的信息和商品数量合并
                        // 商品数量就是page.data.cartData[id]
                        // 笑死，估计明天我就看不懂了
                        getGoodDetail(id).then(res => {
                            console.log(res)
                            let resultWithAmount = {
                                ...res.data.data.result,
                                amount: page.data.cartData[id]
                            };
                            page.setData({
                                cartDetail: page.data.cartDetail.concat(resultWithAmount)
                            });
                            console.log("购物车商品信息为：", page.data.cartDetail);
                            let totalCost = page.data.cartDetail.reduce((total, item) => {
                                return total + item.amount * item.price;
                            }, 0);
                            console.log("购物车商品总价为：", totalCost);
                            page.setData({
                                sumPrice: totalCost * 100
                            })
                        })
                    }

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

    stepperChange(event) {
        console.log(event)
        let item = event.currentTarget.dataset.item;
        let index = event.currentTarget.dataset.index;
        let key = `cartDetail[${index}].amount`;
        this.setData({
            [key]: event.detail
        });
        console.log("用户点击的步进器所属的商品信息为", this.properties.cartDetail[index])

        // 在载入购物车页面时设置了先登录（只有在这里才设置了）
        // 所以这里不必担心出现没登陆的情况
        changeCartGood(getApp().globalData.openid, this.properties.cartDetail[index].id, this.properties.cartDetail[index].amount).then(res => {
            console.log(res)
        })


        let totalCost = this.properties.cartDetail.reduce((total, item) => {
            return total + item.amount * item.price;
        }, 0);
        console.log("购物车商品总价为：", totalCost);

        this.setData({
            sumPrice: totalCost * 100,
            changed: true

        })
    },
    onClose(event) {
        console.log("删除的商品id为", event.currentTarget.dataset.id)
        changeCartGood(getApp().globalData.openid, event.currentTarget.dataset.id, 0).then(res => {
            console.log(res)
            // 找到要删除的商品在cartDetail数组中的索引
            const index = this.data.cartDetail.findIndex(item => item.id === event.currentTarget.dataset.id);
            // 删除该商品
            this.data.cartDetail.splice(index, 1);
            // 重新计算总价
            let totalCost = this.data.cartDetail.reduce((total, item) => {
                return total + item.amount * item.price;
            }, 0);
            console.log("购物车商品总价为：", totalCost);
            // 更新cartDetail数组和总价
            this.setData({
                cartDetail: this.data.cartDetail,
                sumPrice: totalCost * 100,
            });
        })
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