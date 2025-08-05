/**
 * Page de profil utilisateur
 */
Page({
  /**
   * Données initiales de la page
   */
  data: {
    notificationsEnabled: true,
    showModal: false,
    profileName: 'Lorem Ido',
    profileImage: '../../assets/man.png'
  },

  /**
   * Fonction appelée lors du chargement de la page
   */
  onLoad(options) {
    // Initialisation des données ou appels API si nécessaire
  },

  /**
   * Afficher le modal de modification
   */
  showEditModal() {
    this.setData({
      showModal: true
    });
  },

  /**
   * Cacher le modal de modification
   */
  hideEditModal() {
    this.setData({
      showModal: false
    });
  },

  /**
   * Mettre à jour le nom du profil
   */
  updateProfileName(e) {
    this.setData({
      profileName: e.detail.value
    });
  },

  /**
   * Choisir une nouvelle image de profil
   */
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          profileImage: res.tempFilePaths[0]
        });
      }
    });
  },

  /**
   * Enregistrer les modifications du profil
   */
  saveProfile() {
    // Logique pour sauvegarder les modifications (ex. appel API)
    wx.showToast({
      title: 'Profil mis à jour',
      icon: 'success'
    });
    this.setData({
      showModal: false
    });
  },

  /**
   * Navigation vers la page précédente
   */
  goBack() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },

  /**
   * Navigation vers la page de la boutique
   */
  navigateToShop() {
    wx.navigateTo({
      url: '/pages/boutique/boutique',
    });
  },

  /**
   * Navigation vers l'historique des ventes et achats
   */
  navigateToHistory() {
    wx.navigateTo({
      url: '/pages/Historiques/Historiques',
    });
  },

  /**
   * Navigation vers la page du service client
   */
  navigateToSupport() {
    wx.navigateTo({
      url: '/pages/Support/Support',
    });
  },

  /**
   * Navigation vers la page des abonnements
   */
  navigateToSubscriptions() {
    wx.navigateTo({
      url: '/pages/abonnements/abonnements',
    });
  },

  /**
   * Navigation vers la page de déconnexion
   */
  navigateToLogout() {
    wx.navigateTo({
      url: '/pages/connexion/connexion',
    });
  },

  /**
   * Gestion de l'activation/désactivation des notifications
   */
  toggleNotifications() {
    this.setData({
      notificationsEnabled: !this.data.notificationsEnabled,
    });
    console.log('Notifications:', this.data.notificationsEnabled);
  },

  /**
   * Gestion du défilement vers le bas pour actualiser
   */
  onPullDownRefresh() {
    wx.stopPullDownRefresh();
  },

  /**
   * Gestion du scroll jusqu'en bas
   */
  onReachBottom() {
    // Logique pour charger plus de contenu si nécessaire
  },

  /**
   * Partage de l'application
   */
  onShareAppMessage() {
    return {
      title: 'Mon Profil',
      path: '/pages/profil/profil',
    };
  },
});