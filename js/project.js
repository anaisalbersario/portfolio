/* =========================================================
   Page projet : rendu à partir de data.js (?p=identifiant)
   ========================================================= */
(function () {
  const P = window.PROJECTS;
  const qs = new URLSearchParams(location.search);
  let i = P.findIndex((p) => p.id === qs.get("p"));
  if (i < 0) i = 0;
  const p = P[i], next = P[(i + 1) % P.length];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pad = (n) => String(n).padStart(2, "0");

  // thème
  const lum = (hex) => { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
  const tone = lum(p.theme.bg) < 0.45 ? "light" : (p.theme.bg.toLowerCase() === "#e8261c" ? "red" : "dark");
  const rs = document.documentElement.style;
  rs.setProperty("--bg", p.theme.bg); rs.setProperty("--fg", p.theme.fg); rs.setProperty("--accent", p.theme.accent);
  document.body.style.background = p.theme.bg; document.body.style.color = p.theme.fg;
  document.title = `${p.name} — Anaïs Albersario`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", `${p.name} : ${p.subtitle}`);
  document.querySelector('meta[name="theme-color"]').setAttribute("content", p.theme.bg);

  // galerie globale pour la lightbox
  const gallery = [];
  const norm = (it) => (typeof it === "string" ? { src: it } : it);
  const fig = (raw, extra = "") => {
    const it = norm(raw);
    if (it.video) {
      const k = gallery.push({ src: it.video, cap: it.cap || p.name }) - 1;
      return `<figure class="${extra}"><div class="media" data-clip data-lb="${k}" data-cursor="Agrandir"><video src="${it.video}" muted loop playsinline preload="metadata" data-autoplay></video></div>${it.cap ? `<figcaption class="cap mono"><span>${esc(it.cap)}</span></figcaption>` : ""}</figure>`;
    }
    const k = gallery.push({ src: it.src, cap: it.cap || p.name }) - 1;
    return `<figure class="${extra}"><div class="media" data-clip data-lb="${k}" data-cursor="Agrandir"><img src="${it.src}" alt="${esc(it.cap || p.name)}" loading="lazy" decoding="async"></div>${it.cap ? `<figcaption class="cap mono"><span>${esc(it.cap)}</span><span>${pad(k + 1)}</span></figcaption>` : ""}</figure>`;
  };

  const calendar = () => {
    const C = window.EIA_CALENDAR;
    const dows = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
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
        const note = C.notes[key] ? `<span class="cal__note" style="left:8%;bottom:-14%">${esc(C.notes[key])}</span>` : "";
        if (!items.length) { cells += `<div class="cal__day"><span class="cal__num">${d}</span></div>`; continue; }
        const thumbs = items.slice(0, 3).map((n) => n.startsWith("reel:")
          ? `<video src="media/eia/${n.slice(5)}.mp4#t=0.5" muted playsinline preload="metadata"></video>`
          : `<img src="media/eia/${n}.jpg" alt="" loading="lazy">`).join("");
        cells += `<button type="button" class="cal__day has-post${red}" data-day="${key}" data-cursor="Ouvrir" aria-label="${d} ${M.name} : ${items.length} contenu(s)"><span class="cal__num">${d}</span><span class="cal__count">${items.length}</span><span class="cal__thumbs">${thumbs}</span>${note}</button>`;
      }
      const rest = (7 - ((first + nd) % 7)) % 7;
      for (let b = 0; b < rest; b++) cells += `<div class="cal__day is-empty"></div>`;
      return `<div class="cal__month"><div class="cal__mhead"><h3>${M.name} 26</h3>${M.note ? `<span class="hand">${esc(M.note)}</span>` : ""}<span class="mono">${total} contenus</span></div><div class="cal__grid">${cells}</div></div>`;
    }).join("")}</div>`;
  };

  const scatterPos = [[4, 6, -8], [26, 30, 5], [48, 4, -3], [68, 26, 9], [12, 52, 4], [58, 54, -6], [80, 2, -4]];
  const block = (b) => {
    switch (b.t) {
      case "title": return `<div class="blk-title"><span class="mono">(${esc(b.h)})</span><h2>${esc(b.h)}</h2>${b.p ? `<p>${esc(b.p)}</p>` : ""}</div>`;
      case "full": return `<div class="blk ${b.narrow ? "g-narrow" : ""}">${fig({ src: b.src, cap: b.cap })}</div>`;
      case "grid": return `<div class="blk g g-${b.cols} ${b.offset ? "g-offset" : ""} ${b.narrow ? "g-narrow" : ""}">${b.items.map((x) => fig(x)).join("")}</div>`;
      case "quote": return `<blockquote class="quote" data-up>${esc(b.text)}${b.by ? `<small>— ${esc(b.by)}</small>` : ""}</blockquote>`;
      case "video": {
        const k = gallery.push({ src: b.src, cap: b.cap || p.name }) - 1;
        return `<figure class="blk"><div class="media" data-clip style="cursor:auto"><video src="${b.src}" poster="${b.poster || ""}" muted loop playsinline controls preload="metadata" data-autoplay></video></div>${b.cap ? `<figcaption class="cap mono"><span>${esc(b.cap)}</span><span>${pad(k + 1)}</span></figcaption>` : ""}</figure>`;
      }
      case "scatter": return `<div class="blk scatter" data-scatter><span class="hand" style="position:absolute;right:2%;bottom:4%;rotate:-6deg">déplace les photos ↑</span>${b.items.map((it, j) => {
        const k = gallery.push({ src: it.src, cap: it.cap }) - 1;
        const [l, t, r] = scatterPos[j % scatterPos.length];
        return `<figure class="pola" data-rot="${r}" data-k="${k}" data-cursor="Glisser" tabindex="0" style="left:${l}%;top:${t}%"><img src="${it.src}" alt="${esc(it.cap || "")}" draggable="false" loading="lazy"><figcaption>${esc(it.cap || "")}</figcaption></figure>`;
      }).join("")}</div>`;
      case "deck": return `<div class="blk deck">${b.items.map((src, j) => {
        const k = gallery.push({ src, cap: `${p.name} — slide ${j + 1}` }) - 1;
        return `<div class="deck__card media" data-lb="${k}" data-cursor="Agrandir" style="top:calc(10vh + ${j * 12}px)"><img src="${src}" alt="${esc(p.name)} — slide ${j + 1}" loading="lazy"></div>`;
      }).join("")}</div>`;
      case "calendar": return `<div class="blk">${calendar()}</div>`;
      default: return "";
    }
  };

  const blocksHTML = p.blocks.map(block).join("");

  document.getElementById("project").innerHTML = `
    <section class="p-hero" data-tone="${tone}">
      <div class="p-hero__top mono">
        <a class="p-hero__back" href="index.html#travaux" data-label="Index">← Index</a>
        <span>${esc(p.cat)}</span>
        <span>N° ${pad(i + 1)} / ${pad(P.length)}</span>
      </div>
      <h1 class="p-title"><span class="line-reveal"><span>${p.titleHTML || esc(p.title)}</span></span></h1>
      <p class="p-sub">${esc(p.subtitle)}</p>
      <div class="spec">
        <div><span class="mono">Client</span><p>${esc(p.client)}</p></div>
        <div><span class="mono">Rôle</span><p>${esc(p.role)}</p></div>
        <div><span class="mono">Année</span><p>${esc(p.year)}</p></div>
        <div><span class="mono">Outils</span><p>${esc(p.tools)}</p></div>
        <div><span class="mono">Livrables</span><p>${esc(p.deliverables)}</p></div>
      </div>
      <div class="p-cover"><img src="${p.cover}" alt="${esc(p.name)}" data-parallax="7"></div>
    </section>
    <section class="p-body" data-tone="${tone}">
      <div class="p-intro">
        <span class="mono">(Le projet)</span>
        <div>
          <p class="p-intro__lead" data-up>${esc(p.lead)}</p>
          <div class="p-intro__cols" data-up>
            <div><h3>Contexte & intention</h3>${p.context.map((c) => `<p>${esc(c)}</p>`).join("")}</div>
            <div><h3>Ce que j'ai fait</h3><ul>${p.missions.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></div>
          </div>
        </div>
      </div>
      ${blocksHTML}
    </section>
    <a class="next" href="projet.html?p=${next.id}" data-label="${esc(next.name)}" data-cursor="Suivant" data-tone="light">
      <div class="next__label mono"><span>Projet suivant</span><span>N° ${pad(((i + 1) % P.length) + 1)} / ${pad(P.length)}</span></div>
      <div class="next__title">${esc(next.title)} →</div>
      <img class="next__img" src="${next.thumb}" alt="" loading="lazy">
    </a>`;

  window.PROJECT_CTX = { p, gallery };
})();
