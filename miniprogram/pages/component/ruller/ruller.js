// components/ruller.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    screenWidth: {
      type: Number,
      value: 400
    },
    screenHeight: {
      type: Number,
      value: 300
    },

    // 刻度尺相关    
    // 刻度尺x坐标位置
    locationX: {
      type: Number,
      value: 10
    },
    // 刻度尺y坐标位置
    locationY: {
      type: Number,
      value: 40
    },
    // 刻度尺总刻度数
    scaleSize: {
      type: Number,
      value: 10
    },
    // 刻度线的间隔
    scaleInterval: {
      type: Number,
      value: 5
    },
    // 刻度线基础长度
    scaleLength: {
      type: Number,
      value: 10
    },

    scaleLineColor: {
      type: String,
      value: "#ff0000"
    },

    scaleTextColor: {
      type: String,
      value: "#ff00ff"
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    //画布宽度
    width: 400,
    //画布高度
    height: 300,
    //临时图片保存路径
    rullerImgPath: "",
    flagImgPath: "",
    //前后空余长度
    bufferSize: 10,
    imageHistoryRect: {},
    currentValue: 100,
  },

  // 每次初始化 全局变量
  ready() {
    this._init()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onScroll(e) {
      this.setData({
        currentValue: e.detail.scrollLeft
      })
      
    },

    _initPointPosition(){
      var query = this.createSelectorQuery().in(this)
      query.select('#rullerId').boundingClientRect((res) => {
        res.top // 这个组件内 #the-id 节点的上边界坐标
      })      
    },


    onImageLoad(e) {
      let width = e.detail.width; //获取图片真实宽度
      let height = e.detail.height;
      //图片的真实宽高比例
      let ratio = width / height;

      this.setData({
        imageHistoryRect: {
          width: width,
          height: height
        }
      })
    },
    /** 
     * 初始化卡尺
     */
    _init() {
      let self = this;
      let flagWidth = 10;
      var totalSize = ((self.data.scaleSize || 100) * 10 + 1) * self.data.scaleInterval + 2 * self.data.bufferSize
      wx.getSystemInfo({
        success: function(res) {
          flagWidth = res.screenWidth
        },
      })
      self.setData({
        width: totalSize,
        screenWidth: totalSize,
      })

      let ruller = {
        width: self.data.screenWidth,
        height: self.data.screenHeight,

        // 刻度尺相关

        // 刻度尺总刻度数
        size: self.data.scaleSize,
        bufferSize: self.data.bufferSize,
        // 刻度尺x坐标位置
        x: self.data.locationX,
        // 刻度尺y坐标位置
        y: self.data.locationY,
        // 刻度线的间隔
        interval: self.data.scaleInterval,
        // 刻度线基础长度
        h: self.data.scaleLength,
        stc: self.data.scaleTextColor,
        slc: self.data.scaleLineColor,
      }
      this.drawRuller(self, ruller);

    },

    drawFlag(self, rul) {
      wx.getSystemInfo({
        success: function(res) {
          res.screenWidth
        },
      })
      let cxt = wx.createCanvasContext('flag', self);
      // 画之前清空画布
      cxt.clearRect(0, 0, rul.width, rul.height)

      cxt.setLineWidth(1)
      cxt.setFontSize(12)
      cxt.setStrokeStyle(rul.slc)
      cxt.setFillStyle(rul.stc)

      cxt.moveTo(rul.flagWidth / 2 - rul.flagHeight * 0.85, rul.flagHeight)

      cxt.lineTo(rul.flagWidth / 2 + rul.flagHeight * 0.85, rul.flagHeight)
      cxt.lineTo(rul.flagWidth / 2, 0)
      cxt.lineTo(rul.flagWidth / 2 - rul.flagHeight * 0.85, rul.flagHeight)
      cxt.fill()

      cxt.stroke()
      cxt.draw(true, setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'flag',
          success: (res) => {
            var shareTempFilePath = res.tempFilePath;
            this.setData({
              //将获取到的图片临时路径set到canvasSaveimg中
              flagImgPath: shareTempFilePath
            })
          }
        }, this)
      }))
    },

    drawRuller(self, rul) {
      let cxt = wx.createCanvasContext('ruller', self);
      var scaleCount = (rul.size || 100) * 10 + 1

      var x = rul.x || 0
      var y = rul.y || 0
      var interval = rul.interval || 5
      var h = rul.h || 10
      var offset = 3 // 上面数字的偏移量
      cxt.save()
      // 画之前清空画布
      cxt.clearRect(0, 0, rul.width, rul.height)
      // 设置画笔属性

      cxt.setLineWidth(1)
      cxt.setFontSize(12)
      cxt.setStrokeStyle(rul.slc)
      cxt.setFillStyle(rul.stc)
      for (var i = 0; i < scaleCount; i++) {
        // 开始一条路径
        cxt.beginPath()
        // 移动到指定位置
        cxt.moveTo(x + i * interval, y)
        // 满10刻度时刻度线长一些 并且在上方表明刻度
        if (i % 10 == 0) {
          // 计算偏移量
          offset = (String(i / 10).length * 6 / 2)
          cxt.fillText(i / 10, x + i * interval - offset, y - h * 2.5);
          cxt.lineTo(x + i * interval, y - h * 2)
        } else {
          // 满5刻度时的刻度线略长于1刻度的
          cxt.lineTo(x + i * interval, y - (i % 5 === 0 ? 1.5 : 1) * h)
        }
        // 画出路径
        cxt.stroke()
      }
      cxt.draw(true, setTimeout(() => wx.canvasToTempFilePath({
        canvasId: 'ruller',
        success: (res) => {
          var shareTempFilePath = res.tempFilePath;
          this.setData({
            //将获取到的图片临时路径set到canvasSaveimg中
            rullerImgPath: shareTempFilePath
          })
        }
      }, this), 500))

    },
  }
})