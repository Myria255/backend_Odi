// components/nav/nav.js
Component({
  properties: {

  },

  data: {
    showIcons: true
  },

  methods: {
    onSearchInput: function(e) {
      this.setData({
        showIcons: e.detail.value.length === 0
      });
    },

    onSearchFocus: function(e) {
      this.setData({
        showIcons: false
      });
    },

    onSearchBlur: function(e) {
      if (e.detail.value.length === 0) {
        this.setData({
          showIcons: true
        });
      }
    },

    prendrePhoto: function() {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success (res) {
          const tempFilePath = res.tempFilePaths[0];
          this.triggerEvent('photoTaken', { imagePath: tempFilePath });
        },
        fail (err) {
          console.error("Erreur lors de la prise de photo :", err);
        }
      });
    }
  }
})