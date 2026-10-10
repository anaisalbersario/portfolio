/* =========================================================
   Page projet : interactions & animations
   ========================================================= */
(function () {
  const { $, $$ } = App;
  const { gallery } = window.PROJECT_CTX;
  const anim = typeof window.gsap !== "undefined" && !App.reduced;
  const mobile = matchMedia("(max-width: 900px)").matches;

  // visionneuse : images, slides, couverture
  document.addEventListener("click", (e) => {
    const m = e.target.closest("[data-lb]");
    if (m) { App.lightbox(gallery, +m.dataset.lb); return; }
    const d = e.target.closest("[data-day]");
    if (d) {
      const dd = d.dataset.day.replace("-", "/");
      const T = (k) => App.I.t(k);
      const items = window.EIA_CALENDAR.days[d.dataset.day].map((n) => n.startsWith("reel:")
        ? { src: `media/eia/${n.slice(5)}.mp4`, cap: `${T("reel_of")} ${dd}` }
        : { src: `media/eia/${n}.jpg`, cap: `${n.startsWith("story") ? T("story_of") : T("post_of")} ${dd}` });
      App.lightbox(items, 0);
    }
  });

  // polaroids éparpillés
  $$("[data-scatter] .pola").forEach((el) => App.draggable(el, el.parentElement, () => App.lightbox(gallery, +el.dataset.k)));

  // vidéos : lecture seulement quand visibles
  const io = new IntersectionObserver((entries) => entries.forEach((en) => { en.isIntersecting ? en.target.play().catch(() => {}) : en.target.pause(); }), { threshold: 0.25 });
  if (!App.reduced) $$("video[data-autoplay]").forEach((v) => io.observe(v));

  // calendrier : cercles au feutre
  const calIO = new IntersectionObserver((entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); calIO.unobserve(en.target); } }), { threshold: 0.6 });
  $$(".cal__day.has-post").forEach((d, i) => { d.style.transitionDelay = (i % 7) * 60 + "ms"; calIO.observe(d); });

  const start = () => {
    if (!anim) { $$(".stamp").forEach((s) => (s.style.opacity = 0.92)); App.reveals(); return; }
    gsap.set("#pStamp", { opacity: 0 });

    // le dossier s'ouvre : la feuille sort de la pochette, le polaroid tombe, coup de tampon
    gsap.timeline()
      .from(".p-hero__top > *", { y: 20, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.06 })
      .from(".folder-back", { yPercent: 30, opacity: 0, duration: 1, ease: "expo.out" }, 0)
      .from("#folderFront", { yPercent: 100, duration: 1.1, ease: "expo.out" }, 0.05)
      .from("#infoSheet", { yPercent: 70, rotation: 4, duration: 1.4, ease: "expo.out" }, 0.25)
      .from(".p-title .line-reveal > span", { yPercent: 115, duration: 1.2, ease: "expo.out" }, 0.55)
      .from(".info-sheet__row:not(:first-child), .p-blurb", { opacity: 0, y: 14, duration: 0.6, stagger: 0.05 }, 0.75)
      .from("#coverPola", { y: -innerHeight * 0.9, rotation: -30, duration: 1.4, ease: "expo.out" }, 0.45)
      .from("#coverPola .clip", { y: -80, rotation: -40, opacity: 0, duration: 0.8, ease: "back.out(2)" }, 1.2)
      .add(() => App.stampIn($("#pStamp"), { shake: "#dossier" }), 1.35);

    // en scrollant, la pochette glisse et la feuille remonte
    if (!mobile) {
      gsap.to("#folderFront", { yPercent: 40, ease: "none", scrollTrigger: { trigger: "#dossier", start: "top top", end: "bottom top", scrub: true } });
      gsap.to("#coverPola", { y: -120, rotation: 8, ease: "none", scrollTrigger: { trigger: "#dossier", start: "top top", end: "bottom top", scrub: true } });
      gsap.to("#infoSheet", { y: -60, ease: "none", scrollTrigger: { trigger: "#dossier", start: "top top", end: "bottom top", scrub: true } });
    }

    // notes scotchées
    $$("[data-note]").forEach((n, i) => gsap.from(n, { y: 120, rotation: i ? 8 : -8, opacity: 0, duration: 1.2, ease: "expo.out", delay: i * 0.1, scrollTrigger: { trigger: n, start: "top 90%" } }));

    // images : les scotchs se posent
    $$(".fig .tape, .quote .tape").forEach((t) => gsap.from(t, { scaleX: 0, opacity: 0, duration: 0.6, ease: "power3.out", scrollTrigger: { trigger: t, start: "top 85%" } }));
    $$("[data-quote]").forEach((q) => gsap.from(q, { y: 120, rotation: 4, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: q, start: "top 88%" } }));
    $$(".blk-title h2 .line-reveal > span").forEach((h) => gsap.from(h, { yPercent: 115, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: h.closest(".blk-title"), start: "top 88%" } }));
    $$(".blk-title p").forEach((p) => gsap.from(p, { opacity: 0, x: 30, duration: 1, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 90%" } }));

    // slides empilées
    const cards = $$(".deck__card");
    cards.forEach((c, j) => {
      if (j === cards.length - 1) return;
      gsap.to(c, { scale: 0.92, filter: "brightness(0.55)", ease: "none", scrollTrigger: { trigger: cards[j + 1], start: "top bottom", end: "top 12%", scrub: true } });
    });

    // polaroids : arrivée en vrac
    $$("[data-scatter]").forEach((s) => gsap.from($$(".pola", s), { y: 220, rotation: () => gsap.utils.random(-40, 40), opacity: 0, duration: 1.3, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: s, start: "top 75%" } }));
    $$(".cal__month").forEach((m) => gsap.from(m, { y: 120, rotation: -3, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: m, start: "top 88%" } }));

    // dossier suivant
    gsap.from(".next__title", { yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".next", start: "top 85%" } });
    gsap.from(".footer__big", { yPercent: 60, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".footer", start: "top 95%" } });

    App.reveals();
    addEventListener("load", () => ScrollTrigger.refresh());
  };
  App.revealPage(start);
})();
