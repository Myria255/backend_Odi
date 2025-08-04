Page({
  data: {
    articlesEnPromotion: [] 
  },

  onLoad() {
    this.chargerPromotions();
  },

  chargerPromotions() {
    const promotionsSimulees = [
      { id: 'p1', description: 'T-Shirt Urbain - Rouge', imageUrl: '/assets/Barca.svg', ancienPrix: '3250 CFA', nouveauPrix: '2275 CFA' },
      { id: 'p2', description: 'Casque Audio Pro', imageUrl: '/assets/Barca.svg', ancienPrix: '16250 CFA', nouveauPrix: '12999 CFA' },
      { id: 'p3', description: 'Sac à Dos Vintage', imageUrl: '/assets/Barca.svg', ancienPrix: '7800 CFA', nouveauPrix: '5785 CFA' },
      { id: 'p4', description: 'Montre Connectée', imageUrl: '/assets/Barca.svg', ancienPrix: '19500 CFA', nouveauPrix: '14300 CFA' },
      { id: 'p5', description: 'Clavier Mécanique', imageUrl: '/assets/Barca.svg', ancienPrix: '11700 CFA', nouveauPrix: '9425 CFA' },
      { id: 'p6', description: 'Souris Gaming RGB', imageUrl: '/assets/Barca.svg', ancienPrix: '4550 CFA', nouveauPrix: '3185 CFA' },
    ];
    this.setData({
      articlesEnPromotion: promotionsSimulees
    });
  },

  ajouterAuPanier(e) {
    const itemId = e.currentTarget.dataset.id;
    console.log('Article ajouté au panier (ID) :', itemId);
    wx.showToast({
      title: 'Ajouté au panier !',
      icon: 'success',
      duration: 1000
    });
  },

  gererRechercheConfirmee(e) {
    const termeDeRecherche = e.detail.value;
    console.log("Recherche déclenchée dans la page Promotions pour :", termeDeRecherche);

    const toutesLesPromotions = this.data.articlesEnPromotion; 
    const promotionsFiltrees = toutesLesPromotions.filter(item => 
      item.description.toLowerCase().includes(termeDeRecherche.toLowerCase())
    );
    this.setData({
      articlesEnPromotion: promotionsFiltrees
    });

    if (promotionsFiltrees.length === 0 && termeDeRecherche) {
        wx.showToast({
            title: `Aucune promotion trouvée pour "${termeDeRecherche}"`,
            icon: 'none',
            duration: 2000
        });
    } else if (promotionsFiltrees.length === 0) {
         wx.showToast({
            title: 'Aucune promotion pour le moment',
            icon: 'none',
            duration: 2000
        });
    }
  },

  gererRechercheAnnulee() {
    console.log("Recherche annulée dans la page Promotions.");
    this.chargerPromotions();
  },

  onReady() {

  },

  onShow() {

  },

  onHide() {

  },

  onUnload() {

  },

  onPullDownRefresh() {

  },

  onReachBottom() {

  },

  onShareAppMessage() {

  }
})