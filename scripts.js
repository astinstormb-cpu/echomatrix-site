/* =========================================================
   EchoMatrix Sky Animation Engine
   Subtle. Alive. Non-repeating.
   ========================================================= */

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
canvas.id = "echomatrix-sky";
document.body.appendChild(canvas);

Object.assign(canvas.style, {
  position: "fixed",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  zIndex: "-1",
  pointerEvents: "none"
});

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

/* ------------------ STAR FIELD ------------------ */

const STAR_COUNT = 180;
const stars = [];

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.2 + 0.3,
    a: Math.random() * 0.6 + 0.2,
    driftX: (Math.random() - 0.5) * 0.02,
    driftY: (Math.random() - 0.5) * 0.02,
    twinkle: Math.random() * Math.PI * 2
  });
}

/* ------------------ SHOOTING STARS ------------------ */

let shootingStars = [];

function spawnShootingStar() {
  if (Math.random() < 0.008) {
    const startX = Math.random() * w * 0.8;
    const startY = Math.random() * h * 0.3;
    shootingStars.push({
      x: startX,
      y: startY,
      vx: 6 + Math.random() * 3,
      vy: 3 + Math.random() * 2,
      life: 0,
      maxLife: 60 + Math.random() * 30
    });
  }
}

/* ------------------ DRAW LOOP ------------------ */

function drawStars() {
  ctx.clearRect(0, 0, w, h);

  // background breathing gradient
  const t = Date.now() * 0.00005;
  const grad = ctx.createRadialGradient(
    w * 0.5, h * 0.5, 50,
    w * 0.5, h * 0.5, Math.max(w, h)
  );
  grad.addColorStop(0, `rgba(30, 40, 90, ${0.35 + Math.sin(t) * 0.05})`);
  grad.addColorStop(1, "rgba(5, 8, 20, 0.9)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // stars
  stars.forEach(s => {
    s.twinkle += 0.01;
    s.x += s.driftX;
    s.y += s.driftY;

    if (s.x < 0) s.x = w;
    if (s.x > w) s.x = 0;
    if (s.y < 0) s.y = h;
    if (s.y > h) s.y = 0;

    const alpha = s.a + Math.sin(s.twinkle) * 0.15;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180, 200, 255, ${alpha})`;
    ctx.fill();
  });

  // shooting stars
  shootingStars.forEach((s, i) => {
    s.x += s.vx;
    s.y += s.vy;
    s.life++;

    ctx.strokeStyle = `rgba(220, 230, 255, ${1 - s.life / s.maxLife})`;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * 3, s.y - s.vy * 3);
    ctx.stroke();

    if (s.life > s.maxLife) shootingStars.splice(i, 1);
  });

  spawnShootingStar();
  requestAnimationFrame(drawStars);
}

drawStars();

/* ------------------ GLYPH PULSE ------------------ */

document.querySelectorAll(".glyph").forEach(glyph => {
  glyph.style.transition = "transform 0.6s ease, filter 0.6s ease";
  glyph.addEventListener("mouseenter", () => {
    glyph.style.transform = "scale(1.15) rotate(2deg)";
    glyph.style.filter = "drop-shadow(0 0 12px rgba(120,200,255,0.8))";
  });
  glyph.addEventListener("mouseleave", () => {
    glyph.style.transform = "scale(1)";
    glyph.style.filter = "none";
  });
});
