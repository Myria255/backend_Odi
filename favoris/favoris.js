// pages/favoris/favoris.js
Page({

  /**
   * Page initial data
   */
  data: {
    favoritePhotos: []
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
  onShow:function(){
    const storedFavoritePhotos = wx.getStorageSync('favoritePhotos') || [];
    this.setData({
      favoritePhotos: storedFavoritePhotos
    })
    console.log('Photos favorites chargées dans la page Favoris:', this.data.favoritePhotos);
  
  if (storedFavoritePhotos.length === 0) {
    wx.showToast({
      title: 'Aucun favori pour le moment',
      icon: 'none',
      duration: 2000
    });}
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
  onRemoveFavorite: function(e) {
    const photoIdToRemove = e.currentTarget.dataset.id; 
    let favoritePhotos = this.data.favoritePhotos;

    favoritePhotos = favoritePhotos.filter(fav => fav.id !== photoIdToRemove);

    this.setData({
      favoritePhotos: favoritePhotos
    });

    wx.setStorageSync('favoritePhotos', favoritePhotos);

    wx.showToast({
      title: 'Favori retiré',
      icon: 'success', 
      duration: 1000
    });
  }
})