(() => {
  const TAGLINE =
    "M.S. Data Science (JHU) · B.Tech Aerospace (IIT Bombay) · Baltimore, MD — healthcare AI, quantitative NLP, full-stack data systems.";

  const SECTION_IDS = [
    "hero",
    "contact",
    "about",
    "education",
    "experience",
    "projects",
    "leadership",
    "skills",
    "extras",
    "links",
  ];

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* ---- Starfield canvas ---- */
  function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let stars = [];
    let raf = 0;
    let w = 0;
    let h = 0;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      const count = Math.min(140, Math.floor((w * h) / 14000));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.65 + 0.35,
        s: Math.random() * 1.8 + 0.4,
        tw: Math.random() * Math.PI * 2,
      }));
    }

    function tick() {
      ctx.clearRect(0, 0, w, h);
      const t = performance.now() * 0.001;
      for (const st of stars) {
        const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 2 + st.tw));
        ctx.fillStyle = `rgba(230, 220, 255, ${st.z * twinkle * 0.55})`;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2);
        ctx.fill();
        st.y += st.z * 0.15;
        if (st.y > h + 4) {
          st.y = -4;
          st.x = Math.random() * w;
        }
      }
      raf = requestAnimationFrame(tick);
    }

    resize();
    window.addEventListener("resize", resize);

    if (!prefersReducedMotion) {
      raf = requestAnimationFrame(tick);
    } else {
      ctx.fillStyle = "rgba(200, 190, 240, 0.35)";
      for (const st of stars) {
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.s, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }

  /* ---- Typewriter hero tagline ---- */
  function typewriter(el, text, speedMs) {
    if (!el) return;
    el.textContent = "";
    if (prefersReducedMotion) {
      el.textContent = text;
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      el.textContent += text[i];
      i += 1;
      if (i >= text.length) window.clearInterval(id);
    }, speedMs);
  }

  /* ---- Scroll reveals ---- */
  function initReveals() {
    const els = document.querySelectorAll(".reveal");
    if (!els.length) return;

    if (prefersReducedMotion) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) e.target.classList.add("is-visible");
        }
      },
      { root: null, rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    els.forEach((el) => io.observe(el));
  }

  /* ---- Dock active section ---- */
  function initDockSpy() {
    const links = document.querySelectorAll(".dock__link[data-section]");
    if (!links.length) return;

    const byId = new Map(
      SECTION_IDS.map((id) => [id, document.getElementById(id)]),
    );

    function setActive(id) {
      links.forEach((a) => {
        const on = a.dataset.section === id;
        a.classList.toggle("is-active", on);
      });
    }

    if (prefersReducedMotion) {
      const first = SECTION_IDS[0];
      if (first) setActive(first);
    }

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (!visible.length) return;
        const id = visible[0].target.id;
        if (SECTION_IDS.includes(id)) setActive(id);
      },
      { root: null, rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.1, 0.25] },
    );

    SECTION_IDS.forEach((id) => {
      const el = byId.get(id);
      if (el) io.observe(el);
    });
  }

  initStarfield();
  typewriter(document.getElementById("hero-tagline"), TAGLINE, 22);
  initReveals();
  initDockSpy();
})();
