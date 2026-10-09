/* =========================================================
   CONTENU DU PORTFOLIO
   ---------------------------------------------------------
   Tout le texte et toutes les images des projets sont ici.
   Pour modifier un texte : change la valeur entre guillemets.
   Pour ajouter une image : mets-la dans /media/... et ajoute
   son chemin dans un bloc.

   Types de blocs disponibles :
   { t:'title', h:'Titre', p:'texte' }          → intertitre
   { t:'full', src:'...', cap:'légende' }        → image pleine largeur
   { t:'grid', cols:2|3|4|5, items:[...], offset:true, narrow:true }
   { t:'quote', text:'...', by:'...' }           → grande citation
   { t:'video', src:'...', poster:'...' }        → vidéo
   { t:'scatter', items:[{src, cap}] }           → polaroids à déplacer
   { t:'deck', items:[...] }                     → slides empilées au scroll
   { t:'calendar' }                              → calendrier éditorial EÏA
   ========================================================= */

window.SITE = {
  name: "Anaïs Albersario",
  email: "anaisalbersario22@gmail.com",
  instagram: "https://www.instagram.com/anaisalbersario",
  instagramHandle: "@anaisalbersario",
  linkedin: "https://www.linkedin.com/in/ana%C3%AFsalbersario",
  cv: "media/CV_Anais_Albersario.pdf"
};

window.PROJECTS = [
  /* ---------------------------------------------------- 01 */
  {
    id: "eia-social",
    title: "EÏA",
    titleHTML: 'E<span class="serif">Ï</span>A',
    name: "EÏA — Social media",
    subtitle: "Trois mois de contenus pour un spa holistique installé dans des hôtels d'exception.",
    cat: "Social media · DA",
    filter: ["social", "da"],
    year: "2026",
    client: "EÏA Spa",
    role: "Chargée de communication & assistante DA (stage)",
    tools: "Photoshop, InDesign, Canva, CapCut",
    deliverables: "Posts, carrousels, stories, Reels, calendriers éditoriaux, communiqués",
    cover: "media/eia/post_02-07-1.jpg",
    thumb: "media/eia/post_02-07-5.jpg",
    theme: { bg: "#f3eee4", fg: "#3b1512", accent: "#b5170f" },
    lead: "D'avril à juillet 2026, j'ai rejoint l'équipe communication d'EÏA, une marque de bien-être holistique qui installe ses spas dans des hôtels partenaires en France.",
    context: [
      "Mon rôle : faire vivre une même voix sur des lieux très différents — le Cap d'Antibes Beach Hotel, l'Hôtel Hana, l'Hôtel de Buci, une retraite à Megève — en respectant l'identité de chaque adresse et la charte EÏA.",
      "Le ton : poétique, sensoriel, épuré. Pas de superlatifs, pas d'allégations médicales."
    ],
    missions: [
      "Calendriers éditoriaux Instagram & LinkedIn multi-lieux",
      "Carrousels, Stories, scripts de Reels",
      "Légendes bilingues FR / EN",
      "Newsletters et communiqués de presse",
      "Collaborations de marque (EÏA × Womanizer)",
      "Veille formats et suivi de la grille Instagram"
    ],
    blocks: [
      { t: "title", h: "Calendrier éditorial", p: "Chaque contenu a été pensé, produit et planifié. Clique sur un jour pour ouvrir les publications." },
      { t: "calendar" },
      { t: "title", h: "Le feed", p: "Une grille chaude et tactile : matières, gestes, lumière d'hôtel. Le texte se pose comme une note." },
      { t: "grid", cols: 4, items: ["media/eia/post_02-07-1.jpg", "media/eia/post_02-07-2.jpg", "media/eia/post_02-07-3.jpg", "media/eia/post_02-07-4.jpg"] },
      { t: "grid", cols: 3, offset: true, items: ["media/eia/post_02-07-5.jpg", "media/eia/post_01-08-1.jpg", "media/eia/post_03-07-1.jpg"] },
      { t: "quote", text: "« Le temps suspend son rythme. »", by: "Carrousel Cap d'Antibes — juin 2026" },
      { t: "grid", cols: 4, items: ["media/eia/post_20-06-1.jpg", "media/eia/post_20-06-2.jpg", "media/eia/post_20-06-3.jpg", "media/eia/post_20-06-4.jpg"] },
      { t: "title", h: "Retraite Megève", p: "Un carrousel d'annonce aux codes d'affiche vintage : carte postale, typographie serif, montagne." },
      { t: "grid", cols: 3, items: ["media/eia/post_04-06-1v2.jpg", "media/eia/post_04-06-2.jpg", "media/eia/post_04-06-3.jpg"] },
      { t: "grid", cols: 2, narrow: true, items: ["media/eia/post_04-06-4.jpg", "media/eia/post_04-06-5.jpg"] },
      { t: "title", h: "Série « J'ai choisi »", p: "Un format répété sur cinq lieux : ce qu'on devait faire, ce qu'on a choisi à la place." },
      { t: "grid", cols: 5, items: ["media/eia/post_05-07-1.jpg", "media/eia/post_05-07-2.jpg", "media/eia/post_05-07-3.jpg", "media/eia/post_05-07-4.jpg", "media/eia/post_05-07-5.jpg"] },
      { t: "title", h: "Stories & presse", p: "Stories éditoriales, relais presse et guide des adresses autour du spa." },
      { t: "grid", cols: 5, items: ["media/eia/story_04-08-2.jpg", "media/eia/story_04-08-3.jpg", "media/eia/story_04-08-4.jpg", "media/eia/story_04-08-5.jpg", "media/eia/story_04-08-6.jpg"] },
      { t: "grid", cols: 4, items: ["media/eia/story_08-07-1.jpg", "media/eia/story_08-07-2.jpg", "media/eia/story_08-07-3.jpg", "media/eia/story_08-07-4.jpg"] },
      { t: "grid", cols: 2, narrow: true, items: [{ video: "media/eia/reel_24-07-1.mp4" }, { video: "media/eia/reel_24-07-2.mp4" }] }
    ]
  },

  /* ---------------------------------------------------- 02 */
  {
    id: "eia-nouvelle-da",
    title: "Nouvelle DA",
    titleHTML: 'Nouvelle <span class="serif">DA</span>',
    name: "EÏA — Shooting nouvelle DA",
    subtitle: "Un séjour en peignoir : le spa sort de la cabine et s'invite dans tout l'hôtel.",
    cat: "Direction artistique · Shooting",
    filter: ["da", "photo"],
    year: "2026",
    client: "EÏA Spa",
    role: "Assistante direction artistique",
    tools: "Moodboard, styling, retouche Photoshop",
    deliverables: "Série photo pour les réseaux sociaux et le site",
    cover: "media/nda/9302.jpg",
    thumb: "media/nda/9377.jpg",
    theme: { bg: "#2a1a10", fg: "#f1e6d6", accent: "#d08a4a" },
    lead: "Shooting de la nouvelle direction artistique d'EÏA : une cliente traverse l'hôtel en peignoir, de la réception jusqu'à la chambre, comme un rituel qui ne s'arrête jamais.",
    context: [
      "L'idée : sortir le bien-être de la cabine de soin. Le peignoir devient un costume, l'hôtel un décor de cinéma — boiseries, lumière ambrée, marbre.",
      "Le ton est complice et décalé (lunettes noires, céréales au petit-déjeuner, masque LED) pour parler à une cible plus jeune sans perdre le côté premium."
    ],
    missions: [
      "Recherche et moodboard",
      "Repérage des espaces de l'hôtel",
      "Accessoires & styling (menus de soins, valise, carte)",
      "Direction de pose sur le plateau",
      "Sélection et retouche"
    ],
    blocks: [
      { t: "grid", cols: 3, items: ["media/nda/9133.jpg", "media/nda/9209.jpg", "media/nda/9377.jpg"] },
      { t: "quote", text: "Le spa n'est plus une pièce. C'est une façon d'habiter l'hôtel.", by: "Intention de la série" },
      { t: "title", h: "Check-in", p: "La réception, la valise à stickers, le menu des soins tenu comme un journal." },
      { t: "grid", cols: 2, items: ["media/nda/9302.jpg", "media/nda/9383.jpg"] },
      { t: "grid", cols: 4, items: ["media/nda/9418.jpg", "media/nda/9428.jpg", "media/nda/9446.jpg", "media/nda/9449.jpg"] },
      { t: "title", h: "Breakfast club", p: "Céréales, marbre et lunettes noires : un petit-déjeuner qui casse les codes du luxe." },
      { t: "full", src: "media/nda/9586.jpg" },
      { t: "grid", cols: 3, offset: true, items: ["media/nda/9520.jpg", "media/nda/9543.jpg", "media/nda/9580.jpg"] },
      { t: "title", h: "Do not disturb", p: "La chambre devient le dernier espace du soin : masque, carte, allumettes." },
      { t: "grid", cols: 3, items: ["media/nda/9783.jpg", "media/nda/9798.jpg", "media/nda/9810.jpg"] },
      { t: "scatter", items: [
        { src: "media/nda/9633.jpg", cap: "lumière ambrée" },
        { src: "media/nda/9673.jpg", cap: "détail menu" },
        { src: "media/nda/9821.jpg", cap: "allumettes" },
        { src: "media/nda/9852.jpg", cap: "jeu de cartes" },
        { src: "media/nda/9929.jpg", cap: "運 — chance" },
        { src: "media/nda/9758.jpg", cap: "couloir" }
      ] },
      { t: "full", src: "media/nda/9935.jpg", narrow: true }
    ]
  },

  /* ---------------------------------------------------- 03 */
  {
    id: "eia-womanizer",
    title: "EÏA × Womanizer",
    titleHTML: 'EÏA <span class="serif">×</span> Womanizer',
    name: "EÏA × Womanizer",
    subtitle: "« Room Service » — un objet intime caché sous une cloche d'argent.",
    cat: "Concept · Collaboration",
    filter: ["da", "social"],
    year: "2026",
    client: "EÏA × Womanizer",
    role: "Concept créatif & direction artistique",
    tools: "InDesign, Photoshop",
    deliverables: "Dossier créatif, teaser, carrousel, stories, jeu concours",
    cover: "media/womanizer/p05.jpg",
    thumb: "media/eia/post_03-07-1.jpg",
    theme: { bg: "#d8d4c0", fg: "#22221a", accent: "#e8552b" },
    lead: "Pour la collaboration entre EÏA et Womanizer, j'ai imaginé « Room Service » : une scène d'hôtel rétro où une cloche vibrante attire l'attention avant de révéler le produit.",
    context: [
      "Le défi : parler d'un objet intime sans jamais être vulgaire. La réponse : la suggestion. Avant l'ouverture, la tension. Après l'ouverture, une révélation élégante.",
      "Le produit est traité comme un objet précieux, entouré des soins EÏA — flacons, textures, accessoires — comme dans un éditorial de luxe."
    ],
    missions: [
      "Concept « Room Service » et phrase de teasing",
      "Moodboard : hôtel rétro, cinéma, intimité",
      "Plan par plan du Reel teaser et du Reel complet",
      "Plan de contenus : teaser, post, story, jeu concours",
      "Brief influence : vlog & react"
    ],
    blocks: [
      { t: "quote", text: "Un room service mystérieux dans un hôtel chic, où une cloche vibrante intrigue.", by: "Teasing en une phrase" },
      { t: "title", h: "Le dossier", p: "Le dossier créatif présenté à la marque, slide par slide." },
      { t: "deck", items: ["media/womanizer/p01.jpg", "media/womanizer/p03.jpg", "media/womanizer/p05.jpg", "media/womanizer/p06.jpg", "media/womanizer/p07.jpg", "media/womanizer/p08.jpg", "media/womanizer/p10.jpg", "media/womanizer/p11.jpg", "media/womanizer/p12.jpg", "media/womanizer/p13.jpg"] },
      { t: "title", h: "En ligne", p: "Le post de lancement sur le compte EÏA." },
      { t: "grid", cols: 3, items: ["media/eia/post_03-07-1.jpg", "media/eia/post_03-07-2.jpg", "media/eia/post_03-07-3.jpg"] }
    ]
  },

  /* ---------------------------------------------------- 04 */
  {
    id: "retrospective-2025",
    title: "Rétrospective",
    titleHTML: 'Rétro<span class="serif">spective</span>',
    name: "Rétrospective 2025",
    subtitle: "Un magazine personnel : une année racontée en photos, en tickets et en fragments.",
    cat: "Édition · Magazine",
    filter: ["print"],
    year: "2025",
    client: "Projet personnel",
    role: "Conception, mise en page, photographie",
    tools: "InDesign, Photoshop",
    deliverables: "Magazine imprimé",
    cover: "media/magazine/couverture.jpg",
    thumb: "media/magazine/couverture.jpg",
    theme: { bg: "#eeeae1", fg: "#121010", accent: "#e8261c" },
    lead: "Rétrospective 2025 est mon année mise en magazine : des souvenirs, des leçons et les personnes qui l'ont marquée.",
    context: [
      "J'ai repris les codes de la presse — grille structurée, typographie forte, contrastes rouge / noir / blanc — et je les ai mélangés à des éléments plus intimes : tickets, archives, fragments.",
      "C'est le projet qui a posé les bases de mon identité visuelle, et de ce portfolio."
    ],
    missions: [
      "Direction artistique et ligne éditoriale",
      "Grille et système typographique",
      "Photographie et retouche",
      "Mise en page et préparation à l'impression"
    ],
    blocks: [
      { t: "grid", cols: 2, items: ["media/magazine/couverture.jpg", { src: "media/photos/DSC00164.jpg" }] },
      { t: "full", src: "media/magazine/mockup-2.jpg", cap: "Double page « Family »" },
      { t: "quote", text: "A year traced in memories, lessons and quiet transformations.", by: "Quatrième de couverture" },
      { t: "full", src: "media/magazine/mockup-3.jpg", cap: "Double page — portraits" }
    ]
  },

  /* ---------------------------------------------------- 05 */
  {
    id: "affiches",
    title: "Affiches",
    titleHTML: 'Affi<span class="serif">ches</span>',
    name: "Affiches",
    subtitle: "Sept affiches, sept façons de faire tenir une idée dans un format.",
    cat: "Print · Affiche",
    filter: ["print"],
    year: "2024 — 2026",
    client: "Projets personnels & école",
    role: "Conception graphique",
    tools: "Photoshop, Illustrator",
    deliverables: "Affiches A3 / 40×60",
    cover: "media/affiches/maroc.jpg",
    thumb: "media/affiches/maroc.jpg",
    theme: { bg: "#e8261c", fg: "#121010", accent: "#121010" },
    lead: "Sensibilisation, événement, mode, voyage : l'affiche est mon terrain de jeu préféré pour tester la typographie et la composition.",
    context: [
      "Chaque affiche part d'une photo — souvent la mienne — et d'une contrainte : un slogan, une ville, une collection.",
      "Je cherche toujours le point de tension entre l'image et la lettre : la typo qui devient fenêtre, verticale, monumentale."
    ],
    missions: [
      "Maroc — typographie massive, rouge dominant, lumière cinéma",
      "Cap d'Agde — la lettre comme fenêtre sur l'été",
      "Qloudlight — collection 2024, flou et mouvement",
      "5 fruits et légumes — campagne de prévention",
      "Eyes on myself — le regard comme langage",
      "Big Ben · Nuit Blanche Paris 2025"
    ],
    blocks: [
      { t: "grid", cols: 2, items: [{ src: "media/affiches/maroc.jpg", cap: "Maroc — 2026" }, { src: "media/affiches/cap-agde.jpg", cap: "Cap d'Agde — Summer 2025" }] },
      { t: "quote", text: "La typo n'accompagne pas l'image. Elle la cadre.", by: "Note d'intention" },
      { t: "grid", cols: 3, items: [{ src: "media/affiches/qloudlight.jpg", cap: "Qloudlight — Collection 2024" }, { src: "media/affiches/eyes-on-myself.jpg", cap: "Eyes on myself" }, { src: "media/affiches/5-fruits-legumes.jpg", cap: "5 fruits & légumes par jour" }] },
      { t: "grid", cols: 2, narrow: true, items: [{ src: "media/affiches/nuit-blanche.jpg", cap: "Nuit Blanche — Paris 2025" }, { src: "media/affiches/big-ben.jpg", cap: "Big Ben — Londres" }] }
    ]
  },

  /* ---------------------------------------------------- 06 */
  {
    id: "lab-of-the-year",
    title: "Lab of the Year",
    titleHTML: 'Lab <span class="serif">of the</span> Year',
    name: "Lab of the Year",
    subtitle: "Un spot rouge, une vue du dessus, une promo entière sur le tapis rouge.",
    cat: "Direction artistique · Shooting",
    filter: ["da", "photo"],
    year: "2026",
    client: "ESD — projet de promo",
    role: "Direction artistique & photographie",
    tools: "Lumix, Lightroom, Photoshop",
    deliverables: "21 portraits, 2 photos de groupe",
    cover: "media/lab/B1.jpg",
    thumb: "media/lab/P1166161.jpg",
    theme: { bg: "#0a0a0a", fg: "#f2ede6", accent: "#d0231b" },
    lead: "Inspiré de l'esthétique « GQ Men of the Year », ce shooting met en scène chaque personne comme sur un tapis rouge de cérémonie.",
    context: [
      "Le spotlight rouge isole le sujet dans le noir. La plongée verticale transforme le sol en scène, et l'ombre portée devient un deuxième personnage.",
      "Un dispositif simple et répétable, pour une série cohérente où chaque personnalité ressort."
    ],
    missions: [
      "Concept & références",
      "Mise en lumière (spot rouge, cadrage en plongée)",
      "Direction des poses",
      "Prise de vue et retouche"
    ],
    blocks: [
      { t: "grid", cols: 2, items: ["media/lab/FillesGroupe.jpg", "media/lab/BoysGroupe.jpg"] },
      { t: "quote", text: "Le spotlight rouge isole le sujet comme sur une scène de cérémonie.", by: "Intention" },
      { t: "grid", cols: 4, items: ["media/lab/P1166161.jpg", "media/lab/P1166199.jpg", "media/lab/P1166229.jpg", "media/lab/P1166246.jpg"] },
      { t: "grid", cols: 4, offset: true, items: ["media/lab/P1166330.jpg", "media/lab/P1166412.jpg", "media/lab/P1166436.jpg", "media/lab/P1166568-2.jpg"] },
      { t: "grid", cols: 4, items: ["media/lab/P1166615.jpg", "media/lab/P1166640.jpg", "media/lab/P1166766.jpg", "media/lab/P1166877-2.jpg"] },
      { t: "grid", cols: 4, offset: true, items: ["media/lab/P1166977.jpg", "media/lab/P1177008.jpg", "media/lab/P1177034.jpg", "media/lab/P1177087-2.jpg"] },
      { t: "grid", cols: 2, narrow: true, items: ["media/lab/P1177524-2.jpg", "media/lab/P1177567.jpg"] }
    ]
  },

  /* ---------------------------------------------------- 07 */
  {
    id: "rouge-maroc",
    title: "Rouge Maroc",
    titleHTML: 'Rouge <span class="serif">Maroc</span>',
    name: "Rouge Maroc",
    subtitle: "Un shooting streetwear où le rouge raconte l'appartenance.",
    cat: "Direction artistique · Shooting",
    filter: ["da", "photo"],
    year: "2026",
    client: "Projet personnel",
    role: "Direction artistique & photographie",
    tools: "Photoshop, Lightroom",
    deliverables: "Série éditoriale + affiche",
    cover: "media/rouge/IMG_5202.jpg",
    thumb: "media/rouge/IMG_5194.jpg",
    theme: { bg: "#160606", fg: "#f2e9e4", accent: "#e8261c" },
    lead: "Un shooting éditorial inspiré de l'identité marocaine, avec le rouge comme fil conducteur : force, passion, appartenance.",
    context: [
      "Une ambiance sombre et cinématographique. La lumière contrastée sculpte les textures, les poses et les regards.",
      "Le stylisme mêle streetwear et références culturelles marocaines (bonnet tricoté à l'étoile, maillot) pour une image brute, urbaine et engagée."
    ],
    missions: ["Concept & palette", "Stylisme et accessoires", "Lumière et prise de vue", "Déclinaison en affiche"],
    blocks: [
      { t: "full", src: "media/rouge/IMG_5193.jpg" },
      { t: "grid", cols: 3, items: ["media/rouge/IMG_5194.jpg", "media/rouge/IMG_5202.jpg", "media/rouge/IMG_5206.jpg"] },
      { t: "quote", text: "Le rouge comme fil conducteur : force, passion, appartenance.", by: "Note d'intention" },
      { t: "grid", cols: 2, narrow: true, items: [{ src: "media/affiches/maroc.jpg", cap: "Déclinaison affiche" }] }
    ]
  },

  /* ---------------------------------------------------- 08 */
  {
    id: "wemissu",
    title: "Wemissu",
    titleHTML: 'Wemi<span class="serif">ssu</span>',
    name: "WEMISSU",
    subtitle: "Le site e-commerce d'une marque streetwear fictive, construit sur WordPress.",
    cat: "Web design · CMS",
    filter: ["web"],
    year: "2025",
    client: "ESD — projet B2 (fictif)",
    role: "Webdesign & intégration CMS",
    tools: "WordPress, WooCommerce, Elementor, Photoshop",
    deliverables: "Site e-commerce fonctionnel",
    cover: "media/wemissu/f05.jpg",
    thumb: "media/wemissu/f01.jpg",
    video: "media/wemissu/wemissu.mp4",
    theme: { bg: "#f6f5f1", fg: "#0d0d0d", accent: "#e8261c" },
    lead: "WEMISSU est une marque streetwear imaginée de A à Z : identité, ton (« Plus qu'une marque, un mood. »), et une boutique en ligne qui fonctionne.",
    context: [
      "L'interface reprend les codes de la culture urbaine et de l'édition : contrastes forts, typographie bold, mise en page dynamique.",
      "Côté UX, le parcours met en avant les collections, les drops et les pièces clés, jusqu'au panier et à l'espace client."
    ],
    missions: [
      "Identité et ton de marque",
      "Arborescence et parcours d'achat",
      "Pages accueil, catégories, produit, panier, compte",
      "Intégration WordPress / WooCommerce"
    ],
    blocks: [
      { t: "video", src: "media/wemissu/wemissu.mp4", poster: "media/wemissu/f01.jpg", cap: "Parcours complet du site — capture" },
      { t: "grid", cols: 2, items: ["media/wemissu/f01.jpg", "media/wemissu/f02.jpg"] },
      { t: "grid", cols: 2, items: ["media/wemissu/f06.jpg", "media/wemissu/f08.jpg"] },
      { t: "grid", cols: 2, items: ["media/wemissu/f13.jpg", "media/wemissu/f14.jpg"] }
    ]
  },

  /* ---------------------------------------------------- 09 */
  {
    id: "dripped",
    title: "Dripped",
    titleHTML: 'Drip<span class="serif">ped</span>',
    name: "DRIPPED",
    subtitle: "Une app de dressing où l'on habille son avatar avec ses propres vêtements.",
    cat: "UI / UX · Application",
    filter: ["web"],
    year: "2026",
    client: "ESD — projet de groupe",
    role: "UI design, identité visuelle (avec Marwan & Marguerite)",
    tools: "Figma, Photoshop",
    deliverables: "Maquettes, prototype, identité, icône",
    cover: "media/dripped/01.jpg",
    thumb: "media/dripped/11.jpg",
    theme: { bg: "#1a1a1a", fg: "#f0f0f0", accent: "#b9f218" },
    lead: "DRIPPED est une application de dressing interactif : on enregistre ses vêtements, on crée ses tenues sur un avatar, on les sauvegarde.",
    context: [
      "Direction artistique minimaliste, contrastes forts, hiérarchie claire — avec une seule touche de vert acide (#B9F218) pour guider l'action.",
      "Le travail s'est concentré sur l'ergonomie, la navigation et la cohérence graphique d'écran en écran."
    ],
    missions: ["Arborescence et user flow", "Écrans : accueil, dressing, création de look, looks enregistrés, compte", "Identité : logo texturé, palette, typographie, icône", "Prototype Figma"],
    blocks: [
      { t: "full", src: "media/dripped/intro.jpg" },
      { t: "grid", cols: 2, items: ["media/dripped/04.jpg", "media/dripped/05.jpg"] },
      { t: "grid", cols: 2, items: ["media/dripped/06.jpg", "media/dripped/07.jpg"] },
      { t: "title", h: "Écrans", p: "Du dressing au look du jour." },
      { t: "full", src: "media/dripped/09.jpg" },
      { t: "grid", cols: 2, items: ["media/dripped/10.jpg", "media/dripped/11.jpg"] },
      { t: "grid", cols: 2, items: ["media/dripped/12.jpg", "media/dripped/13.jpg"] },
      { t: "grid", cols: 2, items: ["media/dripped/08.jpg", "media/dripped/14.jpg"] },
      { t: "full", src: "media/dripped/03.jpg", cap: "User flow" }
    ]
  },

  /* ---------------------------------------------------- 10 */
  {
    id: "photographie",
    title: "Photographie",
    titleHTML: 'Photo<span class="serif">graphie</span>',
    name: "Photographie",
    subtitle: "Argentique, Sony, Lumix : ce que je regarde quand personne ne me le demande.",
    cat: "Photo · Retouche",
    filter: ["photo"],
    year: "2024 — 2026",
    client: "Personnel",
    role: "Prise de vue & retouche",
    tools: "Argentique, Sony, Lumix, Lightroom",
    deliverables: "Série personnelle",
    cover: "media/photos/IMG_4161.jpg",
    thumb: "media/photos/DSC00164.jpg",
    theme: { bg: "#eeeae1", fg: "#121010", accent: "#1f4fa3" },
    lead: "Une sélection de photos prises et retouchées par moi — certaines sur pellicule, d'autres au Sony ou au Lumix.",
    context: ["Architecture, lumière de fin de journée, néons de Soho : la photo nourrit tout le reste de mon travail, du magazine aux affiches."],
    missions: ["Paris", "Londres", "Pellicule & numérique"],
    blocks: [
      { t: "grid", cols: 2, items: ["media/photos/DSC00164.jpg", "media/photos/IMG_4161.jpg"] },
      { t: "grid", cols: 3, offset: true, items: ["media/photos/IMG_3798.jpg", "media/photos/IMG_3822.jpg", "media/photos/IMG_3823.jpg"] },
      { t: "grid", cols: 2, narrow: true, items: ["media/photos/DSC00178.jpg", "media/photos/P1000239.jpg"] }
    ]
  }
];

/* Filtres de l'index (accueil) */
window.FILTERS = [
  { id: "all", label: "Tout" },
  { id: "da", label: "Direction artistique" },
  { id: "social", label: "Social media" },
  { id: "print", label: "Print & édition" },
  { id: "web", label: "Web & UI" },
  { id: "photo", label: "Photo" }
];

/* Calendrier EÏA : publications par date (jj-mm) */
window.EIA_CALENDAR = {
  months: [
    { y: 2026, m: 5, name: "Juin", note: "lancement Megève !" },
    { y: 2026, m: 6, name: "Juillet", note: "mois le plus chargé" },
    { y: 2026, m: 7, name: "Août", note: "" }
  ],
  days: {
    "04-06": ["post_04-06-1v2", "post_04-06-1", "post_04-06-2", "post_04-06-3", "post_04-06-4", "post_04-06-5"],
    "20-06": ["post_20-06-1", "post_20-06-2", "post_20-06-3", "post_20-06-4"],
    "02-07": ["post_02-07-1", "post_02-07-2", "post_02-07-3", "post_02-07-4", "post_02-07-5"],
    "03-07": ["post_03-07-1", "post_03-07-2", "post_03-07-3"],
    "05-07": ["post_05-07-1", "post_05-07-2", "post_05-07-3", "post_05-07-4", "post_05-07-5"],
    "06-07": ["story_06-07-2", "story_06-07-3"],
    "07-07": ["story_07-07-2", "story_07-07-3"],
    "08-07": ["story_08-07-1", "story_08-07-2", "story_08-07-3", "story_08-07-4", "story_08-07-5"],
    "09-07": ["post_09-07-1", "post_09-07-2"],
    "10-07": ["story_10-07-2", "story_10-07-3"],
    "22-07": ["post_22-07-1"],
    "24-07": ["reel:reel_24-07-1", "reel:reel_24-07-2"],
    "29-07": ["post_29-07-1", "post_29-07-2"],
    "01-08": ["post_01-08-1"],
    "04-08": ["story_04-08-2", "story_04-08-3", "story_04-08-4", "story_04-08-5", "story_04-08-6", "story_04-08-7"],
    "08-08": ["story_08-08-2", "story_08-08-3"]
  },
  highlight: ["03-07", "04-06"],
  notes: { "03-07": "× Womanizer", "08-07": "presse" }
};
