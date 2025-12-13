// OVERLAY LOGIC
document.querySelectorAll("nav button").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.open;
    document.getElementById(id).classList.add("active");
  });
});

document.querySelectorAll(".close").forEach(btn => {
  btn.addEventListener("click", () => {
    btn.closest(".overlay").classList.remove("active");
  });
});

// STARFIELD
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 200;

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function createStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      v: Math.random() * 0.3 + 0.1
    });
  }
}
createStars();

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "white";
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();

    s.y += s.v;
    if (s.y > canvas.height) s.y = 0;
  });

  requestAnimationFrame(animate);
}
animate();
