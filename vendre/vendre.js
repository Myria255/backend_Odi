Page({
  data: {
      currentTab: 'products' // Default tab
  },

  onLoad(options) {
      // Page initialization
  },

  switchTab(e) {
      const tab = e.currentTarget.dataset.tab;
      this.setData({
          currentTab: tab
      });
  },

  onReady() {
      // Page rendering complete
  },

  onShow() {
      // Page display
  },

  onHide() {
      // Page hidden
  },

  onUnload() {
      // Page closed
  },

  onPullDownRefresh() {
      // Handle pull-down refresh
  },

  onReachBottom() {
      // Handle page bottom reached
  },

  onShareAppMessage() {
      // Handle share
  }
});