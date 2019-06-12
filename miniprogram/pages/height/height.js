// miniprogram/pages/height/height.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgcolor: "bg-cyan",
    dayStyle: [{
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#84e7d0'
      },
      {
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#009696'
      }
    ],
    curYear: new Date().getFullYear(), // 年份
    curMonth: new Date().getMonth() + 1, // 月份 1-12
    day: new Date().getDate(), // 日期 1-31 若日期超过该月天数，月份自动增加
    header_show: true, // 主标题是否显示
    prev: true, // 上一个月按钮是否显示
    next: true, // 下一个月按钮是否显示
  },
  //给点击的日期设置一个背景颜色
  dayClick: function(event) {
    let clickDay = event.detail.day;
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "#009696",
    })
  },
  nextMonthClick: function(event){
    let clickMonth = event.detail.currentMonth;
    this.setData({
      curMonth: clickMonth
    })
  },
  prevMonthClick: function (event) {
    let clickMonth = event.detail.currentMonth;
    this.setData({
      curMonth: clickMonth
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})