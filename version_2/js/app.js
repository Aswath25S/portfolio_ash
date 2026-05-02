(() => {
  const PANEL_IDS = [
    "home",
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

  const commandDisplay = document.getElementById("command-display");
  const tabButtons = document.querySelectorAll(".module-nav__btn");
  let typeTimer = null;

  function typeCommand(text) {
    if (!commandDisplay || !text) return;

    if (typeTimer) {
      clearInterval(typeTimer);
      typeTimer = null;
    }

    commandDisplay.textContent = "";
    commandDisplay.classList.add("typing");

    let i = 0;
    typeTimer = setInterval(() => {
      commandDisplay.textContent += text[i];
      i += 1;

      if (i >= text.length) {
        clearInterval(typeTimer);
        typeTimer = null;
        commandDisplay.classList.remove("typing");
      }
    }, 28);
  }

  function panelFromHash() {
    const raw = window.location.hash.replace(/^#/, "");
    return PANEL_IDS.includes(raw) ? raw : "home";
  }

  function showPanel(id) {
    const panelId = PANEL_IDS.includes(id) ? id : "home";

    tabButtons.forEach((btn) => {
      const on = btn.dataset.panel === panelId;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });

    document.querySelectorAll(".panel").forEach((panel) => {
      const on = panel.id === `panel-${panelId}`;
      panel.hidden = !on;
      panel.classList.toggle("is-active", on);
    });

    const activeBtn = document.querySelector(
      `.module-nav__btn[data-panel="${panelId}"]`,
    );
    const cmd = activeBtn?.dataset.command ?? "";
    typeCommand(cmd);
  }

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.dataset.panel;
      if (!next) return;
      showPanel(next);
      history.replaceState(null, "", `#${next}`);
    });
  });

  window.addEventListener("hashchange", () => showPanel(panelFromHash()));

  showPanel(panelFromHash());
})();
