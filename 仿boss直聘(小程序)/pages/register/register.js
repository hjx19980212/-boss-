var coord = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    x: 0,
    area_width: 90,   //可滑动区域的宽，单位是百分比，设置好后自动居中
    box_width: 100,   //滑块的宽,单位是 rpx
    maxNum: 0,
    txt:"右滑进行验证",
    islogin:0
  },
  drag(e) {
    var that = this;
    coord = e.detail.x;
  },
  dragOver(e) {
    var that = this;
    if (coord >= that.data.maxNum) {
      wx.showToast({
        title: '验证成功',
        icon: 'success',
        duration: 2000
      })
      that.setData({
        txt:""
      })
      //验证成功之后的代码
    } else {
      that.setData({
        x: 0,
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.windowWidth);
        var n = Math.floor(res.windowWidth * that.data.area_width / 100 - that.data.box_width / 2)
        that.setData({
          maxNum: n,
        })
      }
    })
  },
  handleLogin(){
    var islogin = this.data.islogin
    if (islogin==0){
      this.setData({
        islogin: 1
      })
    }else{
      this.setData({
        islogin: 0
      })
    }
    
  }

})