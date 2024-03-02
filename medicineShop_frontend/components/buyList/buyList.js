// 这里要接收商品和数量，在这里向后端发送请求拉取商品信息
// 步进器因为要考虑到商品库存，所以单开组件处理
const {changeCartGood} = require("../../api/index");


Component({
    properties: {
        cartDetail: {
            type: Array,
            value: []
        },
        price: {
            type: Number,
            value: 0
        }
    },
    data: {
        sumPrice: 0,
        changed: false
    },
    methods: {

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
        resetChanged() {
            this.setData({
                changed: false
            });
        },
        onClose(event) {
            console.log("删除的商品id为",event.currentTarget.dataset.id)
            changeCartGood(getApp().globalData.openid, event.currentTarget.dataset.id,0).then(res => {
                console.log(event)
            })
            },

    },

});
