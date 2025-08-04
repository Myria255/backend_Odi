// pages/index/index.js
Page({
  data: {
    imageBands: [], // Bandes/sections d'articles regroupés pour l'affichage
    promotionImages: [], // Articles promotionnels

    // Propriétés pour les catégories dynamiques
    categoriesList: [],
    activeCategory: 'all',

    // Pour la gestion du défilement des catégories avec les flèches
    scrollLeft: 0,
    categoryItemWidth: 0,
    categoriesContainerWidth: 0,
  },

  onLoad: function() {
    // Initialisation des données statiques (catégories, images promotionnelles, tous les articles locaux)
    const simulatedCategoriesFromDB = [
      { id: 'all', name: 'Tous' },
      { id: 'mode', name: 'Mode & Vêtements' },
      { id: 'electronique', name: 'Électronique' },
      { id: 'maison', name: 'Maison & Jardin' },
      { id: 'beaute_sante', name: 'Beauté & Santé' },
      { id: 'sports_loisirs', name: 'Sports & Loisirs' },
      { id: 'vehicules', name: 'Véhicules' },
      { id: 'immobilier', name: 'Immobilier' },
      { id: 'services', name: 'Services' },
      { id: 'autres', name: 'Autres' },
    ];

    const promoItems = [
      { id: 101, images: ['/assets/Barca.svg'], name: 'Offre Spéciale - Électronique', price: '49.99 Fcfa', liked: false, category: 'Électronique', location: 'Abidjan', description: 'Profitez de réductions incroyables sur une sélection de produits électroniques !', articleState: 'Neuf' },
      { id: 102, images: ['/assets/Barca.svg'], name: 'Mega Vente - Mode', price: '29.99 Fcfa', liked: false, category: 'Mode & Vêtements', location: 'Yopougon', description: 'Des prix cassés sur vos articles de mode préférés. Ne manquez pas cette occasion !', articleState: 'Neuf' },
      { id: 103, images: ['/assets/Barca.svg'], name: 'Stock Limité - Maison', price: '79.99 Fcfa', liked: false, category: 'Maison & Jardin', location: 'Cocody', description: 'Décorez votre intérieur avec nos articles de maison à prix réduits. Stock très limité !', articleState: 'Neuf' },
      { id: 104, images: ['/assets/Barca.svg'], name: 'Prix Cassés - Beauté', price: '19.99 Fcfa', liked: false, category: 'Beauté & Santé', location: 'Marcory', description: 'Sublimez-vous avec nos produits de beauté à des prix défiant toute concurrence.', articleState: 'Neuf' },
      { id: 105, images: ['/assets/Barca.svg'], name: 'Exclusivité Web - Sports', price: '65.00 Fcfa', liked: false, category: 'Sports & Loisirs', location: 'En ligne', description: 'Équipements sportifs et articles de loisirs en exclusivité sur notre site.', articleState: 'Neuf' }
    ];

    // --- Données d'articles avec des descriptions et titres plus riches ---
    const allLocalImages = [
      { id: 1, images: ['/assets/Pull.svg', '/assets/Pull_back.png', '/assets/Jaket.svg'], category: 'Mode & Vêtements', name: 'Pull en Laine Douce', price: '10000 Fcfa', liked: false, location: 'Abidjan, Cocody', description: 'Un pull classique en laine douce, parfait pour les soirées fraîches. Confort et élégance assurés.', articleState: 'Neuf' },
      { id: 2, images: ['/assets/Chaussures.jpg', '/assets/Chaussures_detail.png'], category: 'Mode & Vêtements', name: 'Baskets Urbaines Confort', price: '12500 Fcfa', liked: false, location: 'Yopougon, Niangon', description: 'Ces baskets modernes offrent un confort optimal et un style urbain. Idéales pour le quotidien.', articleState: 'Très bon état' },
      { id: 3, images: ['/assets/Jaket.svg', '/assets/Jaket.svg'], category: 'Mode & Vêtements', name: 'Sac à Dos Multifonction', price: '15000 Fcfa', liked: false, location: 'Abidjan, Plateau', description: 'Sac à dos spacieux et résistant, parfait pour le travail, les études ou les voyages. Plusieurs compartiments.', articleState: 'Neuf' },
      { id: 4, images: ['/assets/Pull.svg'], category: 'Mode & Vêtements', name: 'Doudoune Légère Enfant', price: '8000 Fcfa', liked: false, location: 'Grand-Bassam', description: 'Doudoune légère et chaude pour enfant, idéale pour la mi-saison. Coloris variés.', articleState: 'Occasion' },
      { id: 5, images: ['/assets/Jaket.svg'], category: 'Mode & Vêtements', name: 'Mocassins en Cuir Élégants', price: '20000 Fcfa', liked: false, location: 'San-Pédro', description: 'Mocassins en cuir véritable, alliant confort et sophistication pour un look professionnel ou décontracté.', articleState: 'Neuf' },
      { id: 6, images: ['/assets/SacDos.jpg'], category: 'Électronique', name: 'Écouteurs Bluetooth Pro', price: '22000 Fcfa', liked: false, location: 'Bouaké', description: 'Écouteurs sans fil avec annulation de bruit et autonomie longue durée. Parfaits pour la musique et les appels.', articleState: 'Neuf' },
      { id: 7, images: ['/assets/Pull.png'], category: 'Mode & Vêtements', name: 'Robe de Soirée Scintillante', price: '25000 Fcfa', liked: false, location: 'Abidjan, Riviera', description: 'Magnifique robe de soirée longue, ornée de paillettes. Idéale pour les événements spéciaux.', articleState: 'Neuf' },
      { id: 8, images: ['/assets/Chaussures.jpg'], category: 'Mode & Vêtements', name: 'Sandales d\'Été Confortables', price: '2800 Fcfa', liked: false, location: 'Daloa', description: 'Sandales légères et confortables, parfaites pour les journées chaudes. Disponibles en plusieurs tailles.', articleState: 'Occasion - Bon état' },
      { id: 9, images: ['/assets/SacDos.jpg'], category: 'Électronique', name: 'Drone Caméra HD', price: '30000 Fcfa', liked: false, location: 'Korhogo', description: 'Drone avec caméra haute définition pour des prises de vue aériennes époustouflantes. Facile à piloter.', articleState: 'Neuf' },
      { id: 10, images: ['/assets/Pull.png'], category: 'Maison & Jardin', name: 'Service à Thé en Porcelaine', price: '3200 Fcfa', liked: false, location: 'Abidjan, Adjamé', description: 'Un élégant service à thé en porcelaine, idéal pour vos moments de détente ou pour recevoir.', articleState: 'Neuf' },
      { id: 11, images: ['/assets/Chaussures.jpg'], category: 'Beauté & Santé', name: 'Kit de Maquillage Professionnel', price: '35000 Fcfa', liked: false, location: 'Gagnoa', description: 'Coffret de maquillage complet avec fards, pinceaux et accessoires pour tous les looks.', articleState: 'Neuf' },
      { id: 12, images: ['/assets/SacDos.jpg'], category: 'Sports & Loisirs', name: 'Tapis de Yoga Antidérapant', price: '3800 Fcfa', liked: false, location: 'Man', description: 'Tapis de yoga épais et antidérapant, offrant un excellent amorti pour vos séances.', articleState: 'Neuf' },
      { id: 13, images: ['/assets/Pull.png'], category: 'Véhicules', name: 'Pneus Neufs pour SUV', price: '40000 Fcfa', liked: false, location: 'Yamoussoukro', description: 'Quatre pneus neufs de haute qualité pour SUV. Excellente adhérence et durabilité.', articleState: 'Neuf' },
      { id: 14, images: ['/assets/Chaussures.jpg'], category: 'Immobilier', name: 'Appartement F3 à Louer', price: '420000 Fcfa/mois', liked: false, location: 'Abidjan, Angré', description: 'Bel appartement F3 spacieux et lumineux, situé dans un quartier calme et sécurisé. Proche des commodités.', articleState: 'Disponible' },
      { id: 15, images: ['/assets/SacDos.jpg'], category: 'Services', name: 'Cours de Soutien Scolaire', price: '4500 Fcfa/heure', liked: false, location: 'Divo', description: 'Professeur expérimenté propose des cours de soutien en mathématiques et physique pour tous niveaux.', articleState: 'Disponible' },
      { id: 16, images: ['/assets/Pull.png'], category: 'Autres', name: 'Collection de Bandes Dessinées', price: '4800 Fcfa', liked: false, location: 'Agboville', description: 'Lot de bandes dessinées rares et classiques. Idéal pour les collectionneurs.', articleState: 'Très bon état' },
      { id: 17, images: ['/assets/Chaussures.jpg'], category: 'Mode & Vêtements', name: 'Chaussures de Ville en Daim', price: '50000 Fcfa', liked: false, location: 'Adiaké', description: 'Chaussures de ville en daim de haute qualité, confortables et élégantes pour toutes occasions.', articleState: 'Neuf' },
      { id: 18, images: ['/assets/SacDos.jpg'], category: 'Électronique', name: 'Tablette Tactile Dernière Génération', price: '52000 Fcfa', liked: false, location: 'Bonoua', description: 'Tablette performante avec écran haute résolution, idéale pour le travail et le divertissement.', articleState: 'Neuf' },
      { id: 19, images: ['/assets/Pull.png'], category: 'Maison & Jardin', name: 'Ensemble Meubles de Jardin', price: '55000 Fcfa', liked: false, location: 'Bingerville', description: 'Ensemble complet pour jardin: table, 4 chaises et parasol. Parfait pour vos extérieurs.', articleState: 'Neuf' },
      { id: 20, images: ['/assets/Chaussures.jpg'], category: 'Beauté & Santé', name: 'Coffret Parfum Luxe', price: '58000 Fcfa', liked: false, location: 'Jacqueville', description: 'Coffret de parfum de marque de luxe, avec eau de toilette et lait corporel assorti.', articleState: 'Neuf' },
      { id: 21, images: ['/assets/Pull.png'], category: 'Sports & Loisirs', name: 'Vélo de Course Professionnel', price: '60000 Fcfa', liked: false, location: 'Grand-Lahou', description: 'Vélo de course léger et performant, idéal pour les entraînements et compétitions.', articleState: 'Occasion - Excellent état' },
      { id: 22, images: ['/assets/Chaussures.jpg'], category: 'Véhicules', name: 'Moteur Hors-Bord Occasion', price: '60000 Fcfa', liked: false, location: 'Assinie-Mafia', description: 'Moteur hors-bord en bon état de fonctionnement, parfait pour les petites embarcations.', articleState: 'Occasion' },
      { id: 23, images: ['/assets/SacDos.jpg'], category: 'Immobilier', name: 'Terrain à Vendre - 500m²', price: '6000000 Fcfa', liked: false, location: 'Dabou', description: 'Grand terrain constructible de 500m² dans un quartier résidentiel en plein développement.', articleState: 'Disponible' },
      { id: 24, images: ['/assets/Pull.png'], category: 'Mode & Vêtements', name: 'Costume Homme Élégant', price: '60000 Fcfa', liked: false, location: 'Toumodi', description: 'Costume trois pièces pour homme, coupe moderne et tissu de qualité. Idéal pour les cérémonies.', articleState: 'Neuf' },
      { id: 25, images: ['/assets/Chaussures.jpg'], category: 'Mode & Vêtements', name: 'Escarpins Compensés Confort', price: '6000 Fcfa', liked: false, location: 'Boundiali', description: 'Escarpins à talons compensés, offrant à la fois élégance et grand confort pour une journée entière.', articleState: 'Très bon état' },
      { id: 26, images: ['/assets/SacDos.jpg'], category: 'Accessoires', name: 'Montre Connectée Sport', price: '15000 Fcfa', liked: false, location: 'Korhogo', description: 'Montre connectée avec suivi d\'activité, GPS intégré et capteur de fréquence cardiaque.', articleState: 'Neuf' },
      { id: 27, images: ['/assets/Pull.png'], category: 'Mode & Vêtements', name: 'Ensemble Sport Enfant', price: '15000 Fcfa', liked: false, location: 'Man', description: 'Ensemble de jogging pour enfant, confortable et résistant, parfait pour le sport et les loisirs.', articleState: 'Neuf' },
      { id: 28, images: ['/assets/Chaussures.jpg'], category: 'Mode & Vêtements', name: 'Bottes d\'Hiver Imperméables', price: '60000 Fcfa', liked: false, location: 'Duekoué', description: 'Bottes chaudes et imperméables, idéales pour affronter le froid et l\'humidité en toute élégance.', articleState: 'Neuf' },
      { id: 29, images: ['/assets/SacDos.jpg'], category: 'Électronique', name: 'Caméra de Sécurité Intelligente', price: '60000 Fcfa', liked: false, location: 'Gagnoa', description: 'Caméra connectée avec détection de mouvement et vision nocturne. Sécurisez votre domicile.', articleState: 'Neuf' },
      { id: 30, images: ['/assets/Pull.png'], category: 'Maison & Jardin', name: 'Fauteuil Relax Confortable', price: '60000 Fcfa', liked: false, location: 'Divo', description: 'Fauteuil douillet avec repose-pieds intégré, idéal pour la lecture ou la détente.', articleState: 'Neuf' },
      { id: 31, images: ['/assets/Chaussures.jpg'], category: 'Beauté & Santé', name: 'Kit de Soin Visage Bio', price: '6000 Fcfa', liked: false, location: 'Adiaké', description: 'Kit complet de produits de soin visage bio, pour une peau saine et éclatante. Convient à tous types de peau.', articleState: 'Neuf' },
      { id: 32, images: ['/assets/SacDos.jpg'], category: 'Sports & Loisirs', name: 'Set de Tennis de Table', price: '6200 Fcfa', liked: false, location: 'Abengourou', description: 'Set complet pour le tennis de table: raquettes, balles et filet. Idéal pour s\'amuser en famille.', articleState: 'Neuf' },
      { id: 33, images: ['/assets/Pull.png'], category: 'Livres & Médias', name: 'Roman Historique "Les Racines"', price: '6500 Fcfa', liked: false, location: 'Bondoukou', description: 'Un roman captivant qui retrace des événements historiques marquants.', articleState: 'Neuf' },
      { id: 34, images: ['/assets/Chaussures.jpg'], category: 'Jeux Vidéo', name: 'Console de Jeu Portable', price: '68000 Fcfa', liked: false, location: 'Sassandra', description: 'Console portable avec une bibliothèque de jeux intégrée. Parfaite pour jouer en déplacement.', articleState: 'Neuf' },
      { id: 35, images: ['/assets/SacDos.jpg'], category: 'Mode & Vêtements', name: 'Chemise en Lin Élégante', price: '7000 Fcfa', liked: false, location: 'Ferkessédougou', description: 'Chemise en lin légère et respirante, idéale pour les journées chaudes. Style décontracté chic.', articleState: 'Neuf' },
      { id: 36, images: ['/assets/Pull.png'], category: 'Mode & Vêtements', name: 'Jupe Longue Plissée', price: '7200 Fcfa', liked: false, location: 'Touba', description: 'Jupe longue plissée en tissu fluide, très tendance et confortable. Convient à toutes les morphologies.', articleState: 'Neuf' },
      { id: 37, images: ['/assets/Chaussures.jpg'], category: 'Mode & Vêtements', name: 'Baskets Enfants Lumineuses', price: '7500 Fcfa', liked: false, location: 'Odienné', description: 'Baskets pour enfants avec des lumières LED intégrées dans la semelle. Amusantes et stylées.', articleState: 'Neuf' },
      { id: 38, images: ['/assets/SacDos.jpg'], category: 'Électronique', name: 'Souris Gamer RGB', price: '7800 Fcfa', liked: false, location: 'Korhogo', description: 'Souris de gaming ergonomique avec éclairage RGB personnalisable et haute précision.', articleState: 'Neuf' },
      { id: 39, images: ['/assets/Pull.png'], category: 'Maison & Jardin', name: 'Décoration Murale Abstraite', price: '8000 Fcfa', liked: false, location: 'Man', description: 'Tableau abstrait pour décorer votre salon ou chambre. Apporte une touche moderne à votre intérieur.', articleState: 'Neuf' },
      { id: 40, images: ['/assets/Chaussures.jpg'], category: 'Beauté & Santé', name: 'Appareil de Massage Visage', price: '8200 Fcfa', liked: false, location: 'San-Pédro', description: 'Appareil de massage pour le visage, favorise la circulation sanguine et la fermeté de la peau.', articleState: 'Neuf' },
      { id: 41, images: ['/assets/SacDos.jpg'], category: 'Sports & Loisirs', name: 'Sac de Frappe Boxe', price: '8500 Fcfa', liked: false, location: 'Bouaké', description: 'Sac de frappe lourd et résistant, idéal pour l\'entraînement de boxe à domicile.', articleState: 'Neuf' },
      { id: 42, images: ['/assets/Pull.png'], category: 'Livres & Médias', name: 'Livre de Cuisine Végétarienne', price: '8800 Fcfa', liked: false, location: 'Daloa', description: 'Un livre de recettes végétariennes variées et délicieuses pour une alimentation saine.', articleState: 'Neuf' },
      { id: 43, images: ['/assets/Pull.png'], category: 'Jeux Vidéo', name: 'Jeu Vidéo Aventure PS5', price: '9000 Fcfa', liked: false, location: 'Yamoussoukro', description: 'Le dernier jeu d\'aventure pour PlayStation 5, avec des graphismes époustouflants.', articleState: 'Neuf' },
      { id: 44, images: ['/assets/Chaussures.jpg'], category: 'Mode & Vêtements', name: 'Bottes en Cuir Élégantes', price: '92000 Fcfa', liked: false, location: 'Abidjan, Marcory', description: 'Bottes hautes en cuir véritable, parfaites pour l\'hiver. Confort et style garantis.', articleState: 'Neuf' },
      { id: 45, images: ['/assets/SacDos.jpg'], category: 'Accessoires', name: 'Lunettes de Soleil Polarisées', price: '9500 Fcfa', liked: false, location: 'Abidjan, Cocody', description: 'Lunettes de soleil polarisées pour une protection optimale contre les UV et un confort visuel.', articleState: 'Neuf' },
      { id: 46, images: ['/assets/Pull.png'], category: 'Mode & Vêtements', name: 'Pyjama Enfant Doux', price: '9800 Fcfa', liked: false, location: 'Abidjan, Koumassi', description: 'Pyjama en coton doux pour enfant, assure une nuit de sommeil confortable et agréable.', articleState: 'Neuf' },
      { id: 47, images: ['/assets/Chaussures.jpg'], category: 'Électronique', name: 'Chargeur Portable Rapide', price: '10000 Fcfa', liked: false, location: 'Abidjan, Plateau', description: 'Chargeur portable ultra-rapide avec plusieurs ports USB, idéal pour voyager.', articleState: 'Neuf' },
      { id: 48, images: ['/assets/SacDos.jpg'], category: 'Maison & Jardin', name: 'Plante Artificielle Grande Taille', price: '10200 Fcfa', liked: false, location: 'Abidjan, Riviera', description: 'Grande plante artificielle décorative pour apporter une touche de verdure à votre intérieur sans entretien.', articleState: 'Neuf' },
      { id: 49, images: ['/assets/Pull.png'], category: 'Beauté & Santé', name: 'Set de Pinceaux Maquillage', price: '10500 Fcfa', liked: false, location: 'Abidjan, Adjamé', description: 'Set de pinceaux professionnels pour un maquillage parfait. Poils doux et résistants.', articleState: 'Neuf' },
      { id: 50, images: ['/assets/Chaussures.jpg'], category: 'Sports & Loisirs', name: 'Ballon de Basket Officiel', price: '10800 Fcfa', liked: false, location: 'Abidjan, Yopougon', description: 'Ballon de basket de taille officielle, adapté pour le jeu en intérieur et extérieur.', articleState: 'Neuf' },
      { id: 51, images: ['/assets/SacDos.jpg'], category: 'Livres & Médias', name: 'Encyclopédie Illustrée', price: '11000 Fcfa', liked: false, location: 'Abidjan, Port-Bouët', description: 'Une encyclopédie richement illustrée, couvrant divers sujets pour toute la famille.', articleState: 'Neuf' },
      { id: 52, images: ['/assets/Pull.png'], category: 'Jeux Vidéo', name: 'Figurine de Collection Rare', price: '11200 Fcfa', liked: false, location: 'Abidjan, Treichville', description: 'Figurine de collection rare et détaillée, pour les fans et les collectionneurs.', articleState: 'Neuf' },
      { id: 53, images: ['/assets/Chaussures.jpg'], category: 'Mode & Vêtements', name: 'Chemise en Jean Tendance', price: '11500 Fcfa', liked: false, location: 'Abidjan, Bingerville', description: 'Chemise en jean moderne et polyvalente, idéale pour un look décontracté ou superposé.', articleState: 'Neuf' },
      { id: 54, images: ['/assets/SacDos.jpg'], category: 'Accessoires', name: 'Foulard en Soie Imprimé', price: '11800 Fcfa', liked: false, location: 'Abidjan, Anyama', description: 'Foulard en soie aux motifs colorés, parfait pour ajouter une touche d\'élégance à votre tenue.', articleState: 'Neuf' },
      { id: 55, images: ['/assets/Pull.png'], category: 'Maison & Jardin', name: 'Pot de Fleurs Design', price: '1200 Fcfa', liked: false, location: 'Abidjan, Attécoubé', description: 'Pot de fleurs moderne en céramique, idéal pour décorer votre intérieur ou balcon.', articleState: 'Neuf' },
      { id: 56, images: ['/assets/Chaussures.jpg'], category: 'Électronique', name: 'Clavier Mécanique Gamer', price: '12200 Fcfa', liked: false, location: 'Abidjan, Cocody', description: 'Clavier mécanique pour gamers, avec rétroéclairage RGB et touches réactives pour une performance optimale.', articleState: 'Neuf' },
      { id: 57, images: ['/assets/SacDos.jpg'], category: 'Maison & Jardin', name: 'Lampe de Lecture LED', price: '12500 Fcfa', liked: false, location: 'Abidjan, Koumassi', description: 'Lampe de lecture flexible et économe en énergie, avec luminosité réglable. Parfaite pour votre bureau.', articleState: 'Neuf' },
      { id: 58, images: ['/assets/Pull.png'], category: 'Beauté & Santé', name: 'Kit de Manucure Complet', price: '12800 Fcfa', liked: false, location: 'Abidjan, Marcory', description: 'Kit de manucure professionnel avec tous les outils nécessaires pour des ongles impeccables à la maison.', articleState: 'Neuf' },
      { id: 59, images: ['/assets/Chaussures.jpg'], category: 'Sports & Loisirs', name: 'Ensemble de Randonnée', price: '13000 Fcfa', liked: false, location: 'Abidjan, Adjamé', description: 'Ensemble léger et robuste pour la randonnée: sac à dos, gourde et bâtons de marche.', articleState: 'Neuf' },
      { id: 60, images: ['/assets/SacDos.jpg'], category: 'Livres & Médias', name: 'Magazines de Mode (Lot)', price: '13200 Fcfa', liked: false, location: 'Abidjan, Plateau', description: 'Lot de magazines de mode récents, pour rester informé des dernières tendances et styles.', articleState: 'Très bon état' },
      { id: 61, images: ['/assets/Pull.png'], category: 'Jeux Vidéo', name: 'Accessoire VR Immersif', price: '13500 Fcfa', liked: false, location: 'Abidjan, Port-Bouët', description: 'Accessoire de réalité virtuelle pour améliorer votre expérience de jeu. Compatible avec plusieurs casques.', articleState: 'Neuf' }
    ];

    const groupedImages = this.groupImages(allLocalImages, 2);
    if (groupedImages.length > 0) {
      groupedImages[0].title = "Nos Nouveautés";
    }

    this.setData({
      imageBands: groupedImages,
      promotionImages: promoItems,
      categoriesList: simulatedCategoriesFromDB,
      activeCategory: simulatedCategoriesFromDB.length > 0 ? simulatedCategoriesFromDB[0].id : ''
    });

    this.getCategoryItemDimensions();
    this.loadFavoriteStatus();
  },

  onShow: function() {
    this.loadFavoriteStatus();
  },

  loadFavoriteStatus: function() {
    const favoritePhotos = wx.getStorageSync('favoritePhotos') || [];

    const updatedImageBands = this.data.imageBands.map(band => {
      const updatedImages = band.images.map(imageItem => {
        const isLiked = favoritePhotos.some(fav => fav.id === imageItem.id);
        return { ...imageItem, liked: isLiked };
      });
      return { ...band, images: updatedImages };
    });

    const updatedPromotionImages = this.data.promotionImages.map(promoItem => {
      const isLiked = favoritePhotos.some(fav => fav.id === promoItem.id);
      return { ...promoItem, liked: isLiked };
    });

    this.setData({
      imageBands: updatedImageBands,
      promotionImages: updatedPromotionImages
    });
    console.log('État des favoris chargé et mis à jour sur la page.');
  },

  getCategoryItemDimensions: function() {
    wx.nextTick(() => {
      wx.createSelectorQuery()
        .in(this)
        .select('.typesCategories')
        .boundingClientRect(rect => {
          if (rect) {
            this.setData({
              categoryItemWidth: rect.width + 25
            });
          }
        }).exec();

      wx.createSelectorQuery()
        .in(this)
        .select('.ToutesCategories')
        .boundingClientRect(rect => {
          if (rect) {
            this.setData({
              categoriesContainerWidth: rect.width
            });
          }
        }).exec();
    });
  },

  selectCategory: function(e) {
    const categoryId = e.currentTarget.dataset.categoryId;
    this.setData({
      activeCategory: categoryId
    });
    console.log('Catégorie sélectionnée :', categoryId);
    wx.showToast({ title: `Catégorie: ${categoryId}`, icon: 'none', duration: 800 });
    // Vous pouvez ajouter ici une logique pour filtrer `imageBands` par catégorie
  },

  scrollCategoriesLeft: function() {
    let newScrollLeft = this.data.scrollLeft - this.data.categoriesContainerWidth;
    if (newScrollLeft < 0) {
      newScrollLeft = 0;
    }
    this.setData({
      scrollLeft: newScrollLeft
    });
  },

  scrollCategoriesRight: function() {
    const totalContentWidth = this.data.categoriesList.length * this.data.categoryItemWidth;
    const maxScrollLeft = Math.max(0, totalContentWidth - this.data.categoriesContainerWidth);

    let newScrollLeft = this.data.scrollLeft + this.data.categoriesContainerWidth;
    if (newScrollLeft > maxScrollLeft) {
      newScrollLeft = maxScrollLeft;
    }
    this.setData({
      scrollLeft: newScrollLeft
    });
  },

  groupImages: function(images, chunkSize) {
    const result = [];
    for (let i = 0; i < images.length; i += chunkSize) {
      const chunk = images.slice(i, i + chunkSize);
      result.push({
        bandId: `band_${Math.floor(i / chunkSize)}`,
        title: '',
        images: chunk
      });
    }
    return result;
  },

  toggleLike: function(e) {
    const itemId = e.currentTarget.dataset.id;
    const isCurrentlyLiked = e.currentTarget.dataset.liked;

    let updatedItem = null;

    // 1. Mettre à jour l'état 'liked' dans imageBands
    const newImageBands = this.data.imageBands.map(band => {
      const updatedImages = band.images.map(item => {
        if (item.id === itemId) {
          item.liked = !isCurrentlyLiked;
          updatedItem = item;
        }
        return item;
      });
      return { ...band, images: updatedImages };
    });

    // 2. Mettre à jour l'état 'liked' dans promotionImages (si l'élément est trouvé ici)
    const newPromotionImages = this.data.promotionImages.map(item => {
      if (item.id === itemId) {
        item.liked = !isCurrentlyLiked;
        updatedItem = item;
      }
      return item;
    });

    this.setData({
      imageBands: newImageBands,
      promotionImages: newPromotionImages
    });

    // 3. Mettre à jour le stockage local des favoris
    if (updatedItem) {
      this.updateFavoritePhotosInStorage(updatedItem);
    }

    wx.showToast({
      title: `Article ${itemId} ${!isCurrentlyLiked ? 'aimé' : 'désaimé'}`,
      icon: 'none',
      duration: 800
    });
  },

  updateFavoritePhotosInStorage: function(photo) {
    let favoritePhotos = wx.getStorageSync('favoritePhotos') || [];

    if (photo.liked) {
      const exists = favoritePhotos.some(fav => fav.id === photo.id);
      if (!exists) {
        favoritePhotos.push(photo);
        wx.showToast({
          title: 'Ajouté aux favoris',
          icon: 'success',
          duration: 1000
        });
      }
    } else {
      favoritePhotos = favoritePhotos.filter(fav => fav.id !== photo.id);
      wx.showToast({
        title: 'Retiré des favoris',
        icon: 'none',
        duration: 1000
      });
    }
    wx.setStorageSync('favoritePhotos', favoritePhotos);
    console.log('Favoris mis à jour dans le stockage:', favoritePhotos);
  },

  buyItem: function(e) {
    const itemId = e.currentTarget.dataset.id;
    wx.showToast({
      title: `Article ${itemId} ajouté au panier !`,
      icon: 'success',
      duration: 1000
    });
  },

  voirPromotion() {
    wx.navigateTo({
      url: '/pages/promotion/promotion'
    });
  },

  goToArticleDetail: function(e) {
    const articleId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/descriptionAnnonce/descriptionAnnonce?id=${articleId}`
    });
  }
});