// miniprogram/pages/height/height.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arrayData: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var height_int = Array.from(Array(2), (v, k) => k);
    var height_float = Array.from(Array(2), (v, k) => k);
    this.data.arrayData.push(height_int);
    this.data.arrayData.push(height_float);
    console.log(this.data.arrayData)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})