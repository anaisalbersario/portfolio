/* =========================================================
   Page projet : rendu à partir de data.js (?p=identifiant)
   ========================================================= */
(function () {
  const P = window.PROJECTS;
  const qs = new URLSearchParams(location.search);
  let i = P.findIndex((p) => p.id === qs.get("p"));
  if (i < 0) i = 0;
  const p = P[i], next = P[(i + 1) % P.length];
  const I = window.I18N;
  const F = (o, k) => I.f(o, k);
  const T = (k) => I.t(k);
  const capOf = (o, k = "cap") => (I.lang === "en" && o[k + "_en"] ? o[k + "_en"] : o[k] || "");
  const B = (b, k) => (I.lang === "en" && b.en && b.en[k] != null ? b.en[k] : b[k]);
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");
  const lum = (hex) => { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };

  // thème = la couleur du papier du dossier
  const tone = lum(p.paper) < 0.45 ? "light" : (p.paper.toLowerCase() === "#e8261c" ? "red" : "dark");
  const rs = document.documentElement.style;
  rs.setProperty("--bg", p.paper); rs.setProperty("--fg", p.ink); rs.setProperty("--accent", p.accent);
  document.body.style.background = p.paper; document.body.style.color = p.ink;
  document.title = `${F(p, "name")} — Anaïs Albersario`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", `${F(p, "name")} : ${F(p, "blurb")}`);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", p.paper);

  // galerie globale pour la visionneuse
  const gallery = [];
  let figN = 0;
  const norm = (it) => (typeof it === "string" ? { src: it } : it);
  const fig = (raw) => {
    const it0 = norm(raw), n = figN++;
    const it = { ...it0, cap: capOf(it0) };
    const tilt = n % 3 === 0 ? "tilt-a" : n % 3 === 1 ? "tilt-b" : "";
    const tape = n % 4 === 1 ? `<span class="tape tape--t"></span>` : n % 4 === 3 ? `<span class="tape tape--tl"></span>` : "";
    if (it.video) {
      const k = gallery.push({ src: it.video, cap: it.cap || F(p, "name") }) - 1;
      return `<figure class="fig ${tilt}">${tape}<div class="media" data-clip data-lb="${k}" data-cursor="Agrandir"><video src="${it.video}" muted loop playsinline preload="metadata" data-autoplay></video></div>${it.cap ? `<figcaption class="cap"><span>${esc(it.cap)}</span></figcaption>` : ""}</figure>`;
    }
    const k = gallery.push({ src: it.src, cap: it.cap || F(p, "name") }) - 1;
    return `<figure class="fig ${tilt}">${tape}<div class="media" data-clip data-lb="${k}" data-cursor="Agrandir"><img src="${it.src}" alt="${esc(it.cap || F(p, "name"))}" loading="lazy" decoding="async"></div>${it.cap ? `<figcaption class="cap"><span>${esc(it.cap)}</span><span>${pad(k + 1)}</span></figcaption>` : ""}</figure>`;
  };

  /* ---------- le feed EÏA : téléphone + pochettes ---------- */
  const FEED = window.EIA_FEED;
  const eia = (n) => `media/eia/${n}.jpg`;
  const ICON = {
    multi: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h12a2 2 0 0 1 2 2v12M3 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`,
    reel: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z"/></svg>`
  };
  const phone = () => {
    const posts = FEED.posts.map((po, j) => {
      const thumb = po.video ? `<video src="media/eia/${po.video}.mp4#t=0.8" muted playsinline preload="metadata"></video>` : `<img src="${eia(po.files[0])}" alt="" loading="lazy">`;
      const ic = po.video ? ICON.reel : po.files.length > 1 ? ICON.multi : "";
      return `<button type="button" class="ig__cell" data-post="${j}" data-cursor="Ouvrir" aria-label="${esc(capOf(po))}">${thumb}${ic ? `<span class="ig__icon">${ic}</span>` : ""}</button>`;
    }).join("");
    const hl = FEED.stories.map((st, j) => `<button type="button" class="ig__story" data-story="${j}" data-cursor="Ouvrir"><span class="ig__ring"><img src="${eia(st.files[0])}" alt=""></span><span>${esc(capOf(st, "label"))}</span></button>`).join("");
    return `<div class="blk phone-wrap">
      <div class="phone-notes">
        <span class="note note--right" style="left:2%;top:18%"><svg viewBox="0 0 86 46" aria-hidden="true"><path d="M2 30 C26 42 56 36 80 17 M80 17 L65 15 M80 17 L74 31"/></svg>${T("ph_note1")}</span>
        <span class="note note--right" style="left:0;top:58%"><svg viewBox="0 0 86 46" aria-hidden="true"><path d="M2 30 C26 42 56 36 80 17 M80 17 L65 15 M80 17 L74 31"/></svg>${T("ph_note2")}</span>
      </div>
      <div class="phone" id="phone">
        <div class="phone__frame">
          <span class="phone__island"></span>
          <div class="phone__screen">
            <div class="ig" data-lenis-prevent>
              <div class="ig__status mono"><span>9:41</span><span>●●● ▮</span></div>
              <div class="ig__top"><b>${esc(FEED.handle)}</b><span>•••</span></div>
              <div class="ig__head"><span class="ig__avatar"><img src="${FEED.avatar}" alt=""></span><div class="ig__stats"><b>${FEED.posts.length}</b><span>${T("ph_posts")}</span></div><div class="ig__stats"><b>${FEED.stories.length}</b><span>${T("ph_hl")}</span></div></div>
              <p class="ig__bio"><b>EÏA</b><br>${esc(capOf(FEED, "bio"))}</p>
              <div class="ig__hls">${hl}</div>
              <div class="ig__tabs"><span class="is-on">▦</span><span>▶</span><span>☺</span></div>
              <div class="ig__grid">${posts}</div>
            </div>
            <div class="ig__layer ig__post" aria-hidden="true"></div>
            <div class="ig__layer ig__storyv" aria-hidden="true"></div>
          </div>
        </div>
      </div>
      <div class="phone-side">
        <span class="mono">${T("ph_side_k")}</span>
        <p class="phone-side__big">${T("ph_side")}</p>
        <div class="phone-side__count"><b data-count="${FEED.posts.reduce((a, po) => a + (po.files ? po.files.length : 1), 0)}">0</b><span class="mono">${T("ph_visuals")}</span></div>
        <div class="phone-side__count"><b data-count="${FEED.stories.reduce((a, st) => a + st.files.length, 0)}">0</b><span class="mono">${T("ph_stories")}</span></div>
      </div>
    </div>`;
  };
  const strips = (kind) => {
    const groups = kind === "stories" ? FEED.stories : FEED.posts.filter((po) => po.files && po.files.length > 1);
    return `<div class="blk strips strips--${kind}">${groups.map((g, j) => {
      const title = kind === "stories" ? capOf(g, "label") : capOf(g);
      const cards = g.files.map((f, n) => {
        const k = gallery.push({ src: eia(f), cap: `${title} — ${n + 1}/${g.files.length}` }) - 1;
        return `<figure class="sleeve" data-lb="${k}" data-cursor="Agrandir"><img src="${eia(f)}" alt="${esc(title)} ${n + 1}" loading="lazy" draggable="false"><span class="sleeve__n mono">${pad(n + 1)}</span></figure>`;
      }).join("");
      return `<div class="strip">
        <div class="strip__head"><span class="strip__date">${esc(g.date)}</span><h3 class="strip__title">${esc(title)}</h3><span class="mono">${g.files.length} ${T(kind === "stories" ? "ph_stories" : "slides")}</span></div>
        <div class="strip__rail" data-rail data-cursor="Glisse"><div class="strip__track">${cards}<span class="strip__end hand">↩ ${T("again")}</span></div></div>
      </div>`;
    }).join("")}</div>`;
  };

  const scatterPos = [[4, 6, -8], [26, 30, 5], [48, 4, -3], [68, 26, 9], [12, 52, 4], [58, 54, -6], [80, 2, -4]];
  const block = (b) => {
    switch (b.t) {
      case "title": return `<div class="blk-title"><h2><span class="line-reveal"><span>${esc(B(b, "h"))}</span></span></h2>${b.p ? `<p>${esc(B(b, "p"))}</p>` : ""}</div>`;
      case "full": return `<div class="blk ${b.narrow ? "g-narrow" : ""}">${fig({ src: b.src, cap: b.cap, cap_en: b.cap_en })}</div>`;
      case "grid": return `<div class="blk g g-${b.cols} ${b.offset ? "g-offset" : ""} ${b.narrow ? "g-narrow" : ""}">${b.items.map((x) => fig(x)).join("")}</div>`;
      case "quote": return `<blockquote class="quote tex" data-quote><span class="tape tape--tl"></span><span class="tape tape--tr"></span><p>${esc(B(b, "text"))}</p>${b.by ? `<small>— ${esc(B(b, "by"))}</small>` : ""}</blockquote>`;
      case "video": return `<figure class="blk"><div class="video-frame" data-up><video src="${b.src}" poster="${b.poster || ""}" muted loop playsinline controls preload="metadata" data-autoplay></video></div>${b.cap ? `<figcaption class="cap"><span>${esc(capOf(b))}</span></figcaption>` : ""}</figure>`;
      case "scatter": return `<div class="blk scatter" data-scatter><span class="hand" style="position:absolute;right:2%;bottom:4%;rotate:-6deg">${T("move_photos")}</span>${b.items.map((it, j) => {
        const k = gallery.push({ src: it.src, cap: capOf(it) }) - 1;
        const [l, t, r] = scatterPos[j % scatterPos.length];
        return `<figure class="pola" data-rot="${r}" data-k="${k}" data-cursor="Attrape" tabindex="0" style="left:${l}%;top:${t}%"><span class="tape tape--t"></span><img src="${it.src}" alt="${esc(capOf(it))}" draggable="false" loading="lazy"><figcaption>${esc(capOf(it))}</figcaption></figure>`;
      }).join("")}</div>`;
      case "deck": return `<div class="blk deck">${b.items.map((src, j) => {
        const k = gallery.push({ src, cap: `${F(p, "name")}, ${T("slide")} ${j + 1}` }) - 1;
        return `<div class="deck__card" data-lb="${k}" data-cursor="Agrandir" style="top:calc(10vh + ${j * 12}px)"><img src="${src}" alt="${esc(p.name)}, slide ${j + 1}" loading="lazy"></div>`;
      }).join("")}</div>`;
      case "phone": return phone();
      case "strips": return strips(b.kind);
      default: return "";
    }
  };

  const blocksHTML = p.blocks.map(block).join("");
  const coverK = gallery.push({ src: p.cover, cap: F(p, "name") }) - 1;

  const N = (k) => esc(F(p, k));
  document.getElementById("project").innerHTML = `
    <section class="p-hero tex" data-tone="${tone}">
      <div class="p-hero__top mono">
        <a href="index.html#classeur" data-label="${I.lang === "en" ? "The files" : "Les dossiers"}">${T("contents")}</a>
        <span>${N("cat")}</span>
        <span>${T("file_no")}${pad(i + 1)} / ${pad(P.length)}</span>
      </div>
      <div class="dossier" id="dossier">
        <div class="folder-back" data-tab="${T("file_no")}${pad(i + 1)} — ${N("name")}"></div>
        <article class="info-sheet tex" id="infoSheet">
          <div class="info-sheet__row"><span class="mono">${T("project")}</span>
            <h1 class="p-title"><span class="line-reveal"><span>${N("title")}</span></span></h1>
            <p class="p-blurb">${N("blurb")}</p>
          </div>
          <div class="info-sheet__grid">
            <div class="info-sheet__row"><span class="mono">${T("client")}</span><p>${N("client")}</p></div>
            <div class="info-sheet__row"><span class="mono">${T("year")}</span><p>${esc(p.year)}</p></div>
            <div class="info-sheet__row"><span class="mono">${T("role")}</span><p>${N("role")}</p></div>
            <div class="info-sheet__row"><span class="mono">${T("tools")}</span><p>${N("tools")}</p></div>
          </div>
          <div class="info-sheet__row"><span class="mono">${T("deliverables")}</span><p style="margin:2px 0 0;font-size:14px">${N("deliverables")}</p></div>
        </article>
        <div class="cover-pola" id="coverPola">
          <svg class="clip" viewBox="0 0 30 80" aria-hidden="true"><use href="#paperclip"/></svg>
          <figure class="pola" data-lb="${coverK}" data-cursor="Agrandir"><img src="${p.cover}" alt="${N("name")}"><figcaption>${esc(F(p, "cat").split("·")[0].trim().toLowerCase())}</figcaption></figure>
        </div>
        <div class="stamp stamp--ring" id="pStamp" data-stamp="${N("name")} · ${esc(p.year)} · ${T("approved")} ·"></div>
        <div class="folder-front" id="folderFront"><span class="t">${N("name")}</span><span class="mono">${esc(p.year)} — ${T("confidential")}</span></div>
      </div>
    </section>
    <section class="p-body" data-tone="${tone}">
      <div class="p-intro">
        <span class="mono">${T("pitch")}</span>
        <div>
          <p class="p-intro__lead" data-up>${N("lead")}</p>
          <div class="p-intro__cols">
            <div class="p-note tex" data-note><span class="tape tape--t"></span><h3>${T("idea")}</h3>${F(p, "context").map((c) => `<p>${esc(c)}</p>`).join("")}</div>
            <div class="p-note tex" data-note><span class="tape tape--tr"></span><h3>${T("did")}</h3><ul>${F(p, "missions").map((m) => `<li>${esc(m)}</li>`).join("")}</ul></div>
          </div>
        </div>
      </div>
      ${blocksHTML}
    </section>
    <a class="next" href="projet.html?p=${next.id}" data-label="${esc(F(next, "title"))}" data-cursor="Suivant" data-tone="light" style="--np:${next.paper};--ni:${next.ink}">
      <span class="next__tab">${T("file_no")}${pad(((i + 1) % P.length) + 1)} — ${esc(F(next, "name"))}</span>
      <div class="next__label mono"><span>${T("next_file")}</span><span>${esc(F(next, "cat"))}</span></div>
      <div class="next__title">${esc(F(next, "title"))} →</div>
      <span class="next__img"><img src="${next.thumb}" alt="" loading="lazy"></span>
    </a>`;

  window.PROJECT_CTX = { p, gallery };
})();
