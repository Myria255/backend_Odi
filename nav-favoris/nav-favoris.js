// components/nav/nav.js
Component({
  properties: {
    title: {
      type: String,
      value: 'Titre par défaut'
    }
  },

  data: {
    showSearchInput: false,
    searchText: ''
  },

  methods: {
    goBack() {
      wx.navigateBack({
        delta: 1
      }).catch(err => {
        wx.switchTab({
            url: '/pages/index/index'
        });
      });
    },

    toggleSearch() {
      this.setData({
        showSearchInput: !this.data.showSearchInput,
        searchText: this.data.showSearchInput ? '' : this.data.searchText
      });
      if (this.data.showSearchInput) {
        this.setData({ searchText: '' });
      }
    },

    onSearchInput(e) {
      this.setData({
        searchText: e.detail.value
      });
    },

    onSearchConfirm(e) {
      const searchValue = e.detail.value;
      this.triggerEvent('searchConfirmed', { value: searchValue });
    },

    clearSearch() {
      this.setData({
        searchText: '',
        showSearchInput: false
      });
      this.triggerEvent('searchCancelled');
    }
  }
})