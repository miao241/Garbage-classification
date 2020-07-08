// custom-tab-bar/index.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    selected: 0,
    color: "#515151",
    selectedColor: "#3cb371",
    list: [{
      pagePath: "/pages/main/main",
      iconPath: "/images/分类0.png",
      selectedIconPath: "/images/分类1.png",
      text: "分类",
      isSpecial: false
    }, {
      pagePath: "/pages/camera/camera",
      iconPath: "/images/paizhao.png",
      selectedIconPath: "/images/paizhao.png",
      text: "",
      isSpecial: true
    }, {
      pagePath: "/pages/search/search",
      iconPath: "/images/test0.png",
      selectedIconPath: "/images/test1.png",
      text: "搜索",
      isSpecial: false
    }],


  },

  /**
   * 组件的方法列表
   */
  methods: {
    switchTab: function (e) {
      const dataset = e.currentTarget.dataset
      const path = dataset.path
      const index = dataset.index
      //如果是特殊跳转界面
      if (this.data.list[index].isSpecial) {
        console.log("跳转路径", path)
        wx.navigateTo({
          url: path
        })
      } //正常的tabbar切换界面
      else {
        console.log("跳转路径", path)
        wx.switchTab({
          url: path
        })
        
      }
    }


  }
})
