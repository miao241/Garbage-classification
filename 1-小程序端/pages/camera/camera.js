// pages/camera/camera.js
 const app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    baiduToken:null,
    scanItems:[]
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     
  },

  //拍照
  takePhoto:function() {
    return new Promise(function(resolve,reject){
      var ctx = wx.createCameraContext()
        ctx.takePhoto({
          quality: 'normal',
          success: resolve,
          fail: reject
        })
    }) 
  },

//扫描图片
getImage:function(){
  var that=this;
 
    that.setData({
      scanItems: null
    })
    that.getBaiduToken().then(res => {
        console.log("请求token成功", res);
        this.setData({
          baiduToken: res.data.access_token
        });
        
      that.takePhoto().then(res => {
        console.log("拍照成功", res)

        var tempfile = res.tempImagePath
        console.log("图片地址", tempfile)

        

        //进行编码
        wx.getFileSystemManager().readFile({
          filePath: tempfile,
          encoding: "base64",
          success: res => {
            console.log("编码后", res.data);

            that.scanImageInfo(res.data).then(function (res) {
              console.log("得到的结果", res)
              that.setData({
                scanItems: res.data.result,
              })
           
              if (!that.data.scanItems) {
           
                wx.showToast({
                  title: '很遗憾没有识别到物品',
                  icon: 'none',
                  duration: 2000,
                  mask: true
                })
              }
            }).catch(function (res) {
              console.log("扫描出现错误", res)
              wx.showToast({
                title: '扫描出现错误，请重试',
                icon: 'none',
                duration: 3000,
                mask: true
              })
            })
          },
          fail: function (res) {
            console.log("编码失败", res)
          }

        })
      }).catch(res =>{
         console.log("拍照失败",res)
      })

    }).catch(res => {
          console.log("【getBaiduTaken提示fail】", res);
    })
   
    



},

getBaiduToken:function(){
  const tokenurl ='https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=CCeMGXhoY9C0idAL9eErWZ3u&client_secret=rUqziRASkyRgzU3X0xj1GVtjnpW8xZhZ';
  return new Promise(function(resolve,reject){
        wx.request({
          url: tokenurl,
          header: {
            'content-type': 'application/json;charset=UTF-8'
          },
          method: 'post',
          dataType: 'json',
          success:resolve,
          fail:reject
        })
  })

},

scanImageInfo:function(imageData){
   var that=this;
   
    return new Promise(function(resolve,reject){
           wx.request({
             url: `https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=${that.data.baiduToken}`,
             data:{
               image:imageData
             },
             method:'post',
             dataType:'json',
             header:{
               'content-type':'application/x-www-form-urlencoded'
             },
             success:resolve,
             fail:reject
           })    
    })


},
  doClickScanItem:function(e){
    app.globalData.click = e.currentTarget.dataset.name
    console.log("click是", app.globalData.click)
    wx.switchTab({
      url: "/pages/search/search",
    })
    
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