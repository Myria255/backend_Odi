// pages/boutique/boutique.js
Page({

  /**
   * Page initial data
   */
  data: {
    articles: [
      { id: 1, title: 'Nom de l article', image: '/assets/Produit1.png' },
      { id: 2, title: 'Nom de l article', image: '/assets/Produit1.png' },
      { id: 3, title: 'Nom de l article', image: '/assets/Produit1.png' },
      { id: '4', title: 'Nom de l article', image: '/assets/Produit1.png' },
      { id: '5', title: 'Nom de l article', image: '/assets/Produit1.png' },
      { id: '6', title: 'Nom de l article', image: '/assets/Produit1.png' },
    ]

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
 
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  },
  ajouter(){
    wx.navigateTo({
      url: '/pages/formulaireAjout/formulaireAjout',
    })
  }
})