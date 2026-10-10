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

  const calendar = () => {
    const C = window.EIA_CALENDAR;
    const dows = T("dows");
    return `<div class="cal">${C.months.map((M) => {
      const first = (new Date(M.y, M.m, 1).getDay() + 6) % 7;
      const nd = new Date(M.y, M.m + 1, 0).getDate();
      let cells = dows.map((d) => `<div class="cal__dow">${d}</div>`).join("");
      for (let b = 0; b < first; b++) cells += `<div class="cal__day is-empty"></div>`;
      let total = 0;
      for (let d = 1; d <= nd; d++) {
        const key = `${pad(d)}-${pad(M.m + 1)}`;
        const items = C.days[key] || [];
        total += items.length;
        const red = C.highlight.includes(key) ? " is-redbox" : "";
        const nt = I.lang === "en" ? (C.notes_en[key] ?? C.notes[key]) : C.notes[key];
        const note = nt ? `<span class="cal__note" style="left:8%;bottom:-14%">${esc(nt)}</span>` : "";
        if (!items.length) { cells += `<div class="cal__day"><span class="cal__num">${d}</span></div>`; continue; }
        const thumbs = items.slice(0, 3).map((n) => n.startsWith("reel:")
          ? `<video src="media/eia/${n.slice(5)}.mp4#t=0.5" muted playsinline preload="metadata"></video>`
          : `<img src="media/eia/${n}.jpg" alt="" loading="lazy">`).join("");
        cells += `<button type="button" class="cal__day has-post${red}" data-day="${key}" data-cursor="Ouvrir" aria-label="${d} ${capOf(M, "name")} : ${items.length} ${T("posts")}"><span class="cal__num">${d}</span><span class="cal__count">${items.length}</span><span class="cal__thumbs">${thumbs}</span>${note}</button>`;
      }
      const rest = (7 - ((first + nd) % 7)) % 7;
      for (let b = 0; b < rest; b++) cells += `<div class="cal__day is-empty"></div>`;
      return `<div class="cal__month tex"><div class="cal__mhead"><h3>${capOf(M, "name")} 26</h3>${M.note ? `<span class="hand">${esc(capOf(M, "note"))}</span>` : ""}<span class="mono">${total} ${T("posts")}</span></div><div class="cal__grid">${cells}</div></div>`;
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
      case "calendar": return `<div class="blk">${calendar()}</div>`;
      default: return "";
    }
  };

  const blocksHTML = p.blocks.map(block).join("");
  const coverK = gallery.push({ src: p.cover, cap: F(p, "name") }) - 1;

  const N = (k) => esc(F(p, k));
  document.getElementById("project").innerHTML = `
    <section class="p-hero tex" data-tone="${tone}">
      <div class="p-hero__top mono">
        <a href="index.html#sommaire" data-label="${I.lang === "en" ? "Contents" : "Sommaire"}">${T("contents")}</a>
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
