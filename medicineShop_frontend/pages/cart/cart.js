// 有个bug，在修改步进器的时候，总价的计算策略是依次把每个商品的amount和price相乘然后分别加总
// 想到的办法是找是否cartDetail中有一个checked的属性？
// 如果没有的话加上这个属性，然后在计算总价的时候只计算checked为true的商品，在复选框或全选状态改变的时候相应的改变checked
const {getCart, getGoodDetail, getCartFresh, changeCartGood, addOrderGood} = require("../../api/index")
const {wxLogin} = require("../../utils/login")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        initial: false,
        cartData: [],
        cartDetail: [],
        sumPrice: 0,
        nodata: false,
        selectAll: false,
        orderList: []  // 列表，仅存储选中的商品id
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

        console.log("进入购物车")
        // 此处应向后端请求用户openid的购物车信息（id+数量，管理数据应在后端）

        // 这里要先清空购物车信息防止重复加载
        getCartFresh(app.globalData.openid)
        page.setData({
            cartDetail: [],
            orderList: [],
            selectAll: false,
        })

        getCart(app.globalData.openid).then(res => {
            console.log(res.data)
            if (res.data.msg || Object.keys(res.data.data.result).length === 0) {
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
                            amount: page.data.cartData[id],
                            checked: false
                        };
                        page.setData({
                            cartDetail: page.data.cartDetail.concat(resultWithAmount)
                        });
                        console.log("购物车商品信息为：", page.data.cartDetail);

                    })
                }
            }
        })

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
            // 这里遍历商品列表，取checked为true的商品的总价相加，i是索引
            // checked是在选择框选中的时候才被添加到cartDetail中的，被选择之前不用计算价格，所以不考虑
            let totalCost = 0
            for (let i in this.data.cartDetail) {
                if (this.data.cartDetail[i].checked) {
                    totalCost += this.data.cartDetail[i].amount * this.data.cartDetail[i].price
                }
            }
            console.log("购物车商品总价为：", totalCost);

            this.setData({
                sumPrice: totalCost * 100,
                changed: true
            })
            // this.onShow()
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
            this.onShow()
        })
    },

    // 跳转页面
    changePage(event) {
        wx.navigateTo({url: "/pages/good_detail/good_detail?id=" + event.currentTarget.dataset.id})
    },
    // 复选框改变
    checkboxChange(event) {
        // 找到被点击复选框的索引
        const index = this.data.cartDetail.findIndex(item => item.id === event.currentTarget.dataset.id);
        this.setData({
            [`cartDetail[${index}].checked`]: event.detail,
        });
        console.log(this.data.cartDetail)
        if (event.detail === true) {
            // 如果复选框被选中，将商品的id添加到 orderList中
            this.setData({
                orderList: [...this.data.orderList, event.currentTarget.dataset.id]
            });
        } else {
            // 如果复选框被取消选中，将商品的id从orderList移除并关闭全选
            this.setData({
                orderList: this.data.orderList.filter(id => id !== event.currentTarget.dataset.id),
                selectAll: false
            });
        }
        console.log("用户选择的商品id为", this.data.orderList)
        const totalCost = this.data.cartDetail.reduce((total, item) => {
            if (item.checked) {
                return total + item.amount * item.price;
            } else {
                return total;
            }
        }, 0);
        console.log("选中商品的总价为：", totalCost);
        this.setData({
            sumPrice: totalCost * 100
        });
    },
    // 全选框改变
    selectAllChange(event) {
        console.log("用户点击全选")
        this.setData({
            selectAll: event.detail
        })
        if (event.detail === true) {
            // 找出所有amount不等于0的商品
            const validItems = this.data.cartDetail.filter(item => item.amount !== 0);

            // 将这些商品的id添加到orderList中
            const newOrderList = validItems.map(item => item.id);

            // 将所有商品的checked属性设置为true
            const newCartDetail = this.data.cartDetail.map(item => ({...item, checked: true}));

            // 更新orderList和cartDetail
            this.setData({
                orderList: newOrderList,
                cartDetail: newCartDetail,
            });
            console.log("用户选择的商品id为", this.data.orderList)

            // 计算总价
            let totalCost = this.data.cartDetail.reduce((total, item) => {
                return total + item.amount * item.price;
            }, 0);
            console.log("购物车商品总价为：", totalCost);
            this.setData({
                sumPrice: totalCost * 100
            })
        } else {
            // 清空orderList
            this.setData({
                orderList: []
            });

            // 将所有商品的checked属性设置为false
            const newCartDetail = this.data.cartDetail.map(item => ({...item, checked: false}));

            this.setData({
                cartDetail: newCartDetail,
                sumPrice: 0
            });


        }
    },
    // 点击提交订单，先要把选中商品的id和数量传到后端，然后在后端从购物车中移出这些商品
    onSubmit() {
        console.log("用户点击了提交订单")
        const orderList = this.data.cartDetail
            .filter(item => this.data.orderList.includes(item.id))
            .map(item => ({goodId: item.id, amount: item.amount}));

        console.log("用户选择的商品信息为", orderList);
        addOrderGood(getApp().globalData.openid, orderList).then(res => {
            wx.navigateTo({url: `/pages/charge/charge`});
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