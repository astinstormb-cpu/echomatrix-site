/* ===== STAR FIELD ===== */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 220;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    r: Math.random() * Math.max(canvas.width, canvas.height),
    a: Math.random() * Math.PI * 2,
    s: 0.0001 + Math.random() * 0.0003,
    size: Math.random() * 1.5 + 0.5,
    pulse: Math.random() * Math.PI * 2
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  stars.forEach(star => {
    star.a += star.s;
    star.pulse += 0.02;

    const x = canvas.width / 2 + Math.cos(star.a) * star.r;
    const y = canvas.height / 2 + Math.sin(star.a) * star.r;
    const alpha = 0.4 + Math.sin(star.pulse) * 0.3;

    ctx.fillStyle = `rgba(180,200,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawStars);
}
drawStars();

/* ===== GLYPH ORBIT ===== */
const glyphs = document.querySelectorAll("#glyph-ring img");
const radius = 200;
let angleOffset = 0;

function orbitGlyphs() {
  angleOffset += 0.0015;

  glyphs.forEach((glyph, i) => {
    const angle = angleOffset + (i / glyphs.length) * Math.PI * 2;
    const x = window.innerWidth / 2 + Math.cos(angle) * radius;
    const y = window.innerHeight / 2 + Math.sin(angle) * radius;

    glyph.style.left = `${x - glyph.clientWidth / 2}px`;
    glyph.style.top = `${y - glyph.clientHeight / 2}px`;
  });

  requestAnimationFrame(orbitGlyphs);
}
orbitGlyphs();

/* ===== OVERLAY ===== */
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayText = document.getElementById("overlay-text");
const overlayClose = document.getElementById("overlay-close");

glyphs.forEach(glyph => {
  glyph.addEventListener("click", () => {
    overlayTitle.textContent = glyph.dataset.label;
    overlayText.textContent =
      "This section will contain protected EchoMatrix content.";
    overlay.style.display = "flex";
  });
});

overlayClose.onclick = () => {
  overlay.style.display = "none";
};
