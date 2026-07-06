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
  "Eight months with you, and every month we encountered has been my favorite. I'm so blessed to have you by! I'm really looking forward to future months and years with you. I love you so much, my pretty baby iah! 💖",
];

const bgMusic = document.getElementById("bgMusic");
const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const garden = document.getElementById("garden");
const bed = document.getElementById("bed");
const hint = document.getElementById("hint");

const noteOverlay = document.getElementById("noteOverlay");
const notePhoto = document.getElementById("notePhoto");
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
  // One distinct color per month (index 0 = Month 1 ... index 7 = Month 8)
  const palette = [
    "#e8a0bf", // Month 1 - rose pink
    "#f2c14e", // Month 2 - gold
    "#c97b5a", // Month 3 - terracotta
    "#8fbf8f", // Month 4 - soft green
    "#b48ee8", // Month 5 - lavender
    "#7ec8e3", // Month 6 - sky blue
    "#f28482", // Month 7 - coral
    "#f6d55c", // Month 8 - sunflower gold
  ];
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
  notePhoto.src = `css/images/${monthNum}.jpg`;
  notePhoto.alt = `Month ${monthNum} photo`;
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