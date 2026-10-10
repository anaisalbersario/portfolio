/* =========================================================
   Les jeux : ticket à gratter, platine, atelier d'affiche,
   confettis. (Accueil uniquement)
   ========================================================= */
(function () {
  const { $, $$, esc } = App;
  const I = App.I, T = (k) => I.t(k), EN = I.lang === "en";
  const anim = typeof window.gsap !== "undefined" && !App.reduced;
  const LOGO_PATHS = $$("#logo path").map((p) => p.getAttribute("d"));

  /* ---------- confettis de papier ---------- */
  App.confetti = (x, y, n = 46) => {
    if (!anim) return;
    const colors = ["#e8261c", "#f0cf45", "#1673d1", "#1fc24a", "#141212", "#fbf8f1", "#f25c1f"];
    for (let i = 0; i < n; i++) {
      const c = document.createElement("i");
      c.className = "confetti";
      c.style.cssText = `left:${x}px;top:${y}px;background:${colors[i % colors.length]};width:${6 + Math.random() * 8}px;height:${8 + Math.random() * 12}px`;
      document.body.appendChild(c);
      const a = Math.random() * Math.PI * 2, v = 160 + Math.random() * 380;
      gsap.timeline({ onComplete: () => c.remove() })
        .to(c, { x: Math.cos(a) * v, y: Math.sin(a) * v - 160, rotation: gsap.utils.random(-540, 540), rotationX: gsap.utils.random(-360, 360), duration: 0.9, ease: "power3.out" })
        .to(c, { y: "+=" + (innerHeight * 0.7), x: "+=" + gsap.utils.random(-80, 80), rotation: "+=" + gsap.utils.random(-360, 360), opacity: 0, duration: 1.8, ease: "power1.in" });
    }
  };

  /* =======================================================
     TICKET À GRATTER
     ======================================================= */
  (function ticket() {
    const cv = $("#scratch"); if (!cv) return;
    const ctx = cv.getContext("2d");
    let done = false, down = false, last = null;
    const paint = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
      cv.width = r.width * dpr; cv.height = r.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const g = ctx.createLinearGradient(0, 0, r.width, r.height);
      g.addColorStop(0, "#b9b9be"); g.addColorStop(0.45, "#e9e9ec"); g.addColorStop(0.55, "#a7a7ad"); g.addColorStop(1, "#d6d6da");
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = g; ctx.fillRect(0, 0, r.width, r.height);
      // grain métallique + motif logo
      for (let i = 0; i < r.width * r.height / 40; i++) { ctx.fillStyle = `rgba(${Math.random() < 0.5 ? "255,255,255" : "0,0,0"},${Math.random() * 0.12})`; ctx.fillRect(Math.random() * r.width, Math.random() * r.height, 1.2, 1.2); }
      ctx.fillStyle = "rgba(20,18,18,.18)";
      for (let y = 18; y < r.height; y += 46) for (let x = (y / 46 % 2) * 40; x < r.width; x += 80) {
        ctx.save(); ctx.translate(x, y); ctx.scale(0.18, 0.18); LOGO_PATHS.forEach((d) => ctx.fill(new Path2D(d))); ctx.restore();
      }
      ctx.fillStyle = "rgba(20,18,18,.55)"; ctx.font = "500 13px 'Geist Mono', monospace"; ctx.textAlign = "center";
      ctx.fillText(EN ? "SCRATCH HERE" : "GRATTEZ ICI", r.width / 2, r.height / 2 + 4);
    };
    paint();
    addEventListener("resize", () => { if (!done) paint(); });
    const pos = (e) => { const r = cv.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const scratch = (p) => {
      ctx.globalCompositeOperation = "destination-out";
      ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.lineWidth = 34;
      ctx.beginPath(); ctx.moveTo((last || p).x, (last || p).y); ctx.lineTo(p.x, p.y); ctx.stroke();
      // éclats de « poussière » argentée
      if (anim && Math.random() < 0.35) {
        const r = cv.getBoundingClientRect(), d = document.createElement("i");
        d.className = "confetti"; d.style.cssText = `left:${r.left + p.x}px;top:${r.top + p.y}px;width:4px;height:4px;border-radius:50%;background:#c4c4c9`;
        document.body.appendChild(d);
        gsap.to(d, { x: gsap.utils.random(-30, 30), y: gsap.utils.random(20, 60), opacity: 0, duration: 0.7, ease: "power2.out", onComplete: () => d.remove() });
      }
      last = p;
    };
    const ratio = () => {
      const { width: w, height: h } = cv, data = ctx.getImageData(0, 0, w, h).data;
      let clear = 0, n = 0;
      for (let i = 3; i < data.length; i += 4 * 24) { n++; if (data[i] < 40) clear++; }
      return clear / n;
    };
    cv.addEventListener("pointerdown", (e) => { down = true; last = null; cv.setPointerCapture(e.pointerId); scratch(pos(e)); });
    cv.addEventListener("pointermove", (e) => { if (down && !done) scratch(pos(e)); });
    cv.addEventListener("pointerup", () => {
      down = false; last = null;
      if (!done && ratio() > 0.55) {
        done = true;
        const r = cv.getBoundingClientRect();
        if (anim) gsap.to(cv, { opacity: 0, duration: 0.6, onComplete: () => (cv.style.display = "none") }); else cv.style.display = "none";
        App.confetti(r.left + r.width / 2, r.top + r.height / 2, 70);
        App.toast(T("tk_done"));
        if (anim) gsap.fromTo(".ticket__prize b", { scale: 0.6, rotation: -6 }, { scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
      }
    });
  })();

  /* =======================================================
     LA PLATINE (ma méthode)
     ======================================================= */
  (function turntable() {
    const record = $("#record"), arm = $("#arm"); if (!record) return;
    const TRACKS = {
      A: [
        { n: "A1", t: "Écouter le brief", t_en: "Listen to the brief", d: "2:14", p: "Je pose les questions bêtes avant les idées brillantes.", p_en: "I ask the silly questions before the bright ideas." },
        { n: "A2", t: "Le moodboard", t_en: "The moodboard", d: "3:02", p: "Pinterest, archives, magazines, rue : je récolte avant de choisir.", p_en: "Pinterest, archives, magazines, the street: I collect before I choose." },
        { n: "A3", t: "Le concept", t_en: "The concept", d: "2:47", p: "Une idée qu'on peut dire en une phrase. Sinon, on recommence.", p_en: "An idea you can say in one sentence. Otherwise, start again." }
      ],
      B: [
        { n: "B1", t: "Shooting & fabrication", t_en: "Shoot & make", d: "4:10", p: "Lumière, stylisme, pose : je dirige, je cadre, je corrige.", p_en: "Light, styling, posing: I direct, frame and correct." },
        { n: "B2", t: "Mise en page", t_en: "Layout", d: "3:33", p: "Grille, typo, rythme. Le détail qui change tout.", p_en: "Grid, type, rhythm. The detail that changes everything." },
        { n: "B3", t: "Publication", t_en: "Publishing", d: "1:58", p: "Calendrier, légendes, analyse : une image doit vivre.", p_en: "Calendar, captions, analysis: an image has to live." }
      ]
    };
    const list = $("#tracks"), now = $("#now"), led = $("#led"), playBtn = $("#play"), sideLbl = $("#recSide");
    let side = "A", cur = -1, playing = false, rpm = 33, angle = 0, vel = 0, grabbing = false, armA = 0;
    const ARM_REST = 0, ARM_IN = 22, ARM_STEP = 5.5;
    const L = (o, k) => (EN && o[k + "_en"] ? o[k + "_en"] : o[k]);

    const renderList = () => {
      list.innerHTML = TRACKS[side].map((tr, i) => `<li><button type="button" data-tr="${i}" class="${i === cur ? "is-on" : ""}"><span class="tr__n">${tr.n}</span><span class="tr__t">${esc(L(tr, "t"))}</span><span class="tr__d">${tr.d}</span></button></li>`).join("");
    };
    renderList();

    /* --- son : ta voix (media/voix/A1.mp3…) + craquement de vinyle --- */
    let ac = null, master = null, crackle = null, soundOn = true, voice = null;
    const VOICE_DIR = "media/voix/";
    const initAudio = () => {
      if (ac) return;
      ac = new (window.AudioContext || window.webkitAudioContext)();
      master = ac.createGain(); master.gain.value = 0.0; master.connect(ac.destination);
      // craquement de vinyle : bruit filtré + pops
      const buf = ac.createBuffer(1, ac.sampleRate * 2, ac.sampleRate), d = buf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * 0.03 + (Math.random() < 0.0006 ? (Math.random() * 2 - 1) * 0.9 : 0);
      crackle = ac.createBufferSource(); crackle.buffer = buf; crackle.loop = true;
      const hp = ac.createBiquadFilter(); hp.type = "highpass"; hp.frequency.value = 900;
      crackle.connect(hp).connect(master); crackle.start();
    };
    const stopVoice = () => { if (voice) { voice.pause(); voice = null; } };
    const playVoice = (tr) => {
      stopVoice();
      if (!soundOn) return;
      const tryFile = (name, fallback) => {
        const a = new Audio(VOICE_DIR + name + ".mp3");
        a.playbackRate = rpm === 45 ? 1.25 : 1;
        a.preservesPitch = false; a.mozPreservesPitch = false; a.webkitPreservesPitch = false; // 45 tours = voix plus aiguë
        a.addEventListener("error", () => { if (fallback) tryFile(fallback); }, { once: true });
        a.addEventListener("ended", () => { if (voice === a) voice = null; });
        voice = a;
        a.play().catch(() => {});
      };
      EN ? tryFile(tr.n + "-en", tr.n) : tryFile(tr.n);
    };
    const updateSound = () => {
      if (!ac) return;
      master.gain.setTargetAtTime(soundOn && playing ? 0.35 : 0, ac.currentTime, 0.15);
    };
    const soundBtn = $("#sound");
    soundBtn.setAttribute("aria-pressed", "true");
    soundBtn.addEventListener("click", () => {
      soundOn = !soundOn; soundBtn.setAttribute("aria-pressed", soundOn);
      if (soundOn) { initAudio(); ac.resume && ac.resume(); if (playing && cur >= 0) playVoice(TRACKS[side][cur]); }
      else stopVoice();
      updateSound();
    });

    /* --- lecture --- */
    const setArm = (a, dur = 0.9) => { armA = a; anim ? gsap.to(arm, { rotation: a, duration: dur, ease: "power3.inOut" }) : (arm.style.transform = `rotate(${a}deg)`); };
    const typeText = (el, txt) => {
      if (!anim) { el.textContent = txt; return; }
      const o = { n: 0 }; el.textContent = "";
      gsap.to(o, { n: txt.length, duration: txt.length * 0.028, ease: "none", onUpdate: () => (el.textContent = txt.slice(0, Math.round(o.n))) });
    };
    const play = (i) => {
      cur = i; playing = true;
      const tr = TRACKS[side][i];
      setArm(ARM_IN + i * ARM_STEP);
      renderList();
      led.classList.add("is-on"); playBtn.textContent = "❚❚";
      now.innerHTML = `<span class="mono">${EN ? "Now playing" : "En lecture"} — ${tr.n} · ${tr.d}</span><h3>${esc(L(tr, "t"))}</h3><p></p>`;
      if (anim) gsap.from($("h3", now), { yPercent: 60, opacity: 0, duration: 0.8, ease: "expo.out" });
      typeText($("p", now), L(tr, "p"));
      if (soundOn) { initAudio(); ac.resume && ac.resume(); }
      playVoice(tr);
      updateSound();
    };
    const stop = () => {
      playing = false; setArm(ARM_REST); led.classList.remove("is-on"); playBtn.textContent = "▶";
      stopVoice(); updateSound();
    };
    list.addEventListener("click", (e) => { const b = e.target.closest("[data-tr]"); if (b) play(+b.dataset.tr); });
    playBtn.addEventListener("click", () => (playing ? stop() : play(cur >= 0 ? cur : 0)));
    $$("[data-rpm]").forEach((b) => b.addEventListener("click", () => {
      rpm = +b.dataset.rpm; $$("[data-rpm]").forEach((x) => x.setAttribute("aria-pressed", x === b));
      $("span", led).textContent = rpm === 33 ? "33⅓" : "45";
      if (voice) voice.playbackRate = rpm === 45 ? 1.25 : 1;
    }));
    $$("[data-side]").forEach((b) => b.addEventListener("click", () => {
      if (b.dataset.side === side) return;
      side = b.dataset.side; $$("[data-side]").forEach((x) => x.setAttribute("aria-pressed", x === b));
      const wasPlaying = playing; stop(); cur = -1;
      // on retourne le disque
      if (anim) gsap.timeline().to(".tt__platter", { rotationY: 90, duration: 0.3, ease: "power2.in", onComplete: () => { sideLbl.textContent = "Face " + side; renderList(); } }).to(".tt__platter", { rotationY: 0, duration: 0.4, ease: "power2.out" });
      else { sideLbl.textContent = "Face " + side; renderList(); }
      if (wasPlaying) setTimeout(() => play(0), 900);
    }));

    /* --- le bras : on l'attrape et on le pose --- */
    const pivot = () => { const r = arm.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height * 0.12 }; };
    let armDown = false, a0 = 0, p0 = 0;
    arm.addEventListener("pointerdown", (e) => {
      armDown = true; arm.classList.add("is-grab"); arm.setPointerCapture(e.pointerId);
      const pv = pivot(); p0 = Math.atan2(e.clientY - pv.y, e.clientX - pv.x) * 180 / Math.PI; a0 = armA;
      if (anim) gsap.killTweensOf(arm);
    });
    arm.addEventListener("pointermove", (e) => {
      if (!armDown) return;
      const pv = pivot(), p = Math.atan2(e.clientY - pv.y, e.clientX - pv.x) * 180 / Math.PI;
      armA = Math.max(-6, Math.min(ARM_IN + ARM_STEP * 2.6, a0 + (p - p0)));
      if (anim) gsap.set(arm, { rotation: armA }); else arm.style.transform = `rotate(${armA}deg)`;
    });
    arm.addEventListener("pointerup", () => {
      if (!armDown) return; armDown = false; arm.classList.remove("is-grab");
      if (armA < ARM_IN - 8) return stop();
      const i = Math.max(0, Math.min(2, Math.round((armA - ARM_IN) / ARM_STEP)));
      play(i);
    });

    /* --- le disque : il tourne, on peut le scratcher --- */
    let rp = 0, ra0 = 0, lastT = 0;
    const center = () => { const r = record.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
    record.addEventListener("pointerdown", (e) => {
      grabbing = true; record.classList.add("is-grab"); record.setPointerCapture(e.pointerId);
      const c = center(); rp = Math.atan2(e.clientY - c.y, e.clientX - c.x) * 180 / Math.PI; ra0 = angle; lastT = performance.now();
    });
    record.addEventListener("pointermove", (e) => {
      if (!grabbing) return;
      const c = center(), p = Math.atan2(e.clientY - c.y, e.clientX - c.x) * 180 / Math.PI;
      let d = p - rp; if (d > 180) d -= 360; if (d < -180) d += 360;
      const now2 = performance.now(); vel = d / Math.max(1, now2 - lastT) * 16; lastT = now2;
      angle += d; rp = p;
      if (ac && soundOn) { // le scratch fait chanter le craquement
        master.gain.setTargetAtTime(Math.min(1.6, 0.3 + Math.abs(vel) * 0.08), ac.currentTime, 0.02);
        crackle.playbackRate.setTargetAtTime(Math.max(0.2, Math.min(3, 1 + vel * 0.12)), ac.currentTime, 0.02);
      }
      if (voice) voice.playbackRate = Math.max(0.25, Math.min(3, Math.abs(1 + vel * 0.1)));
    });
    record.addEventListener("pointerup", () => { grabbing = false; record.classList.remove("is-grab"); if (crackle) crackle.playbackRate.setTargetAtTime(1, ac.currentTime, 0.1); if (voice) voice.playbackRate = rpm === 45 ? 1.25 : 1; updateSound(); });

    let vis = false;
    new IntersectionObserver(([en]) => (vis = en.isIntersecting)).observe(record);
    (function loop() {
      requestAnimationFrame(loop);
      if (!vis) return;
      if (!grabbing) {
        const target = playing ? (rpm / 60) * 6 : 0; // degrés par frame
        vel += (target - vel) * (playing ? 0.04 : 0.02);
        angle += vel;
      }
      record.style.transform = `rotate(${angle}deg)`;
    })();
  })();

  /* =======================================================
     L'ATELIER : compose ton affiche
     ======================================================= */
  (function atelier() {
    const poster = $("#poster"); if (!poster) return;
    const IMGS = ["media/lab/P1166161.jpg", "media/rouge/IMG_5202.jpg", "media/nda/9302.jpg", "media/photos/IMG_4161.jpg", "media/photos/DSC00164.jpg", "media/eia/post_02-07-3.jpg"];
    const COLORS = [["#e8261c", "#141212"], ["#141212", "#fbf8f1"], ["#f0cf45", "#141212"], ["#1673d1", "#fbf8f1"], ["#1fc24a", "#141212"], ["#f25c1f", "#141212"], ["#efe9dc", "#e8261c"]];
    const LAYOUTS = { a: [[8, 14, 84, 50]], b: [[0, 0, 100, 100]], c: [[40, 0, 60, 100]] };
    const st = { img: 0, col: 0, lay: "a", title: $("#toolTitle").value, stamps: [] };
    const img = $("#posterImg"), title = $("#posterTitle"), stamps = $("#posterStamps");

    $("#toolImgs").innerHTML = IMGS.map((s, i) => `<button type="button" data-img="${i}" aria-pressed="${!i}"><img src="${s}" alt="" loading="lazy"></button>`).join("");
    $("#toolColors").innerHTML = COLORS.map((c, i) => `<button type="button" data-col="${i}" style="--c:${c[0]}" aria-pressed="${!i}" aria-label="${c[0]}"></button>`).join("");
    $("#toolLayouts").innerHTML = Object.entries(LAYOUTS).map(([k, r]) => `<button type="button" data-lay="${k}" aria-pressed="${k === "a"}" aria-label="${k}"><i style="left:${r[0][0]}%;top:${r[0][1]}%;width:${r[0][2]}%;height:${r[0][3]}%"></i></button>`).join("");

    const apply = (flash) => {
      img.src = IMGS[st.img];
      poster.style.setProperty("--pc", COLORS[st.col][0]); poster.style.setProperty("--pi", COLORS[st.col][1]);
      poster.dataset.layout = st.lay;
      title.textContent = st.title || "✶";
      $$("#toolImgs button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.img === st.img));
      $$("#toolColors button").forEach((b) => b.setAttribute("aria-pressed", +b.dataset.col === st.col));
      $$("#toolLayouts button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lay === st.lay));
      if (flash && anim) gsap.fromTo(poster, { rotation: gsap.utils.random(-3, 3), scale: 0.97 }, { rotation: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" });
    };
    $("#toolImgs").addEventListener("click", (e) => { const b = e.target.closest("[data-img]"); if (b) { st.img = +b.dataset.img; apply(true); } });
    $("#toolColors").addEventListener("click", (e) => { const b = e.target.closest("[data-col]"); if (b) { st.col = +b.dataset.col; apply(true); } });
    $("#toolLayouts").addEventListener("click", (e) => { const b = e.target.closest("[data-lay]"); if (b) { st.lay = b.dataset.lay; apply(true); } });
    $("#toolTitle").addEventListener("input", (e) => { st.title = e.target.value; apply(); });

    // tampons : un clic, un coup de tampon
    const addStamp = (x, y, r) => {
      st.stamps.push({ x, y, r });
      const s = document.createElement("span");
      s.className = "pstamp"; s.style.left = x + "%"; s.style.top = y + "%"; s.style.rotate = r + "deg";
      s.innerHTML = `<svg viewBox="0 0 155.05 108.06"><use href="#logo"/></svg>`;
      stamps.appendChild(s);
      if (anim) { gsap.fromTo(s, { scale: 2.4, opacity: 0 }, { scale: 1, opacity: 0.9, duration: 0.3, ease: "power4.in" }); gsap.fromTo(poster, { x: -3 }, { x: 0, duration: 0.4, ease: "elastic.out(1, 0.3)", delay: 0.28 }); }
    };
    poster.addEventListener("click", (e) => {
      const r = poster.getBoundingClientRect();
      addStamp(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100, gsap ? gsap.utils.random(-25, 25) : 0);
    });
    $("#clearStamps").addEventListener("click", () => { st.stamps = []; stamps.innerHTML = ""; });

    // mélanger : une machine à sous en trois rouleaux
    const titles = EN ? ["Archive 24—26", "Keep it", "Red alert", "Printed in Paris", "Made by hand", "Off the line"] : ["Archive 24—26", "Garde-la", "Rouge vif", "Imprimé à Paris", "Fait main", "Hors-ligne"];
    $("#shuffle").addEventListener("click", () => {
      let n = 0;
      const spin = setInterval(() => {
        st.img = (Math.random() * IMGS.length) | 0; st.col = (Math.random() * COLORS.length) | 0;
        st.lay = "abc"[(Math.random() * 3) | 0]; apply();
        if (++n > 9) { clearInterval(spin); st.title = titles[(Math.random() * titles.length) | 0]; $("#toolTitle").value = st.title; apply(true); }
      }, 90);
    });

    // export PNG (1200 × 1600), dessiné à la main sur un canvas
    $("#downloadPoster").addEventListener("click", async () => {
      const W = 1200, H = 1600, c = document.createElement("canvas"); c.width = W; c.height = H;
      const g = c.getContext("2d");
      const [bg, ink] = COLORS[st.col];
      g.fillStyle = bg; g.fillRect(0, 0, W, H);
      const im = new Image(); im.src = IMGS[st.img]; await im.decode().catch(() => {});
      const cover = (x, y, w, h) => {
        const s = Math.max(w / im.naturalWidth, h / im.naturalHeight), sw = w / s, sh = h / s;
        g.drawImage(im, (im.naturalWidth - sw) / 2, (im.naturalHeight - sh) / 2, sw, sh, x, y, w, h);
      };
      const R = LAYOUTS[st.lay][0];
      cover(R[0] / 100 * W, R[1] / 100 * H, R[2] / 100 * W, R[3] / 100 * H);
      await (document.fonts ? document.fonts.load("200px Foss") : Promise.resolve());
      const fitText = (txt, maxW, size) => { g.font = `${size}px Foss, serif`; while (g.measureText(txt).width > maxW && size > 40) { size -= 4; g.font = `${size}px Foss, serif`; } return size; };
      const t = st.title || "✶";
      g.textBaseline = "alphabetic";
      if (st.lay === "a") { g.fillStyle = ink; fitText(t, W * 0.88, 240); g.fillText(t, W * 0.06, H * 0.92); }
      if (st.lay === "b") { g.fillStyle = bg; fitText(t, W * 0.9, 300); g.fillText(t, W * 0.05, H * 0.2); }
      if (st.lay === "c") { g.save(); g.translate(W * 0.3, H * 0.96); g.rotate(-Math.PI / 2); g.fillStyle = ink; fitText(t, H * 0.92, 200); g.fillText(t, 0, 0); g.restore(); }
      g.font = "500 26px 'Geist Mono', monospace"; g.fillStyle = st.lay === "a" ? ink : "#fff";
      const my = st.lay === "a" ? H * 0.06 : H * 0.975;
      g.fillText("ANAÏS ALBERSARIO", st.lay === "c" ? W * 0.42 : W * 0.05, my);
      g.textAlign = "right"; g.fillText("ARCHIVE 24—26", W * 0.95, my); g.textAlign = "left";
      // tampons
      st.stamps.forEach((s) => {
        g.save(); g.translate(s.x / 100 * W, s.y / 100 * H); g.rotate(s.r * Math.PI / 180);
        const sc = (W * 0.22) / 155; g.scale(sc, sc); g.translate(-77, -54); g.globalAlpha = 0.85; g.fillStyle = ink;
        LOGO_PATHS.forEach((d) => g.fill(new Path2D(d))); g.restore();
      });
      // grain d'impression
      const n = document.createElement("canvas"); n.width = n.height = 160; const ng = n.getContext("2d"), id = ng.createImageData(160, 160);
      for (let i = 0; i < id.data.length; i += 4) { const v = Math.random() * 255; id.data[i] = id.data[i + 1] = id.data[i + 2] = v; id.data[i + 3] = 22; }
      ng.putImageData(id, 0, 0); g.fillStyle = g.createPattern(n, "repeat"); g.fillRect(0, 0, W, H);
      const a = document.createElement("a"); a.download = T("dl_name"); a.href = c.toDataURL("image/png"); a.click();
      const r = poster.getBoundingClientRect(); App.confetti(r.left + r.width / 2, r.top + r.height / 3, 40);
    });
    apply();
  })();

  /* =======================================================
     DOSSIERS : inclinaison 3D à la souris
     ======================================================= */
  if (App.fine && anim) {
    $$(".folder").forEach((f) => {
      const rx = gsap.quickTo(f, "rotationX", { duration: 0.8, ease: "power3.out" }), ry = gsap.quickTo(f, "rotationY", { duration: 0.8, ease: "power3.out" });
      gsap.set(f, { transformPerspective: 900 });
      f.addEventListener("pointermove", (e) => { const r = f.getBoundingClientRect(); ry(((e.clientX - r.left) / r.width - 0.5) * 16); rx(-((e.clientY - r.top) / r.height - 0.5) * 12); });
      f.addEventListener("pointerleave", () => { rx(0); ry(0); });
    });
  }

  /* ---------- entrées au scroll des modules ---------- */
  if (anim) {
    gsap.from(".ticket", { y: 160, rotation: 6, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: ".ticket-wrap", start: "top 88%" } });
    gsap.from(".lp-sleeve", { x: -200, rotation: -12, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: ".platine", start: "top 80%" } });
    gsap.from(".tt__plinth", { y: 200, rotation: 4, opacity: 0, duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: ".platine", start: "top 80%" } });
    gsap.from("#arm", { rotation: -40, duration: 1.4, ease: "elastic.out(1, 0.5)", scrollTrigger: { trigger: ".platine", start: "top 60%" } });
    gsap.from(".poster", { y: 160, rotation: -6, opacity: 0, duration: 1.3, ease: "expo.out", scrollTrigger: { trigger: ".atelier", start: "top 80%" } });
    gsap.from(".tool", { x: 80, opacity: 0, duration: 1, ease: "expo.out", stagger: 0.08, scrollTrigger: { trigger: ".atelier", start: "top 75%" } });
  }
})();
