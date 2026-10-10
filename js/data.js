/* =========================================================
   CONTENU DU PORTFOLIO (FR + EN)
   ---------------------------------------------------------
   Tout le texte et toutes les images des projets sont ici.
   L'ordre du tableau PROJECTS = l'ordre sur le site.
   La version anglaise de chaque texte est dans « en: { ... } ».

   Champs d'un projet :
   - paper / ink / accent : couleurs du dossier
   - blurb   : la phrase d'accroche
   - collage : les images posées dans le dossier ouvert
               x, y, w = position et largeur en % ; r = rotation
               kind : "photo" (scotchée) | "pola" (polaroid) | "cut" (découpée N&B)
   - note    : annotation au feutre dans le dossier ouvert

   Blocs des pages projet (ajoute en:{...} pour l'anglais) :
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
    year: "2025",
    client: "Moi-même (la cliente la plus exigeante)",
    role: "Direction artistique, mise en page, photo",
    tools: "InDesign, Photoshop",
    deliverables: "Un magazine imprimé",
    cover: "media/magazine/couverture.jpg",
    thumb: "media/magazine/couverture.jpg",
    paper: "#efe9dc", ink: "#141212", accent: "#e8261c",
    collage: [
      { src: "media/magazine/mockup-2.jpg", x: 26, y: 4, w: 70, r: 2, kind: "photo" },
      { src: "media/magazine/couverture.jpg", x: 2, y: 30, w: 40, r: -5, kind: "pola", cap: "couv' — 2025", cap_en: "cover — 2025" },
      { src: "media/photos/DSC00164.jpg", x: 70, y: 52, w: 25, r: 6, kind: "cut" }
    ],
    note: { text: "ma couv' préférée", text_en: "my favourite cover", x: 44, y: 84, arrow: "left" },
    lead: "Une année entière dans un magazine : les souvenirs, les leçons, les gens qui l'ont marquée. Pas un journal intime, un objet éditorial.",
    context: [
      "J'ai pris les codes de la presse (grille stricte, typo qui crie, rouge / noir / blanc) et je les ai mélangés à ce qui traîne au fond des poches : tickets, archives, fragments.",
      "C'est le projet qui a posé les bases de mon univers visuel. Ce portfolio en est le tome 2."
    ],
    missions: ["Ligne éditoriale & DA", "Grille et système typo", "Photos & retouche", "Mise en page, prépresse, impression"],
    en: {
      title: "Retrospective", name: "Retrospective 2025", blurb: "My 2025, printed, bound and owned.", cat: "Editorial · Magazine",
      client: "Myself (the toughest client)", role: "Art direction, layout, photography", deliverables: "A printed magazine",
      lead: "A whole year in a magazine: the memories, the lessons, the people who shaped it. Not a diary, an editorial object.",
      context: [
        "I took the codes of the press (strict grid, loud type, red / black / white) and mixed them with what you find at the bottom of your pockets: tickets, archives, fragments.",
        "This is the project that set the foundations of my visual world. This portfolio is volume 2."
      ],
      missions: ["Editorial line & AD", "Grid and type system", "Photos & retouching", "Layout, prepress, printing"]
    },
    blocks: [
      { t: "grid", cols: 2, items: ["media/magazine/couverture.jpg", { src: "media/photos/DSC00164.jpg" }] },
      { t: "full", src: "media/magazine/mockup-2.jpg", cap: "Double page « Family »", cap_en: "“Family” spread" },
      { t: "quote", text: "A year traced in memories, lessons and quiet transformations.", by: "Quatrième de couverture", en: { by: "Back cover" } },
      { t: "full", src: "media/magazine/mockup-3.jpg", cap: "Double page, portraits", cap_en: "Portraits spread" }
    ]
  },

  /* ---------------------------------------------------- 02 */
  {
    id: "affiches",
    title: "Affiches",
    name: "Affiches",
    blurb: "Sept formats, zéro place perdue.",
    cat: "Print · Affiche",
    year: "2024 — 2026",
    client: "Projets perso & école",
    role: "Conception graphique",
    tools: "Photoshop, Illustrator",
    deliverables: "Affiches A3 & 40×60",
    cover: "media/affiches/maroc.jpg",
    thumb: "media/affiches/maroc.jpg",
    paper: "#e8261c", ink: "#141212", accent: "#efe9dc",
    collage: [
      { src: "media/affiches/maroc.jpg", x: 4, y: 6, w: 36, r: -4, kind: "photo" },
      { src: "media/affiches/cap-agde.jpg", x: 36, y: 14, w: 33, r: 3, kind: "photo" },
      { src: "media/affiches/eyes-on-myself.jpg", x: 68, y: 2, w: 28, r: 7, kind: "photo" }
    ],
    note: { text: "imprimées en A3 !", text_en: "printed in A3!", x: 64, y: 80, arrow: "up" },
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
    en: {
      title: "Posters", name: "Posters", blurb: "Seven formats, zero wasted space.", cat: "Print · Poster",
      client: "Personal & school projects", role: "Graphic design", deliverables: "A3 & 40×60 posters",
      lead: "Posters are my favourite playground: one image, one idea, and a few seconds to convince someone walking fast.",
      context: [
        "Each poster starts from a photo (often mine) and a constraint: a slogan, a city, a collection.",
        "What I'm always looking for: the tension point between image and letter. Type that becomes a window, that stands up, that takes all the space."
      ],
      missions: [
        "Maroc: massive type, red everywhere, cinema lighting",
        "Cap d'Agde: letters as a window onto summer",
        "Qloudlight: blur, motion, 2024 collection",
        "5 fruits & veg a day: prevention that makes you hungry",
        "Eyes on myself: the gaze as a language",
        "Big Ben · Nuit Blanche Paris 2025"
      ]
    },
    blocks: [
      { t: "grid", cols: 2, items: [{ src: "media/affiches/maroc.jpg", cap: "Maroc, 2026" }, { src: "media/affiches/cap-agde.jpg", cap: "Cap d'Agde, Summer 2025" }] },
      { t: "quote", text: "La typo n'accompagne pas l'image. Elle la cadre.", by: "Note d'intention", en: { text: "Type doesn't follow the image. It frames it.", by: "Statement of intent" } },
      { t: "grid", cols: 3, items: [{ src: "media/affiches/qloudlight.jpg", cap: "Qloudlight, collection 2024" }, { src: "media/affiches/eyes-on-myself.jpg", cap: "Eyes on myself" }, { src: "media/affiches/5-fruits-legumes.jpg", cap: "5 fruits & légumes par jour", cap_en: "5 fruits & veg a day" }] },
      { t: "grid", cols: 2, narrow: true, items: [{ src: "media/affiches/nuit-blanche.jpg", cap: "Nuit Blanche, Paris 2025" }, { src: "media/affiches/big-ben.jpg", cap: "Big Ben, Londres", cap_en: "Big Ben, London" }] }
    ]
  },

  /* ---------------------------------------------------- 03 */
  {
    id: "lab-of-the-year",
    title: "Lab of the Year",
    name: "Lab of the Year",
    blurb: "Une promo entière, un spot rouge, vue du ciel.",
    cat: "Direction artistique · Shooting",
    year: "2026",
    client: "ESD, projet de promo",
    role: "Direction artistique & photo",
    tools: "Lumix, Lightroom, Photoshop",
    deliverables: "21 portraits, 2 photos de groupe",
    cover: "media/lab/P1166161.jpg",
    thumb: "media/lab/P1166161.jpg",
    paper: "#111010", ink: "#efe9dc", accent: "#e8261c",
    collage: [
      { src: "media/lab/P1166161.jpg", x: 4, y: 4, w: 32, r: -3, kind: "photo" },
      { src: "media/lab/P1166330.jpg", x: 36, y: 18, w: 30, r: 4, kind: "pola", cap: "portrait n°07", cap_en: "portrait no.07" },
      { src: "media/lab/P1177034.jpg", x: 68, y: 4, w: 28, r: -6, kind: "pola", cap: "portrait n°18", cap_en: "portrait no.18" }
    ],
    note: { text: "un spot, une personne", text_en: "one spot, one person", x: 8, y: 84, arrow: "up" },
    lead: "Le « GQ Men of the Year », version école : chaque personne de la promo a eu droit à son tapis rouge.",
    context: [
      "Un spot rouge dans le noir, l'appareil à la verticale : le sol devient une scène, l'ombre portée devient un deuxième personnage.",
      "Un dispositif simple et répétable, pour une série où chaque personnalité ressort."
    ],
    missions: ["Concept & références", "Lumière : spot rouge, plongée totale", "Direction des poses", "Prise de vue & retouche"],
    en: {
      blurb: "A whole class, one red spotlight, seen from above.", cat: "Art direction · Photoshoot",
      client: "ESD, class project", role: "Art direction & photography", deliverables: "21 portraits, 2 group shots",
      lead: "GQ's “Men of the Year”, school edition: everyone in the class got their own red carpet.",
      context: [
        "A red spotlight in the dark, the camera pointing straight down: the floor becomes a stage, the cast shadow becomes a second character.",
        "A simple, repeatable set-up for a series where every personality stands out."
      ],
      missions: ["Concept & references", "Lighting: red spot, full top-down", "Posing direction", "Shooting & retouching"]
    },
    blocks: [
      { t: "grid", cols: 4, items: ["media/lab/P1166161.jpg", "media/lab/P1166199.jpg", "media/lab/P1166229.jpg", "media/lab/P1166246.jpg"] },
      { t: "quote", text: "Le spot isole le sujet comme sur une scène de cérémonie.", by: "Intention", en: { text: "The spotlight isolates the subject like an awards-night stage.", by: "Intent" } },
      { t: "grid", cols: 4, offset: true, items: ["media/lab/P1166330.jpg", "media/lab/P1166412.jpg", "media/lab/P1166436.jpg", "media/lab/P1166568-2.jpg"] },
      { t: "grid", cols: 4, items: ["media/lab/P1166615.jpg", "media/lab/P1166640.jpg", "media/lab/P1166766.jpg", "media/lab/P1166877-2.jpg"] },
      { t: "grid", cols: 4, offset: true, items: ["media/lab/P1166977.jpg", "media/lab/P1177008.jpg", "media/lab/P1177034.jpg", "media/lab/P1177087-2.jpg"] },
      { t: "grid", cols: 3, items: ["media/lab/P1177524-2.jpg", "media/lab/P1177567.jpg", "media/lab/B1.jpg"] },
      { t: "title", h: "Et tous ensemble", p: "Les deux photos de groupe pour finir.", en: { h: "All together", p: "The two group shots to wrap it up." } },
      { t: "grid", cols: 2, items: ["media/lab/FillesGroupe.jpg", "media/lab/BoysGroupe.jpg"] }
    ]
  },

  /* ---------------------------------------------------- 04 */
  {
    id: "eia-social",
    title: "EÏA, le feed",
    name: "EÏA — Social media",
    blurb: "Trois mois à faire respirer le feed d'un spa.",
    cat: "Social media · DA",
    year: "2026",
    client: "EÏA Spa",
    role: "Chargée de com & assistante DA (stage)",
    tools: "Photoshop, InDesign, Canva, CapCut",
    deliverables: "Posts, carrousels, stories, Reels, calendriers, communiqués",
    cover: "media/eia/post_02-07-1.jpg",
    thumb: "media/eia/post_02-07-5.jpg",
    paper: "#f3e8da", ink: "#3b1512", accent: "#b5170f",
    collage: [
      { src: "media/eia/post_02-07-1.jpg", x: 4, y: 6, w: 29, r: -4, kind: "photo" },
      { src: "media/eia/post_04-06-1v2.jpg", x: 35, y: 2, w: 29, r: 3, kind: "photo" },
      { src: "media/eia/post_02-07-5.jpg", x: 66, y: 10, w: 29, r: -2, kind: "photo" },
      { src: "media/eia/story_08-07-2.jpg", x: 22, y: 54, w: 21, r: 6, kind: "pola", cap: "relais presse", cap_en: "press" }
    ],
    note: { text: "planifié au jour près", text_en: "planned to the day", x: 50, y: 82, arrow: "left" },
    lead: "D'avril à juillet 2026, j'ai tenu la plume (et le calendrier) d'EÏA, une marque de bien-être qui installe ses spas dans des hôtels d'exception.",
    context: [
      "Le défi : une seule voix pour des lieux qui ne se ressemblent pas, du Cap d'Antibes à Megève, sans jamais trahir la charte.",
      "Le ton : poétique, sensoriel, épuré. Pas de superlatifs, pas de promesses médicales. Juste l'envie d'y être."
    ],
    missions: ["Calendriers éditoriaux Instagram & LinkedIn", "Carrousels, stories, scripts de Reels", "Légendes FR / EN", "Newsletters & communiqués de presse", "Collab EÏA × Womanizer", "Veille formats & grille Instagram"],
    en: {
      title: "EÏA, the feed", name: "EÏA — Social media", blurb: "Three months making a spa's feed breathe.", cat: "Social media · AD",
      role: "Communication & junior AD intern", deliverables: "Posts, carousels, stories, Reels, calendars, press releases",
      lead: "From April to July 2026, I held the pen (and the calendar) for EÏA, a wellness brand running spas inside exceptional hotels.",
      context: [
        "The challenge: one voice for places that look nothing alike, from Cap d'Antibes to Megève, without ever breaking the brand guidelines.",
        "The tone: poetic, sensory, pared-back. No superlatives, no medical claims. Just the urge to be there."
      ],
      missions: ["Instagram & LinkedIn editorial calendars", "Carousels, stories, Reels scripts", "FR / EN captions", "Newsletters & press releases", "EÏA × Womanizer collab", "Format watch & Instagram grid"]
    },
    blocks: [
      { t: "title", h: "Le feed, en vrai", p: "Touche une story, ouvre un post, fais glisser les carrousels. Comme sur ton téléphone.", en: { h: "The feed, for real", p: "Tap a story, open a post, swipe the carousels. Just like on your phone." } },
      { t: "phone" },
      { t: "quote", text: "« Le temps suspend son rythme. »", by: "Carrousel Cap d'Antibes, juin 2026", en: { text: "“Time slows its pace.”", by: "Cap d'Antibes carousel, June 2026" } },
      { t: "title", h: "Les carrousels", p: "Chaque série rangée dans sa pochette. Attrape-la et fais-la défiler.", en: { h: "The carousels", p: "Each series in its own plastic sleeve. Grab it and drag." } },
      { t: "strips", kind: "posts" },
      { t: "title", h: "Stories & Reels", p: "Le guide du quartier, les rituels, la lumière : format vertical.", en: { h: "Stories & Reels", p: "The neighbourhood guide, the rituals, the light: vertical format." } },
      { t: "strips", kind: "stories" },
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
    year: "2026",
    client: "Projet perso",
    role: "Direction artistique & photo",
    tools: "Photoshop, Lightroom",
    deliverables: "Série éditoriale + affiche",
    cover: "media/rouge/IMG_5202.jpg",
    thumb: "media/rouge/IMG_5194.jpg",
    paper: "#2a0907", ink: "#f3e9e4", accent: "#e8261c",
    collage: [
      { src: "media/rouge/IMG_5202.jpg", x: 6, y: 2, w: 30, r: -2, kind: "photo" },
      { src: "media/rouge/IMG_5193.jpg", x: 36, y: 34, w: 44, r: 3, kind: "photo" },
      { src: "media/rouge/IMG_5206.jpg", x: 72, y: 0, w: 24, r: 8, kind: "pola", cap: "prise 12", cap_en: "take 12" }
    ],
    note: { text: "tout est rouge, même la chaise", text_en: "everything's red, even the chair", x: 4, y: 86, arrow: "right" },
    lead: "Un shooting streetwear inspiré de l'identité marocaine. Le fil rouge est littéral : force, passion, appartenance.",
    context: [
      "Ambiance sombre, lumière dure : les textures, les poses et les regards sortent du noir.",
      "Streetwear et références culturelles (bonnet tricoté à l'étoile, maillot) pour une image brute, urbaine et engagée."
    ],
    missions: ["Concept & palette", "Stylisme & accessoires", "Lumière & prise de vue", "Déclinaison en affiche"],
    en: {
      title: "Rouge Maroc", blurb: "Red as a passport.", cat: "Art direction · Photoshoot",
      client: "Personal project", role: "Art direction & photography", deliverables: "Editorial series + poster",
      lead: "A streetwear shoot inspired by Moroccan identity. The red thread is literal: strength, passion, belonging.",
      context: [
        "Dark mood, hard light: textures, poses and gazes emerge from the black.",
        "Streetwear and cultural references (star-knit beanie, football jersey) for a raw, urban, committed image."
      ],
      missions: ["Concept & palette", "Styling & props", "Lighting & shooting", "Poster adaptation"]
    },
    blocks: [
      { t: "full", src: "media/rouge/IMG_5193.jpg" },
      { t: "grid", cols: 3, items: ["media/rouge/IMG_5194.jpg", "media/rouge/IMG_5202.jpg", "media/rouge/IMG_5206.jpg"] },
      { t: "quote", text: "Le rouge comme fil conducteur : force, passion, appartenance.", by: "Note d'intention", en: { text: "Red as the common thread: strength, passion, belonging.", by: "Statement of intent" } },
      { t: "grid", cols: 2, narrow: true, items: [{ src: "media/affiches/maroc.jpg", cap: "Déclinaison affiche", cap_en: "Poster version" }] }
    ]
  },

  /* ---------------------------------------------------- 06 */
  {
    id: "eia-nouvelle-da",
    title: "Nouvelle DA",
    name: "EÏA — Shooting nouvelle DA",
    blurb: "Le spa sort de la cabine. En peignoir.",
    cat: "Direction artistique · Shooting",
    year: "2026",
    client: "EÏA Spa",
    role: "Assistante direction artistique",
    tools: "Moodboard, styling, Photoshop",
    deliverables: "Série photo réseaux sociaux & site",
    cover: "media/nda/9302.jpg",
    thumb: "media/nda/9377.jpg",
    paper: "#c9a37b", ink: "#2a1a10", accent: "#7a1f12",
    collage: [
      { src: "media/nda/9302.jpg", x: 4, y: 4, w: 29, r: -3, kind: "photo" },
      { src: "media/nda/9586.jpg", x: 32, y: 38, w: 42, r: 2, kind: "photo" },
      { src: "media/nda/9798.jpg", x: 72, y: 2, w: 24, r: 6, kind: "pola", cap: "do not disturb" }
    ],
    note: { text: "céréales sur marbre", text_en: "cereal on marble", x: 40, y: 10, arrow: "down" },
    lead: "La nouvelle direction artistique d'EÏA en une série : une cliente traverse l'hôtel en peignoir, de la réception jusqu'à la chambre. Le rituel ne s'arrête jamais.",
    context: [
      "L'idée : le bien-être n'est plus une pièce, c'est une façon d'habiter l'hôtel. Le peignoir devient costume, l'hôtel devient décor.",
      "Lunettes noires, céréales au petit-déj, masque LED : un ton complice et décalé pour parler à une cible plus jeune, sans perdre le côté premium."
    ],
    missions: ["Recherche & moodboard", "Repérages dans l'hôtel", "Accessoires & styling", "Direction de pose", "Sélection & retouche"],
    en: {
      title: "New AD", name: "EÏA — New art direction shoot", blurb: "The spa leaves the treatment room. In a bathrobe.", cat: "Art direction · Photoshoot",
      role: "Junior art director", tools: "Moodboard, styling, Photoshop", deliverables: "Photo series for social media & website",
      lead: "EÏA's new art direction in one series: a guest crosses the hotel in a bathrobe, from reception to her room. The ritual never stops.",
      context: [
        "The idea: wellness is no longer a room, it's a way of living in the hotel. The bathrobe becomes a costume, the hotel a film set.",
        "Sunglasses, cereal at breakfast, an LED mask: a playful, offbeat tone to reach a younger audience without losing the premium feel."
      ],
      missions: ["Research & moodboard", "Location scouting in the hotel", "Props & styling", "Posing direction", "Selection & retouching"]
    },
    blocks: [
      { t: "grid", cols: 3, items: ["media/nda/9133.jpg", "media/nda/9209.jpg", "media/nda/9377.jpg"] },
      { t: "quote", text: "Le spa n'est plus une pièce. C'est une façon d'habiter l'hôtel.", by: "Intention de la série", en: { text: "The spa isn't a room anymore. It's a way of living in the hotel.", by: "Series intent" } },
      { t: "title", h: "Check-in", p: "La réception, la valise à stickers, le menu des soins tenu comme un journal.", en: { p: "Reception, the sticker-covered suitcase, the treatment menu held like a newspaper." } },
      { t: "grid", cols: 2, items: ["media/nda/9302.jpg", "media/nda/9383.jpg"] },
      { t: "grid", cols: 4, items: ["media/nda/9418.jpg", "media/nda/9428.jpg", "media/nda/9446.jpg", "media/nda/9449.jpg"] },
      { t: "title", h: "Breakfast club", p: "Céréales, marbre et lunettes noires.", en: { p: "Cereal, marble and sunglasses." } },
      { t: "full", src: "media/nda/9586.jpg" },
      { t: "grid", cols: 3, offset: true, items: ["media/nda/9520.jpg", "media/nda/9543.jpg", "media/nda/9580.jpg"] },
      { t: "title", h: "Do not disturb", p: "La chambre, dernier espace du soin : masque, carte, allumettes.", en: { p: "The room, the last space of the ritual: mask, card, matches." } },
      { t: "grid", cols: 3, items: ["media/nda/9783.jpg", "media/nda/9798.jpg", "media/nda/9810.jpg"] },
      { t: "scatter", items: [
        { src: "media/nda/9633.jpg", cap: "lumière ambrée", cap_en: "amber light" },
        { src: "media/nda/9673.jpg", cap: "détail menu", cap_en: "menu detail" },
        { src: "media/nda/9821.jpg", cap: "allumettes", cap_en: "matches" },
        { src: "media/nda/9852.jpg", cap: "jeu de cartes", cap_en: "card game" },
        { src: "media/nda/9929.jpg", cap: "運, la chance", cap_en: "運, luck" },
        { src: "media/nda/9758.jpg", cap: "couloir", cap_en: "hallway" }
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
      { src: "media/eia/post_03-07-1.jpg", x: 62, y: 20, w: 30, r: 5, kind: "pola", cap: "le post", cap_en: "the post" },
      { src: "media/womanizer/p08.jpg", x: 16, y: 58, w: 38, r: 3, kind: "photo" }
    ],
    note: { text: "la cloche vibre…", text_en: "the cloche buzzes…", x: 62, y: 4, arrow: "down" },
    lead: "Comment parler d'un objet intime sans jamais être vulgaire ? En le cachant sous une cloche d'argent, dans un room service d'hôtel rétro.",
    context: [
      "Avant l'ouverture : la tension, la curiosité. Après : une révélation élégante. Tout repose sur la suggestion.",
      "Le produit est traité comme un objet précieux, entouré des soins EÏA, comme dans un éditorial de luxe."
    ],
    missions: ["Concept « Room Service » & phrase de teasing", "Moodboard : hôtel rétro, cinéma, intimité", "Plan par plan des Reels", "Plan de contenus : teaser, post, story, jeu", "Brief influence : vlog & react"],
    en: {
      blurb: "Do not disturb (well, almost).", cat: "Concept · Brand collab",
      role: "Creative concept & AD", deliverables: "Creative deck, teaser, carousel, stories, giveaway",
      lead: "How do you talk about an intimate object without ever being vulgar? By hiding it under a silver cloche, in a retro hotel room service.",
      context: [
        "Before the reveal: tension, curiosity. After: an elegant reveal. Everything relies on suggestion.",
        "The product is treated like a precious object, surrounded by EÏA's care products, as in a luxury editorial."
      ],
      missions: ["“Room Service” concept & teasing line", "Moodboard: retro hotel, cinema, intimacy", "Shot-by-shot Reels", "Content plan: teaser, post, story, giveaway", "Influencer brief: vlog & react"]
    },
    blocks: [
      { t: "quote", text: "Un room service mystérieux, dans un hôtel chic, où une cloche vibrante intrigue.", by: "Le teasing en une phrase", en: { text: "A mysterious room service, in a chic hotel, where a buzzing cloche intrigues.", by: "The teaser in one line" } },
      { t: "title", h: "Le dossier", p: "Le dossier créatif présenté à la marque, slide par slide.", en: { h: "The deck", p: "The creative deck presented to the brand, slide by slide." } },
      { t: "deck", items: ["media/womanizer/p01.jpg", "media/womanizer/p03.jpg", "media/womanizer/p05.jpg", "media/womanizer/p06.jpg", "media/womanizer/p07.jpg", "media/womanizer/p08.jpg", "media/womanizer/p10.jpg", "media/womanizer/p11.jpg", "media/womanizer/p12.jpg", "media/womanizer/p13.jpg"] },
      { t: "title", h: "En ligne", p: "Le post de lancement sur le compte EÏA.", en: { h: "Live", p: "The launch post on EÏA's account." } },
      { t: "grid", cols: 3, items: ["media/eia/post_03-07-1.jpg", "media/eia/post_03-07-2.jpg", "media/eia/post_03-07-3.jpg"] }
    ]
  },

  /* ---------------------------------------------------- 08 */
  {
    id: "wemissu",
    title: "Wemissu",
    name: "WEMISSU — e-shop CMS",
    blurb: "Une vraie marque streetwear, une boutique imaginée de A à Z.",
    cat: "Web design · CMS",
    year: "2025",
    client: "ESD, projet CMS de 2e année (site non publié)",
    role: "Webdesign & intégration WordPress",
    tools: "WordPress, WooCommerce, Elementor, Photoshop",
    deliverables: "Un e-shop fonctionnel, en local",
    cover: "media/wemissu/f05.jpg",
    thumb: "media/wemissu/f01.jpg",
    paper: "#c3d1dc", ink: "#101820", accent: "#e8261c",
    collage: [
      { src: "media/wemissu/f05.jpg", x: 4, y: 4, w: 60, r: -2, kind: "photo" },
      { src: "media/wemissu/f02.jpg", x: 44, y: 46, w: 50, r: 3, kind: "photo" },
      { src: "media/wemissu/f14.jpg", x: 6, y: 62, w: 32, r: -5, kind: "cut" }
    ],
    note: { text: "le panier marche (en local) !", text_en: "the cart works (locally)!", x: 60, y: 12, arrow: "down" },
    lead: "Pour mon projet CMS de 2e année, j'ai conçu et intégré sur WordPress une boutique en ligne pour WEMISSU, une marque streetwear qui existe déjà. Exercice d'école : le site n'a jamais été mis en ligne.",
    context: [
      "Je suis partie de l'univers de la marque (« Plus qu'une marque, un mood. ») pour imaginer l'e-shop qu'elle pourrait avoir : contrastes forts, typo bold, mise en page dynamique.",
      "Le parcours met les drops et les pièces clés en avant, jusqu'au panier et à l'espace client. Tout fonctionne, en local."
    ],
    missions: ["Analyse de la marque et de son univers", "Arborescence & parcours d'achat", "Accueil, catégories, produit, panier, compte", "Intégration WordPress / WooCommerce / Elementor"],
    en: {
      name: "WEMISSU — CMS e-shop", blurb: "A real streetwear brand, an online shop imagined from scratch.",
      client: "ESD, 2nd-year CMS project (never published)", role: "Web design & WordPress build", deliverables: "A working e-shop, running locally",
      lead: "For my 2nd-year CMS project, I designed and built a WordPress online shop for WEMISSU, an existing streetwear brand. A school exercise: the site was never published.",
      context: [
        "I started from the brand's world (“More than a brand, a mood.”) to imagine the e-shop it could have: strong contrasts, bold type, dynamic layouts.",
        "The journey puts drops and key pieces first, all the way to the cart and the customer account. Everything works, locally."
      ],
      missions: ["Brand & universe analysis", "Site map & purchase journey", "Home, categories, product, cart, account", "WordPress / WooCommerce / Elementor build"]
    },
    blocks: [
      { t: "video", src: "media/wemissu/wemissu.mp4", poster: "media/wemissu/f01.jpg", cap: "Le parcours complet, filmé en local", cap_en: "The full journey, screen-recorded locally" },
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
      { src: "media/dripped/11.jpg", x: 48, y: 42, w: 46, r: 3, kind: "photo" },
      { src: "media/dripped/01.jpg", x: 8, y: 62, w: 30, r: -6, kind: "pola", cap: "le logo", cap_en: "the logo" }
    ],
    note: { text: "un seul vert : #B9F218", text_en: "one green only: #B9F218", x: 62, y: 8, arrow: "down" },
    lead: "DRIPPED, c'est l'appli qui range ton dressing : tu enregistres tes vêtements, tu habilles ton avatar, tu sauvegardes tes looks.",
    context: [
      "Une DA minimaliste, des contrastes forts, une hiérarchie claire. Et une seule touche de vert acide pour guider l'action.",
      "Le travail s'est concentré sur l'ergonomie, la navigation et la cohérence d'écran en écran."
    ],
    missions: ["Arborescence & user flow", "Écrans : accueil, dressing, création de look, looks, compte", "Identité : logo texturé, palette, typo, icône", "Prototype Figma"],
    en: {
      blurb: "Your wardrobe, better dressed.", cat: "UI / UX · App",
      client: "ESD, group project", role: "UI design & identity (with Marwan & Marguerite)", deliverables: "Mock-ups, prototype, identity, app icon",
      lead: "DRIPPED is the app that sorts out your wardrobe: save your clothes, dress your avatar, keep your looks.",
      context: [
        "Minimal art direction, strong contrasts, a clear hierarchy. And one single touch of acid green to guide the action.",
        "The work focused on usability, navigation and consistency from screen to screen."
      ],
      missions: ["Site map & user flow", "Screens: home, wardrobe, outfit builder, looks, account", "Identity: textured logo, palette, type, icon", "Figma prototype"]
    },
    blocks: [
      { t: "full", src: "media/dripped/intro.jpg" },
      { t: "grid", cols: 2, items: ["media/dripped/04.jpg", "media/dripped/05.jpg"] },
      { t: "grid", cols: 2, items: ["media/dripped/06.jpg", "media/dripped/07.jpg"] },
      { t: "title", h: "Les écrans", p: "Du dressing au look du jour.", en: { h: "The screens", p: "From the wardrobe to the look of the day." } },
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
    year: "2024 — 2026",
    client: "Moi, encore",
    role: "Prise de vue & retouche",
    tools: "Argentique, Sony, Lumix, Lightroom",
    deliverables: "Une série perso",
    cover: "media/photos/IMG_4161.jpg",
    thumb: "media/photos/DSC00164.jpg",
    paper: "#f25c1f", ink: "#141212", accent: "#141212",
    collage: [
      { src: "media/photos/IMG_4161.jpg", x: 6, y: 4, w: 29, r: -4, kind: "photo" },
      { src: "media/photos/DSC00164.jpg", x: 37, y: 12, w: 28, r: 3, kind: "pola", cap: "fin de journée", cap_en: "golden hour" },
      { src: "media/photos/IMG_3823.jpg", x: 68, y: 2, w: 26, r: -2, kind: "photo" }
    ],
    note: { text: "pellicule & numérique", text_en: "film & digital", x: 40, y: 84, arrow: "up" },
    lead: "Des photos prises et retouchées par moi, certaines sur pellicule, d'autres au Sony ou au Lumix.",
    context: ["Architecture, lumière de fin de journée, néons de Soho : la photo nourrit tout le reste, du magazine aux affiches."],
    missions: ["Paris", "Londres", "Pellicule & numérique"],
    en: {
      title: "Photography", name: "Photography", blurb: "What I look at when nobody's asking.", cat: "Photo · Retouching",
      client: "Me, again", role: "Shooting & retouching", tools: "Film, Sony, Lumix, Lightroom", deliverables: "A personal series",
      lead: "Photos I took and retouched myself, some on film, others on a Sony or a Lumix.",
      context: ["Architecture, late-afternoon light, Soho neons: photography feeds everything else, from the magazine to the posters."],
      missions: ["Paris", "London", "Film & digital"]
    },
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
  { src: "media/magazine/couverture.jpg", t: "Rétrospective", t_en: "Retrospective", y: "2025" },
  { src: "media/affiches/cap-agde.jpg", t: "Cap d'Agde", y: "2025" },
  { src: "media/affiches/qloudlight.jpg", t: "Qloudlight", y: "2024" },
  { src: "media/affiches/eyes-on-myself.jpg", t: "Eyes on myself", y: "2025" },
  { src: "media/affiches/nuit-blanche.jpg", t: "Nuit Blanche", y: "2025" },
  { src: "media/affiches/5-fruits-legumes.jpg", t: "5 fruits & légumes", t_en: "5 fruits & veg", y: "2025" },
  { src: "media/affiches/big-ben.jpg", t: "Big Ben", y: "2025" }
];

/* Le feed EÏA (téléphone + pochettes)
   posts : du plus récent au plus ancien. files = les slides du carrousel. */
window.EIA_FEED = {
  handle: "EÏA",
  avatar: "media/eia/story_08-07-5.jpg",
  bio: "Spa holistique · Créateurs de protocoles pour les marques",
  bio_en: "Holistic spa · Wellness protocols for brands",
  posts: [
    { date: "01.08", files: ["post_01-08-1"], cap: "Come as you are, leave a little lighter.", cap_en: "Come as you are, leave a little lighter." },
    { date: "29.07", files: ["post_29-07-1", "post_29-07-2"], cap: "The EÏA Guide — Alignment is the new glow", cap_en: "The EÏA Guide — Alignment is the new glow" },
    { date: "24.07", video: "reel_24-07-1", cap: "Reel — le rituel en mouvement", cap_en: "Reel — the ritual in motion" },
    { date: "22.07", files: ["post_22-07-1"], cap: "La récompense après le travail", cap_en: "The reward after work" },
    { date: "09.07", files: ["post_09-07-1", "post_09-07-2"], cap: "Carte postale d'un spa", cap_en: "Postcard from a spa" },
    { date: "08.07", files: ["story_08-07-1", "story_08-07-2", "story_08-07-3", "story_08-07-4", "story_08-07-5"], cap: "Revue de presse", cap_en: "Press review" },
    { date: "05.07", files: ["post_05-07-1", "post_05-07-2", "post_05-07-3", "post_05-07-4", "post_05-07-5"], cap: "« J'ai choisi »", cap_en: "“I chose”" },
    { date: "03.07", files: ["post_03-07-1", "post_03-07-2", "post_03-07-3"], cap: "EÏA × Womanizer — Kundalini Bliss", cap_en: "EÏA × Womanizer — Kundalini Bliss" },
    { date: "02.07", files: ["post_02-07-1", "post_02-07-2", "post_02-07-3", "post_02-07-4", "post_02-07-5"], cap: "Au spa by EÏA de l'Hôtel Hana", cap_en: "At the spa by EÏA, Hôtel Hana" },
    { date: "24.07", video: "reel_24-07-2", cap: "Reel — gestes & matières", cap_en: "Reel — gestures & textures" },
    { date: "20.06", files: ["post_20-06-1", "post_20-06-2", "post_20-06-3", "post_20-06-4"], cap: "Cap d'Antibes Beach Hotel", cap_en: "Cap d'Antibes Beach Hotel" },
    { date: "04.06", files: ["post_04-06-1v2", "post_04-06-1", "post_04-06-2", "post_04-06-3", "post_04-06-4", "post_04-06-5"], cap: "Retraite Megève", cap_en: "Megève retreat" }
  ],
  stories: [
    { label: "Guide", files: ["story_04-08-2", "story_04-08-3", "story_04-08-4", "story_04-08-5", "story_04-08-6", "story_04-08-7"], date: "04.08" },
    { label: "60 min", files: ["story_08-08-2", "story_08-08-3"], date: "08.08" },
    { label: "Lumière", label_en: "Light", files: ["story_10-07-2", "story_10-07-3"], date: "10.07" },
    { label: "Rituel", label_en: "Ritual", files: ["story_07-07-2", "story_07-07-3"], date: "07.07" },
    { label: "Bains", label_en: "Baths", files: ["story_06-07-2", "story_06-07-3"], date: "06.07" }
  ]
};
