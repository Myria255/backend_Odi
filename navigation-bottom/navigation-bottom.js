// components/navigation-bottom/navigation-bottom.js
Component({

  /**
   * Component properties
   */
  properties: {
    // Si vous avez des propriétés comme 'currentPage' pour l'état actif, elles resteraient ici.
    // Exemple :
    // currentPage: {
    //   type: String,
    //   value: 'home'
    // }
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
    navigateTo: function(e) {
      const page = e.currentTarget.dataset.page;
      let url = '';

      switch (page) {
        case 'home':
          url = '/pages/index/index';
          break;
        case 'favoris':
          url = '/pages/favoris/favoris';
          break;
        case 'vendre':
          url = '/pages/vendre/vendre';
          break;
        case 'chat':
          url = '/pages/chat/chat';
          break;
        case 'profil':
          url = '/pages/profil/profil';
          break;
        // La page 'promotion' a été retirée de ce switch
        default:
          console.warn('Page cible non reconnue:', page);
          return;
      }

      const currentPages = getCurrentPages();
      const currentPage = currentPages[currentPages.length - 1];

      // Vérifiez si vous êtes déjà sur la page cible
      if (currentPage && currentPage.route === url.substring(1)) {
          console.log(`Déjà sur la page: ${url}. Pas de redirection.`);
          return;
      }

      // Utilisation de wx.redirectTo pour simuler le comportement des onglets (pas d'historique d'empilement)
      wx.redirectTo({
          url: url,
          success: () => {
              console.log(`Redirection vers la page : ${url} (via redirectTo)`);
          },
          fail: (err) => {
              console.error('Échec de la redirection vers la page (redirectTo):', err);
          }
      });
    }
  }
});