//index.js
var order = ['red', 'yellow', 'blue', 'green', 'red']
Page({
  data: {
    toView: 'red',
    scrollTop: 100,
    tablist:[],
    allDate:[]
  },
  onLoad: function(){
    this.getAll();
    this.getPlate();
  },
  // 图片字符串转数组
  picStrToArr: function (str, slice) {
    if (str.length > 0) {
      if (str.indexOf(';') > 0) {
        var picUrl = str.split(";");
        return picUrl;
      } else {
        return [str];
      }
    } else {
      return [];
    }
  },

  // 截取数组长度为3
  sliceArr: function (arr) {
    if (arr.length > 3) {
      return arr.slice(0, 3);
    } else {
      return arr;
    }
  },
  //getplate
  getPlate:function(){
    var that = this;
    wx.request({
      url:"http://localhost:3000/get_plate",
      header:{
        'content-type':'application/json'
      },
      success:function(res){
        console.log(res.data.data);
        that.setData({
          tablist : res.data.data
        })
      }
    })
  },
  //getall
  getAll:function(){
    console.log('11');
    var that = this;
    wx.request({
      url: 'http://localhost:3000/new_get_topics/',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
        var l = res.data.length;
        for(var i = 0;i<l;i++){
          res.data[i].pic_url = that.sliceArr(that.picStrToArr(res.data[i].pic_url))
          console.log(res.data[i].pic_url)
        }
        that.setData({
          allDate: res.data
        })
      }
    })
  },
  //点击切换tab内容
  
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    
  }
})