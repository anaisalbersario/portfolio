/* =========================================================
   Accueil — v2 (print × scrapbook × éditorial)
   ========================================================= */
(function () {
  const { $, $$, esc } = App;
  const hasGsap = typeof window.gsap !== "undefined";
  const anim = hasGsap && !App.reduced;
  const P = window.PROJECTS;
  const byId = (id) => P.find((p) => p.id === id);
  const url = (p) => `projet.html?p=${p.id}`;
  const pad = (n) => String(n).padStart(2, "0");
  const lum = (hex) => { const n = parseInt(hex.slice(1), 16); return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255; };
  const mobile = matchMedia("(max-width: 900px)").matches;

  /* ---------- flèches au feutre ---------- */
  const ARROWS = {
    up: ["0 0 50 64", "M25 62 C18 44 31 26 24 6 M14 17 L24 4 L34 15"],
    down: ["0 0 50 64", "M24 2 C32 20 18 40 25 60 M15 49 L25 62 L35 48"],
    left: ["0 0 86 46", "M84 30 C60 42 30 36 6 17 M6 17 L21 15 M6 17 L12 31"],
    right: ["0 0 86 46", "M2 30 C26 42 56 36 80 17 M80 17 L65 15 M80 17 L74 31"]
  };
  const note = (n) => {
    const [vb, d] = ARROWS[n.arrow || "left"];
    return `<span class="note note--${n.arrow || "left"}" style="left:${n.x}%;top:${n.y}%"><svg data-draw viewBox="${vb}" aria-hidden="true"><path d="${d}"/></svg>${esc(n.text)}</span>`;
  };
  let stk = 0;
  const sticker = (label) => { const id = "stk" + stk++; return `<span class="sticker"><svg viewBox="0 0 100 100" aria-hidden="true"><defs><path id="${id}" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"/></defs><text><textPath href="#${id}">${label} · ${label} ·</textPath></text></svg><b>→</b></span>`; };

  /* =======================================================
     HERO
     ======================================================= */
  const name = $("#heroName");
  const firstChars = App.splitChars($("[data-split]", name));
  const lastChars = App.splitChars($("[data-fit]", name));
  const fit = () => {
    name.style.setProperty("--name-size", "100px");
    const w = name.clientWidth;
    const cw = lastChars.reduce((a, c) => a + c.getBoundingClientRect().width, 0);
    name.style.setProperty("--name-size", Math.floor((100 * w) / cw * 0.995) + "px");
  };
  fit();
  document.fonts && document.fonts.ready.then(fit);
  addEventListener("resize", fit);

  const polaData = [
    { id: "retrospective-2025", src: "media/magazine/couverture.jpg", cap: "Rétro 2025", l: 4, t: 40, r: -7 },
    { id: "lab-of-the-year", src: "media/lab/B1.jpg", cap: "Lab of the Year", l: 21, t: 47, r: 5 },
    { id: "affiches", src: "media/affiches/maroc.jpg", cap: "Ma★roc", l: 60, t: 37, r: -4 },
    { id: "eia-social", src: "media/eia/post_02-07-1.jpg", cap: "EÏA, juil. 26", l: 74, t: 47, r: 8 },
    { id: "eia-nouvelle-da", src: "media/nda/9302.jpg", cap: "en peignoir", l: 88, t: 45, r: -10 }
  ];
  const mobPos = [{ l: 4, t: 55 }, { l: 37, t: 60 }, { l: 68, t: 54 }];
  const polas = $("#polas");
  (mobile ? polaData.slice(0, 3) : polaData).forEach((d, i) => {
    const pos = mobile ? mobPos[i] : d;
    const p = byId(d.id);
    const f = document.createElement("figure");
    f.className = "pola"; f.tabIndex = 0;
    f.setAttribute("role", "link"); f.setAttribute("aria-label", `Ouvrir le dossier ${p.name}`);
    f.dataset.cursor = "Attrape"; f.dataset.rot = d.r;
    f.style.left = `calc(${pos.l}% - ${mobile ? 0 : 60}px)`; f.style.top = pos.t + "%";
    f.innerHTML = `<span class="tape tape--t"></span><img src="${d.src}" alt="" draggable="false"><figcaption>${esc(d.cap)}</figcaption>`;
    polas.appendChild(f);
    App.draggable(f, $(".hero"), () => App.go(url(p), p.title));
  });

  // traînée d'encre qui suit la souris sur le hero
  (function inkTrail() {
    const cv = $("#inkTrail");
    if (!cv || !App.fine || App.reduced) return;
    const hero = $(".hero"), ctx = cv.getContext("2d");
    let pts = [], running = false;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const size = () => { const r = hero.getBoundingClientRect(); cv.width = r.width * dpr; cv.height = r.height * dpr; cv.style.width = r.width + "px"; cv.style.height = r.height + "px"; };
    size(); addEventListener("resize", size);
    hero.addEventListener("pointermove", (e) => {
      if (e.target.closest(".pola")) return;
      const r = hero.getBoundingClientRect();
      pts.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() });
      if (!running) { running = true; requestAnimationFrame(draw); }
    });
    function draw(now) {
      pts = pts.filter((p) => now - p.t < 900);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], age = (now - b.t) / 900;
        ctx.strokeStyle = `rgba(20,18,18,${0.55 * (1 - age)})`;
        ctx.lineWidth = 2.6 * (1 - age) + 0.4;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      if (pts.length) requestAnimationFrame(draw); else { running = false; ctx.clearRect(0, 0, cv.width, cv.height); }
    }
  })();

  /* =======================================================
     NOTE (manifeste) : mots
     ======================================================= */
  const man = $("#manifest");
  Array.from(man.childNodes).forEach((n) => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach((w) => {
        if (!w) return;
        if (/^\s+$/.test(w)) frag.appendChild(document.createTextNode(" "));
        else { const s = document.createElement("span"); s.className = "w"; s.textContent = w; frag.appendChild(s); }
      });
      man.replaceChild(frag, n);
    } else if (n.nodeType === 1) n.classList.add("w");
  });

  /* =======================================================
     SOMMAIRE
     ======================================================= */
  const toc = $("#toc");
  toc.innerHTML = P.map((p, i) => `
    <li class="toc__item"><a href="#d-${p.id}" data-id="${p.id}" data-cursor="Feuilleter">
      <span class="toc__n">${pad(i + 1)}</span>
      <span class="toc__title">${esc(p.title)}</span>
      <span class="toc__dots" aria-hidden="true"></span>
      <span class="toc__cat">${esc(p.cat)}</span>
      <span class="toc__p">p.${pad(i * 2 + 4)}</span>
    </a></li>`).join("");
  const prev = $("#tocPreview"), prevImgs = $(".imgs", prev), prevCap = $(".pcap", prev);
  prevImgs.innerHTML = P.map((p) => `<img src="${p.thumb}" alt="" data-id="${p.id}" loading="lazy">`).join("");
  if (App.fine) {
    let px = 0, py = 0, cx = 0, cy = 0, rot = 0;
    addEventListener("pointermove", (e) => { px = e.clientX; py = e.clientY; }, { passive: true });
    (function loop() {
      const dx = px - cx; cx += dx * 0.13; cy += (py - cy) * 0.13; rot += (dx * 0.05 - rot) * 0.1;
      prev.style.transform = `translate3d(${cx + 40}px, ${cy - 160}px, 0) rotate(${Math.max(-10, Math.min(10, rot))}deg)`;
      requestAnimationFrame(loop);
    })();
    toc.addEventListener("pointerover", (e) => {
      const a = e.target.closest("a"); if (!a) return;
      $$("img", prevImgs).forEach((im) => im.classList.toggle("is-on", im.dataset.id === a.dataset.id));
      prevCap.textContent = byId(a.dataset.id).blurb.split(/[.,(]/)[0].toLowerCase();
      prev.classList.add("is-on");
    });
    toc.addEventListener("pointerleave", () => prev.classList.remove("is-on"));
  }

  /* =======================================================
     DOSSIERS : feuilles empilées
     ======================================================= */
  const dos = $("#dossiers");
  const stampSpots = [["78%", "4%"], ["2%", "74%"], ["72%", "72%"], ["44%", "0%"]];
  dos.innerHTML = P.map((p, i) => {
    const dark = lum(p.paper) < 0.45;
    const items = p.collage.map((c, j) => {
      const depth = (j + 1) * 0.6;
      const attrs = `href="${url(p)}" data-label="${esc(p.title)}" data-cursor="Ouvrir" data-depth="${depth}" style="left:${c.x}%;top:${c.y}%;width:${c.w}%;rotate:${c.r}deg"`;
      if (c.kind === "pola") return `<a class="collage__item pola" ${attrs}><span class="tape tape--t"></span><img src="${c.src}" alt="" loading="lazy"><figcaption>${esc(c.cap || "")}</figcaption></a>`;
      if (c.kind === "cut") return `<a class="collage__item cut" ${attrs}><img src="${c.src}" alt="" loading="lazy"></a>`;
      return `<a class="collage__item photo" ${attrs}><span class="tape tape--tl"></span><span class="tape tape--tr"></span><img src="${c.src}" alt="" loading="lazy"></a>`;
    }).join("");
    const [sl, st] = stampSpots[i % stampSpots.length];
    return `
    <article class="sheet" id="d-${p.id}" data-tone="${dark ? "light" : "dark"}" style="--sp:${p.paper};--si:${p.ink};--sa:${p.accent}">
      <div class="sheet__inner tex">
        <div class="sheet__meta mono"><span data-scr>Dossier n°${pad(i + 1)} / ${pad(P.length)}</span><span data-scr>${esc(p.cat)}</span><span data-scr>${esc(p.year)}</span></div>
        <div class="sheet__txt">
          <span class="sheet__num" aria-hidden="true">${pad(i + 1)}</span>
          <div>
            <h2 class="sheet__title"><a href="${url(p)}" data-label="${esc(p.title)}" data-cursor="Ouvrir"><span class="line-reveal"><span>${esc(p.title)}</span></span></a></h2>
            <p class="sheet__blurb">${esc(p.blurb)}</p>
            <div class="sheet__tags"><span class="label">${esc(p.role)}</span><span class="label label--light">${esc(p.tools)}</span></div>
            <a class="sheet__cta" href="${url(p)}" data-label="${esc(p.title)}" data-cursor="Ouvrir">${sticker("Ouvrir le dossier")}<span class="mono">Ouvrir<br>le dossier</span></a>
          </div>
        </div>
        <div class="collage">
          ${items}
          ${p.note ? note(p.note) : ""}
          <div class="stamp stamp--ring" style="left:${sl};top:${st};rotate:${(i % 2 ? 1 : -1) * (8 + i)}deg" data-stamp="${esc(p.name)} · ${esc(p.year)} ·"></div>
        </div>
        <div class="sheet__shade"></div>
      </div>
    </article>`;
  }).join("");
  App.buildStamps(dos);

  // sommaire → feuille
  toc.addEventListener("click", (e) => {
    const a = e.target.closest("a"); if (!a) return;
    e.preventDefault(); e.stopPropagation();
    const sheets = $$(".sheet", dos), idx = sheets.findIndex((s) => s.id === "d-" + a.dataset.id);
    const isSticky = getComputedStyle(sheets[0]).position === "sticky";
    const top = isSticky ? dos.getBoundingClientRect().top + scrollY + idx * sheets[0].offsetHeight : sheets[idx].getBoundingClientRect().top + scrollY;
    App.lenis ? App.lenis.scrollTo(top, { duration: 1.6 }) : scrollTo(0, top);
  }, true);

  /* =======================================================
     SUR LE FIL : corde à linge
     ======================================================= */
  const track = $("#lineTrack"), wrap = $("#lineWrap"), rope = $("#rope"), ropePath = $("path", rope);
  const posters = window.POSTERS;
  track.insertAdjacentHTML("beforeend", posters.map((p, i) => `
    <figure class="hang" data-i="${i}">
      <span class="peg" aria-hidden="true"></span>
      <img src="${p.src}" alt="Affiche ${esc(p.t)}" loading="lazy" draggable="false">
      <figcaption><span class="hand">${esc(p.t)}</span><span class="mono">${pad(i + 1)} — ${p.y}</span></figcaption>
    </figure>`).join(""));
  const hangs = $$(".hang", track);
  const phys = hangs.map(() => ({ a: (Math.random() - 0.5) * 6, w: 0 }));
  (function clothesline() {
    let x = 0, tx = 0, v = 0, down = false, sx = 0, start = 0, moved = false, lastX = 0, dragV = 0, lastPX = 0;
    const max = () => Math.max(0, track.scrollWidth - wrap.clientWidth);
    wrap.addEventListener("pointerdown", (e) => { down = true; moved = false; sx = lastX = e.clientX; start = tx; wrap.classList.add("is-drag"); wrap.setPointerCapture(e.pointerId); });
    wrap.addEventListener("pointermove", (e) => {
      const h = !down && e.target.closest && e.target.closest(".hang");
      if (h) phys[+h.dataset.i].w += (e.clientX - lastPX) * 0.012;
      lastPX = e.clientX;
      if (!down) return;
      const d = e.clientX - sx; if (Math.abs(d) > 5) moved = true;
      dragV = e.clientX - lastX; lastX = e.clientX;
      tx = Math.max(-80, Math.min(max() + 80, start - d));
    });
    const up = (e) => {
      if (!down) return; down = false; wrap.classList.remove("is-drag");
      tx = Math.max(0, Math.min(max(), tx - dragV * 14));
      if (!moved) {
        const el = document.elementFromPoint(e.clientX, e.clientY), f = el && el.closest(".hang");
        if (f) App.lightbox(posters.map((p) => ({ src: p.src, cap: `${p.t}, ${p.y}` })), +f.dataset.i);
      }
    };
    wrap.addEventListener("pointerup", up); wrap.addEventListener("pointercancel", up);
    wrap.addEventListener("wheel", (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); tx = Math.max(0, Math.min(max(), tx + e.deltaX)); } }, { passive: false });

    const pegY = 40;
    const drawRope = (t) => {
      const W = track.scrollWidth;
      rope.setAttribute("width", W); rope.setAttribute("viewBox", `0 0 ${W} 140`);
      let d = `M0 ${pegY - 14}`, px = 0;
      hangs.forEach((h, i) => {
        const cx = h.offsetLeft + h.offsetWidth / 2;
        const sag = 22 + Math.sin(t / 900 + i) * 3 + Math.min(30, Math.abs(v) * 0.6);
        d += ` Q${(px + cx) / 2} ${pegY + sag} ${cx} ${pegY}`;
        px = cx;
      });
      d += ` Q${(px + W) / 2} ${pegY + 26} ${W} ${pegY - 14}`;
      ropePath.setAttribute("d", d);
    };
    let visible = false;
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(wrap);
    const loop = (t) => {
      requestAnimationFrame(loop);
      if (!visible) return;
      const nx = x + (tx - x) * 0.1; v = nx - x; x = nx;
      track.style.transform = `translate3d(${-x}px,0,0)`;
      const sv = App.lenis ? App.lenis.velocity || 0 : 0;
      phys.forEach((s, i) => {
        const force = -v * 0.05 + sv * 0.004 + Math.sin(t / 1300 + i * 1.7) * 0.006;
        s.w += force - s.a * 0.018; s.w *= 0.94; s.a += s.w;
        s.a = Math.max(-28, Math.min(28, s.a));
        hangs[i].style.transform = `rotate(${s.a}deg)`;
      });
      drawRope(t);
    };
    requestAnimationFrame(loop);
  })();

  /* =======================================================
     FORMULAIRE D'EMBAUCHE (ouvre la messagerie)
     ======================================================= */
  const form = $("#hireForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const who = fd.getAll("who"), what = fd.getAll("what"), nm = (fd.get("name") || "").trim();
    const list = (a) => (a.length > 1 ? a.slice(0, -1).join(", ") + " et " + a[a.length - 1] : a[0]);
    const body = [
      "Bonjour Anaïs,", "",
      `Nous sommes ${who.length ? list(who) : "une entreprise qui a aimé ton portfolio"}${what.length ? ` et nous cherchons ${list(what)}` : ""}.`,
      "Parlons-en !", "", nm
    ].join("\n");
    const subject = `Alternance 2026${nm ? " — " + nm : ""}`;
    App.stampIn($("#recu"), { shake: form });
    App.toast("Votre messagerie s'ouvre…");
    setTimeout(() => { location.href = `mailto:${window.SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`; }, 750);
  });

  /* =======================================================
     BANDES : la vitesse suit le scroll
     ======================================================= */
  const bands = $$("[data-marquee]").map((t) => { t.innerHTML += t.innerHTML + t.innerHTML; return { el: t, dir: +t.dataset.marquee, x: 0 }; });
  if (!App.reduced) {
    (function loop() {
      const v = App.lenis ? App.lenis.velocity || 0 : 0;
      bands.forEach((b) => {
        const w = b.el.scrollWidth / 3;
        b.x -= b.dir * (0.6 + Math.abs(v) * 0.35);
        if (b.x <= -w) b.x += w; if (b.x > 0) b.x -= w;
        b.el.style.transform = `translate3d(${b.x}px,0,0) skewX(${Math.max(-8, Math.min(8, -v * 0.4))}deg)`;
      });
      requestAnimationFrame(loop);
    })();
  }

  App.drawPaths(document);

  /* =======================================================
     ANIMATIONS
     ======================================================= */
  const intro = () => {
    document.body.classList.remove("is-loading");
    if (!anim) return;
    gsap.timeline()
      .from(lastChars, { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.035 })
      .from(firstChars, { yPercent: 110, duration: 1.3, ease: "expo.out", stagger: 0.05 }, 0.08)
      .from(".hero__info > *, .hero__row2 > *", { y: 26, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.2)
      .from(".polas .pola", { y: () => innerHeight * 0.7, rotation: () => gsap.utils.random(-35, 35), opacity: 0, duration: 1.4, ease: "expo.out", stagger: 0.08, clearProps: "opacity" }, 0.35)
      .from(".hero__note, .hero__foot", { opacity: 0, duration: 0.8 }, 1.1);
  };

  // loader : le logo se dessine, le compteur monte
  const loader = $(".loader");
  const runLoader = () => {
    const num = $(".loader__count", loader), bar = $(".loader__bar i", loader), paths = $$(".loader__logo path", loader);
    const lens = paths.map((p) => p.getTotalLength());
    paths.forEach((p, i) => { p.style.strokeDasharray = lens[i]; p.style.strokeDashoffset = lens[i]; });
    const imgs = [...polaData.map((d) => d.src), ...P.slice(0, 4).map((p) => p.thumb)];
    let loaded = 0;
    const total = imgs.length + 1, target = { v: 0 }, state = { v: 0 };
    const bump = () => { loaded++; target.v = Math.min(100, (loaded / total) * 100); };
    imgs.forEach((s) => { const im = new Image(); im.onload = im.onerror = bump; im.src = s; });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(bump);
    const t0 = performance.now();
    const loop = (t) => {
      const minP = Math.min(100, ((t - t0) / 1800) * 100);
      const goal = Math.min(minP, t - t0 > 4500 ? 100 : target.v);
      state.v += (goal - state.v) * 0.12;
      const v = Math.min(100, Math.round(state.v + 0.4));
      num.textContent = String(v).padStart(3, "0");
      bar.style.width = v + "%";
      paths.forEach((p, i) => (p.style.strokeDashoffset = lens[i] * (1 - v / 100)));
      if (v >= 100) {
        App.store.set("seen", "1");
        gsap.timeline()
          .to(paths, { fillOpacity: 1, duration: 0.35 })
          .to(".loader__logo", { scale: 0.9, rotation: -8, duration: 0.3, ease: "power2.in" })
          .to(loader, { yPercent: -110, rotation: -3, duration: 1, ease: "expo.inOut" })
          .add(intro, "-=0.6")
          .set(loader, { display: "none" });
        return;
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  };
  if (anim && !App.store.get("seen")) runLoader();
  else { loader.style.display = "none"; App.revealPage(intro); }

  if (!anim) {
    $$(".w", man).forEach((w) => (w.style.opacity = 1));
    $$("[data-count]").forEach((b) => (b.textContent = b.dataset.count));
    $$(".hl").forEach((h) => h.classList.add("is-on"));
    $$(".stamp").forEach((s) => (s.style.opacity = 0.92));
    App.reveals();
    return;
  }

  // hero : lettres qui suivent la souris + sortie parallaxe
  if (App.fine) addEventListener("pointermove", (e) => {
    const nx = e.clientX / innerWidth - 0.5;
    firstChars.forEach((c, i) => gsap.to(c, { x: nx * (i - 2) * 28, duration: 1, ease: "power3.out", overwrite: "auto" }));
  });
  gsap.to("#heroName", { yPercent: -18, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
  gsap.to("#polas", { yPercent: -35, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

  // note : la feuille arrive, les mots s'impriment
  gsap.from("#letter", { y: 160, rotation: 4, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: "#letter", start: "top 92%" } });
  gsap.fromTo($$(".w", man), { opacity: 0.12 }, { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: man, start: "top 78%", end: "bottom 50%", scrub: true } });
  $$(".cut", man).forEach((c, i) => gsap.from(c, { scale: 0, rotation: (i % 2 ? 1 : -1) * 18, duration: 0.7, ease: "back.out(2.4)", scrollTrigger: { trigger: c, start: "top 82%" } }));
  $$(".hl").forEach((h) => ScrollTrigger.create({ trigger: h, start: "top 75%", once: true, onEnter: () => h.classList.add("is-on") }));
  gsap.from(".letter .clip", { y: -60, rotation: -30, opacity: 0, duration: 1, ease: "back.out(2)", scrollTrigger: { trigger: "#letter", start: "top 80%" } });
  gsap.from(".letter__aside", { opacity: 0, x: 30, duration: 1, scrollTrigger: { trigger: "#letter", start: "top 60%" } });
  App.stampIn($(".letter .stamp"), { trigger: "#letter", start: "bottom 90%", shake: "#letter" });
  $$(".fact").forEach((f, i) => gsap.from(f, { y: 200, rotation: i % 2 ? 14 : -14, opacity: 0, duration: 1.2, ease: "expo.out", delay: i * 0.08, scrollTrigger: { trigger: ".facts", start: "top 88%" } }));
  $$("[data-count]").forEach((b) => {
    const o = { v: 0 };
    gsap.to(o, { v: +b.dataset.count, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 90%" }, onUpdate: () => (b.textContent = Math.round(o.v)) });
  });

  // sommaire
  gsap.from(".toc__item", { y: 40, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.05, clearProps: "opacity,transform", scrollTrigger: { trigger: "#toc", start: "top 85%" } });
  gsap.from(".toc__dots", { scaleX: 0, duration: 1.2, ease: "expo.out", stagger: 0.05, scrollTrigger: { trigger: "#toc", start: "top 80%" } });

  // dossiers
  const sheets = $$(".sheet", dos);
  const sticky = !mobile;
  sheets.forEach((sh, i) => {
    const inner = $(".sheet__inner", sh), items = $$(".collage__item", sh);
    const st = $(".stamp", sh);
    gsap.set(st, { opacity: 0 });
    const tl = gsap.timeline({ scrollTrigger: { trigger: sh, start: sticky ? "top 55%" : "top 80%", once: true } });
    tl.from($$(".line-reveal > span", sh), { yPercent: 115, duration: 1.2, ease: "expo.out" })
      .add(() => $$("[data-scr]", sh).forEach((m) => App.scramble(m)), 0)
      .from($(".sheet__num", sh), { yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out" }, 0)
      .from(items, { y: 220, rotation: () => gsap.utils.random(-25, 25), opacity: 0, duration: 1.3, ease: "expo.out", stagger: 0.09 }, 0.05)
      .from($$(".tape", sh), { scaleX: 0, duration: 0.5, ease: "power3.out", stagger: 0.04 }, 0.55)
      .from($$(".sheet__blurb, .sheet__tags, .sheet__cta", sh), { y: 30, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.08 }, 0.25)
      .add(() => App.stampIn(st, {}), 0.9);
    // la feuille du dessous s'enfonce dans la pile
    if (sticky && i > 0) {
      const st2 = { trigger: sh, start: "top bottom", end: "top top", scrub: true };
      gsap.to($(".sheet__inner", sheets[i - 1]), { scale: 0.9, rotation: i % 2 ? 2.5 : -2.5, yPercent: -3, ease: "none", scrollTrigger: st2 });
      gsap.to($(".sheet__shade", sheets[i - 1]), { opacity: 0.5, ease: "none", scrollTrigger: { ...st2 } });
    }
    // profondeur : le collage suit la souris
    if (App.fine) {
      const qs = items.map((it) => ({ x: gsap.quickTo(it, "x", { duration: 1.2, ease: "power3.out" }), y: gsap.quickTo(it, "y", { duration: 1.2, ease: "power3.out" }), d: parseFloat(it.dataset.depth) }));
      inner.addEventListener("pointermove", (e) => {
        const r = inner.getBoundingClientRect(), nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
        qs.forEach((q) => { q.x(nx * 30 * q.d); q.y(ny * 22 * q.d); });
      });
    }
  });

  // corde à linge
  gsap.from(".hang", { y: -260, opacity: 0, duration: 1.4, ease: "elastic.out(1, 0.6)", stagger: 0.07, scrollTrigger: { trigger: "#lineWrap", start: "top 85%" } });

  // certificat
  gsap.from("#cert", { y: 140, rotation: -2.5, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: "#cert", start: "top 90%" } });
  gsap.set("#certStamp", { opacity: 0 });
  App.stampIn($("#certStamp"), { trigger: "#certStamp", start: "top 80%", shake: "#cert" });
  gsap.fromTo(".cert__sign", { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.8, ease: "power2.inOut", scrollTrigger: { trigger: ".cert__sign", start: "top 92%" } });
  gsap.from(".field", { opacity: 0, y: 14, duration: 0.6, stagger: 0.04, ease: "power2.out", scrollTrigger: { trigger: ".fields", start: "top 80%" } });
  gsap.from(".cert__photo .pola", { y: -120, rotation: 25, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: "#cert", start: "top 70%" } });

  // contact
  gsap.from("#hireForm", { y: 180, rotation: 5, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: "#hireForm", start: "top 92%" } });
  gsap.from(".direct > *", { x: 60, opacity: 0, duration: 0.9, stagger: 0.07, ease: "expo.out", scrollTrigger: { trigger: ".direct", start: "top 88%" } });
  gsap.from(".footer__big", { yPercent: 60, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".footer", start: "top 95%" } });

  App.reveals();
  addEventListener("load", () => ScrollTrigger.refresh());
})();
