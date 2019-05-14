// pages/boss/boss.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jobitem:[],
    iptval:"",
    kid:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.globalData.url+'/boss/bossList',
      success(res) {
        that.setData({
          jobitem: res.data.data
        })
        console.log(res.data)
      }
    })

  },
  handleIpt(e){
    var iptval = e.detail.value;
    console.log(iptval)
    this.setData({
      iptval:iptval
    })
  }
  ,
  handleSearch(e){
    var iptval = this.data.iptval;
    var kid = this.data.kid;
    wx.navigateTo({
      url: '/pages/search/search?iptval='+iptval+'&kid='+kid
    })
    this.setData({
      iptval:""
    })
  },
  handleSearchVal(e){
    console.log(e);
    var iptval = e.target.dataset.val || e.currentTarget.dataset.val
    var kid = e.target.dataset.kid || e.currentTarget.dataset.kid
    this.setData({
      iptval:iptval,
      kid:kid
    })
    wx.navigateTo({
      url: '/pages/search/search?iptval=' + iptval+'&kid='+kid
    })
    this.setData({
      iptval: ""
    })
  },
  handleRegister(){
    wx.navigateTo({
      url: '/pages/register/register'
    })
  }
})