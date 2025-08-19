const app = getApp();
Page({

    data: {
        showModalPaie: false,
        modalVisiblePaie: false,
        donnee: {},
        numeroTelephone: '+225',
        isAdmin: false,
        recipients: [],
        loaded: false,
        aPayer: false,
        statut_tontine: false,
        info: [],

        formData: {
            nom: '',
            description: '',
            type_tontine: '',
            regles: '',
            montant: '',
            frequence: '',
            participants: '',
            date_echeance: ''
        },

        // Liste des fréquences possibles
        frequenceOptions: ['Hebdomadaire', 'Quinzaine', 'Mensuelle', 'Deux mois', 'Trimestrielle', 'Autres'],
        // Liste des rappels possibles
        rappelOptions: ['1 jours avant', '2 jours avant', '3 jours avant', '4 jours avant', '5 jours avant', '20 minutes'],
        // Liste des fréquences possibles
        type_tontine: ['Tontine avec assurance', 'Tontine sans assurance', 'Tontine différée']
    },

    /*onLoad(options){
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('sendDataToDetail', (data) => {
        console.log(data);
        this.setData({donnee:data});
        if (data.tontine.role_utilisateur === "admin") {
            this.setData({
                isAdmin:true
            })
            //isAdmin = true
        }else{
            this.setData({isAdmin:false})
        }
        //tontine = data;
        wx.request({
            url: `http://${app.globalData.url_guitto_laravel}/api/tour/${data.tontine.id_tontine}`,
            method : "GET", 
            success : (res) => {
                const info = res.data;
                this.setData ({
                    info,
                    loaded: true
                })
                console.log(info)
            },
            fail : (err) =>{
                console.error("Erreur de paiement " , err);
                wx.showToast({
                  title: 'Erreur de paiement',
                  icon : "error"
                });
            }
          })
    })
          
    },*/

    

    onLoad(options) {
        const eventChannel = this.getOpenerEventChannel();
        eventChannel.on('sendDataToDetail', (data) => {
            console.log(data);
            if (data.tontine.statut_tontine == 'terminé') {
                this.setData({
                    statut_tontine: true
                })
            }
            this.setData({
                donnee: data
            });
            if (data.tontine.role_utilisateur === "admin") {
                this.setData({
                    isAdmin: true
                })
                //isAdmin = true
            } else {
                this.setData({
                    isAdmin: false
                })
            }
            //tontine = data;
            this.chargeTour(data.tontine.id_tontine);
        })

    },

    lancerPaiement() {
        if (this.data.loaded && this.data.info.tour.length === 0) {
            wx.showToast({
                title: 'La tontine n\'a pas encore débuté',
                icon: 'none',
                duration: 5000
            });
            return;
        }
        this.openModalPaie();
        this.info_paiement();
    },

    openModalPaie() {
        this.setData({
            showModalPaie: true
        });
        setTimeout(() => {
            this.setData({
                modalVisiblePaie: true
            });
        }, 50);
    },

    closeModalPaie() {
        this.setData({
            modalVisiblePaie: false
        });
        setTimeout(() => {
            this.setData({
                showModalPaie: false
            });
        }, 300);
    },
    chargeTour(id_tontine) {
        wx.request({
            url: `http://${app.globalData.url_guitto_laravel}/api/tour/${id_tontine}`,
            method: "GET",
            success: (res) => {
                const info = res.data;
                this.setData({
                    info: res.data,
                    loaded: true
                })
                console.log(info);
            },
            fail: (err) => {
                console.error("Erreur de paiement ", err);
                wx.showToast({
                    title: 'Erreur de paiement',
                    icon: "error",
                    duration: 5000

                });
            }
        })
    },
    //Fonction pour recup et afficher les valeurs de la bd (montant,contact)
    info_paiement() {
        const idUser = this.data.donnee.idUser;
        const id = this.data.donnee.tontine.id_tontine;
        const idTour = this.data.info.tour[0].id_tour;
        console.log(id)
        console.log(idUser)
        console.log(idTour)
        wx.request({
            url: `http://${app.globalData.url_guitto_fastapi}/infos_paiement/id_user/${idUser}/id_tontine/${id}/id_tour/${idTour}`,
            method: "GET",
            /*header: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            data: {
                id_utilisateur: idUser,
                id_tontine: id,
                id_tour: idTour
            },*/
            success: (res) => {
                const result = res.data;
                this.setData({
                    result
                });
                console.log(result);
                console.log(this.data.info.tour[0].cotisation.length);
                for (let i = 0; i < this.data.info.tour[0].cotisation.length; i++) {
                    if (this.data.info.tour[0].cotisation[i].id_participant == result.id_participant) {
                        this.setData({
                            aPayer: true
                        })
                    }
                }
                /* console.log(result);
                 setTimeout(() =>{
                     console.log(this.data.montant) 
                 }, 100);
                 */
            },
            fail: (err) => {
                console.error("Erreur de paiement ", err);
                wx.showToast({
                    title: 'Erreur de paiement',
                    icon: "error",
                    duration: 5000
                });
            }
        })
    },
    onPhoneNumberInput(e) {
        let value = e.detail.value;
        // Empêcher la suppression du préfixe +225
        if (!value.startsWith('+225')) {
            value = '+225';
        }
        // Limiter la saisie à +225 suivi de 10 chiffres maximum
        const numberPart = value.replace('+225', '');
        if (numberPart.length > 10 || !/^\d*$/.test(numberPart)) {
            value = '+225' + numberPart.slice(0, 10);
        }
        // Vérifier si le numéro est valide (exactement 10 chiffres après +225)
        const isValid = value.replace('+225', '').length === 10;
        this.setData({
            numeroTelephone: value,
            isValidNumber: isValid
        });
    },

    sendOtp() {
        const {
            numeroTelephone,
            name
        } = this.data;
        if (!numeroTelephone) {
            //this.showMessage("Veuillez sélectionner ou saisir au moins un contact", 'error');
            console.log("Veuillez sélectionner ou saisir au moins un contact", 'error')
            return;
        }
        const id = this.data.donnee.tontine.id_tontine;
        const nomTontine = this.data.donnee.tontine.nom_tontine;
        const recipients = [{ numeroTelephone: numeroTelephone, name: name || 'Invité' }]
        console.log(id)
        console.log(recipients)
        console.log()
        //this.showMessage('Envoi des invitations...', 'info');
        console.log('Envoi des invitations...', 'info:', id, recipients, nomTontine)
        wx.request({
            url: `http://${app.globalData.url_guitto}:3000/send-otp`,
            method: 'POST',
            header: {
                'Content-Type': 'application/json'
            },
            data: {
                recipients: recipients,
                id_tontine: id,
                nom_tontine: nomTontine
            },
            succes: (res) => {
                if (res.statusCode === 200) {
                    const firstResult = res.data.results[0];
                    let msg = 'Invitations envoyées !';
                    if (firstResult && firstResult.status === 'success') {
                        msg = +`Lien d'invitation: ${firstResult.invitationlink}`;
                    };
                    wx.navigateTo({
                        url: '/pages/PageGestion/PageGestion'
                    });
                    //this.showMessage(msg, 'success');
                    console.log(msg, 'success')
                } else {
                    //this.showMessage(`Erreur: ${res.data.message || "Problème lors de l'envoi des invitations"}`, 'error')
                    console.log(`Erreur: ${res.data.message || "Problème lors de l'envoi des invitations"}`, 'error')
                }
            },
            fail: (err) => {
                console.log(id)
                console.log(recipients)
                console.error('Erreur réseau sendOtp:', err);
                //this.showMessage('Échec de la connexion au serveur.', 'error');
            }
        });
    },

    paiement() {
        //const chpMnt= result.montant_a_cotise;
        const montant_a_cotise = this.data.result.montant_a_cotise;
        const id_participant = this.data.result.id_participant;

        const contact = this.data.result.contact;
        const id_tour = this.data.info.tour[0].id_tour;
        console.log(`montant a cotise: ${montant_a_cotise}, id_tour: ${id_tour}, contact: ${contact}, id_participant: ${id_participant}`);

        wx.request({
            url: `http://${app.globalData.url_diack}:8000/api/insererCotisation`,
            method: "POST",
            header: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },
            data: {
                montant_cotise: montant_a_cotise,
                id_tour: id_tour,
                id_participant: id_participant,
                telephone: contact,
                mode_paiement : "mobile money"
            },
            success: (res) => {
                console.log(res);
                if (res.statusCode === 201) {
                    wx.showToast({
                        title: 'Paiement réussi',
                        icon: "success",
                        duration: 5000
                        
                    });
                    this.chargeTour(this.data.donnee.tontine.id_tontine);
                    this.closeModalPaie()
                } else {
                    wx.showToast({
                        title: `Erreur : ${res.data.message || res.statusCode}`,
                        icon: "none",
                        duration: 5000
                    });
                }
            },
            fail: (err) => {
                wx.showToast({
                    title: 'Échec de la connexion',
                    icon: "none",
                    duration: 5000
                });
                console.error("Erreur:", err);
            }
        })
    },

    //charger les donnees du tour


    /*paiement(){
        //const chpMnt= result.montant_a_cotise;
      const {montant_a_cotise} = this.data.result;
      const montant = montant_a_cotise;
      wx.request({
        url: `http://192.168.252.213:8000/api/insererCotisation/`,
        method : "POST",
        header: {
            'accept':'application/json', 
            'content-type': 'application/json' 
          } ,
        data : {}, 
        success : (res) => {
            console.log("Montant :", montant);
            if (res.statusCode === 200) {
              wx.showToast({
                title: 'Paiement réussi',
                icon: "success"
              });
              wx.navigateTo({
                url: 'google.com',
              })
            } else {
                wx.showToast({title:`Erreur : ${res.data.message || res.statusCode}`, icon:"none"});
            }
        },
        fail : (err) => {
            wx.showToast({
              title: 'Échec de la connexion',
              icon: "none"
            });
            console.error("Erreur:", err);
        }
      })
    },*/


    goBack() {
        wx.navigateBack();
    },
    // Méthode pour naviguer vers la page d'invitation
    goToInvite(e) {
        const tontine = this.data.donnee.tontine.id_tontine;
        wx.navigateTo({
            url: '/pages/PageContact/PageContact',
            success(res) {
                res.eventChannel.emit('sendDataToDetail', tontine)
            }
        });
    },
    goToCotisation() {
        wx.navigateTo({
            url: '/pages/Cotisation/Cotisation'
        });
    },
    goToNotification() {
        wx.navigateTo({
            url: '/pages/Notification/Notification'
        });
    },
    goToTour: function (e) {
        if (this.data.loaded && this.data.info.tour.length === 0) {
            wx.showToast({
                title: 'La tontine n\'a pas encore débuté',
                icon: 'none',
                duration: 5000
            });
            return;
        }
        const tontine = this.data.donnee;
        wx.navigateTo({
            url: '/pages/info_tour/info_tour',
            success(res) {
                res.eventChannel.emit('sendDataToDetail', tontine)
            }
        });
    },
    goToInfoTontine: function (e) {
        if (this.data.loaded && this.data.info.tour.length === 0) {
            wx.showToast({
                title: 'La tontine n\'a pas encore débuté',
                icon: 'none',
                duration: 5000
            });
            return;
        }
        const tontine = this.data.donnee;
        wx.navigateTo({
            url: '/pages/info_tontine/info_tontine',
            success(res) {
                res.eventChannel.emit('sendDataToDetail', tontine)
            }
        });
    },
    goToHistorique: function (e) {
        const tour = this.data.donnee;
        wx.navigateTo({
            url: '/pages/historique/historique',
            success(res) {
                res.eventChannel.emit('sendDataToDetail', tour)
            }
        })
    },
    
    /*goToInfoTontine() {
      wx.navigateTo({
        url: '/pages/info_tontine/info_tontine'
      });
    },*/
    openModal() {
        this.setData({
            showModal: true
        });
    },

    closeModal() {
        this.setData({
            showModal: false
        });
    },

    openModalConsultation() {
        this.setData({
            showModalConsultation: true
        });
    },

    closeModalConsultation() {
        this.setData({
            showModalConsultation: false
        });
    },

    openModalHistorique() {
        this.setData({
            showModalHistorique: true
        });
    },

    closeModalHistorique() {
        this.setData({
            showModalHistorique: false
        });
    },

    preventClose() { },

    Modif() {
        //Navigation
        wx.redirectTo({
            url: '/pages/index/index',
        })
    },

    openModalModifRegle() {
        this.closeModalConsultation()
        this.setData({
            showModalModifRegle: true
        });
        setTimeout(() => {
            this.setData({
                modalVisibleRegle: true
            });
        }, 50);
    },

    closeModifRegle() {
        this.setData({
           modalVisibleRegle: false
        });
        setTimeout(() => {
            this.setData({
                showModalModifRegle: false
            });
        }, 300);
    },

       // Ouvre le sélecteur de fréquence via wx.showActionSheet
       openFrequenceOptions() {
        const that = this;
        wx.showActionSheet({
            itemList: this.data.frequenceOptions, // options à afficher
            success(res) {
                // si l'utilisateur sélectionne une option
                const selected = that.data.frequenceOptions[res.tapIndex];
                that.setData({
                    'formData.frequence': selected
                });
            },
            fail(err) {
                console.log('Annulé ou erreur', err);
            }
        });
    },

    // Ouvre le sélecteur de fréquence via wx.showActionSheet
    openTypeTontineOptions() {
        const that = this;
        wx.showActionSheet({
            itemList: this.data.type_tontine, // options à afficher
            success(res) {
                // si l'utilisateur sélectionne une option
                const selected = that.data.type_tontine[res.tapIndex];
                that.setData({
                    'formData.type_tontine': selected
                });
            },
            fail(err) {
                console.log('Annulé ou erreur', err);
            }
        });
    },
  
    // Ouvre le sélecteur de rapelle via wx.showActionSheet
    openRappelOptions() {
        const that = this;
        wx.showActionSheet({
            itemList: this.data.rappelOptions, // options à afficher
            success(res) {
                // si l'utilisateur sélectionne une option
                const selected = that.data.rappelOptions[res.tapIndex];
                that.setData({
                    'formData.date_echeance': selected
                });
            },
            fail(err) {
                console.log('Annulé ou erreur', err);
            }
        });
    },

    onInputChange(e) {
        const field = e.currentTarget.dataset.field;
        const value = e.detail.value;
        this.setData({
            [`formData.${field}`]: value
        });
    },


})