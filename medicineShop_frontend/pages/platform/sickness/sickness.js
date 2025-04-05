// pages/platform.js
const { getFilter } = require("../../../api/index")
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		chartData1: {
			series: [
				{
				  data: [{"name":"一区","value":50},{"name":"二区","value":30},{"name":"三区","value":20},{"name":"四区","value":18},{"name":"五区","value":8}]
				}
			  ]
		},
		chartData2: {
			series: [
				{
				  data: [{"name":"一区","value":26},{"name":"二区","value":18},{"name":"三区","value":35},{"name":"四区","value":40},{"name":"五区","value":19}]
				}
			  ]
		},
		//您可以通过修改 config-ucharts.js 文件中下标为 ['area'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
		opts: {
			color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
			padding: [5,5,5,5],
			enableScroll: false,
			legend: {
			  show: true,
			  position: "left",
			  lineHeight: 25
			},
			extra: {
			  rose: {
				type: "radius",
				minRadius: 50,
				activeOpacity: 0.5,
				activeRadius: 10,
				offsetAngle: 0,
				labelWidth: 15,
				border: true,
				borderWidth: 2,
				borderColor: "#FFFFFF",
				linearType: "custom"
			  }
			}
		  }
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad() {

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