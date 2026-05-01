(function () {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    });
  });

  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  if (!reduceMotion) {
    const orbits = document.querySelectorAll(".orbit-card");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) en.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    orbits.forEach((o) => io.observe(o));
  } else {
    document.querySelectorAll(".orbit-card").forEach((o) => o.classList.add("is-visible"));
  }

  const heroCanvas = document.getElementById("hero-canvas");
  const heroSection = document.querySelector(".hero");
  if (heroCanvas && heroSection) {
    const ctx = heroCanvas.getContext("2d", { alpha: true });
    const field = heroCanvas.closest(".hero-field");
    const colors = ["#3ee8c7", "#7b6cff", "#f4a261"];
    let particles = [];
    let cssW = 420;
    let cssH = 420;
    let mx = -99999;
    let my = -99999;

    function placeParticles(w, h) {
      const count = w < 520 ? 48 : 78;
      const narrow = w < 640;
      const cx = narrow ? w * 0.5 : w * 0.62;
      const cy = narrow ? h * 0.45 : h * 0.48;
      const r = Math.min(w, h) * (narrow ? 0.34 : 0.38);
      const out = [];
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.28;
        const rr = r * (0.72 + Math.random() * 0.28);
        const bx = cx + Math.cos(t) * rr;
        const by = cy + Math.sin(t) * rr;
        out.push({
          x: bx,
          y: by,
          bx,
          by,
          vx: 0,
          vy: 0,
          hue: i % 3,
        });
      }
      return out;
    }

    function resize() {
      if (!field) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = field.getBoundingClientRect();
      cssW = Math.max(1, Math.floor(rect.width));
      cssH = Math.max(1, Math.floor(rect.height));
      heroCanvas.width = Math.floor(cssW * dpr);
      heroCanvas.height = Math.floor(cssH * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = placeParticles(cssW, cssH);
    }

    function drawLinks() {
      const maxD = Math.min(cssW, cssH) * 0.16;
      const n = particles.length;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < maxD && d > 0.5) {
            const t = 1 - d / maxD;
            ctx.strokeStyle = `rgba(100, 160, 200, ${t * 0.32})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    }

    function drawDots() {
      for (const p of particles) {
        ctx.fillStyle = colors[p.hue];
        ctx.globalAlpha = 0.85;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    function drawStatic() {
      ctx.clearRect(0, 0, cssW, cssH);
      for (const p of particles) {
        p.x = p.bx;
        p.y = p.by;
        p.vx = 0;
        p.vy = 0;
      }
      drawLinks();
      drawDots();
    }

    function step() {
      const spring = 0.034;
      const damp = 0.91;
      const repel = 5200;
      for (const p of particles) {
        let ax = (p.bx - p.x) * spring;
        let ay = (p.by - p.y) * spring;
        const dx = p.x - mx;
        const dy = p.y - my;
        const d2 = dx * dx + dy * dy + 100;
        const push = repel / d2;
        ax += dx * push * 0.09;
        ay += dy * push * 0.09;
        p.vx = (p.vx + ax) * damp;
        p.vy = (p.vy + ay) * damp;
        p.x += p.vx;
        p.y += p.vy;
      }
      ctx.clearRect(0, 0, cssW, cssH);
      drawLinks();
      drawDots();
      requestAnimationFrame(step);
    }

    function pointerToLocal(clientX, clientY) {
      const rect = heroCanvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function onPointerMove(e) {
      const { x, y } = pointerToLocal(e.clientX, e.clientY);
      mx = x;
      my = y;
    }

    function anchorCenter() {
      const narrow = cssW < 640;
      return { x: narrow ? cssW * 0.5 : cssW * 0.62, y: narrow ? cssH * 0.45 : cssH * 0.48 };
    }

    function onPointerLeaveHero() {
      const a = anchorCenter();
      mx = a.x;
      my = a.y;
    }

    function onHeroPointerDown(e) {
      if (reduceMotion) return;
      if (e.target && e.target.closest && e.target.closest("a, button")) return;
      const { x, y } = pointerToLocal(e.clientX, e.clientY);
      const blast = Math.min(cssW, cssH) * 0.32;
      for (const p of particles) {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < blast && d > 0.5) {
          const f = ((blast - d) / blast) * 6.5;
          const ang = Math.atan2(p.y - y, p.x - x);
          p.vx += Math.cos(ang) * f;
          p.vy += Math.sin(ang) * f;
        }
      }
    }

    resize();
    if (typeof ResizeObserver !== "undefined" && field) {
      const ro = new ResizeObserver(() => {
        resize();
        if (reduceMotion) drawStatic();
      });
      ro.observe(field);
    } else {
      window.addEventListener("resize", () => {
        resize();
        if (reduceMotion) drawStatic();
      });
    }

    if (reduceMotion) {
      drawStatic();
    } else {
      heroSection.addEventListener("pointermove", onPointerMove, { passive: true });
      heroSection.addEventListener("pointerleave", onPointerLeaveHero);
      heroSection.addEventListener("pointerdown", onHeroPointerDown);
      const start = anchorCenter();
      mx = start.x;
      my = start.y;
      step();
    }
  }

  if (!reduceMotion) {
    document.querySelectorAll(".orbit-card").forEach((card) => {
      card.addEventListener("pointermove", (e) => {
        const r = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty("--tilt-x", `${py * -7}deg`);
        card.style.setProperty("--tilt-y", `${px * 7}deg`);
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
      });
    });
  }

  const contactCanvas = document.getElementById("contact-canvas");
  const contactSection = document.getElementById("contact");
  if (contactCanvas && contactSection && !reduceMotion) {
    const cctx = contactCanvas.getContext("2d", { alpha: true });
    const contactLayer = contactCanvas.closest(".contact-bg");
    const cColors = ["#3ee8c7", "#9d8cff", "#f4a261"];
    let cParts = [];
    let cW = 300;
    let cH = 300;
    let cmx = 0;
    let cmy = 0;

    function cPlace(w, h) {
      const count = 36;
      const cx = w * 0.42;
      const cy = h * 0.5;
      const r = Math.min(w, h) * 0.3;
      const out = [];
      for (let i = 0; i < count; i++) {
        const t = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
        const rr = r * (0.75 + Math.random() * 0.25);
        const bx = cx + Math.cos(t) * rr;
        const by = cy + Math.sin(t) * rr;
        out.push({
          x: bx,
          y: by,
          bx,
          by,
          vx: 0,
          vy: 0,
          hue: i % 3,
        });
      }
      return out;
    }

    function cResize() {
      if (!contactLayer) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = contactCanvas.getBoundingClientRect();
      cW = Math.max(1, Math.floor(rect.width));
      cH = Math.max(1, Math.floor(rect.height));
      contactCanvas.width = Math.floor(cW * dpr);
      contactCanvas.height = Math.floor(cH * dpr);
      cctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cParts = cPlace(cW, cH);
    }

    function cDrawLinks() {
      const maxD = Math.min(cW, cH) * 0.18;
      const n = cParts.length;
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const a = cParts[i];
          const b = cParts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < maxD && d > 0.5) {
            const t = 1 - d / maxD;
            cctx.strokeStyle = `rgba(140, 170, 220, ${t * 0.28})`;
            cctx.lineWidth = 1;
            cctx.beginPath();
            cctx.moveTo(a.x, a.y);
            cctx.lineTo(b.x, b.y);
            cctx.stroke();
          }
        }
      }
    }

    function cDrawDots() {
      for (const p of cParts) {
        cctx.fillStyle = cColors[p.hue];
        cctx.globalAlpha = 0.88;
        cctx.beginPath();
        cctx.arc(p.x, p.y, 2.2, 0, Math.PI * 2);
        cctx.fill();
        cctx.globalAlpha = 1;
      }
    }

    function cStep() {
      const spring = 0.026;
      const damp = 0.91;
      for (const p of cParts) {
        let ax = (p.bx - p.x) * spring;
        let ay = (p.by - p.y) * spring;
        const dx = cmx - p.x;
        const dy = cmy - p.y;
        const d2 = dx * dx + dy * dy + 120;
        const pull = 3400 / d2;
        ax += dx * pull * 0.11;
        ay += dy * pull * 0.11;
        p.vx = (p.vx + ax) * damp;
        p.vy = (p.vy + ay) * damp;
        p.x += p.vx;
        p.y += p.vy;
      }
      cctx.clearRect(0, 0, cW, cH);
      cDrawLinks();
      cDrawDots();
      requestAnimationFrame(cStep);
    }

    function cLocal(clientX, clientY) {
      const rect = contactCanvas.getBoundingClientRect();
      return { x: clientX - rect.left, y: clientY - rect.top };
    }

    function cOnMove(e) {
      const o = cLocal(e.clientX, e.clientY);
      cmx = o.x;
      cmy = o.y;
    }

    function cOnLeave() {
      cmx = cW * 0.42;
      cmy = cH * 0.5;
    }

    function cOnDown(e) {
      if (e.target && e.target.closest && e.target.closest("a, button")) return;
      const { x, y } = cLocal(e.clientX, e.clientY);
      const blast = Math.min(cW, cH) * 0.28;
      for (const p of cParts) {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < blast && d > 0.5) {
          const f = ((blast - d) / blast) * 5;
          const ang = Math.atan2(y - p.y, x - p.x);
          p.vx += Math.cos(ang) * f;
          p.vy += Math.sin(ang) * f;
        }
      }
    }

    cResize();
    if (typeof ResizeObserver !== "undefined" && contactLayer) {
      const cro = new ResizeObserver(() => cResize());
      cro.observe(contactLayer);
    } else {
      window.addEventListener("resize", cResize);
    }

    contactSection.addEventListener("pointermove", cOnMove, { passive: true });
    contactSection.addEventListener("pointerleave", cOnLeave);
    contactSection.addEventListener("pointerdown", cOnDown);
    cmx = cW * 0.42;
    cmy = cH * 0.5;
    cStep();
  }
})();
