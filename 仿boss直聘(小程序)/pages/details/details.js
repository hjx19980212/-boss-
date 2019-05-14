// pages/details/details.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobitem:{},
    markers: [{
      id: 1001,
      longitude: 104.055048,
      latitude: 30.5374435,
    }],
    id:"",
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     this.setData({
       id:options.id
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: app.globalData.url + '/search/details',
      success(res) {
        var item = res.data.data
        for(let x of item){
          if(x.jobid==that.data.id){
            console.log(x)
            that.setData({
              jobitem: x
            })
          }
        }
        
      }
    })
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

  },
  handleFous(){
    this.setData({
      type:1
    })
  },
  handleSearch(){
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },
  handleRegister(){
    wx.navigateTo({
      url: '/pages/register/register',
    })
  }
})