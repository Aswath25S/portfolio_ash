(() => {
  const DENSITY = " .'`^\",:;Il!i~+_-?][}{1)(|/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
  const videoEl = document.getElementById("camera-feed");
  const processCanvas = document.getElementById("process-canvas");
  const asciiEl = document.getElementById("ascii-output");
  const camStatusEl = document.getElementById("cam-status");
  const taglineEl = document.getElementById("hero-tagline");

  const fontSizeInput = document.getElementById("font-size");
  const brightnessInput = document.getElementById("brightness");
  const contrastInput = document.getElementById("contrast");
  const modeSelect = document.getElementById("theme-mode");

  const fontSizeValueEl = document.getElementById("font-size-val");
  const brightnessValueEl = document.getElementById("brightness-val");
  const contrastValueEl = document.getElementById("contrast-val");

  const snapshotBtn = document.getElementById("snapshot");
  const scanBtn = document.getElementById("scan");
  const modalEl = document.getElementById("scan-modal");
  const scanResultEl = document.getElementById("scan-result");
  const closeModalBtn = document.getElementById("close-modal");

  const state = {
    fontSize: 10,
    brightness: 1,
    contrast: 1,
    mode: "matrix",
  };

  function typeWriterTagline() {
    const text =
      "M.S. Data Science @ JHU | Founding Engineer | Quant NLP | Full-stack AI";
    let idx = 0;
    const timer = window.setInterval(() => {
      taglineEl.textContent += text[idx];
      idx += 1;
      if (idx >= text.length) {
        window.clearInterval(timer);
      }
    }, 16);
  }

  function getModeColor() {
    if (state.mode === "bw") return "#e6e6e6";
    if (state.mode === "retro") return "#ffba4a";
    return "#32ff72";
  }

  function applyContrastBrightness(brightnessRaw) {
    const contrastAdjusted = (brightnessRaw - 128) * state.contrast + 128;
    const scaled = contrastAdjusted * state.brightness;
    return Math.max(0, Math.min(255, scaled));
  }

  function renderAsciiFrame() {
    if (!videoEl || !asciiEl || !processCanvas || videoEl.readyState < 2) {
      requestAnimationFrame(renderAsciiFrame);
      return;
    }

    const ctx = processCanvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      requestAnimationFrame(renderAsciiFrame);
      return;
    }

    const stageRect = asciiEl.getBoundingClientRect();
    const charW = state.fontSize * 0.62;
    const charH = state.fontSize;
    const cols = Math.max(40, Math.floor(stageRect.width / charW));
    const rows = Math.max(24, Math.floor(stageRect.height / charH));

    processCanvas.width = cols;
    processCanvas.height = rows;
    ctx.drawImage(videoEl, 0, 0, cols, rows);
    const image = ctx.getImageData(0, 0, cols, rows).data;

    let out = "";
    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < cols; x += 1) {
        const o = (y * cols + x) * 4;
        const r = image[o];
        const g = image[o + 1];
        const b = image[o + 2];
        const raw = 0.2126 * r + 0.7152 * g + 0.0722 * b;
        const bright = applyContrastBrightness(raw);
        const index = Math.floor((bright / 255) * (DENSITY.length - 1));
        out += DENSITY[index];
      }
      out += "\n";
    }

    asciiEl.style.fontSize = `${state.fontSize}px`;
    asciiEl.style.color = getModeColor();
    asciiEl.textContent = out;

    requestAnimationFrame(renderAsciiFrame);
  }

  async function startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 960 },
          height: { ideal: 720 },
          facingMode: "user",
        },
      });
      videoEl.srcObject = stream;
      await videoEl.play();
      camStatusEl.textContent = "ACTIVE";
      requestAnimationFrame(renderAsciiFrame);
    } catch (error) {
      camStatusEl.textContent = "DENIED";
      asciiEl.textContent =
        "Camera access was denied.\n\nAllow camera permissions and refresh to enable\nlive ASCII rendering.";
    }
  }

  function syncControlValues() {
    fontSizeValueEl.textContent = String(state.fontSize);
    brightnessValueEl.textContent = state.brightness.toFixed(1);
    contrastValueEl.textContent = state.contrast.toFixed(1);
  }

  function setupControls() {
    fontSizeInput.addEventListener("input", () => {
      state.fontSize = Number(fontSizeInput.value);
      syncControlValues();
    });
    brightnessInput.addEventListener("input", () => {
      state.brightness = Number(brightnessInput.value);
      syncControlValues();
    });
    contrastInput.addEventListener("input", () => {
      state.contrast = Number(contrastInput.value);
      syncControlValues();
    });
    modeSelect.addEventListener("change", () => {
      state.mode = modeSelect.value;
    });
    syncControlValues();
  }

  function setupActions() {
    snapshotBtn.addEventListener("click", () => {
      const blob = new Blob([asciiEl.textContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `ascii_snapshot_${Date.now()}.txt`;
      link.click();
      URL.revokeObjectURL(url);
    });

    scanBtn.addEventListener("click", () => {
      const text = asciiEl.textContent || "";
      const filled = [...text].filter((c) => c !== " " && c !== "\n").length;
      const total = Math.max(1, text.replace(/\n/g, "").length);
      const density = ((filled / total) * 100).toFixed(2);
      const lines = text.split("\n").length;
      scanResultEl.textContent =
        `SUBJECT: ASWATH_SURESH\n` +
        `ASCII_LINES: ${lines}\n` +
        `PIXEL_DENSITY: ${density}%\n` +
        `THEME_MODE: ${state.mode.toUpperCase()}\n` +
        `SIGNAL: CLEAN\n` +
        `PROFILE_HINT: AI + DATA + PRODUCT SYSTEMS`;
      modalEl.showModal();
    });

    closeModalBtn.addEventListener("click", () => {
      modalEl.close();
    });
  }

  setupControls();
  setupActions();
  typeWriterTagline();
  startCamera();
})();
