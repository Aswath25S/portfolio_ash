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

  /* ---- Easter eggs ---- */
  function initEasterEggs() {
    const toastRoot = document.getElementById("toast-root");
    const MAX_TOASTS = 4;

    function showToast(message, ms = 3400) {
      if (!toastRoot) return;

      while (toastRoot.children.length >= MAX_TOASTS) {
        toastRoot.firstElementChild?.remove();
      }

      const el = document.createElement("div");
      el.className = "toast";
      el.textContent = message;
      toastRoot.appendChild(el);

      requestAnimationFrame(() => el.classList.add("is-show"));

      window.setTimeout(() => {
        el.classList.remove("is-show");
        window.setTimeout(() => el.remove(), 380);
      }, ms);
    }

    function triggerPartyMode() {
      if (prefersReducedMotion) {
        showToast("Party mode respects reduced motion — enjoy the toast anyway.");
        return;
      }
      document.body.classList.add("party-mode");
      window.setTimeout(() => document.body.classList.remove("party-mode"), 12000);
    }

    /* Konami (↑↑↓↓←→←→BA) */
    const KONAMI = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
      "b",
      "a",
    ];
    let konamiIdx = 0;

    function matchesKonamiKey(e, expected) {
      if (
        expected === "ArrowUp" ||
        expected === "ArrowDown" ||
        expected === "ArrowLeft" ||
        expected === "ArrowRight"
      ) {
        return e.key === expected;
      }
      return e.key.toLowerCase() === expected;
    }

    document.addEventListener("keydown", (e) => {
      if (e.target.closest("input, textarea, [contenteditable='true']")) return;

      const expected = KONAMI[konamiIdx];
      if (matchesKonamiKey(e, expected)) {
        konamiIdx += 1;
        if (konamiIdx >= KONAMI.length) {
          konamiIdx = 0;
          triggerPartyMode();
          showToast("Cheat code accepted: Ultra Combo Mode ✨");
        }
      } else {
        konamiIdx = matchesKonamiKey(e, KONAMI[0]) ? 1 : 0;
      }
    });

    /* Typed phrases (no modifier spam) */
    const typedSecrets = [
      { needle: "senpai", msg: "Notice me… hiring manager?" },
      { needle: "uwu", msg: "Stack trace says you're curious ·ω·" },
      { needle: "plot armor", msg: "Plot armor stacks with CI passing green." },
      { needle: "stardust", msg: "Wish granted: the canvas twinkles either way." },
    ];
    const unlockedPhrases = new Set();
    let typedBuf = "";

    document.addEventListener("keydown", (e) => {
      if (e.target.closest("input, textarea, [contenteditable='true']")) return;
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.length !== 1) return;

      typedBuf = (typedBuf + e.key.toLowerCase()).slice(-28);
      for (const { needle, msg } of typedSecrets) {
        const key = needle;
        if (!unlockedPhrases.has(key) && typedBuf.includes(needle)) {
          unlockedPhrases.add(key);
          showToast(msg);
          break;
        }
      }
    });

    /* NEW ARC badge rapid clicks */
    const badge = document.querySelector(".egg-badge");
    let badgeHits = [];
    badge?.addEventListener("click", () => {
      const now = Date.now();
      badgeHits = badgeHits.filter((t) => now - t < 2200);
      badgeHits.push(now);
      if (badgeHits.length >= 6) {
        badgeHits = [];
        showToast("Season 2 renewal: still in story meetings.");
      }
    });

    /* Motivation ∞% */
    const infinityBtn = document.querySelector(".egg-infinity");
    const infinityMsgs = [
      "∞ isn’t on IEEE-754 — good.",
      "Aleph-zero called; wrong anime.",
      "Overflow: motivation wrapped to max INT (emotionally).",
    ];
    let infinityRot = 0;
    infinityBtn?.addEventListener("click", () => {
      showToast(infinityMsgs[infinityRot % infinityMsgs.length]);
      infinityRot += 1;
    });

    /* HP bar overcharge */
    const hpBar = document.querySelector(".egg-hp-bar");
    const hpFill = hpBar?.querySelector(".hp-bar__fill");
    hpBar?.addEventListener("click", () => {
      if (!hpFill) return;
      hpFill.classList.toggle("is-overcharge");
      showToast(
        hpFill.classList.contains("is-overcharge")
          ? "Limit break: motivation hits 100%."
          : "Back to sustainable hustle mode.",
      );
    });

    /* Speech bubble — triple-click advances dialogue */
    const bubble = document.querySelector(".egg-bubble");
    const bubbleLines = [
      "Side character → main plot energy.",
      "Plot armor level: résumé +1.",
      "This isn’t even my final form (still iterating).",
      "Slice-of-life arc until the next deadline hits.",
      "Side quest: coffee → deploy.",
    ];
    let bubbleLineIdx = 0;
    let bubbleTriples = [];
    bubble?.addEventListener("click", () => {
      const now = Date.now();
      bubbleTriples = bubbleTriples.filter((t) => now - t < 750);
      bubbleTriples.push(now);
      if (bubbleTriples.length >= 3) {
        bubbleTriples = [];
        bubbleLineIdx = (bubbleLineIdx + 1) % bubbleLines.length;
        bubble.textContent = bubbleLines[bubbleLineIdx];
        showToast("Dialogue branch unlocked.");
      }
    });

    bubble?.addEventListener("keydown", (e) => {
      if (e.key !== "Enter") return;
      bubbleLineIdx = (bubbleLineIdx + 1) % bubbleLines.length;
      bubble.textContent = bubbleLines[bubbleLineIdx];
    });

    /* Footer pulse dot */
    const pulseDot = document.querySelector(".egg-dot");
    let dotHits = [];
    pulseDot?.addEventListener("click", () => {
      const now = Date.now();
      dotHits = dotHits.filter((t) => now - t < 2600);
      dotHits.push(now);
      if (dotHits.length >= 8) {
        dotHits = [];
        showToast("Achievement unlocked: Persistent dot-clicker.");
      }
    });

    /* Footer “too much CSS” */
    document.querySelector(".egg-footer")?.addEventListener("click", () => {
      showToast("Could’ve been Tailwind — chose cathartic keyframes instead.");
    });

    /* Episode label */
    let epToastOnce = false;
    document.querySelector(".egg-episode")?.addEventListener("click", () => {
      if (epToastOnce) return;
      epToastOnce = true;
      showToast("No recap episode — only forward.");
    });

    /* Résumé PDF — shift-click flavor text */
    document.querySelector(".egg-pdf")?.addEventListener("click", (e) => {
      if (e.shiftKey) {
        showToast("Legendary loot drop: one PDF résumé.");
      }
    });

    /* Summon — Alt+click */
    document.querySelector(".egg-summon")?.addEventListener("click", (e) => {
      if (e.altKey) {
        showToast("Wrong summon circle — that was a README.");
      }
    });

    /* Inline code path */
    document.querySelector(".egg-code")?.addEventListener("click", () => {
      showToast("Repo-relative path — grep beats CTRL+F in chat.");
    });

    /* Header name spam clicks */
    let nameClicks = 0;
    document.querySelector(".egg-name")?.addEventListener("click", () => {
      nameClicks += 1;
      if (nameClicks >= 7) {
        nameClicks = 0;
        showToast("Achievement: header archaeologist.");
      }
    });

    /* Japanese section subtitles — double-click */
    const animeTropes = [
      "Training montage sold separately.",
      "Power of friendship? Try power of reproducible pipelines.",
      "This arc sponsored by coffee and cross-validation.",
      "Next episode: ‘The Interview Arc’ — same bat-time, new timezone.",
      "Omake: fax machines still exist somewhere.",
    ];
    document.querySelectorAll(".section-head__jp").forEach((el) => {
      el.style.cursor = "alias";
      el.addEventListener("dblclick", () => {
        showToast(animeTropes[Math.floor(Math.random() * animeTropes.length)]);
      });
    });

    /* Console */
    console.log(
      "%cAdventure Log",
      "font-size:14px;font-weight:bold;color:#00f5d4;",
      "\nEggs: hover Aswath/Suresh, Konami code, double-click the JP subtitles, triple-click the bubble, try typing “stardust”…",
    );
  }

  initStarfield();
  typewriter(document.getElementById("hero-tagline"), TAGLINE, 22);
  initReveals();
  initDockSpy();
  initEasterEggs();
})();
