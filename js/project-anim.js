/* =========================================================
   Page projet : interactions & animations
   ========================================================= */
(function () {
  const { $, $$ } = App;
  const { p, gallery } = window.PROJECT_CTX;
  const anim = typeof window.gsap !== "undefined" && !App.reduced;

  // lightbox : images, slides
  document.addEventListener("click", (e) => {
    const m = e.target.closest("[data-lb]");
    if (m) { App.lightbox(gallery, +m.dataset.lb); return; }
    const d = e.target.closest("[data-day]");
    if (d) {
      const items = window.EIA_CALENDAR.days[d.dataset.day].map((n) => n.startsWith("reel:")
        ? { src: `media/eia/${n.slice(5)}.mp4`, cap: `EÏA — Reel du ${d.dataset.day.replace("-", "/")}` }
        : { src: `media/eia/${n}.jpg`, cap: `EÏA — ${n.startsWith("story") ? "Story" : "Post"} du ${d.dataset.day.replace("-", "/")}` });
      App.lightbox(items, 0);
    }
  });

  // polaroids éparpillés
  $$("[data-scatter] .pola").forEach((el) => App.draggable(el, el.parentElement, () => App.lightbox(gallery, +el.dataset.k)));

  // vidéos : lecture seulement quand visibles
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    const v = en.target;
    if (en.isIntersecting) { v.play().catch(() => {}); } else v.pause();
  }), { threshold: 0.25 });
  $$("video[data-autoplay]").forEach((v) => { if (!App.reduced) io.observe(v); });

  // calendrier : cercles au feutre
  const calIO = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); calIO.unobserve(en.target); }
  }), { threshold: 0.6 });
  $$(".cal__day.has-post").forEach((d, i) => { d.style.transitionDelay = (i % 7) * 60 + "ms"; calIO.observe(d); });

  const start = () => {
    if (!anim) { App.reveals(); return; }
    const tl = gsap.timeline();
    tl.from(".p-title .line-reveal > span", { yPercent: 110, duration: 1.3, ease: "expo.out" })
      .from(".p-hero__top > *, .p-sub", { y: 20, opacity: 0, duration: 0.9, ease: "expo.out", stagger: 0.06 }, 0.15)
      .from(".spec > div", { y: 20, opacity: 0, duration: 0.8, ease: "expo.out", stagger: 0.05 }, 0.3)
      .fromTo(".p-cover", { clipPath: "inset(30% 12% 0% 12%)" }, { clipPath: "inset(12% 6% 0% 6%)", duration: 1.6, ease: "expo.out" }, 0.25)
      .from(".p-cover img", { scale: 1.3, duration: 1.8, ease: "expo.out" }, 0.25);

    // la couverture s'ouvre en plein écran au scroll
    gsap.to(".p-cover", { clipPath: "inset(0% 0% 0% 0%)", ease: "none", scrollTrigger: { trigger: ".p-cover", start: "top 75%", end: "top 10%", scrub: true } });

    // slides empilées
    const cards = $$(".deck__card");
    cards.forEach((c, j) => {
      if (j === cards.length - 1) return;
      gsap.to(c, { scale: 0.92, filter: "brightness(0.55)", ease: "none",
        scrollTrigger: { trigger: cards[j + 1], start: "top bottom", end: "top 12%", scrub: true } });
    });

    // polaroids : arrivée en vrac
    $$("[data-scatter]").forEach((s) => gsap.from($$(".pola", s), { y: 200, rotation: () => gsap.utils.random(-40, 40), opacity: 0, duration: 1.2, ease: "expo.out", stagger: 0.07, scrollTrigger: { trigger: s, start: "top 75%" } }));

    // titres de blocs
    $$(".blk-title h2").forEach((h) => gsap.from(h, { yPercent: 50, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 90%" } }));
    $$(".cal__month").forEach((m) => gsap.from(m, { y: 100, rotation: -1.5, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: m, start: "top 88%" } }));
    gsap.from(".next__title", { yPercent: 40, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".next", start: "top 85%" } });

    App.reveals();
    addEventListener("load", () => ScrollTrigger.refresh());
  };
  App.revealPage(start);
})();
