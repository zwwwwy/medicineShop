Page({
    data: {
        search:'',
        search_value: ''
    },
    onLoad: function (options) {

    },
    // e.detail 是输入内容的实时变化情况
    onChange(e) {
        this.setData({
            search_value: e.detail
        });

    },
    onSearch() {
        console.log('搜索')
        wx.navigateTo(
            {
                url: '/pages/search_good/search_good?search=' + this.data.search_value,
            })
    },
    onClick() {
        console.log('点击搜索按钮')
        wx.navigateTo(
            {
                url: '/pages/search_good/search_good?search=' + this.data.search_value,
            })
    }
});