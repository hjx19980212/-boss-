// pages/search/search.js
var QQMapWX = require('../../utils/wx-jssdk.min.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"",
    pitch:"",
    iptval:"",
    navlist:[],
    dispaly:"none",
    data:[],
    joblist:[],
    num:10,
    kid:""

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      iptval: options.iptval,
      kid:options.kid
    })
    
    var that = this;
    wx.request({
      data:that.data,
      url: app.globalData.url + '/search/searchlist',
      success(res) {
          that.setData({
            joblist: res.data.data
          })
      }
    })
  },
  onShow:function(){

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function (options) {

    // 请求定位
    var that = this;
    var qqmapsdk = new QQMapWX({
      key: '62HBZ-E7ZCJ-UVCFJ-KL7BI-GWFE5-4XBUF'
    });
    wx.getLocation({
      success(res) {
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            var city = addressRes.result.address_component.city.replace('市', '');
            that.setData({
              city: city
            })
          }
        })
      }, fail() {
        wx.showToast({
          title: '定位失败',
        })
      }
    })

    //请求导航栏数据
    wx.request({
      url: app.globalData.url + '/nav/navlist',
      success(res) {
        that.setData({
          navlist: res.data.data
        })
      }
    })

  },
  handleClass(e){
    var pitch = e.target.dataset.name || e.currentTarget.dataset.name;
    var data = e.target.dataset.data || e.currentTarget.dataset.data;
    if (pitch == this.data.pitch){
      this.setData({
        pitch: "",
        dispaly:"none",
        data: data

      })
    }else{
      this.setData({
        pitch: pitch,
        dispaly: "block",
        data:data
      })
    }
    
  },

  //返回boss页
  handleBack(){
    wx.redirectTo({
      url: '/pages/boss/boss'
    })
  },

  //加载更多
  handleAdd(){
    var addnum = this.data.num
    this.setData({
      num:addnum+10
    })
  },
  //跳转详情
  handleDetail(e){
    console.log(e)
    var id = e.target.dataset.id || e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/details/details?id='+id,
    })
  }
  
})