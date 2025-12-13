/* Cursor star */
const cursor = document.getElementById("cursor-star");
window.addEventListener("mousemove", e => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

/* Overlay logic */
document.querySelectorAll("[data-open]").forEach(btn => {
  btn.addEventListener("click", () => {
    document.getElementById(btn.dataset.open).style.display = "flex";
  });
});

document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", e => {
    e.target.closest(".overlay").style.display = "none";
  });
});

/* Starfield */
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
let shootingStars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

for (let i = 0; i < 180; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    z: Math.random(),
    vx: (Math.random() - 0.5) * 0.02,
    vy: (Math.random() - 0.5) * 0.02
  });
}

function spawnShootingStar() {
  shootingStars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height * 0.4,
    vx: -6 - Math.random() * 4,
    vy: 4 + Math.random() * 2,
    life: 0
  });
}

setInterval(spawnShootingStar, 6000);

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;

    if (s.x < 0) s.x = canvas.width;
    if (s.y < 0) s.y = canvas.height;
    if (s.x > canvas.width) s.x = 0;
    if (s.y > canvas.height) s.y = 0;

    const size = s.z * 2 + 0.5;
    ctx.fillStyle = `rgba(200,220,255,${0.3 + s.z})`;
    ctx.fillRect(s.x, s.y, size, size);
  });

  shootingStars.forEach((s, i) => {
    s.x += s.vx;
    s.y += s.vy;
    s.life++;

    ctx.strokeStyle = "rgba(180,200,255,0.8)";
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x + s.vx * 3, s.y + s.vy * 3);
    ctx.stroke();

    if (s.life > 30) shootingStars.splice(i,1);
  });

  requestAnimationFrame(animate);
}
animate();
