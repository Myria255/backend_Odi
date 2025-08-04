// components/bottomAnnonce/bottomAnnonce.js
Component({

  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {

  },

  /**
   * Component methods
   */
  methods: {
 Boutique(){
   wx.navigateTo({
     url: '/pages/boutique/boutique',
   })
 },
 Panier(){
  wx.navigateTo({
    url: '/pages/panier/panier',
  })
},
Chat(){
  wx.navigateTo({
    url: '/pages/chat/chat',
  })
}
  }
})