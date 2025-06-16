// index.js
Page({
  data: {
    nom: '',
    email: '',
    membres: [],
    modeEdition: false,
    membreEnEdition: null
  },

  onLoad() {
    this.chargerMembres();
  },

  onNomChange(e) {
    this.setData({ nom: e.detail.value });
  },

  onEmailChange(e) {
    this.setData({ email: e.detail.value });
  },

  ajouterMembre() {
    const { nom, email } = this.data;

    if (!nom || !email) {
      wx.showToast({ title: "Champs requis", icon: "none" });
      return;
    }

    wx.request({
      url: 'http://localhost:3000/membres',
      method: 'POST',
      data: { nom, email },
      header: { 'content-type': 'application/json' },
      success: (res) => {
        wx.showToast({ title: "Ajouté avec succès" });
        this.setData({ nom: '', email: '' });
        this.chargerMembres(); 
      },
      fail: (err) => {
        console.error("Erreur ajout membre :", err);
        wx.showToast({ title: "Échec", icon: "error" });
      }
    });
  },

  chargerMembres() {
    wx.request({
      url: 'http://localhost:3000/membres',
      method: 'GET',
      success: (res) => {
        this.setData({ membres: res.data });
      },
      fail: (err) => {
        console.error("Erreur chargement membres :", err);
      }
    });
  },

  // API pour modifier un membre
  modifierMembre() {
    const { nom, email, membreEnEdition } = this.data;

    if (!nom || !email) {
      wx.showToast({ title: "Champs requis", icon: "none" });
      return;
    }

    wx.request({
      url: `http://localhost:3000/membres/${membreEnEdition.id}`,
      method: 'PUT',
      data: { nom, email },
      header: { 'content-type': 'application/json' },
      success: (res) => {
        wx.showToast({ title: "Modifié avec succès" });
        this.setData({ 
          nom: '', 
          email: '', 
          modeEdition: false, 
          membreEnEdition: null 
        });
        this.chargerMembres();
      },
      fail: (err) => {
        console.error("Erreur modification membre :", err);
        wx.showToast({ title: "Échec", icon: "error" });
      }
    });
  },

  // API pour supprimer un membre
  supprimerMembre(e) {
    const membreId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: 'Confirmation',
      content: 'Êtes-vous sûr de vouloir supprimer ce membre ?',
      success: (res) => {
        if (res.confirm) {
          wx.request({
            url: `http://localhost:3000/membres/${membreId}`,
            method: 'DELETE',
            success: (res) => {
              wx.showToast({ title: "Supprimé avec succès" });
              this.chargerMembres();
            },
            fail: (err) => {
              console.error("Erreur suppression membre :", err);
              wx.showToast({ title: "Échec", icon: "error" });
            }
          });
        }
      }
    });
  },

  // Fonction pour éditer un membre
  editerMembre(e) {
    const membreId = e.currentTarget.dataset.id;
    const membre = this.data.membres.find(m => m.id === membreId);
    
    this.setData({
      nom: membre.nom,
      email: membre.email,
      modeEdition: true,
      membreEnEdition: membre
    });
  },

  // Annuler l'édition
  annulerEdition() {
    this.setData({
      nom: '',
      email: '',
      modeEdition: false,
      membreEnEdition: null
    });
  }
});