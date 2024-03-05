// 这里要向后端发送用户的openid，然后接收订单的所有信息+商品标题价格url+购买数量
const {getOrder} = require("../../../api/index");
Page({
    data: {
        orderListData:[],

    },
    onLoad: function (options) {
    getOrder(getApp().globalData.openid, 1).then(res=>{
        this.setData({
            orderListData:res.data.data.result
        })
        console.log(this.data.orderListData)
    })
    }
});
