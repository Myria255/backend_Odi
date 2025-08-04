// components/navBoutique/navBoutique.js
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
    goBack: function() {
      wx.navigateBack({
        delta: 1 
      });
    },
  }
})