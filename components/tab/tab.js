// components/tab/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tab_title:{
      type:Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTab:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    addActiveTab(e){
      console.log()
      this.setData({
        currentTab:e.currentTarget.dataset.index
      })
    }
  }
})
