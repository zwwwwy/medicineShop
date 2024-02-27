Page({
    data: {},
    onLoad: function (options) {

    },
    // e.detail 是输入内容的实时变化情况
    onChange(e){
        console.log(e.detail)
    },
    onSearch(){
        console.log('搜索')
    },
    onClick(){
        console.log('点击搜索按钮')
    }
});