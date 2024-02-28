const {request} = require('../../utils/request');
const {json2Form} = require('../../utils/json2Form')

Page({
    data: {
        goodsData: [],
        search_name: ''
    },
    onLoad: function (options) {
        console.log("搜索的内容为:",options.search)
        this.setData(
            {
                search_name: options.search
            }
        )

        // 文档上面说无法对本地的地址发送POST请求 傻逼马化腾
        wx.request({
            url: 'http://127.0.0.1:5000/api/search',
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            data: {post: JSON.stringify(options.search)},
            success: function (data) {
                console.log('已经提交数据到数据库')
            }, complete: res => {
                console.log(res.data)
                this.setData(
                    {
                        goodsData: res.data.data.result
                    }
                )
                console.log('---request complete---')
            }
        })

    }
});