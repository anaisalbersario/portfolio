/* =========================================================
   CONTENU DU PORTFOLIO
   ---------------------------------------------------------
   Tout le texte et toutes les images des projets sont ici.
   L'ordre du tableau PROJECTS = l'ordre sur le site.

   Champs d'un projet :
   - paper / ink / accent : couleurs de la feuille du dossier
   - blurb   : la phrase d'accroche (accueil + page projet)
   - collage : les images posées sur la feuille d'accueil
               x, y, w = position et largeur en % ; r = rotation
               kind : "photo" (scotchée) | "pola" (polaroid) | "cut" (découpée N&B)
   - note    : annotation au feutre sur la feuille d'accueil

   Blocs des pages projet :
   { t:'title', h:'Titre', p:'texte' }
   { t:'full', src:'...', cap:'légende' }
   { t:'grid', cols:2|3|4|5, items:[...], offset:true, narrow:true }
   { t:'quote', text:'...', by:'...' }
   { t:'video', src:'...', poster:'...' }
   { t:'scatter', items:[{src, cap}] }      → polaroids à déplacer
   { t:'deck', items:[...] }                → slides empilées au scroll
   { t:'calendar' }                         → calendrier éditorial EÏA
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
    id: "retrospective-2025",
    title: "Rétrospective",
    name: "Rétrospective 2025",
    blurb: "Mon année 2025, imprimée, reliée, assumée.",
    cat: "Édition · Magazine",
    filter: ["print"],
    year: "2025",
    client: "Moi-même (la cliente la plus exigeante)",
    role: "Direction artistique, mise en page, photo",
    tools: "InDesign, Photoshop",
    deliverables: "Un magazine imprimé",
    cover: "media/magazine/couverture.jpg",
    thumb: "media/magazine/couverture.jpg",
    paper: "#efe9dc", ink: "#141212", accent: "#e8261c",
    collage: [
      { src: "media/magazine/mockup-2.jpg", x: 30, y: 4, w: 66, r: 2, kind: "photo" },
      { src: "media/magazine/couverture.jpg", x: 2, y: 22, w: 40, r: -5, kind: "pola", cap: "couv' — 2025" },
      { src: "media/photos/DSC00164.jpg", x: 70, y: 52, w: 24, r: 6, kind: "cut" }
    ],
    note: { text: "ma couv' préférée", x: 40, y: 78, arrow: "left" },
    lead: "Une année entière dans un magazine : les souvenirs, les leçons, les gens qui l'ont marquée. Pas un journal intime, un objet éditorial.",
    context: [
      "J'ai pris les codes de la presse (grille stricte, typo qui crie, rouge / noir / blanc) et je les ai mélangés à ce qui traîne au fond des poches : tickets, archives, fragments.",
      "C'est le projet qui a posé les bases de mon univers visuel. Ce portfolio en est le tome 2."
    ],
    missions: ["Ligne éditoriale & DA", "Grille et système typo", "Photos & retouche", "Mise en page, prépresse, impression"],
    blocks: [
      { t: "grid", cols: 2, items: ["media/magazine/couverture.jpg", { src: "media/photos/DSC00164.jpg" }] },
      { t: "full", src: "media/magazine/mockup-2.jpg", cap: "Double page « Family »" },
      { t: "quote", text: "A year traced in memories, lessons and quiet transformations.", by: "Quatrième de couverture" },
      { t: "full", src: "media/magazine/mockup-3.jpg", cap: "Double page, portraits" }
    ]
  },

  /* ---------------------------------------------------- 02 */
  {
    id: "affiches",
    title: "Affiches",
    name: "Affiches",
    blurb: "Sept formats, zéro place perdue.",
    cat: "Print · Affiche",
    filter: ["print"],
    year: "2024 — 2026",
    client: "Projets perso & école",
    role: "Conception graphique",
    tools: "Photoshop, Illustrator",
    deliverables: "Affiches A3 & 40×60",
    cover: "media/affiches/maroc.jpg",
    thumb: "media/affiches/maroc.jpg",
    paper: "#e8261c", ink: "#141212", accent: "#efe9dc",
    collage: [
      { src: "media/affiches/maroc.jpg", x: 4, y: 6, w: 38, r: -4, kind: "photo" },
      { src: "media/affiches/cap-agde.jpg", x: 38, y: 14, w: 34, r: 3, kind: "photo" },
      { src: "media/affiches/eyes-on-myself.jpg", x: 70, y: 2, w: 26, r: 7, kind: "photo" }
    ],
    note: { text: "imprimées en A3 !", x: 66, y: 74, arrow: "up" },
    lead: "L'affiche, c'est mon terrain de jeu préféré : une image, une idée, et quelques secondes pour convaincre quelqu'un qui marche vite.",
    context: [
      "Chaque affiche part d'une photo (souvent la mienne) et d'une contrainte : un slogan, une ville, une collection.",
      "Ce que je cherche à chaque fois : le point de tension entre l'image et la lettre. La typo qui devient fenêtre, qui se met debout, qui prend toute la place."
    ],
    missions: [
      "Maroc : typo massive, rouge partout, lumière de cinéma",
      "Cap d'Agde : la lettre comme fenêtre sur l'été",
      "Qloudlight : flou, mouvement, collection 2024",
      "5 fruits & légumes : la prévention qui donne faim",
      "Eyes on myself : le regard comme langage",
      "Big Ben · Nuit Blanche Paris 2025"
    ],
    blocks: [
      { t: "grid", cols: 2, items: [{ src: "media/affiches/maroc.jpg", cap: "Maroc, 2026" }, { src: "media/affiches/cap-agde.jpg", cap: "Cap d'Agde, Summer 2025" }] },
      { t: "quote", text: "La typo n'accompagne pas l'image. Elle la cadre.", by: "Note d'intention" },
      { t: "grid", cols: 3, items: [{ src: "media/affiches/qloudlight.jpg", cap: "Qloudlight, collection 2024" }, { src: "media/affiches/eyes-on-myself.jpg", cap: "Eyes on myself" }, { src: "media/affiches/5-fruits-legumes.jpg", cap: "5 fruits & légumes par jour" }] },
      { t: "grid", cols: 2, narrow: true, items: [{ src: "media/affiches/nuit-blanche.jpg", cap: "Nuit Blanche, Paris 2025" }, { src: "media/affiches/big-ben.jpg", cap: "Big Ben, Londres" }] }
    ]
  },

  /* ---------------------------------------------------- 03 */
  {
    id: "lab-of-the-year",
    title: "Lab of the Year",
    name: "Lab of the Year",
    blurb: "Une promo entière, un spot rouge, vue du ciel.",
    cat: "Direction artistique · Shooting",
    filter: ["da", "photo"],
    year: "2026",
    client: "ESD, projet de promo",
    role: "Direction artistique & photo",
    tools: "Lumix, Lightroom, Photoshop",
    deliverables: "21 portraits, 2 photos de groupe",
    cover: "media/lab/B1.jpg",
    thumb: "media/lab/P1166161.jpg",
    paper: "#111010", ink: "#efe9dc", accent: "#e8261c",
    collage: [
      { src: "media/lab/B1.jpg", x: 6, y: 4, w: 34, r: -3, kind: "photo" },
      { src: "media/lab/FillesGroupe.jpg", x: 40, y: 18, w: 30, r: 4, kind: "pola", cap: "les filles" },
      { src: "media/lab/BoysGroupe.jpg", x: 70, y: 4, w: 26, r: -6, kind: "pola", cap: "les garçons" }
    ],
    note: { text: "vue du ciel, spot rouge", x: 8, y: 80, arrow: "up" },
    lead: "Le « GQ Men of the Year », version école : chaque personne de la promo a eu droit à son tapis rouge.",
    context: [
      "Un spot rouge dans le noir, l'appareil à la verticale : le sol devient une scène, l'ombre portée devient un deuxième personnage.",
      "Un dispositif simple et répétable, pour une série où chaque personnalité ressort."
    ],
    missions: ["Concept & références", "Lumière : spot rouge, plongée totale", "Direction des poses", "Prise de vue & retouche"],
    blocks: [
      { t: "grid", cols: 2, items: ["media/lab/FillesGroupe.jpg", "media/lab/BoysGroupe.jpg"] },
      { t: "quote", text: "Le spot isole le sujet comme sur une scène de cérémonie.", by: "Intention" },
      { t: "grid", cols: 4, items: ["media/lab/P1166161.jpg", "media/lab/P1166199.jpg", "media/lab/P1166229.jpg", "media/lab/P1166246.jpg"] },
      { t: "grid", cols: 4, offset: true, items: ["media/lab/P1166330.jpg", "media/lab/P1166412.jpg", "media/lab/P1166436.jpg", "media/lab/P1166568-2.jpg"] },
      { t: "grid", cols: 4, items: ["media/lab/P1166615.jpg", "media/lab/P1166640.jpg", "media/lab/P1166766.jpg", "media/lab/P1166877-2.jpg"] },
      { t: "grid", cols: 4, offset: true, items: ["media/lab/P1166977.jpg", "media/lab/P1177008.jpg", "media/lab/P1177034.jpg", "media/lab/P1177087-2.jpg"] },
      { t: "grid", cols: 2, narrow: true, items: ["media/lab/P1177524-2.jpg", "media/lab/P1177567.jpg"] }
    ]
  },

  /* ---------------------------------------------------- 04 */
  {
    id: "eia-social",
    title: "EÏA, le feed",
    name: "EÏA — Social media",
    blurb: "Trois mois à faire respirer le feed d'un spa.",
    cat: "Social media · DA",
    filter: ["social", "da"],
    year: "2026",
    client: "EÏA Spa",
    role: "Chargée de com & assistante DA (stage)",
    tools: "Photoshop, InDesign, Canva, CapCut",
    deliverables: "Posts, carrousels, stories, Reels, calendriers, communiqués",
    cover: "media/eia/post_02-07-1.jpg",
    thumb: "media/eia/post_02-07-5.jpg",
    paper: "#f3e8da", ink: "#3b1512", accent: "#b5170f",
    collage: [
      { src: "media/eia/post_02-07-1.jpg", x: 4, y: 6, w: 30, r: -4, kind: "photo" },
      { src: "media/eia/post_04-06-1v2.jpg", x: 34, y: 2, w: 30, r: 3, kind: "photo" },
      { src: "media/eia/post_02-07-5.jpg", x: 64, y: 12, w: 30, r: -2, kind: "photo" },
      { src: "media/eia/story_08-07-2.jpg", x: 24, y: 52, w: 20, r: 6, kind: "pola", cap: "relais presse" }
    ],
    note: { text: "planifié au jour près", x: 52, y: 80, arrow: "left" },
    lead: "D'avril à juillet 2026, j'ai tenu la plume (et le calendrier) d'EÏA, une marque de bien-être qui installe ses spas dans des hôtels d'exception.",
    context: [
      "Le défi : une seule voix pour des lieux qui ne se ressemblent pas, du Cap d'Antibes à Megève, sans jamais trahir la charte.",
      "Le ton : poétique, sensoriel, épuré. Pas de superlatifs, pas de promesses médicales. Juste l'envie d'y être."
    ],
    missions: [
      "Calendriers éditoriaux Instagram & LinkedIn",
      "Carrousels, stories, scripts de Reels",
      "Légendes FR / EN",
      "Newsletters & communiqués de presse",
      "Collab EÏA × Womanizer",
      "Veille formats & grille Instagram"
    ],
    blocks: [
      { t: "title", h: "Le calendrier", p: "Tout a été pensé, produit et planifié. Clique sur un jour pour ouvrir les publications." },
      { t: "calendar" },
      { t: "title", h: "Le feed", p: "Matières, gestes, lumière d'hôtel. Le texte se pose comme une note." },
      { t: "grid", cols: 4, items: ["media/eia/post_02-07-1.jpg", "media/eia/post_02-07-2.jpg", "media/eia/post_02-07-3.jpg", "media/eia/post_02-07-4.jpg"] },
      { t: "grid", cols: 3, offset: true, items: ["media/eia/post_02-07-5.jpg", "media/eia/post_01-08-1.jpg", "media/eia/post_03-07-1.jpg"] },
      { t: "quote", text: "« Le temps suspend son rythme. »", by: "Carrousel Cap d'Antibes, juin 2026" },
      { t: "grid", cols: 4, items: ["media/eia/post_20-06-1.jpg", "media/eia/post_20-06-2.jpg", "media/eia/post_20-06-3.jpg", "media/eia/post_20-06-4.jpg"] },
      { t: "title", h: "Retraite Megève", p: "Une annonce aux airs de carte postale vintage." },
      { t: "grid", cols: 3, items: ["media/eia/post_04-06-1v2.jpg", "media/eia/post_04-06-2.jpg", "media/eia/post_04-06-3.jpg"] },
      { t: "grid", cols: 2, narrow: true, items: ["media/eia/post_04-06-4.jpg", "media/eia/post_04-06-5.jpg"] },
      { t: "title", h: "« J'ai choisi »", p: "Un format répété sur cinq lieux : ce qu'on devait faire, ce qu'on a choisi à la place." },
      { t: "grid", cols: 5, items: ["media/eia/post_05-07-1.jpg", "media/eia/post_05-07-2.jpg", "media/eia/post_05-07-3.jpg", "media/eia/post_05-07-4.jpg", "media/eia/post_05-07-5.jpg"] },
      { t: "title", h: "Stories & presse", p: "Stories éditoriales, relais presse, et le guide des bonnes adresses autour du spa." },
      { t: "grid", cols: 5, items: ["media/eia/story_04-08-2.jpg", "media/eia/story_04-08-3.jpg", "media/eia/story_04-08-4.jpg", "media/eia/story_04-08-5.jpg", "media/eia/story_04-08-6.jpg"] },
      { t: "grid", cols: 4, items: ["media/eia/story_08-07-1.jpg", "media/eia/story_08-07-2.jpg", "media/eia/story_08-07-3.jpg", "media/eia/story_08-07-4.jpg"] },
      { t: "grid", cols: 2, narrow: true, items: [{ video: "media/eia/reel_24-07-1.mp4" }, { video: "media/eia/reel_24-07-2.mp4" }] }
    ]
  },

  /* ---------------------------------------------------- 05 */
  {
    id: "rouge-maroc",
    title: "Rouge Maroc",
    name: "Rouge Maroc",
    blurb: "Le rouge comme passeport.",
    cat: "Direction artistique · Shooting",
    filter: ["da", "photo"],
    year: "2026",
    client: "Projet perso",
    role: "Direction artistique & photo",
    tools: "Photoshop, Lightroom",
    deliverables: "Série éditoriale + affiche",
    cover: "media/rouge/IMG_5202.jpg",
    thumb: "media/rouge/IMG_5194.jpg",
    paper: "#2a0907", ink: "#f3e9e4", accent: "#e8261c",
    collage: [
      { src: "media/rouge/IMG_5202.jpg", x: 6, y: 2, w: 32, r: -2, kind: "photo" },
      { src: "media/rouge/IMG_5193.jpg", x: 38, y: 30, w: 44, r: 3, kind: "photo" },
      { src: "media/rouge/IMG_5206.jpg", x: 72, y: 0, w: 24, r: 8, kind: "pola", cap: "prise 12" }
    ],
    note: { text: "tout est rouge, même la chaise", x: 6, y: 82, arrow: "right" },
    lead: "Un shooting streetwear inspiré de l'identité marocaine. Le fil rouge est littéral : force, passion, appartenance.",
    context: [
      "Ambiance sombre, lumière dure : les textures, les poses et les regards sortent du noir.",
      "Streetwear et références culturelles (bonnet tricoté à l'étoile, maillot) pour une image brute, urbaine et engagée."
    ],
    missions: ["Concept & palette", "Stylisme & accessoires", "Lumière & prise de vue", "Déclinaison en affiche"],
    blocks: [
      { t: "full", src: "media/rouge/IMG_5193.jpg" },
      { t: "grid", cols: 3, items: ["media/rouge/IMG_5194.jpg", "media/rouge/IMG_5202.jpg", "media/rouge/IMG_5206.jpg"] },
      { t: "quote", text: "Le rouge comme fil conducteur : force, passion, appartenance.", by: "Note d'intention" },
      { t: "grid", cols: 2, narrow: true, items: [{ src: "media/affiches/maroc.jpg", cap: "Déclinaison affiche" }] }
    ]
  },

  /* ---------------------------------------------------- 06 */
  {
    id: "eia-nouvelle-da",
    title: "Nouvelle DA",
    name: "EÏA — Shooting nouvelle DA",
    blurb: "Le spa sort de la cabine. En peignoir.",
    cat: "Direction artistique · Shooting",
    filter: ["da", "photo"],
    year: "2026",
    client: "EÏA Spa",
    role: "Assistante direction artistique",
    tools: "Moodboard, styling, Photoshop",
    deliverables: "Série photo réseaux sociaux & site",
    cover: "media/nda/9302.jpg",
    thumb: "media/nda/9377.jpg",
    paper: "#c9a37b", ink: "#2a1a10", accent: "#7a1f12",
    collage: [
      { src: "media/nda/9302.jpg", x: 4, y: 4, w: 30, r: -3, kind: "photo" },
      { src: "media/nda/9586.jpg", x: 34, y: 34, w: 40, r: 2, kind: "photo" },
      { src: "media/nda/9798.jpg", x: 72, y: 2, w: 24, r: 6, kind: "pola", cap: "do not disturb" }
    ],
    note: { text: "céréales sur marbre", x: 40, y: 12, arrow: "down" },
    lead: "La nouvelle direction artistique d'EÏA en une série : une cliente traverse l'hôtel en peignoir, de la réception jusqu'à la chambre. Le rituel ne s'arrête jamais.",
    context: [
      "L'idée : le bien-être n'est plus une pièce, c'est une façon d'habiter l'hôtel. Le peignoir devient costume, l'hôtel devient décor.",
      "Lunettes noires, céréales au petit-déj, masque LED : un ton complice et décalé pour parler à une cible plus jeune, sans perdre le côté premium."
    ],
    missions: ["Recherche & moodboard", "Repérages dans l'hôtel", "Accessoires & styling", "Direction de pose", "Sélection & retouche"],
    blocks: [
      { t: "grid", cols: 3, items: ["media/nda/9133.jpg", "media/nda/9209.jpg", "media/nda/9377.jpg"] },
      { t: "quote", text: "Le spa n'est plus une pièce. C'est une façon d'habiter l'hôtel.", by: "Intention de la série" },
      { t: "title", h: "Check-in", p: "La réception, la valise à stickers, le menu des soins tenu comme un journal." },
      { t: "grid", cols: 2, items: ["media/nda/9302.jpg", "media/nda/9383.jpg"] },
      { t: "grid", cols: 4, items: ["media/nda/9418.jpg", "media/nda/9428.jpg", "media/nda/9446.jpg", "media/nda/9449.jpg"] },
      { t: "title", h: "Breakfast club", p: "Céréales, marbre et lunettes noires." },
      { t: "full", src: "media/nda/9586.jpg" },
      { t: "grid", cols: 3, offset: true, items: ["media/nda/9520.jpg", "media/nda/9543.jpg", "media/nda/9580.jpg"] },
      { t: "title", h: "Do not disturb", p: "La chambre, dernier espace du soin : masque, carte, allumettes." },
      { t: "grid", cols: 3, items: ["media/nda/9783.jpg", "media/nda/9798.jpg", "media/nda/9810.jpg"] },
      { t: "scatter", items: [
        { src: "media/nda/9633.jpg", cap: "lumière ambrée" },
        { src: "media/nda/9673.jpg", cap: "détail menu" },
        { src: "media/nda/9821.jpg", cap: "allumettes" },
        { src: "media/nda/9852.jpg", cap: "jeu de cartes" },
        { src: "media/nda/9929.jpg", cap: "運, la chance" },
        { src: "media/nda/9758.jpg", cap: "couloir" }
      ] },
      { t: "full", src: "media/nda/9935.jpg", narrow: true }
    ]
  },

  /* ---------------------------------------------------- 07 */
  {
    id: "eia-womanizer",
    title: "Room Service",
    name: "EÏA × Womanizer",
    blurb: "Ne pas déranger (ou presque).",
    cat: "Concept · Collab de marque",
    filter: ["da", "social"],
    year: "2026",
    client: "EÏA × Womanizer",
    role: "Concept créatif & DA",
    tools: "InDesign, Photoshop",
    deliverables: "Dossier créatif, teaser, carrousel, stories, jeu concours",
    cover: "media/womanizer/p05.jpg",
    thumb: "media/eia/post_03-07-1.jpg",
    paper: "#d6d2be", ink: "#22221a", accent: "#e8552b",
    collage: [
      { src: "media/womanizer/p05.jpg", x: 4, y: 6, w: 58, r: -2, kind: "photo" },
      { src: "media/eia/post_03-07-1.jpg", x: 60, y: 22, w: 30, r: 5, kind: "pola", cap: "le post" },
      { src: "media/womanizer/p08.jpg", x: 18, y: 58, w: 36, r: 3, kind: "photo" }
    ],
    note: { text: "la cloche vibre…", x: 62, y: 4, arrow: "down" },
    lead: "Comment parler d'un objet intime sans jamais être vulgaire ? En le cachant sous une cloche d'argent, dans un room service d'hôtel rétro.",
    context: [
      "Avant l'ouverture : la tension, la curiosité. Après : une révélation élégante. Tout repose sur la suggestion.",
      "Le produit est traité comme un objet précieux, entouré des soins EÏA, comme dans un éditorial de luxe."
    ],
    missions: ["Concept « Room Service » & phrase de teasing", "Moodboard : hôtel rétro, cinéma, intimité", "Plan par plan des Reels", "Plan de contenus : teaser, post, story, jeu", "Brief influence : vlog & react"],
    blocks: [
      { t: "quote", text: "Un room service mystérieux, dans un hôtel chic, où une cloche vibrante intrigue.", by: "Le teasing en une phrase" },
      { t: "title", h: "Le dossier", p: "Le dossier créatif présenté à la marque, slide par slide." },
      { t: "deck", items: ["media/womanizer/p01.jpg", "media/womanizer/p03.jpg", "media/womanizer/p05.jpg", "media/womanizer/p06.jpg", "media/womanizer/p07.jpg", "media/womanizer/p08.jpg", "media/womanizer/p10.jpg", "media/womanizer/p11.jpg", "media/womanizer/p12.jpg", "media/womanizer/p13.jpg"] },
      { t: "title", h: "En ligne", p: "Le post de lancement sur le compte EÏA." },
      { t: "grid", cols: 3, items: ["media/eia/post_03-07-1.jpg", "media/eia/post_03-07-2.jpg", "media/eia/post_03-07-3.jpg"] }
    ]
  },

  /* ---------------------------------------------------- 08 */
  {
    id: "wemissu",
    title: "Wemissu",
    name: "WEMISSU",
    blurb: "Une marque qui n'existe pas. Un site qui marche.",
    cat: "Web design · CMS",
    filter: ["web"],
    year: "2025",
    client: "ESD, projet B2 (fictif)",
    role: "Webdesign & intégration",
    tools: "WordPress, WooCommerce, Elementor, Photoshop",
    deliverables: "Un e-shop fonctionnel",
    cover: "media/wemissu/f05.jpg",
    thumb: "media/wemissu/f01.jpg",
    video: "media/wemissu/wemissu.mp4",
    paper: "#c3d1dc", ink: "#101820", accent: "#e8261c",
    collage: [
      { src: "media/wemissu/f05.jpg", x: 4, y: 4, w: 60, r: -2, kind: "photo" },
      { src: "media/wemissu/f02.jpg", x: 46, y: 44, w: 48, r: 3, kind: "photo" },
      { src: "media/wemissu/f14.jpg", x: 8, y: 60, w: 30, r: -5, kind: "cut" }
    ],
    note: { text: "panier qui fonctionne !", x: 66, y: 12, arrow: "down" },
    lead: "WEMISSU, c'est une marque streetwear inventée de A à Z : une identité, un ton (« Plus qu'une marque, un mood. ») et une boutique en ligne qui tourne pour de vrai.",
    context: [
      "Contrastes forts, typo bold, mise en page dynamique : l'interface parle comme la culture urbaine qu'elle vend.",
      "Le parcours met les drops et les pièces clés en avant, jusqu'au panier et à l'espace client."
    ],
    missions: ["Identité & ton de marque", "Arborescence & parcours d'achat", "Accueil, catégories, produit, panier, compte", "Intégration WordPress / WooCommerce"],
    blocks: [
      { t: "video", src: "media/wemissu/wemissu.mp4", poster: "media/wemissu/f01.jpg", cap: "Le parcours complet, en capture" },
      { t: "grid", cols: 2, items: ["media/wemissu/f01.jpg", "media/wemissu/f02.jpg"] },
      { t: "grid", cols: 2, items: ["media/wemissu/f06.jpg", "media/wemissu/f08.jpg"] },
      { t: "grid", cols: 2, items: ["media/wemissu/f13.jpg", "media/wemissu/f14.jpg"] }
    ]
  },

  /* ---------------------------------------------------- 09 */
  {
    id: "dripped",
    title: "Dripped",
    name: "DRIPPED",
    blurb: "Ton dressing, en mieux habillé.",
    cat: "UI / UX · Application",
    filter: ["web"],
    year: "2026",
    client: "ESD, projet de groupe",
    role: "UI design & identité (avec Marwan & Marguerite)",
    tools: "Figma, Photoshop",
    deliverables: "Maquettes, prototype, identité, icône",
    cover: "media/dripped/01.jpg",
    thumb: "media/dripped/11.jpg",
    paper: "#1fc24a", ink: "#0e0e0e", accent: "#0e0e0e",
    collage: [
      { src: "media/dripped/09.jpg", x: 4, y: 6, w: 56, r: -2, kind: "photo" },
      { src: "media/dripped/11.jpg", x: 50, y: 40, w: 46, r: 3, kind: "photo" },
      { src: "media/dripped/01.jpg", x: 10, y: 62, w: 30, r: -6, kind: "pola", cap: "le logo" }
    ],
    note: { text: "un seul vert : #B9F218", x: 62, y: 8, arrow: "down" },
    lead: "DRIPPED, c'est l'appli qui range ton dressing : tu enregistres tes vêtements, tu habilles ton avatar, tu sauvegardes tes looks.",
    context: [
      "Une DA minimaliste, des contrastes forts, une hiérarchie claire. Et une seule touche de vert acide pour guider l'action.",
      "Le travail s'est concentré sur l'ergonomie, la navigation et la cohérence d'écran en écran."
    ],
    missions: ["Arborescence & user flow", "Écrans : accueil, dressing, création de look, looks, compte", "Identité : logo texturé, palette, typo, icône", "Prototype Figma"],
    blocks: [
      { t: "full", src: "media/dripped/intro.jpg" },
      { t: "grid", cols: 2, items: ["media/dripped/04.jpg", "media/dripped/05.jpg"] },
      { t: "grid", cols: 2, items: ["media/dripped/06.jpg", "media/dripped/07.jpg"] },
      { t: "title", h: "Les écrans", p: "Du dressing au look du jour." },
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
    name: "Photographie",
    blurb: "Ce que je regarde quand personne ne me le demande.",
    cat: "Photo · Retouche",
    filter: ["photo"],
    year: "2024 — 2026",
    client: "Moi, encore",
    role: "Prise de vue & retouche",
    tools: "Argentique, Sony, Lumix, Lightroom",
    deliverables: "Une série perso",
    cover: "media/photos/IMG_4161.jpg",
    thumb: "media/photos/DSC00164.jpg",
    paper: "#f25c1f", ink: "#141212", accent: "#141212",
    collage: [
      { src: "media/photos/IMG_4161.jpg", x: 6, y: 4, w: 30, r: -4, kind: "photo" },
      { src: "media/photos/DSC00164.jpg", x: 38, y: 12, w: 28, r: 3, kind: "pola", cap: "fin de journée" },
      { src: "media/photos/IMG_3823.jpg", x: 68, y: 2, w: 26, r: -2, kind: "photo" }
    ],
    note: { text: "pellicule & numérique", x: 40, y: 80, arrow: "up" },
    lead: "Des photos prises et retouchées par moi, certaines sur pellicule, d'autres au Sony ou au Lumix.",
    context: ["Architecture, lumière de fin de journée, néons de Soho : la photo nourrit tout le reste, du magazine aux affiches."],
    missions: ["Paris", "Londres", "Pellicule & numérique"],
    blocks: [
      { t: "grid", cols: 2, items: ["media/photos/DSC00164.jpg", "media/photos/IMG_4161.jpg"] },
      { t: "grid", cols: 3, offset: true, items: ["media/photos/IMG_3798.jpg", "media/photos/IMG_3822.jpg", "media/photos/IMG_3823.jpg"] },
      { t: "grid", cols: 2, narrow: true, items: ["media/photos/DSC00178.jpg", "media/photos/P1000239.jpg"] }
    ]
  }
];

/* Affiches sur la corde à linge (accueil) */
window.POSTERS = [
  { src: "media/affiches/maroc.jpg", t: "Maroc", y: "2026" },
  { src: "media/magazine/couverture.jpg", t: "Rétrospective", y: "2025" },
  { src: "media/affiches/cap-agde.jpg", t: "Cap d'Agde", y: "2025" },
  { src: "media/affiches/qloudlight.jpg", t: "Qloudlight", y: "2024" },
  { src: "media/affiches/eyes-on-myself.jpg", t: "Eyes on myself", y: "2025" },
  { src: "media/affiches/nuit-blanche.jpg", t: "Nuit Blanche", y: "2025" },
  { src: "media/affiches/5-fruits-legumes.jpg", t: "5 fruits & légumes", y: "2025" },
  { src: "media/affiches/big-ben.jpg", t: "Big Ben", y: "2025" }
];

/* Calendrier EÏA : publications par date (jj-mm) */
window.EIA_CALENDAR = {
  months: [
    { y: 2026, m: 5, name: "Juin", note: "lancement Megève !" },
    { y: 2026, m: 6, name: "Juillet", note: "le mois le plus chargé" },
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
