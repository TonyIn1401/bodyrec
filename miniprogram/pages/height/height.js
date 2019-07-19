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
        background: '#a6e7e5'
      },
      {
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: '#44b8b2'
      }
    ],
    curYear: new Date().getFullYear(), // 年份
    curMonth: new Date().getMonth() + 1, // 月份 1-12
    day: new Date().getDate(), // 日期 1-31 若日期超过该月天数，月份自动增加
    header_show: true, // 主标题是否显示
    prev: true, // 上一个月按钮是否显示
    next: true, // 下一个月按钮是否显示
    value: 0,
    val: 0,
    value2: 0,
    styles: [{
      line: '#dbdbdb',
      bginner: '#fbfbfb',
      bgoutside: '#dbdbdb',
      lineSelect: '#52b8f5',
      font: '#404040'
    }, {
      line: '#dbdbdb',
      bginner: '#fbfbfb',
      bgoutside: '#dbdbdb',
      lineSelect: '#52b8f5',
      font: '#404040'
    }]
  },
  //给点击的日期设置一个背景颜色
  dayClick: function(event) {
    let clickDay = event.detail.day;
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    this.setData({
      [changeDay]: clickDay
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
  onReady: function (e) {
    // 使用 wx.createContext 获取绘图上下文 context
    var context = wx.createCanvasContext('firstCanvas')

    context.setStrokeStyle("#00ff00")
    context.setLineWidth(10)
    context.rect(50, 100, 100, 100)
    context.stroke()
    context.setStrokeStyle("#ff0000")
    context.setLineWidth(2)
    context.moveTo(160, 100)
    context.arc(100, 100, 60, 0, 2 * Math.PI, true)
    context.moveTo(140, 100)
    context.arc(100, 100, 40, 0, Math.PI, false)
    context.moveTo(85, 80)
    context.arc(80, 80, 5, 0, 2 * Math.PI, true)
    context.moveTo(125, 80)
    context.arc(120, 80, 5, 0, 2 * Math.PI, true)
    context.stroke()
    context.draw()
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

  },
  bindvalue: function (e) {
    console.log(e.detail.value)
    this.setData({
      value: e.detail.value
    })
  },
  bindvalue2: function (e) {
    // console.log(e)
    this.setData({
      value2: e.detail.value
    })
  },
  assignment() {
    this.setData({
      val: 50
    })
  }
})