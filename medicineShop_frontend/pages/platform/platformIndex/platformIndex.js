// pages/platform.js
const { getFilter } = require("../../../api/index")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		navData: [
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/land.png",
                text: "农田检测",
                url: "/pages/platform/soilPlant/soilPlant"
            },
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/analyse.png",
                text: "病害分析",
                url: "/pages/platform/sickness/sickness"
            },
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/scheme.png",
                text: "施肥方案",
                url: "/pages/platform/scheme/scheme"
            },
            {
                icon: "https://zhengwenyuan-public-read-oss.oss-cn-chengdu.aliyuncs.com/shop_test/distribute.png",
                text: "杂草分布",
                url: "/pages/platform/scheme/scheme"
            }
        ],
		chartData: {},
		//您可以通过修改 config-ucharts.js 文件中下标为 ['area'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
		opts: {
			color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272", "#FC8452", "#9A60B4", "#ea7ccc"],
			padding: [15, 15, 0, 15],
			enableScroll: false,
			legend: {},
			xAxis: {
				disableGrid: true
			},
			yAxis: {
				gridType: "dash",
				dashLength: 2
			},
			extra: {
				area: {
					type: "curve",
					opacity: 0.2,
					addLine: true,
					width: 2,
					gradient: true,
					activeType: "hollow"
				}
			}
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {
		getFilter().then(res => {
			console.log(res.data.data)
			this.setData({
				chartData: res.data.data
			})
		})
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

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage() {

	}
})