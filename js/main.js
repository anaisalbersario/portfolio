/* =========================================================
   Moteur commun : scroll fluide, curseur, transitions,
   header, horloge, lightbox, polaroids déplaçables.
   ========================================================= */
(function () {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const hasGsap = typeof window.gsap !== "undefined";
  const root = document.documentElement;
  root.classList.remove("no-js");
  if (reduced) root.classList.add("reduced");

  const App = (window.App = { reduced, fine, lenis: null });
  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  const initialHash = location.hash;
  window.scrollTo(0, 0);

  const I = window.I18N || { t: (k) => k, cur: (l) => l, f: (o, k) => o[k], href: (h) => h, apply() {}, set() {}, lang: "fr" };
  App.I = I;
  I.apply();

  /* ---------- utils ---------- */
  App.$ = (s, c = document) => c.querySelector(s);
  App.$$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  App.store = {
    get(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } },
    set(k, v) { try { sessionStorage.setItem(k, v); } catch (e) {} }
  };
  App.esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  App.roll = (txt) => `<span class="roll"><span>${txt}</span><span aria-hidden="true">${txt}</span></span>`;
  App.splitChars = (el) => {
    const text = el.textContent;
    el.setAttribute("aria-label", text);
    el.innerHTML = Array.from(text).map((c) => `<span class="ch" aria-hidden="true">${c === " " ? "&nbsp;" : c}</span>`).join("");
    return App.$$(".ch", el);
  };

  /* ---------- grain + curseur + rideau ---------- */
  document.body.insertAdjacentHTML("beforeend", `
    <div class="grain" aria-hidden="true"></div>
    <div class="curtain" aria-hidden="true"><div class="curtain__sheet torn-both tex"><div class="curtain__inner"><div class="stamp stamp--ring" data-stamp="${I.t("curtain_stamp")}"></div><span class="curtain__label"></span></div></div></div>
    <div class="cursor" aria-hidden="true"><div class="cursor__dot"></div><div class="cursor__label"></div></div>
    <div class="toast" role="status" aria-live="polite"></div>
    <div class="lb" role="dialog" aria-modal="true" aria-label="Visionneuse">
      <div class="lb__top"><span class="mono lb__count"></span><button class="lb__close mono" type="button">${I.t("close")}</button></div>
      <div class="lb__stage"></div>
      <div class="lb__bot"><span class="mono lb__cap"></span><div class="lb__nav"><button type="button" data-lb="prev">${I.t("prev")}</button><button type="button" data-lb="next">${I.t("next")}</button></div></div>
    </div>`);

  /* ---------- tampons (logo encré) ---------- */
  let stampId = 0;
  App.buildStamps = (scope = document) => {
    App.$$("[data-stamp]", scope).forEach((el) => {
      if (el.dataset.built) return;
      el.dataset.built = "1";
      const id = "stp" + stampId++;
      const txt = App.esc(I.lang === "en" && el.dataset.stampEn ? el.dataset.stampEn : el.dataset.stamp);
      el.innerHTML = `<svg class="ring inked" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48" stroke-width="2.6"/><circle cx="50" cy="50" r="43.5" stroke-width=".8"/></svg>`
        + `<svg class="stamp__txt inked" viewBox="0 0 100 100"><defs><path id="${id}" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"/></defs><text><textPath href="#${id}">${txt} ${txt}</textPath></text></svg>`
        + `<svg class="logo inked" viewBox="0 0 155.05 108.06"><use href="#logo"/></svg>`;
    });
  };
  App.buildStamps();
  // le coup de tampon : tombe, écrase, rebondit légèrement
  App.stampIn = (el, opts = {}) => {
    if (!el) return;
    if (!hasGsap || reduced) { el.style.opacity = 1; return; }
    const tl = gsap.timeline({ paused: !!opts.trigger, delay: opts.delay || 0 });
    tl.fromTo(el, { scale: 2.6, opacity: 0, rotation: -25 }, { scale: 1, opacity: opts.opacity || 0.92, rotation: 0, duration: 0.42, ease: "power4.in" })
      .to(el, { scale: 1.06, duration: 0.08, yoyo: true, repeat: 1, ease: "power1.out" });
    if (opts.shake) tl.fromTo(opts.shake, { x: -3 }, { x: 0, duration: 0.35, ease: "elastic.out(1, 0.3)" }, 0.42);
    if (opts.trigger) ScrollTrigger.create({ trigger: opts.trigger, start: opts.start || "top 75%", once: true, onEnter: () => tl.play() });
    return tl;
  };

  /* ---------- texte brouillé (étiquettes mono) ---------- */
  App.scramble = (el, dur = 0.9) => {
    const final = el.textContent, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#*/—";
    const o = { p: 0 };
    return gsap.to(o, { p: 1, duration: dur, ease: "none", onUpdate: () => {
      const n = Math.floor(o.p * final.length);
      el.textContent = final.slice(0, n) + Array.from(final.slice(n)).map((c) => (c === " " ? " " : chars[(Math.random() * chars.length) | 0])).join("");
    }, onComplete: () => (el.textContent = final) });
  };

  /* ---------- boutons aimantés ---------- */
  if (fine && !reduced && hasGsap) {
    App.$$("[data-magnet]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        gsap.to(el, { x: (e.clientX - r.left - r.width / 2) * 0.35, y: (e.clientY - r.top - r.height / 2) * 0.35, rotation: (e.clientX - r.left - r.width / 2) * 0.04, duration: 0.6, ease: "power3.out" });
      });
      el.addEventListener("pointerleave", () => gsap.to(el, { x: 0, y: 0, rotation: 0, duration: 0.9, ease: "elastic.out(1, 0.35)" }));
    });
  }

  /* ---------- scroll fluide ---------- */
  if (!reduced && typeof window.Lenis !== "undefined") {
    App.lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, smoothWheel: true });
    if (hasGsap && window.ScrollTrigger) {
      App.lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((t) => App.lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (t) => { App.lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }
  if (hasGsap && window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);
  // ancre à l'arrivée (ex. index.html#contact) : après mesure des animations
  if (initialHash && initialHash.length > 1) {
    addEventListener("load", () => setTimeout(() => {
      const el = document.querySelector(initialHash);
      if (!el) return;
      window.ScrollTrigger && ScrollTrigger.refresh();
      let y = el.getBoundingClientRect().top + window.scrollY;
      if (getComputedStyle(el).position === "sticky") { // feuille empilée : position « naturelle »
        const sibs = Array.from(el.parentElement.children);
        y = el.parentElement.getBoundingClientRect().top + window.scrollY + sibs.indexOf(el) * el.offsetHeight;
      }
      if (App.lenis) { App.lenis.resize && App.lenis.resize(); App.lenis.scrollTo(y, { immediate: true, force: true }); }
      else window.scrollTo(0, y);
      window.ScrollTrigger && ScrollTrigger.update();
    }, 120));
  }
  App.scrollTo = (target) => (App.lenis ? App.lenis.scrollTo(target, { offset: 0, duration: 1.4 }) : (typeof target === "number" ? window.scrollTo(0, target) : App.$(target)?.scrollIntoView({ behavior: "smooth" })));
  App.stop = () => App.lenis && App.lenis.stop();
  App.start = () => App.lenis && App.lenis.start();

  /* ---------- curseur ---------- */
  const cursor = App.$(".cursor");
  if (fine && !reduced) {
    document.body.classList.add("has-cursor");
    const label = App.$(".cursor__label", cursor);
    let x = innerWidth / 2, y = innerHeight / 2, cx = x, cy = y;
    addEventListener("pointermove", (e) => { x = e.clientX; y = e.clientY; }, { passive: true });
    addEventListener("pointerdown", () => cursor.classList.add("is-down"));
    addEventListener("pointerup", () => cursor.classList.remove("is-down"));
    const loop = () => {
      cx += (x - cx) * 0.2; cy += (y - cy) * 0.2;
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("pointerover", (e) => {
      const t = e.target.closest("[data-cursor], a, button");
      if (!t) { cursor.classList.remove("is-link", "has-label"); return; }
      const l = t.getAttribute("data-cursor");
      if (l) { label.textContent = I.cur(l); cursor.classList.add("has-label"); cursor.classList.remove("is-link"); }
      else { cursor.classList.add("is-link"); cursor.classList.remove("has-label"); }
    });
    document.addEventListener("pointerleave", () => cursor.style.opacity = 0);
    document.addEventListener("pointerenter", () => cursor.style.opacity = 1);
  }

  /* ---------- header : horloge, ton, masquage ---------- */
  const clock = App.$("[data-clock]");
  const tick = () => {
    if (!clock) return;
    const d = new Date();
    const t = d.toLocaleTimeString("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    clock.textContent = `Paris, FR — ${t}`;
  };
  tick(); setInterval(tick, 1000);
  App.$$("[data-today-inline]").forEach((el) => {
    const d = new Date();
    el.textContent = `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
  });
  App.$$("[data-today]").forEach((el) => {
    const d = new Date();
    el.innerHTML = `${d.getFullYear()}<br>${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}`;
  });

  const header = App.$(".header");
  if (header) {
    const tones = App.$$("[data-tone]").filter((s) => s !== header);
    const setTone = () => {
      const probe = 30;
      let tone = "dark";
      for (const s of tones) {
        const r = s.getBoundingClientRect();
        if (r.top <= probe && r.bottom > probe) { tone = s.dataset.tone; }
      }
      header.dataset.tone = tone;
    };
    let last = 0;
    const onScroll = () => {
      setTone();
      const y = window.scrollY;
      header.classList.toggle("is-hidden", y > 200 && y > last && !document.body.classList.contains("menu-open"));
      last = y;
    };
    addEventListener("scroll", onScroll, { passive: true });
    setTone();
  }

  /* menu mobile */
  const menuBtn = App.$(".menu-btn"), mnav = App.$(".mnav");
  if (menuBtn && mnav) {
    const toggle = (open) => {
      document.body.classList.toggle("menu-open", open);
      mnav.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", open);
      menuBtn.querySelector("span").textContent = open ? "Fermer" : "Menu";
      open ? App.stop() : App.start();
    };
    menuBtn.addEventListener("click", () => toggle(!mnav.classList.contains("is-open")));
    App.$$("a", mnav).forEach((a) => a.addEventListener("click", () => toggle(false)));
  }

  /* switch FR / EN */
  App.$$("[data-lang]").forEach((box) => {
    box.innerHTML = ["fr", "en"].map((l) => `<button type="button" data-set-lang="${l}" aria-pressed="${I.lang === l}" aria-label="${l === "fr" ? "Français" : "English"}"><span>${l.toUpperCase()}</span></button>`).join("");
  });
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-set-lang]");
    if (!b || b.dataset.setLang === I.lang) return;
    const l = b.dataset.setLang;
    I.set(l);
    const u = new URL(location.href);
    u.searchParams.set("lang", l);
    const target = u.pathname.split("/").pop() + u.search + u.hash;
    if (!hasGsap || reduced) { location.href = target; return; }
    I.lang = l; // pour que App.go ne réécrive pas le lien
    App.go(target, l === "en" ? "English" : "Français");
  });

  /* ancres internes */
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute("href");
    if (id.length < 2 || !App.$(id)) return;
    e.preventDefault();
    App.scrollTo(id);
  });

  /* ---------- transitions de page (feuille déchirée) ---------- */
  const curtain = App.$(".curtain"), cLabel = App.$(".curtain__label"), cStamp = App.$(".curtain .stamp");
  if (hasGsap) gsap.set(curtain, { y: 0, yPercent: 110 }); // GSAP pilote seul le transform
  App.go = (href, label) => {
    href = I.href(href);
    if (!hasGsap || reduced) { location.href = href; return; }
    cLabel.textContent = label || "";
    App.store.set("curtain", label || "·");
    gsap.timeline({ onComplete: () => (location.href = href) })
      .fromTo(curtain, { yPercent: 110, rotation: 3 }, { yPercent: 0, rotation: 0, duration: 0.8, ease: "expo.inOut" })
      .fromTo(cLabel, { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.45, ease: "expo.out" }, "-=0.25")
      .add(App.stampIn(cStamp, {}), "-=0.35")
      .set({}, {}, "+=0.15");
  };
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank" || a.hasAttribute("download")) return;
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || /^https?:/.test(href)) return;
    e.preventDefault();
    App.go(href, a.dataset.label || "");
  });
  // entrée de page : la feuille s'envole vers le haut
  App.revealPage = (cb) => {
    const from = App.store.get("curtain");
    if (from && hasGsap && !reduced) {
      App.store.set("curtain", "");
      cLabel.textContent = from === "·" ? "" : from;
      gsap.set(curtain, { y: 0, yPercent: 0, rotation: 0 });
      gsap.set(cStamp, { opacity: 0.92, scale: 1 });
      gsap.timeline({ delay: 0.1 })
        .to(curtain, { yPercent: -115, rotation: -4, duration: 1, ease: "expo.inOut" })
        .add(() => cb && cb(), "-=0.6");
      return true;
    }
    cb && cb();
    return false;
  };
  addEventListener("pageshow", (e) => { if (e.persisted && hasGsap) gsap.set(curtain, { y: 0, yPercent: 110 }); });

  /* ---------- toast + copier ---------- */
  const toast = App.$(".toast");
  App.toast = (msg) => {
    toast.textContent = msg; toast.classList.add("is-on");
    clearTimeout(App._tt); App._tt = setTimeout(() => toast.classList.remove("is-on"), 2200);
  };
  document.addEventListener("click", async (e) => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    try { await navigator.clipboard.writeText(b.dataset.copy); App.toast(I.t("copied")); }
    catch (err) { location.href = "mailto:" + b.dataset.copy; }
  });

  /* ---------- lightbox ---------- */
  const lb = App.$(".lb"), stage = App.$(".lb__stage"), count = App.$(".lb__count"), cap = App.$(".lb__cap");
  let list = [], idx = 0, lastFocus = null;
  const render = () => {
    const it = list[idx];
    const isVid = /\.mp4$/i.test(it.src);
    stage.innerHTML = isVid
      ? `<video src="${it.src}" controls autoplay muted playsinline loop></video>`
      : `<img src="${it.src}" alt="${App.esc(it.cap || "")}">`;
    count.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`;
    cap.textContent = it.cap || "";
    App.$(".lb__nav").style.visibility = list.length > 1 ? "visible" : "hidden";
  };
  App.lightbox = (items, i = 0) => {
    list = items; idx = i; lastFocus = document.activeElement;
    render(); lb.classList.add("is-open"); App.stop();
    App.$(".lb__close").focus();
  };
  const close = () => { lb.classList.remove("is-open"); stage.innerHTML = ""; App.start(); lastFocus && lastFocus.focus && lastFocus.focus(); };
  const step = (d) => { idx = (idx + d + list.length) % list.length; render(); };
  App.$(".lb__close").addEventListener("click", close);
  lb.addEventListener("click", (e) => {
    if (e.target.dataset.lb === "prev") step(-1);
    else if (e.target.dataset.lb === "next") step(1);
    else if (e.target === stage || e.target === lb) close();
  });
  addEventListener("keydown", (e) => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  let sx = 0;
  lb.addEventListener("touchstart", (e) => (sx = e.touches[0].clientX), { passive: true });
  lb.addEventListener("touchend", (e) => { const dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); });

  /* ---------- polaroids déplaçables ---------- */
  App.draggable = (el, bounds, onTap) => {
    let px = 0, py = 0, x = 0, y = 0, vx = 0, vy = 0, sx0 = 0, sy0 = 0, moved = false, down = false, rot = parseFloat(el.dataset.rot || 0);
    let z = 10;
    const apply = () => (el.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${rot}deg)`);
    apply();
    el.addEventListener("pointerdown", (e) => {
      down = true; moved = false; px = e.clientX; py = e.clientY; sx0 = px; sy0 = py;
      el.setPointerCapture(e.pointerId);
      el.classList.add("is-drag");
      App.draggable.z = (App.draggable.z || 20) + 1; el.style.zIndex = App.draggable.z;
    });
    el.addEventListener("pointermove", (e) => {
      if (!down) return;
      vx = e.clientX - px; vy = e.clientY - py; px = e.clientX; py = e.clientY;
      if (Math.abs(px - sx0) + Math.abs(py - sy0) > 6) moved = true;
      x += vx; y += vy; rot += vx * 0.08; rot = Math.max(-18, Math.min(18, rot));
      apply();
    });
    const up = () => {
      if (!down) return; down = false; el.classList.remove("is-drag");
      if (!moved) { onTap && onTap(); return; }
      // inertie
      const b = bounds && bounds.getBoundingClientRect();
      const glide = () => {
        vx *= 0.92; vy *= 0.92; x += vx; y += vy;
        if (b) {
          const r = el.getBoundingClientRect();
          if (r.left < b.left - r.width * 0.3 || r.right > b.right + r.width * 0.3) { vx *= -0.5; x += vx * 2; }
          if (r.top < b.top - r.height * 0.3 || r.bottom > b.bottom + r.height * 0.3) { vy *= -0.5; y += vy * 2; }
        }
        apply();
        if (Math.abs(vx) + Math.abs(vy) > 0.3) requestAnimationFrame(glide);
      };
      glide();
    };
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    el.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && onTap) { e.preventDefault(); onTap(); } });
  };

  /* ---------- tracé des cercles « feutre » ---------- */
  App.drawPaths = (scope) => {
    App.$$("svg[data-draw] path", scope).forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = len; p.style.strokeDashoffset = len;
      if (!hasGsap || reduced) { p.style.strokeDashoffset = 0; return; }
      gsap.to(p, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut",
        scrollTrigger: { trigger: p.closest("svg"), start: "top 85%" } });
    });
  };

  /* ---------- révélations génériques ---------- */
  App.reveals = (scope = document) => {
    if (!hasGsap || reduced) { App.$$("[data-clip]", scope).forEach((e) => (e.style.clipPath = "none")); return; }
    App.$$("[data-clip]", scope).forEach((el) => {
      gsap.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "expo.out",
        scrollTrigger: { trigger: el, start: "top 88%" } });
      const img = el.querySelector("img");
      if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    App.$$("[data-up]", scope).forEach((el) => {
      gsap.from(el, { y: 50, opacity: 0, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } });
    });
    App.$$("[data-lines]", scope).forEach((el) => {
      gsap.from(App.$$(".line-reveal > span", el), { yPercent: 110, duration: 1.1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: el, start: "top 88%" } });
    });
    App.$$("[data-parallax]", scope).forEach((el) => {
      const amt = parseFloat(el.dataset.parallax) || 10;
      gsap.fromTo(el, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } });
    });
  };
})();
