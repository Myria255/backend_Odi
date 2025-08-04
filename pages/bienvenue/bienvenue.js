const API_URL = 'http://192.168.252.43:3000';
const app = getApp();
// Gestion de la logique de la page
Page({
    /**
     * Données initiales de la page
     */
    data: {
        isExpanded: false,
        showModal: false,
        formData: {
            code: '' // Champ pour le mot de passe
        },
        avisList: [
            {
                id: 1,
                avatar: '/assets/Avatar.jpg',
                nom: 'Odi Mariano',
                note: '⭐⭐⭐⭐⭐',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, voluptatibus! Ipsum dolor sit amet consectetur adipisicing elit. Quod, voluptatibus! Lorem ipsum dolor sit amet consectetur adipisicing elit.',
                expanded: false,
                showButton: true
            },
            {
                id: 2,
                avatar: '/assets/Avatar.jpg',
                nom: 'Marie Dubois',
                note: '⭐⭐⭐⭐',
                description: 'Excellent service, très satisfaite de mon achat. Je recommande vivement cette application à tous mes amis et ma famille. L\'expérience utilisateur est fantastique et l\'équipe support est très réactive.',
                expanded: false,
                showButton: true
            },
            {
                id: 3,
                avatar: '/assets/Avatar.jpg',
                nom: 'Jean Martin',
                note: '⭐⭐⭐⭐⭐',
                description: 'Parfait !',
                expanded: false,
                showButton: false
            }
        ],
        otp: '',
        idUser:'',
        numeroTelephone:''
    },

    onLoad(options) {
    },

   
    checkTextLength() {
        const avisList = this.data.avisList.map(item => {
            item.showButton = item.description.length > 100;
            return item;
        });
        this.setData({ avisList });
    },

    /**
     * Bascule l'affichage du texte
     */
    toggleText() {
        this.setData({
            isExpanded: !this.data.isExpanded
        });
    },

    /**
     * Bascule l'affichage des avis
     */
    toggleExpand(e) {
        const index = e.currentTarget.dataset.index;
        const avisList = this.data.avisList;
        avisList[index].expanded = !avisList[index].expanded;
        this.setData({ avisList });
        if (avisList[index].expanded) {
            setTimeout(() => {
                wx.pageScrollTo({
                    selector: `.avis-${index}`,
                    duration: 300
                });
            }, 100);
        }
    },

    /**
     * Redirige vers la page d'accueil
     */
    Commencer() {
        wx.redirectTo({
            url: '/pages/connexion/connexion',
        });
    },

    preventClose() {

    }
});