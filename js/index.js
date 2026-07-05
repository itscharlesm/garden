// ------------------------------------------------------------------
// EDIT THIS: put your real memory for each month here.
// Keep it short (1-2 sentences) so it fits nicely on the note card.
// ------------------------------------------------------------------
const memories = [
  "Month 1 — the very beginning, and I already knew.",
  "Month 2 — our first little trip together.",
  "Month 3 — the day you made me laugh so hard I cried.",
  "Month 4 — that rainy night we just talked for hours.",
  "Month 5 — you took care of me when I was sick.",
  "Month 6 — half a year, and it still feels new.",
  "Month 7 — the puzzle I made you (you finally solved it!).",
  "Eight months with you, and every one has been my favorite.",
];

const bgMusic = document.getElementById("bgMusic");
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const garden = document.getElementById("garden");
const bed = document.getElementById("bed");
const hint = document.getElementById("hint");

const noteOverlay = document.getElementById("noteOverlay");
const noteMonth = document.getElementById("noteMonth");
const noteText = document.getElementById("noteText");
const noteClose = document.getElementById("noteClose");

let plantedCount = 0;

// Build the 8 pots
memories.forEach((text, i) => {
  const monthNum = i + 1;
  const isFinal = monthNum === 8;

  const wrap = document.createElement("div");
  wrap.className = "pot-wrap" + (isFinal ? " final" : "");
  wrap.dataset.month = monthNum;

  wrap.innerHTML = `
    <div class="flower-slot">
      <div class="bloom">
        <div class="petal" style="background:${petalColor(i)}"></div>
        <div class="petal" style="background:${petalColor(i)}"></div>
        <div class="petal" style="background:${petalColor(i)}"></div>
        <div class="petal" style="background:${petalColor(i)}"></div>
        <div class="petal" style="background:${petalColor(i)}"></div>
        <div class="bloom-center"></div>
      </div>
      <div class="leaf left"></div>
      <div class="leaf right"></div>
      <div class="stem"></div>
    </div>
    <div class="pot">
      <div class="seed-mound"></div>
    </div>
    <div class="month-label">Month ${monthNum}</div>
  `;

  wrap.addEventListener("click", () => onPotClick(wrap, monthNum, text));
  bed.appendChild(wrap);
});

function petalColor(i) {
  const palette = ["#e8a0bf", "#f2c14e", "#c97b5a", "#a7c4a0", "#e8a0bf", "#f2c14e", "#c97b5a", "#f2c14e"];
  return palette[i % palette.length];
}

function onPotClick(wrap, monthNum, text) {
  if (!wrap.classList.contains("grown")) {
    wrap.classList.add("grown");
    plantedCount++;
    updateHint();
  }
  showNote(monthNum, text);
}

function updateHint() {
  hint.textContent =
    plantedCount >= 8 ? "all 8 planted 🌸" : `${plantedCount} of 8 planted`;
}

function showNote(monthNum, text) {
  noteMonth.textContent = monthNum === 8 ? "Eight Months" : `Month ${monthNum}`;
  noteText.textContent = text;
  noteOverlay.classList.remove("hidden");
}

noteClose.addEventListener("click", () => {
  noteOverlay.classList.add("hidden");
});

noteOverlay.addEventListener("click", (e) => {
  if (e.target === noteOverlay) noteOverlay.classList.add("hidden");
});

// Start button: reveal garden + start music (must happen on a user
// gesture, which is why this lives inside the click handler)
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  garden.classList.remove("hidden");
  bgMusic.play().catch(() => {
    // Autoplay can still be blocked on some browsers; that's fine,
    // the garden still works without sound.
  });
});