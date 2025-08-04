// components/Navback/Navback.js
Component({

  /**
   * Component properties
   */
  properties: {
    title: {
      type: String,
      value: 'Titre par défaut'
    }
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