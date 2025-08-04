// components/navigation/navigation.js
Component({

  /**
   * Component properties
   */
  properties: {
    title : 
    {
        type : String , 
        value : ''
    } ,

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
    }
  }
})