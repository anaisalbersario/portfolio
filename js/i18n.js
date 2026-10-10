/* =========================================================
   FR / EN
   ---------------------------------------------------------
   Le français est écrit directement dans les pages.
   Ici : les traductions anglaises.
   - EN_HTML : textes de l'accueil (attribut data-i18n="clé")
   - EN_UI   : petits textes générés par le JavaScript
   ========================================================= */
(function () {
  const store = {
    get() { try { return localStorage.getItem("lang"); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem("lang", v); } catch (e) {} }
  };
  const qp = new URLSearchParams(location.search).get("lang");
  let lang = qp === "en" || qp === "fr" ? qp : store.get();
  if (!lang) lang = (navigator.language || "fr").toLowerCase().startsWith("fr") ? "fr" : "en";
  if (qp) store.set(lang);
  document.documentElement.lang = lang;

  const EN_UI = {
    "Ouvrir": "Open", "Attrape": "Grab", "Feuilleter": "Browse", "Glisse": "Drag", "Agrandir": "Zoom",
    "Suivant": "Next", "Copier": "Copy", "Envoyer": "Send", "Fermer": "Close", "Gratte": "Scratch", "Tampon": "Stamp",
    "open_folder": "Open the file", "file_no": "File no.", "read_full": "Read the full file", "click_open": "click to open",
    "close": "Close ✕", "prev": "← Prev", "next": "Next →",
    "copied": "Email copied ✓", "mail_opening": "Opening your email app…",
    "contents": "← The cabinet", "ph_note1": "tap a story", "ph_note2": "open a post, swipe", "ph_posts": "posts", "ph_hl": "highlights", "ph_side_k": "(EÏA — 3 months)", "ph_side": "A feed built post by post, story by story.", "ph_visuals": "visuals designed", "ph_stories": "stories", "slides": "slides", "again": "drag back", "ph_back": "← Back", "mm_wintxt": "{p} pairs in {m} moves and {t}. You'd make a good art director.", "dl_name": "my-poster-anais-albersario.png", "tk_done": "Won! See you in September ✶", "ph_swipe": "swipe → or double-tap ♥", "ph_dbl": "double-tap to like ♥", "project": "Project", "client": "Client", "year": "Year", "role": "Role", "tools": "Tools", "deliverables": "Deliverables",
    "pitch": "(The pitch)", "idea": "The idea", "did": "What I did", "next_file": "Next file", "confidential": "Confidential (not really)",
    "move_photos": "move the photos ↑", "posts": "posts", "story_of": "Story of", "post_of": "Post of", "reel_of": "Reel of",
    "dows": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], "slide": "slide", "approved": "Approved",
    "mail_hello": "Hi Anaïs,", "mail_we_are": "We are", "mail_default": "a company that loved your portfolio", "mail_looking": "and we're looking for",
    "mail_talk": "Let's talk!", "mail_and": "and", "mail_subject": "Work-study 2026", "curtain_stamp": "File · Archive 24—26 · Anaïs ·"
  };
  const FR_UI = {
    "open_folder": "Ouvrir le dossier", "file_no": "Dossier n°", "read_full": "Lire le dossier complet", "click_open": "clique pour ouvrir",
    "close": "Fermer ✕", "prev": "← Préc.", "next": "Suiv. →",
    "copied": "Adresse copiée ✓", "mail_opening": "Votre messagerie s'ouvre…",
    "contents": "← Le classeur", "ph_note1": "touche une story", "ph_note2": "ouvre un post, swipe", "ph_posts": "publications", "ph_hl": "à la une", "ph_side_k": "(EÏA — 3 mois)", "ph_side": "Un feed construit post après post, story après story.", "ph_visuals": "visuels conçus", "ph_stories": "stories", "slides": "slides", "again": "ramène-la", "ph_back": "← Retour", "mm_wintxt": "{p} paires en {m} coups et {t}. Tu ferais une bonne DA.", "dl_name": "mon-affiche-anais-albersario.png", "tk_done": "Gagné ! Rendez-vous en septembre ✶", "ph_swipe": "swipe → ou double-tap ♥", "ph_dbl": "double-tap pour liker ♥", "project": "Projet", "client": "Client", "year": "Année", "role": "Rôle", "tools": "Outils", "deliverables": "Livrables",
    "pitch": "(Le pitch)", "idea": "L'idée", "did": "Ce que j'ai fait", "next_file": "Dossier suivant", "confidential": "Confidentiel (pas vraiment)",
    "move_photos": "déplace les photos ↑", "posts": "contenus", "story_of": "Story du", "post_of": "Post du", "reel_of": "Reel du",
    "dows": ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"], "slide": "slide", "approved": "Approuvé",
    "mail_hello": "Bonjour Anaïs,", "mail_we_are": "Nous sommes", "mail_default": "une entreprise qui a aimé ton portfolio", "mail_looking": "et nous cherchons",
    "mail_talk": "Parlons-en !", "mail_and": "et", "mail_subject": "Alternance 2026", "curtain_stamp": "Dossier · Archive 24—26 · Anaïs ·"
  };

  const EN_HTML = {
    "loader_top": "<span>Personal archive</span><span>File no. AA—2026</span>",
    "loader_txt": "Cutting, pasting, printing…",
    "nav_files": "<span class=\"roll\"><span>Files</span><span aria-hidden=\"true\">Files</span></span>",
    "nav_about": "<span class=\"roll\"><span>About</span><span aria-hidden=\"true\">About</span></span>",
    "nav_status": "<i></i>Open to work-study",
    "m_home": "Home", "p_back": "← Back to the archive", "p_top": "Back to top ↑",
    "m_play": "Play",
    "tk_aside": "scratch it, it's free ↓", "tk_stub": "No. AA-2026<br>Talent<br>lottery", "tk_title": "Scratch card", "tk_valid": "Valid Sept. / Oct. 2026",
    "tk_win_k": "Congratulations!", "tk_win": "You just won<br>a work-study student.", "tk_win_s": "(motivated, creative, free from September)",
    "tk_foot1": "Scratch the silver area", "tk_foot2": "1 chance in 1",
    "pl_k": "(04) — My method", "pl_h": "<span class=\"line-reveal\"><span>The turntable</span></span>", "pl_r": "Drop the needle<br>on a groove",
    "pl_lp": "Method<br>LP — 2026", "pl_hint": "pick a track, or grab the arm →", "pl_sound": "sound",
    "pl_idle_k": "Waiting…", "pl_idle_t": "Radio silence.", "pl_idle_p": "Drop the needle on the record to hear my method.",
    "at_k": "(05) — The workshop", "at_h": "<span class=\"line-reveal\"><span>Your turn</span></span>", "at_r": "Make a poster<br>in my style",
    "at_hint": "click the poster to stamp it ✶", "at_t1": "01 — The photo", "at_t2": "02 — The colour", "at_t3": "03 — The layout", "at_t4": "04 — The title",
    "at_shuffle": "Shuffle ✶", "at_clear": "Clear the stamps", "at_dl": "Download the poster ↓",
    "m_files": "Files", "m_posters": "Posters", "m_about": "About", "m_contact": "Contact",
    "hero_blk1": "3<sup>rd</sup>-year student<br>at ESD, Paris.<br>I cut, I frame,<br>I paste — and I post.",
    "hero_blk2": "Looking for a <span class=\"hero__seal\">work-study<svg data-draw viewBox=\"0 0 200 80\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M28 14 C78 -2 176 2 192 32 C206 62 122 82 58 74 C10 68 -6 40 18 22 C34 10 66 4 98 8\"/></svg></span><br>position in art direction<br>or communication,<br>from Sept. / Oct. 2026.",
    "hero_blk3": "Shoots, feeds,<br>posters, magazines.<br>Images people<br>keep.",
    "hero_note": "← grab a polaroid",
    "hero_foot": "<span>10 files to open</span><span class=\"hero__scroll\"><i></i>Scroll</span><span>AD × Communication</span>",
    "band1": "<span class=\"band__item\">Open to work-study <i>Sept./Oct. 2026</i> ✶</span><span class=\"band__item\">Art direction & comms ✶</span><span class=\"band__item\">I cut, I frame, I post ✶</span>",
    "band2": "<span class=\"band__item\">Printed in Paris ✶</span><span class=\"band__item\"><i>archive</i> 24—26 ✶</span><span class=\"band__item\">Handmade (and on Figma) ✶</span>",
    "letter_head": "<span>Note no.01</span><span>For the attention of: you (yes, you)</span>",
    "letter_text": "I love images people <span class=\"hl\">keep.</span> The ones you pin to the wall, cut out, screenshot at two in the morning. My playground: the <span class=\"cut cut--ink\">shoot</span>, the <span class=\"cut cut--red\">feed</span>, the <span class=\"cut cut--yellow\">poster</span> and the <span class=\"cut cut--blue\">magazine</span>. My method: one clear <span class=\"circ\">idea<svg data-draw viewBox=\"0 0 200 80\" preserveAspectRatio=\"none\" aria-hidden=\"true\"><path d=\"M30 12 C80 -4 182 4 192 34 C202 66 118 80 56 74 C10 68 -6 40 20 22 C36 10 66 4 100 9\"/></svg></span>, tightly framed, repeated until it becomes <span class=\"hl\" style=\"--hl:#f7a8a2\">a style.</span>",
    "letter_aside": "(yes, I print everything)",
    "fact1": "months at EÏA Spa<br>bringing a feed to life", "fact2": "days of posts<br>scheduled in the calendar",
    "fact3": "files opened<br>in this portfolio", "fact4": "languages: French,<br>English, Tagalog",
    "toc_k": "(02) — Contents", "toc_h": "<span class=\"line-reveal\"><span>Contents</span></span>", "toc_r": "10 files<br>2024 → 2026", "toc_aside": "pick a file ↓",
    "cab_k": "(02) — The cabinet", "cab_h": "<span class=\"line-reveal\"><span>The files</span></span>", "cab_r": "Click a folder<br>to open it",
    "line_k": "(03) — Print", "line_h": "<span class=\"line-reveal\"><span>On the line</span></span>", "line_r": "Posters & print,<br>air-dried",
    "line_hint": "← grab the line and pull →", "line_all": "All posters →",
    "about_k": "(06) — About", "about_h": "<span class=\"line-reveal\"><span>Who am I?</span></span>", "about_r": "Creative<br>ID card",
    "cert_title": "Certificate<br>of creativity", "cert_meta": "No. AA—2026—ESD<br>Status: available<br>Issued in Paris",
    "f_first": "1a. First name", "f_last": "1b. Last name", "f_pos_k": "2. Position sought",
    "f_pos": "Work-study — Junior art director / Communication officer · from Sept. / Oct. 2026",
    "f_feat_k": "3. Distinguishing features",
    "f_feat": "3<sup>rd</sup>-year Bachelor's student in Digital Project Management. Obsessed with brand identities, well-set grids and the details nobody notices (except me). Creative, rigorous, with a strong eye.",
    "f_path_k": "4. Background",
    "f_path": "<li><span class=\"mono\">Apr.—Jul. 26</span><span><b>EÏA Spa — Communication & junior AD intern</b>Brand strategy and identity, digital & print content, social media.</span></li><li><span class=\"mono\">Jul. 2025</span><span><b>HelpMe — Community manager intern</b></span></li><li><span class=\"mono\">2024—2027</span><span><b>ESD — École Supérieure du Digital</b>Bachelor in Digital Project Management: UI, UX, graphic design, social media.</span></li><li><span class=\"mono\">2024</span><span><b>Lycée Joseph Talma — French high school diploma</b></span></li>",
    "f_tools_k": "5. Tools mastered", "f_lang_k": "6. Languages", "f_lang": "French, native<br>English, B2<br>Tagalog, fluent",
    "f_qual_k": "7. Qualities", "f_qual": "Versatile<br>Curious<br>Autonomous", "f_off_k": "8. Off-screen", "f_off": "Singing<br>Ukulele / guitar<br>Content creation",
    "cert_sign_k": "Holder's signature", "cert_cv": "Download CV (PDF) ↓",
    "contact_k": "(07) — Contact", "contact_h": "<span class=\"line-reveal\"><span>Shall we</span></span><span class=\"line-reveal\"><span>meet?</span></span>", "contact_r": "Reply within 24 h<br>(promise)",
    "form_dept": "Department of good ideas<br><b>Hiring form</b>", "form_title": "Looking for<br>a work-study?",
    "form_l1": "1. You are:", "form_l2": "2. You're looking for:", "form_l3": "3. Your name & company:",
    "c_agency": "An agency", "c_brand": "A brand", "c_studio": "A studio", "c_other": "Other (awesome)",
    "c_ad": "A work-study in AD", "c_com": "A work-study in comms", "c_both": "Both (right answer)",
    "form_note": "Note: please fill in this form only once.<br>Bad taste will not be accepted.", "form_send": "Send the form →",
    "form_copy": "This form opens your email app. Nothing is sent without you.",
    "ph_name": "write here…",
    "cv": "My CV ↓", "cert_ats": "ATS version ↓", "cv_ats": "ATS version (plain text, for recruiting software) ↓", "direct_aside": "no need to tick boxes, an email will do ;)",
    "foot_row": "<span>© 2026 Anaïs Albersario</span><span>Printed in Paris</span><span>Designed, cut & pasted by Anaïs</span><a href=\"#top\">Back to top ↑</a>"
  };

  const I18N = (window.I18N = {
    lang,
    en: lang === "en",
    t(k) { return (lang === "en" ? EN_UI[k] : FR_UI[k]) ?? FR_UI[k] ?? k; },
    cur(l) { return lang === "en" && EN_UI[l] ? EN_UI[l] : l; },
    // champ traduit d'un objet de données : obj.en.key si EN, sinon obj.key
    f(obj, k) { return lang === "en" && obj && obj.en && obj.en[k] != null ? obj.en[k] : obj ? obj[k] : ""; },
    apply(scope = document) {
      if (lang !== "en" || (scope === document && I18N._done)) return;
      if (scope === document) I18N._done = true;
      scope.querySelectorAll("[data-i18n]").forEach((el) => { const v = EN_HTML[el.dataset.i18n]; if (v != null) el.innerHTML = v; });
      scope.querySelectorAll("[data-i18n-ph]").forEach((el) => { el.placeholder = EN_HTML[el.dataset.i18nPh] || el.placeholder; });
      scope.querySelectorAll("[data-en-value]").forEach((el) => { el.value = el.dataset.enValue; });
      scope.querySelectorAll("[data-cv]").forEach((el) => { el.href = el.getAttribute("href").replace("_FR.pdf", "_EN.pdf"); });
      scope.querySelectorAll("[data-en-title]").forEach((el) => { document.title = el.dataset.enTitle; });
    },
    set(l) { store.set(l); }
  });

  // ajouter la langue aux liens internes (utile si le stockage est bloqué)
  I18N.href = (h) => {
    if (lang !== "en" || /^(https?:|mailto:|tel:|#)/.test(h)) return h;
    const [path, hash] = h.split("#");
    return path + (path.includes("?") ? "&" : "?") + "lang=en" + (hash ? "#" + hash : "");
  };
})();
