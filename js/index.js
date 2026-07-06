// ------------------------------------------------------------------
// EDIT THIS: put your real memory for each month here.
// Keep it short (1-2 sentences) so it fits nicely on the note card.
// ------------------------------------------------------------------
const memories = [
  "First month with you, happy kaayo ko gi sugot ko nimo basking gi pugos taka. I know this month ga adjust paka kay first relationship pako nimo and dili paka willing mu commit jud ug taman",
  "Kani na month ga taas na imo salig saako, ga date natag mga lagyo ga byahe natag lagyo ga sleep together nata. And happy kaayo ko gasalig ka saako, don't worry di nako na dauton imo salig. Happy sad ko kay na legal ta saimong side",
  "Happy kaayo ko na invited nako sa mga family outing ninyo and I'm hoping sunod makasabay sad ka saamo family outing. I really love to introduce you personally to my fam by. Proud ko ikaw akong partner.",
  "First date nato sa tagum. Nagkinataw anay ta sa you know kay na luya si pony. Tapos nag cine ta daghan tag memories sa 4th month nato pero kaning tagum date ganahan kaayo ko ani.",
  "Lucky I have you. Happy kaayo ko saimong gifts, feel kaayo nako imong love. Dili ko sanay makadawat ug gifts mao grabe kaayo ko maka react. Thank you sa mga gifts nimo by, basking karon ginahatagan gihapon ko nimo. Ganahan kaayo kotanan saimong gifts.",
  "Always sa mati atung layo na mga date, don't worry daghan patag date aside sa Mati. Next week hoping na madayun atung Talaingod date. Saligi lng ko by, I know motor ato gamit pero mag ingat ko especially pag naa ka. Wala pakoy car and chopper but don't worry, dalhon takag mga places na nindot kaayo.",
  "Kani na month sabay sabay tag problema, akong pag overthink, akong violations saimo na nahurt ka and na question nimo imo sarili. Sorry sa tanan by and thank you saimo patience ha? Don't give up on us by, I value you so don't worry I'll be better. I love you.",
  "Eight months with you, and every month we encountered has been my favorite. Happy Eight Monthsary byyy! Just know that I'm really blessed to have you! I'm really looking forward to future months and years with you. I love you so much, my pretty baby iah! 💖",
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
  const ext = monthNum === 8 ? "gif" : "jpg";
  notePhoto.src = `css/images/${monthNum}.${ext}`;
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