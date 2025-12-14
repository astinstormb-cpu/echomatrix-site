const glyphs = document.querySelectorAll("#glyph-orbit img");
const moonOrbit = document.getElementById("moon-orbit");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayGlyph = document.querySelector(".overlay-glyph");
const overlayClose = document.getElementById("overlay-close");

const CENTER_X = window.innerWidth / 2;
const CENTER_Y = window.innerHeight / 2;
const PRIMARY_RADIUS = 240;
const ORBIT_SPEED = 0.0005;

let angle = 0;

/* ORBIT GLYPHS */
function animateGlyphs() {
  angle += ORBIT_SPEED;
  glyphs.forEach((glyph, i) => {
    const theta = angle + (i / glyphs.length) * Math.PI * 2;
    const x = CENTER_X + Math.cos(theta) * PRIMARY_RADIUS;
    const y = CENTER_Y + Math.sin(theta) * PRIMARY_RADIUS;
    glyph.style.left = `${x}px`;
    glyph.style.top = `${y}px`;
  });
  requestAnimationFrame(animateGlyphs);
}
animateGlyphs();

/* MOON PLACEHOLDERS */
for (let i = 0; i < 6; i++) {
  const moon = document.createElement("div");
  moon.className = "moon";
  moonOrbit.appendChild(moon);
}

/* OVERLAY */
glyphs.forEach(glyph => {
  glyph.addEventListener("click", () => {
    overlay.style.display = "block";
    overlayTitle.textContent = glyph.dataset.label;
    overlayGlyph.style.backgroundImage = `url(${glyph.src})`;
    overlayClose.style.backgroundImage = `url(${glyph.src})`;
  });
});

overlayClose.addEventListener("click", () => {
  overlay.style.display = "none";
});

/* STARS */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({ length: 180 }, () => ({
  r: Math.random() * Math.min(canvas.width, canvas.height) / 2,
  a: Math.random() * Math.PI * 2,
  s: Math.random() * 0.0004 + 0.0001,
  size: Math.random() * 2 + 0.5,
  o: Math.random()
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    star.a += star.s;
    const x = CENTER_X + Math.cos(star.a) * star.r;
    const y = CENTER_Y + Math.sin(star.a) * star.r;
    ctx.fillStyle = `rgba(180,160,255,${star.o})`;
    ctx.beginPath();
    ctx.arc(x, y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();
