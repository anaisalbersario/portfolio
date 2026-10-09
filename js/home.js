/* =========================================================
   Accueil
   ========================================================= */
(function () {
  const { $, $$, esc, roll } = App;
  const hasGsap = typeof window.gsap !== "undefined";
  const anim = hasGsap && !App.reduced;
  const P = window.PROJECTS;
  const byId = (id) => P.find((p) => p.id === id);
  const url = (p) => `projet.html?p=${p.id}`;

  /* ---------- bandes : on double le contenu pour une boucle sans couture ---------- */
  $$("[data-marquee]").forEach((t) => { t.innerHTML += t.innerHTML + t.innerHTML; });

  /* ---------- nom géant : ajuster à la largeur ---------- */
  const name = $("#heroName");
  const fit = () => {
    const last = $("[data-fit]", name);
    last.style.setProperty("--name-size", "100px");
    name.style.setProperty("--name-size", "100px");
    const w = name.clientWidth;
    const cw = $$(".ch", last).reduce((a, c) => a + c.getBoundingClientRect().width, 0);
    const size = Math.floor((100 * w) / cw * 0.995);
    name.style.setProperty("--name-size", size + "px");
    last.style.setProperty("--name-size", size + "px");
  };
  const firstChars = App.splitChars($("[data-split]", name));
  const lastChars = App.splitChars($("[data-fit]", name));
  fit();
  document.fonts && document.fonts.ready.then(fit);
  addEventListener("resize", fit);

  /* ---------- polaroids du hero ---------- */
  const polaData = [
    { id: "eia-social", src: "media/eia/post_02-07-1.jpg", cap: "EÏA — juil. 26", l: 4, t: 40, r: -7 },
    { id: "lab-of-the-year", src: "media/lab/B1.jpg", cap: "Lab of the Year", l: 21, t: 47, r: 5 },
    { id: "affiches", src: "media/affiches/maroc.jpg", cap: "Ma★roc", l: 60, t: 37, r: -4 },
    { id: "retrospective-2025", src: "media/magazine/couverture.jpg", cap: "Rétro 2025", l: 74, t: 47, r: 8 },
    { id: "eia-nouvelle-da", src: "media/nda/9302.jpg", cap: "Nouvelle DA", l: 88, t: 45, r: -10 }
  ];
  const mobile = matchMedia("(max-width: 820px)").matches;
  const polas = $("#polas");
  const mobPos = [{ l: 4, t: 55 }, { l: 37, t: 60 }, { l: 68, t: 54 }];
  (mobile ? polaData.slice(0, 3) : polaData).forEach((d, i) => {
    const pos = mobile ? mobPos[i] : d;
    const p = byId(d.id);
    const f = document.createElement("figure");
    f.className = "pola";
    f.tabIndex = 0;
    f.setAttribute("role", "link");
    f.setAttribute("aria-label", `Ouvrir le projet ${p.name}`);
    f.dataset.cursor = "Glisser";
    f.dataset.rot = d.r;
    f.style.left = `calc(${pos.l}% - ${mobile ? 0 : 60}px)`;
    f.style.top = pos.t + "%";
    f.innerHTML = `<img src="${d.src}" alt="" draggable="false"><figcaption>${esc(d.cap)}</figcaption>`;
    polas.appendChild(f);
    App.draggable(f, $(".hero"), () => App.go(url(p), p.name));
  });

  /* ---------- index des travaux ---------- */
  const list = $("#list"), filters = $("#filters"), preview = $("#preview");
  list.innerHTML = P.map((p, i) => `
    <a class="row" href="${url(p)}" data-id="${p.id}" data-label="${esc(p.name)}" data-cursor="Voir" data-filter="${p.filter.join(" ")}">
      <span class="mono">${String(i + 1).padStart(2, "0")}</span>
      <span class="row__title">${roll(esc(p.title))}</span>
      <span class="row__cat mono">${esc(p.cat)}</span>
      <span class="row__year mono">${esc(p.year)}</span>
      <span class="row__arrow" aria-hidden="true">→</span>
      <img class="row__mthumb" src="${p.thumb}" alt="" loading="lazy">
    </a>`).join("");
  preview.innerHTML = P.map((p) => `<img src="${p.thumb}" alt="" data-id="${p.id}" loading="lazy">`).join("");

  const counts = (f) => (f === "all" ? P.length : P.filter((p) => p.filter.includes(f)).length);
  filters.innerHTML = window.FILTERS.map((f, i) => `<button type="button" class="${i ? "" : "is-active"}" data-f="${f.id}" aria-pressed="${!i}">${esc(f.label)}<sup>${counts(f.id)}</sup></button>`).join("");
  filters.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    $$("button", filters).forEach((x) => { x.classList.toggle("is-active", x === b); x.setAttribute("aria-pressed", x === b); });
    const f = b.dataset.f;
    const rows = $$(".row", list);
    rows.forEach((r) => r.classList.toggle("is-hidden", f !== "all" && !r.dataset.filter.split(" ").includes(f)));
    if (anim) gsap.fromTo(rows.filter((r) => !r.classList.contains("is-hidden")), { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: "expo.out", clearProps: "opacity,transform" });
    window.ScrollTrigger && ScrollTrigger.refresh();
  });

  if (App.fine) {
    let px = 0, py = 0, cx = 0, cy = 0, rot = 0, on = false;
    addEventListener("pointermove", (e) => { px = e.clientX; py = e.clientY; }, { passive: true });
    const loop = () => {
      const dx = px - cx;
      cx += dx * 0.12; cy += (py - cy) * 0.12; rot += (dx * 0.04 - rot) * 0.1;
      preview.style.transform = `translate3d(${cx + 30}px, ${cy - 190}px, 0) rotate(${Math.max(-8, Math.min(8, rot))}deg)`;
      requestAnimationFrame(loop);
    };
    loop();
    list.addEventListener("pointerover", (e) => {
      const r = e.target.closest(".row"); if (!r) return;
      $$("img", preview).forEach((im) => im.classList.toggle("is-on", im.dataset.id === r.dataset.id));
      if (!on) { preview.classList.add("is-on"); list.classList.add("has-hover"); on = true; }
    });
    list.addEventListener("pointerleave", () => { preview.classList.remove("is-on"); list.classList.remove("has-hover"); on = false; });
  }

  /* ---------- mur d'affiches ---------- */
  const posters = [
    { src: "media/affiches/maroc.jpg", t: "Maroc", y: "2026" },
    { src: "media/magazine/couverture.jpg", t: "Rétrospective — magazine", y: "2025" },
    { src: "media/affiches/cap-agde.jpg", t: "Cap d'Agde", y: "2025" },
    { src: "media/affiches/qloudlight.jpg", t: "Qloudlight", y: "2024" },
    { src: "media/affiches/eyes-on-myself.jpg", t: "Eyes on myself", y: "2025" },
    { src: "media/affiches/nuit-blanche.jpg", t: "Nuit Blanche Paris", y: "2025" },
    { src: "media/affiches/5-fruits-legumes.jpg", t: "5 fruits & légumes", y: "2025" },
    { src: "media/affiches/big-ben.jpg", t: "Big Ben", y: "2025" }
  ];
  const rail = $("#rail");
  rail.innerHTML = posters.map((p, i) => `
    <figure class="poster" data-i="${i}">
      <img src="${p.src}" alt="Affiche ${esc(p.t)}" loading="lazy" draggable="false">
      <figcaption class="mono"><span>${String(i + 1).padStart(2, "0")} — ${esc(p.t)}</span><span>${p.y}</span></figcaption>
    </figure>`).join("");
  (function dragRail() {
    let x = 0, tx = 0, down = false, sx = 0, start = 0, moved = false, v = 0, lastX = 0;
    const max = () => Math.max(0, rail.scrollWidth - rail.clientWidth);
    const set = () => { rail.scrollLeft = x; };
    rail.style.overflowX = "hidden";
    rail.addEventListener("pointerdown", (e) => { down = true; moved = false; sx = lastX = e.clientX; start = tx; rail.classList.add("is-drag"); rail.setPointerCapture(e.pointerId); });
    rail.addEventListener("pointermove", (e) => {
      if (!down) return;
      const d = e.clientX - sx; if (Math.abs(d) > 5) moved = true;
      v = e.clientX - lastX; lastX = e.clientX;
      tx = Math.max(0, Math.min(max(), start - d));
    });
    const up = (e) => {
      if (!down) return; down = false; rail.classList.remove("is-drag");
      tx = Math.max(0, Math.min(max(), tx - v * 12));
      if (!moved) {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        const f = el && el.closest(".poster");
        if (f) App.lightbox(posters.map((p) => ({ src: p.src, cap: `${p.t} — ${p.y}` })), +f.dataset.i);
      }
    };
    rail.addEventListener("pointerup", up);
    rail.addEventListener("pointercancel", up);
    rail.addEventListener("wheel", (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); tx = Math.max(0, Math.min(max(), tx + e.deltaX)); }
    }, { passive: false });
    const loop = () => { x += (tx - x) * 0.1; set(); requestAnimationFrame(loop); };
    loop();
  })();

  /* ---------- manifeste : mots qui s'allument ---------- */
  const man = $("#manifest");
  Array.from(man.childNodes).forEach((n) => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((w) => {
        if (!w) return;
        if (/^\s+$/.test(w)) frag.appendChild(document.createTextNode(w));
        else { const s = document.createElement("span"); s.className = "w"; s.textContent = w; frag.appendChild(s); }
      });
      man.replaceChild(frag, n);
    } else if (n.nodeType === 1) n.classList.add("w");
  });

  App.drawPaths(document);

  /* ---------- animations ---------- */
  const intro = () => {
    document.body.classList.remove("is-loading");
    if (!anim) return;
    const tl = gsap.timeline();
    tl.from(lastChars, { yPercent: 105, duration: 1.2, ease: "expo.out", stagger: 0.035 })
      .from(firstChars, { yPercent: 105, duration: 1.2, ease: "expo.out", stagger: 0.05 }, 0.08)
      .from(".hero__info > *, .hero__row2 > *", { y: 24, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.2)
      .from(".pola", { y: () => innerHeight * 0.6, rotation: () => gsap.utils.random(-30, 30), opacity: 0, duration: 1.3, ease: "expo.out", stagger: 0.08, clearProps: "opacity" }, 0.35)
      .from(".hero__note, .hero__foot", { opacity: 0, duration: 0.8 }, 1.1);
  };

  const loader = $(".loader");
  const seen = App.store.get("seen");
  const runLoader = () => {
    const num = $(".loader__count", loader), bar = $(".loader__bar i", loader);
    const imgs = $$(".pola img, .row__mthumb").slice(0, 8).map((i) => i.currentSrc || i.src);
    let loaded = 0;
    const total = imgs.length + 1;
    const state = { v: 0 };
    const target = { v: 0 };
    const bump = () => { loaded++; target.v = Math.min(100, (loaded / total) * 100); };
    imgs.forEach((s) => { const im = new Image(); im.onload = im.onerror = bump; im.src = s; });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(bump);
    const t0 = performance.now();
    const loop = (t) => {
      // durée minimale ~1.6s, garde-fou à 4s
      const minP = Math.min(100, ((t - t0) / 1600) * 100);
      const goal = Math.min(minP, t - t0 > 4000 ? 100 : target.v);
      state.v += (goal - state.v) * 0.12;
      const v = Math.round(state.v);
      num.textContent = String(v).padStart(3, "0");
      bar.style.width = v + "%";
      if (v >= 100) {
        App.store.set("seen", "1");
        gsap.timeline()
          .to(num, { yPercent: -30, opacity: 0, duration: 0.5, ease: "power2.in" })
          .to(loader, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, "-=0.1")
          .add(intro, "-=0.6")
          .set(loader, { display: "none" });
        return;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };

  if (anim && !seen) runLoader();
  else {
    loader.style.display = "none";
    App.revealPage(intro);
  }

  if (!anim) {
    $$(".w", man).forEach((w) => (w.style.opacity = 1));
    $$("[data-count]").forEach((b) => (b.textContent = b.dataset.count));
    App.reveals();
    return;
  }

  // nom : les lettres d'ANAÏS suivent la souris
  if (App.fine) {
    addEventListener("pointermove", (e) => {
      const nx = e.clientX / innerWidth - 0.5;
      firstChars.forEach((c, i) => gsap.to(c, { x: nx * (i - 2) * 26, duration: 1, ease: "power3.out", overwrite: "auto" }));
    });
  }
  // hero : parallaxe de sortie
  gsap.to("#heroName", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to("#polas", { yPercent: -30, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // manifeste
  gsap.to($$(".w", man), { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: man, start: "top 80%", end: "bottom 45%", scrub: true } });
  $$("[data-count]").forEach((b) => {
    const o = { v: 0 };
    gsap.to(o, { v: +b.dataset.count, duration: 1.6, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 90%" }, onUpdate: () => (b.textContent = Math.round(o.v)) });
  });

  // EÏA : scroll horizontal
  const mm = gsap.matchMedia();
  mm.add("(min-width: 901px)", () => {
    const track = $(".feature__track");
    const dist = () => track.scrollWidth - innerWidth;
    const tw = gsap.to(track, { x: () => -dist(), ease: "none",
      scrollTrigger: { trigger: ".feature", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1 } });
    gsap.to(".feature__progress i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".feature", start: "top top", end: () => "+=" + dist(), scrub: true } });
    $$(".fpanel--work").forEach((panel) => {
      gsap.from($$(".fpanel__media img", panel), { yPercent: 30, rotation: (i) => (i % 2 ? 10 : -10), opacity: 0, stagger: 0.1, ease: "expo.out", duration: 1.2,
        scrollTrigger: { trigger: panel, containerAnimation: tw, start: "left 80%" } });
      gsap.from($(".fpanel__txt h3", panel), { xPercent: 20, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: panel, containerAnimation: tw, start: "left 70%" } });
    });
    gsap.from(".fpanel--intro .stamp", { scale: 2.4, opacity: 0, rotation: -40, duration: 0.6, ease: "back.out(2)", scrollTrigger: { trigger: ".feature", start: "top 40%" } });
  });
  gsap.from(".fpanel--intro .big", { yPercent: 40, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".feature", start: "top 70%" } });

  // index : lignes
  gsap.from(".row", { y: 40, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.05, clearProps: "opacity,transform", scrollTrigger: { trigger: "#list", start: "top 85%" } });
  $$(".section-head h2").forEach((h) => gsap.from(h, { yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%" } }));

  // affiches
  gsap.from(".poster", { y: 120, rotation: (i) => (i % 2 ? 8 : -8), opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: "#rail", start: "top 85%" } });

  // certificat
  gsap.from("#cert", { y: 120, rotation: -2, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: "#cert", start: "top 90%" } });
  gsap.from("#stamp", { scale: 3, opacity: 0, rotation: -60, duration: 0.55, ease: "back.out(1.8)", scrollTrigger: { trigger: "#stamp", start: "top 80%" } });
  gsap.fromTo(".cert__sign", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.6, ease: "power2.inOut", scrollTrigger: { trigger: ".cert__sign", start: "top 92%" } });
  gsap.from(".field", { opacity: 0, y: 14, duration: 0.6, stagger: 0.04, ease: "power2.out", scrollTrigger: { trigger: ".fields", start: "top 80%" } });

  // contact : vinyle qui tourne au scroll
  gsap.to(".record__disc", { rotation: 360, ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "bottom top", scrub: true } });
  gsap.from(".record", { y: 100, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".record", start: "top 90%" } });
  gsap.from(".contact__links > *", { x: 60, opacity: 0, duration: 0.9, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: ".contact__links", start: "top 88%" } });

  App.reveals();
  addEventListener("load", () => ScrollTrigger.refresh());
})();
