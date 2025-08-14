const app = getApp();
Page({
    /**
     * Page initial data
     */
    data: {
        tontines: [], // Toutes les tontines brutes
        filteredTontines: [], // Tontines après application du filtre
        users: {},
        loaded: false,
        id: 4,
        currentFilter: 'all', // Filtre actif par défaut
        emptyMessage: 'Créez des tontines sécurisées pour vous et vos proches', // Message par défaut
        filters: [
            { label: 'Tout', value: 'all', emptyMessage: 'Créez des tontines sécurisées pour vous et vos proches' },
            { label: 'En cours', value: 'en_cours', emptyMessage: 'Aucune tontine en cours' },
            { label: 'En attente', value: 'en_attente', emptyMessage: 'Aucune tontine en attente' },
            { label: 'Terminé', value: 'terminé', emptyMessage: 'Aucune tontine terminée' },
            { label: 'Suspendu', value: 'suspendu', emptyMessage: 'Aucune tontine suspendue' }
        ]
    },

    /**
     * Format date to DD/MM/YYYY
     */
    formatDate: function (dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        if (isNaN(date)) return dateString;
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    },

    /**
     * Gérer le changement de filtre
     */
    filterTontines: function (e) {
        const filter = e.currentTarget.dataset.filter;
        const filterObj = this.data.filters.find(f => f.value === filter);
        const emptyMessage = filterObj ? filterObj.emptyMessage : 'Aucune tontine disponible';

        this.setData({
            currentFilter: filter,
            emptyMessage: emptyMessage
        });

        // Appliquer le filtre
        let filteredTontines = this.data.tontines;
        if (filter !== 'all') {
            filteredTontines = this.data.tontines.filter(tontine => tontine.statut_tontine === filter);
        }

        this.setData({
            filteredTontines: filteredTontines
        });
    },

    CreeTontine: function () {
        wx.navigateTo({
            url: '/pages/creation_tontine/creation_tontine',
        });
    },

    IntegreTontine: function () {
        const idUser = this.data.users.id_utilisateur;
        wx.navigateTo({
            url: '/pages/integration_utilisateur/integration_utilisateur',
            success(res) {
                res.eventChannel.emit('sendDataToDetail', idUser);
            }
        });
    },

    NavPageGestion: function (e) {
        const tontine = e.currentTarget.dataset.tontine;
        const idUser = this.data.users.id_utilisateur;
        const data = { idUser, tontine };
        wx.navigateTo({
            url: '/pages/PageGestion/PageGestion',
            success(res) {
                res.eventChannel.emit('sendDataToDetail', data);
            }
        });
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad(options) {
        const userId = app.globalData.maxitId;

        wx.request({
            url: `http://${app.globalData.url_diack}:8000/api/login/${userId}`,
            method: "GET",
            success: (res) => {
                if (res.data.success && res.data.utilisateur) {
                    const utilisateur = res.data.utilisateur;

                    this.setData({
                        users: utilisateur
                    });

                    console.log("Utilisateur ID:", utilisateur.id_utilisateur);

                    wx.request({
                        url: `http://${app.globalData.url_diack}:3000/first/afficher`,
                        method: "GET",
                        data: {
                            id: utilisateur.id_utilisateur
                        },
                        success: (res2) => {
                            console.log("Tontines reçues:", res2.data);

                            // Formatter les dates pour toutes les tontines
                            const formattedTontines = Array.isArray(res2.data) ? res2.data.map(tontine => ({
                                ...tontine,
                                date_creation: this.formatDate(tontine.date_creation)
                            })) : [];

                            this.setData({
                                tontines: formattedTontines,
                                filteredTontines: formattedTontines, // Afficher toutes les tontines par défaut
                                emptyMessage: this.data.filters[0].emptyMessage, // Message par défaut pour "Tout"
                                loaded: true
                            });
                        },
                        fail: (err) => {
                            console.error("Erreur requête API (afficher) :", err);
                        }
                    });
                } else {
                    wx.redirectTo({
                        url: '/pages/condition_generale/condition_generale',
                    });
                }
            },
            fail: (err) => {
                console.error("Erreur requête API (login) :", err);
            }
        });
    },

    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady() {},

    /**
     * Lifecycle function--Called when page show
     */
    onShow() {},

    /**
     * Lifecycle function--Called when page hide
     */
    onHide() {},

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload() {},

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh() {},

    /**
     * Called when page reach bottom
     */
    onReachBottom() {},

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage() {}
});