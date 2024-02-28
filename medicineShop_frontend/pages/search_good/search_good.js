// const {request} = require('../../utils/request');
// const {json2Form} = require('../../utils/json2Form')
const {searchGoods} = require("../../api/index");

Page({
    data: {
        goodsData: [],
        search_name: '',
        no_data: false,
        have_data: false,
        page: 1
    },
    onLoad: function (options) {
        console.log("搜索的内容为:", options.search)
        this.setData(
            {
                search_name: options.search
            }
        )

        this.http(this.data.page)
    },
    http(page) {
        searchGoods(this.data.search_name, page).then(res => {
            if (!res.data.msg) {
                this.setData({
                    goodsData: this.data.goodsData.concat(res.data.data.result),
                    have_data: true
                })
            } else {
                // 这里在判断一下have_data的原因是因为分页翻到底部没有数据，这样会出现无数据提示，这里可以避免这种情况
                if (this.data.have_data === false) {
                    this.setData(
                        {
                            no_data: true
                        }
                    )
                    // 这里的else是为了在搜索页面滑动到最底部的时候出现无数据提示
                } else {
                    wx.showToast({
                        title: "没有更多商品了",
                        icon: "cross",
                        duration: 2000
                    })
                }
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

});
