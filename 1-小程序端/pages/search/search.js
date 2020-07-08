// miniprogram/pages/search/search.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入的内容
    inputTxt: null,
    //热门搜索
    hotSearchItems: [],
    //常用的分类
    kindList: [],
    //搜索到的所有项目
    searchItmes: [],
    //选择搜索到的项目
    selectItem: {},
    //扫描到的物品
    scanItems: [],
    //百度Token
    baiduToken: null,
    //是否隐藏详细信息弹框
    isHiddenInfoModal: true,
    isHiddenEditModal: true,
    //是否隐藏扫描物品的弹窗
    isHiddenScanModal: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
    this.setData({
      kindList: getApp().globalData.kindList,
    });
    
    this.onPullDownRefresh();
  },

  /**
 * 生命周期函数--监听页面显示
 */
  onShow: function () {
   
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log('设置选中项 2')
      this.getTabBar().setData({
        selected: 2
      })
    }
    console.log("接收到", getApp().globalData.click);
    //如果全局变量click不为空，则传值并搜索
    if (getApp().globalData.click!=null){
        this.setData({
          inputTxt: getApp().globalData.click,
        })

        this.doClick();
    }
  },

//监听小程序隐藏--小程序从前台进入后台时
  onHide:function(){
    getApp().globalData.click = null
  },

  /**
 * 页面相关事件处理函数--监听用户下拉动作
 */
  onPullDownRefresh: function () {
    var that = this;

    if (that.data.inputTxt) {
      wx.stopPullDownRefresh();
      return;
    }

    that.setData({
      hotSearchItems: []
    })

    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });


    this.getHotItems().then(res => {
      console.log("【热搜项目】", res)

      that.setData({
        hotSearchItems: res.data
      })

      wx.stopPullDownRefresh()

      //隐藏加载界面
      wx.hideLoading();
    }).catch(res =>{
      wx.hideLoading();
      wx.showToast({
        title: '未连接服务器',
        icon:'none',
        duration:2000
      })
    })
  },

  //获取热门搜索
  getHotItems: function () {
    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url:'http://127.0.0.1:8080/garbage/control/hot',
        method: 'post',
        dataType: "json",
        success: resolve,
        fail: reject
      })
    })
  },

  //获取输入的搜索内容
  getInput: function (e) {
    if (e.detail.value == "") {
            this.setData({
              inputTxt: null
            })
    } else {
            this.setData({
              searchItmes: [],
              inputTxt: e.detail.value
            })    
    }
  },

  //点击搜索按钮
  doClick: function (event) {
    var that = this;
    //判断输入的内容是否有效
    if (that.data.inputTxt == null) {
      wx.showToast({
        title: '请输入有效内容！！',
        icon: 'none',
        duration: 2000,
        mask: true
      })
      return;
    }

    //清空历史的搜索项
    that.setData({
      searchItmes: []
    })

    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });


    this.searchFunction().then((res) => {
      console.log("【搜索数据】", res);

      that.setData({
        searchItmes: res.data
      })

      //隐藏加载界面
      wx.hideLoading();

      if (res.data.length == 0) {
        wx.showToast({
          title: '很遗憾未找到',
          image: "../../images/sad.jpg",
          duration: 2000,
          mask: true
        })
      }
    }).catch(res => {
        wx.hideLoading(),
        console.log("【搜索失败原因】", res),
        wx.showToast({
          title: '未连接服务器',
          icon: 'none',
          duration: 3000,
          mask: true
        })
    })
  },

  //搜索动作
  searchFunction: function () {
    console.log("【开始搜索】", this.data.inputTxt)

    var that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'http://127.0.0.1:8080/garbage/control/byname',
        method: 'post',
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded' // 默认值
        },
        data: {
          name: that.data.inputTxt
        },
        success: resolve,
        fail: reject
      })
    })
  },

  //选择项目
  doClickItem: function (event) {
    console.log("【选择的项目】", event)
    var _type = event.currentTarget.dataset.type;
    var _name = event.currentTarget.dataset.name;
    var _id = event.currentTarget.id;

    console.log("【选择的ID】", _id)

    //增加搜索数目
    wx.request({
      url:'http://127.0.0.1:8080/garbage/control/count',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      data: {
        id: _id
      },
      success: function (res) {
        console.log("【增加热搜次数成功】", res)
      },
      fail:function(res){
        console.log("【增加热搜次数失败】",res)
      }
    })

    for (var i = 0; i < this.data.kindList.length; i++) {
      if (this.data.kindList[i].text == _type) {
        //显示详细信息
        var itemInfo = {
          _txt: _name,
          _type: this.data.kindList[i]
        }

        this.setData({
          selectItem: itemInfo,
          isHiddenInfoModal: false
        })

        console.log("【详细】", this.data.selectItem)
        return;
      }
    }

   

  },

  //点击热门搜索
  doClickHotItem: function (event) {
    console.log("【点击热门搜索】", event)

    this.setData({
      inputTxt: event.currentTarget.dataset.name
    })
    //开始搜索
    this.doClick();
  },

  //点击扫描按钮
  doClickCamera: function () {
    var that = this;

    //复位扫描的项目
    that.setData({
      scanItems: null
    })


    //获取BaiduTaken
    if (!that.baiduToken) {
      that.getBaiduTaken();
    }

    that.getImage().then(res => {
      var tempFilePaths = res.tempFilePaths[0];
      console.log("【获取图片地址】", tempFilePaths)

      wx.getFileSystemManager().readFile({
        filePath: tempFilePaths,
        encoding: "base64",
        success: res => {
          console.log("【读取图片数据pass】", res.data);
        
          //扫描图片物品
          that.scanImageInfo(res.data).then(res => {
            console.log("扫描图片物品", res)
            that.setData({
              scanItems: res.data.result
            })

            if (that.data.scanItems) {
              that.setData({
                isHiddenScanModal: false
              })
            } else {
              wx.showToast({
                title: '很遗憾没有识别到物品',
                icon: 'none',
                duration: 3000,
                mask: true
              })
            }
          }).catch(res => {
            console.log("【扫描出现错误】", res)
            wx.showToast({
              title: '扫描出现错误，请重试',
              icon: 'none',
              duration: 3000,
              mask: true
            })
          })
        },
        fail: res => {
          console.log("【读取图片数据fail】", res)
          wx.showToast({
            title: '读取图片数据失败',
            icon: 'none',
            duration: 2000,
            mask: true
          })
        }
      })
    })

  },

  //获取百度taken
  getBaiduTaken: function () {
    const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=CCeMGXhoY9C0idAL9eErWZ3u&client_secret=rUqziRASkyRgzU3X0xj1GVtjnpW8xZhZ`;

    var that = this;
    wx.request({
      url: tokenUrl,
      method: 'POST',
      dataType: "json",
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: function (res) {
        console.log("【getBaiduTaken提示pass】", res);
        that.setData({
          baiduToken: res.data.access_token
        })
      },
      fail: function (res) {
        console.log("【getBaiduTaken提示fail】", res);
      }
    })
  },

  //获取本地图片
  getImage: function () {
    var that = this;
    // 选择图片
    return new Promise(function (resolve, reject) {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: resolve,
        fail: reject
      })

    })
  },


  

  //扫描图片中的数据
  scanImageInfo: function (imageData) {
    var that = this;
    const detectUrl = `https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=${that.data.baiduToken}`;

    //显示加载界面
    // wx.showLoading({
    //   title: '加载中',

    // });

    return new Promise(function (resolve, reject) {
      wx.request({
        url: detectUrl,
        data: {
          image: imageData
        },
        method: 'POST',
        dataType: 'json',
        header: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: resolve,
        fail: reject,
        complete: res => {
          //隐藏加载界面
          wx.hideLoading()
        }
      })
    })
  },

  //点击关闭弹窗详细信息
  modal_hidden: function () {
    this.setData({
      isHiddenInfoModal: true,
      isHiddenScanModal: true
    })
  },

  //点击扫描识别的项目
  doClickScanItem: function (event) {
    this.setData({
      isHiddenScanModal: true
    })
    console.log("【选择的物品】", event.currentTarget.dataset.name)

    this.setData({
      inputTxt: event.currentTarget.dataset.name
    })

    //开始搜索
    this.doClick();
  }

})