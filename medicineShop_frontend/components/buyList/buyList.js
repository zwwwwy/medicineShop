// 这里要接收商品和数量，在这里向后端发送请求拉取商品信息
// 步进器因为要考虑到商品库存，所以单开组件处理

Component({
    properties: {
        cartDetail: {
            type: Array,
            value: []
        },
        // cartDetail应该有id,url,title,price,amount,stock

    },
    data: {},
    methods: {}
});
