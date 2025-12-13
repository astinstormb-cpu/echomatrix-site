// --- Smooth scroll from glyphs ---
document.querySelectorAll(".glyph").forEach(glyph => {
  glyph.addEventListener("click", () => {
    document.getElementById(glyph.dataset.target)
      .scrollIntoView({ behavior: "smooth" });
  });
});

// --- Glyph motion ---
const glyphs = document.querySelectorAll(".glyph");
glyphs.forEach((g, i) => {
  let angle = Math.random() * Math.PI * 2;
  let radius = 120 + Math.random() * 160;
  let speed = 0.0002 + Math.random() * 0.0003;

  function animate() {
    angle += speed;
    g.style.left = `calc(50% + ${Math.cos(angle) * radius}px)`;
    g.style.top  = `calc(50% + ${Math.sin(angle) * radius}px)`;
    requestAnimationFrame(animate);
  }
  animate();
});

// --- Starfield ---
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
resize();

let stars = Array.from({length: 120}, () => ({
  x: Math.random()*canvas.width,
  y: Math.random()*canvas.height,
  r: Math.random()*1.5
}));

function resize(){
  canvas.width = innerWidth;
  canvas.height = innerHeight;
}

window.onresize = resize;

function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  stars.forEach(s=>{
    ctx.fillStyle="rgba(255,255,255,0.8)";
    ctx.beginPath();
    ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
    ctx.fill();
    s.y += 0.02;
    if(s.y > canvas.height) s.y = 0;
  });
  requestAnimationFrame(draw);
}
draw();
