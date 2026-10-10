/* =========================================================
   Page projet : interactions & animations
   ========================================================= */
(function () {
  const { $, $$, esc } = App;
  const I = App.I, T = (k) => I.t(k);
  const { gallery } = window.PROJECT_CTX;
  const anim = typeof window.gsap !== "undefined" && !App.reduced;
  const mobile = matchMedia("(max-width: 900px)").matches;
  const capOf = (o, k = "cap") => (I.lang === "en" && o[k + "_en"] ? o[k + "_en"] : o[k] || "");

  /* ---------- glisser horizontalement (pochettes) ---------- */
  let dragMoved = false;
  $$("[data-rail]").forEach((rail) => {
    const track = rail.firstElementChild;
    let x = 0, tx = 0, down = false, sx = 0, start = 0, lastX = 0, v = 0;
    const max = () => Math.max(0, track.scrollWidth - rail.clientWidth);
    rail.addEventListener("pointerdown", (e) => { down = true; dragMoved = false; sx = lastX = e.clientX; start = tx; rail.classList.add("is-drag"); });
    addEventListener("pointermove", (e) => {
      if (!down) return;
      const d = e.clientX - sx; if (Math.abs(d) > 6) dragMoved = true;
      v = e.clientX - lastX; lastX = e.clientX;
      tx = Math.max(-60, Math.min(max() + 60, start - d));
    });
    addEventListener("pointerup", () => { if (!down) return; down = false; rail.classList.remove("is-drag"); tx = Math.max(0, Math.min(max(), tx - v * 12)); });
    rail.addEventListener("wheel", (e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); tx = Math.max(0, Math.min(max(), tx + e.deltaX)); } }, { passive: false });
    const cards = $$(".sleeve", track);
    let vis = false;
    new IntersectionObserver(([en]) => (vis = en.isIntersecting)).observe(rail);
    (function loop() {
      requestAnimationFrame(loop);
      if (!vis) return;
      const nx = x + (tx - x) * 0.12, vel = nx - x; x = nx;
      track.style.transform = `translate3d(${-x}px,0,0)`;
      const sk = Math.max(-10, Math.min(10, vel * 0.35));
      cards.forEach((c) => (c.style.transform = `rotate(${sk * 0.4}deg) skewX(${-sk * 0.3}deg)`));
    })();
  });
  // un glisser n'est pas un clic
  document.addEventListener("click", (e) => { if (dragMoved && e.target.closest("[data-rail]")) { e.stopPropagation(); e.preventDefault(); dragMoved = false; } }, true);

  // visionneuse : images, slides, couverture
  document.addEventListener("click", (e) => {
    const m = e.target.closest("[data-lb]");
    if (m) App.lightbox(gallery, +m.dataset.lb);
  });

  // polaroids éparpillés
  $$("[data-scatter] .pola").forEach((el) => App.draggable(el, el.parentElement, () => App.lightbox(gallery, +el.dataset.k)));

  // vidéos : lecture seulement quand visibles
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { en.isIntersecting ? en.target.play().catch(() => {}) : en.target.pause(); }), { threshold: 0.25 });
  if (!App.reduced) $$("video[data-autoplay]").forEach((v) => io.observe(v));

  /* =======================================================
     LE TÉLÉPHONE (feed EÏA)
     ======================================================= */
  const phoneEl = $("#phone");
  if (phoneEl) {
    const FEED = window.EIA_FEED, eia = (n) => `media/eia/${n}.jpg`;
    const postL = $(".ig__post", phoneEl), storyL = $(".ig__storyv", phoneEl);
    const openLayer = (L) => { L.classList.add("is-on"); L.setAttribute("aria-hidden", "false"); };
    const closeLayer = (L) => { L.classList.remove("is-on"); L.setAttribute("aria-hidden", "true"); setTimeout(() => { if (!L.classList.contains("is-on")) L.innerHTML = ""; }, 500); };

    // --- un post (carrousel) ---
    const openPost = (j) => {
      const po = FEED.posts[j];
      const slides = po.video
        ? `<div class="ig__slide"><video src="media/eia/${po.video}.mp4" autoplay muted loop playsinline></video></div>`
        : po.files.map((f) => `<div class="ig__slide"><img src="${eia(f)}" alt="" draggable="false"></div>`).join("");
      const n = po.video ? 1 : po.files.length;
      postL.innerHTML = `
        <div class="ig__bar"><button type="button" class="ig__back mono" data-close>${T("ph_back")}</button><b>${esc(FEED.handle)}</b><span class="mono">${esc(po.date)}</span></div>
        <div class="ig__viewport"><div class="ig__slides">${slides}</div><span class="ig__heart" aria-hidden="true">♥</span>
          ${n > 1 ? `<span class="ig__count mono">1/${n}</span><button type="button" class="ig__arrow ig__arrow--l" aria-label="←">‹</button><button type="button" class="ig__arrow ig__arrow--r" aria-label="→">›</button>` : ""}</div>
        ${n > 1 ? `<div class="ig__dots">${Array.from({ length: n }, (_, k) => `<i class="${k ? "" : "is-on"}"></i>`).join("")}</div>` : ""}
        <div class="ig__actions"><button type="button" class="ig__like" aria-label="♥">♡</button><span>💬</span><span>➤</span></div>
        <p class="ig__cap"><b>${esc(FEED.handle)}</b> ${esc(capOf(po))}</p>
        <p class="ig__hint hand">${n > 1 ? T("ph_swipe") : T("ph_dbl")}</p>`;
      openLayer(postL);
      if (anim) gsap.fromTo(postL, { xPercent: 100 }, { xPercent: 0, duration: 0.55, ease: "expo.out" });
      // carrousel glissable
      const vp = $(".ig__viewport", postL), track = $(".ig__slides", postL), dots = $$(".ig__dots i", postL), count = $(".ig__count", postL);
      let idx = 0, sx = 0, dx = 0, down = false;
      const go = (k, instant) => {
        idx = Math.max(0, Math.min(n - 1, k));
        track.style.transition = instant ? "none" : "transform .55s cubic-bezier(.16,1,.3,1)";
        track.style.transform = `translateX(${-idx * 100}%)`;
        dots.forEach((d, q) => d.classList.toggle("is-on", q === idx));
        if (count) count.textContent = `${idx + 1}/${n}`;
      };
      vp.addEventListener("pointerdown", (e) => { if (e.target.closest("button")) return; down = true; sx = e.clientX; dx = 0; track.style.transition = "none"; vp.setPointerCapture(e.pointerId); });
      vp.addEventListener("pointermove", (e) => { if (!down) return; dx = e.clientX - sx; track.style.transform = `translateX(calc(${-idx * 100}% + ${dx}px))`; });
      vp.addEventListener("pointerup", () => { if (!down) return; down = false; if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1)); else go(idx); });
      vp.addEventListener("click", (e) => {
        if (e.target.closest(".ig__arrow--l")) go(idx - 1);
        else if (e.target.closest(".ig__arrow--r")) go(idx + 1);
      });
      // double-tap = j'aime
      const like = () => {
        const h = $(".ig__heart", postL), b = $(".ig__like", postL);
        b.textContent = "♥"; b.classList.add("is-on");
        if (anim) gsap.fromTo(h, { scale: 0, opacity: 1 }, { scale: 1.2, duration: 0.35, ease: "back.out(3)", onComplete: () => gsap.to(h, { opacity: 0, scale: 1.5, duration: 0.4, delay: 0.25 }) });
      };
      vp.addEventListener("dblclick", like);
      $(".ig__like", postL).addEventListener("click", like);
      $("[data-close]", postL).addEventListener("click", () => {
        if (anim) gsap.to(postL, { xPercent: 100, duration: 0.45, ease: "power3.in", onComplete: () => closeLayer(postL) });
        else closeLayer(postL);
      });
    };

    // --- une story (barres de progression) ---
    let storyTimer = null;
    const openStory = (j, from) => {
      const st = FEED.stories[j];
      if (!st) return closeStory();
      let k = 0;
      storyL.innerHTML = `
        <div class="ig__bars">${st.files.map(() => `<i><b></b></i>`).join("")}</div>
        <div class="ig__sbar"><span class="ig__sav"><img src="${FEED.avatar}" alt=""></span><b>${esc(FEED.handle)}</b><span class="mono">${esc(st.date)}</span><button type="button" class="ig__x" aria-label="${T("close")}">✕</button></div>
        <div class="ig__simg"></div>
        <button type="button" class="ig__tap ig__tap--l" aria-label="←"></button><button type="button" class="ig__tap ig__tap--r" aria-label="→"></button>`;
      openLayer(storyL);
      if (anim && from) {
        const r = from.getBoundingClientRect(), s = phoneEl.querySelector(".phone__screen").getBoundingClientRect();
        gsap.fromTo(storyL, { clipPath: `circle(28px at ${r.left - s.left + r.width / 2}px ${r.top - s.top + 30}px)` }, { clipPath: `circle(150% at ${r.left - s.left + r.width / 2}px ${r.top - s.top + 30}px)`, duration: 0.7, ease: "power3.inOut" });
      } else if (anim) gsap.fromTo(storyL, { xPercent: 100 }, { xPercent: 0, duration: 0.5, ease: "expo.out", clearProps: "transform" });
      const bars = $$(".ig__bars b", storyL), img = $(".ig__simg", storyL);
      const show = (q) => {
        k = q;
        if (k < 0) { k = 0; }
        if (k >= st.files.length) return openStory(j + 1);
        img.innerHTML = `<img src="${eia(st.files[k])}" alt="">`;
        if (anim) gsap.fromTo(img.firstChild, { scale: 1.08, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" });
        bars.forEach((b, q2) => { b.style.transition = "none"; b.style.width = q2 < k ? "100%" : "0%"; });
        requestAnimationFrame(() => { bars[k].style.transition = "width 4.5s linear"; bars[k].style.width = "100%"; });
        clearTimeout(storyTimer); storyTimer = setTimeout(() => show(k + 1), 4500);
      };
      show(0);
      $(".ig__tap--l", storyL).addEventListener("click", () => show(k - 1));
      $(".ig__tap--r", storyL).addEventListener("click", () => show(k + 1));
      $(".ig__x", storyL).addEventListener("click", closeStory);
    };
    function closeStory() {
      clearTimeout(storyTimer);
      if (anim) gsap.to(storyL, { yPercent: 100, duration: 0.45, ease: "power3.in", onComplete: () => { closeLayer(storyL); gsap.set(storyL, { clearProps: "all" }); } });
      else closeLayer(storyL);
    }

    phoneEl.addEventListener("click", (e) => {
      const c = e.target.closest("[data-post]"); if (c) return openPost(+c.dataset.post);
      const s = e.target.closest("[data-story]"); if (s) { s.classList.add("is-seen"); return openStory(+s.dataset.story, s); }
    });

    // le téléphone suit un peu la souris
    if (App.fine && anim) {
      const wrap = phoneEl.closest(".phone-wrap");
      const rx = gsap.quickTo(phoneEl, "rotationY", { duration: 1, ease: "power3.out" }), ry = gsap.quickTo(phoneEl, "rotationX", { duration: 1, ease: "power3.out" });
      wrap.addEventListener("pointermove", (e) => { const r = wrap.getBoundingClientRect(); rx(((e.clientX - r.left) / r.width - 0.5) * 14); ry(-((e.clientY - r.top) / r.height - 0.5) * 10); });
      wrap.addEventListener("pointerleave", () => { rx(0); ry(0); });
    }
  }

  /* =======================================================
     ANIMATIONS
     ======================================================= */
  const start = () => {
    if (!anim) { $$(".stamp").forEach((s) => (s.style.opacity = 0.92)); $$("[data-count]").forEach((b) => (b.textContent = b.dataset.count)); App.reveals(); return; }
    gsap.set("#pStamp", { opacity: 0 });

    // le dossier s'ouvre : la feuille sort de la pochette, le polaroid tombe, coup de tampon
    // (entrées sur yPercent / l'élément intérieur, parallaxe sur y : pas de conflit)
    gsap.timeline()
      .from(".p-hero__top > *", { y: 20, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 })
      .from(".folder-back", { yPercent: 30, opacity: 0, duration: 1, ease: "expo.out" }, 0)
      .from("#folderFront", { yPercent: 100, duration: 1.1, ease: "expo.out" }, 0.05)
      .from("#infoSheet", { yPercent: 70, rotation: 4, duration: 1.4, ease: "expo.out" }, 0.25)
      .from(".p-title .line-reveal > span", { yPercent: 115, duration: 1.2, ease: "expo.out" }, 0.55)
      .from(".info-sheet__row:not(:first-child), .p-blurb", { opacity: 0, y: 14, duration: 0.6, stagger: 0.05 }, 0.75)
      .from("#coverPola .pola", { yPercent: -140, rotation: -30, duration: 1.4, ease: "expo.out" }, 0.45)
      .from("#coverPola .clip", { yPercent: -120, rotation: -40, opacity: 0, duration: 0.8, ease: "back.out(2)" }, 1.2)
      .add(() => App.stampIn($("#pStamp"), { shake: "#dossier" }), 1.35);

    if (!mobile) {
      const st = { trigger: "#dossier", start: "top top", end: "bottom top", scrub: true };
      gsap.to("#folderFront", { y: 120, ease: "none", scrollTrigger: st });
      gsap.to("#coverPola", { y: -120, rotation: 6, ease: "none", scrollTrigger: { ...st } });
      gsap.to("#infoSheet", { y: -60, ease: "none", scrollTrigger: { ...st } });
    }

    // notes scotchées
    $$("[data-note]").forEach((n, i) => gsap.from(n, { y: 120, rotation: i ? 8 : -8, opacity: 0, duration: 1.2, ease: "expo.out", delay: i * 0.1, scrollTrigger: { trigger: n, start: "top 90%" } }));
    $$(".fig .tape, .quote .tape").forEach((t) => gsap.from(t, { scaleX: 0, opacity: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: t, start: "top 85%" } }));
    $$("[data-quote]").forEach((q) => gsap.from(q, { y: 120, rotation: 4, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: q, start: "top 88%" } }));
    $$(".blk-title h2 .line-reveal > span").forEach((h) => gsap.from(h, { yPercent: 115, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: h.closest(".blk-title"), start: "top 88%" } }));
    $$(".blk-title p").forEach((p) => gsap.from(p, { opacity: 0, x: 30, duration: 1, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 90%" } }));

    // téléphone
    if (phoneEl) {
      gsap.from(phoneEl, { y: 200, rotation: 8, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: phoneEl, start: "top 85%" } });
      gsap.from(".ig__cell", { scale: 0.6, opacity: 0, duration: 0.6, ease: "back.out(2)", stagger: 0.04, scrollTrigger: { trigger: phoneEl, start: "top 60%" } });
      $$(".phone-notes path").forEach((p) => { const l = p.getTotalLength(); gsap.fromTo(p, { strokeDasharray: l, strokeDashoffset: l }, { strokeDashoffset: 0, duration: 1, ease: "power2.inOut", scrollTrigger: { trigger: phoneEl, start: "top 60%" } }); });
      $$(".phone-side [data-count]").forEach((b) => { const o = { v: 0 }; gsap.to(o, { v: +b.dataset.count, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 90%" }, onUpdate: () => (b.textContent = Math.round(o.v)) }); });
    }
    // pochettes : elles glissent depuis la droite
    $$(".strip").forEach((s) => {
      gsap.from($$(".sleeve", s), { x: 260, rotation: () => gsap.utils.random(-8, 8), opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.06, scrollTrigger: { trigger: s, start: "top 85%" } });
      gsap.from($(".strip__title", s), { yPercent: 60, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: s, start: "top 88%" } });
    });

    // slides empilées
    const cards = $$(".deck__card");
    cards.forEach((c, j) => {
      if (j === cards.length - 1) return;
      gsap.to(c, { scale: 0.92, filter: "brightness(0.55)", ease: "none", scrollTrigger: { trigger: cards[j + 1], start: "top bottom", end: "top 12%", scrub: true } });
    });
    $$("[data-scatter]").forEach((s) => gsap.from($$(".pola", s), { y: 220, rotation: () => gsap.utils.random(-40, 40), opacity: 0, duration: 1.3, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: s, start: "top 75%" } }));

    gsap.from(".next__title", { yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".next", start: "top 85%" } });
    gsap.from(".footer__big", { yPercent: 60, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".footer", start: "top 95%" } });

    App.reveals();
    addEventListener("load", () => ScrollTrigger.refresh());
  };
  App.revealPage(start);
})();
