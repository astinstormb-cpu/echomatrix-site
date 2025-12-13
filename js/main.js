/* ===== MODALS ===== */
document.querySelectorAll("nav button").forEach(btn => {
  btn.onclick = () => {
    document.getElementById(btn.dataset.modal).style.display = "block";
  };
});

document.querySelectorAll(".close").forEach(btn => {
  btn.onclick = () => btn.parentElement.style.display = "none";
});

/* ===== STARFIELD ===== */
const canvas = document.getElementById("starfield");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let stars = Array.from({ length: 220 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5,
  v: Math.random() * 0.3 + 0.1
}));

function drawStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle = "white";
  stars.forEach(s => {
    s.y += s.v;
    if (s.y > canvas.height) s.y = 0;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

/* ===== SHOOTING STARS ===== */
const sc = document.getElementById("shooting-stars");
const sctx = sc.getContext("2d");
sc.width = innerWidth;
sc.height = innerHeight;

let shooting = [];

setInterval(() => {
  shooting.push({
    x: Math.random()*sc.width,
    y: 0,
    vx: 6,
    vy: 6,
    life: 60
  });
}, 2500);

function drawShooting() {
  sctx.clearRect(0,0,sc.width,sc.height);
  shooting.forEach((s,i) => {
    sctx.strokeStyle = "rgba(255,255,255,0.8)";
    sctx.beginPath();
    sctx.moveTo(s.x, s.y);
    sctx.lineTo(s.x - s.vx*4, s.y - s.vy*4);
    sctx.stroke();
    s.x += s.vx;
    s.y += s.vy;
    if (--s.life <= 0) shooting.splice(i,1);
  });
  requestAnimationFrame(drawShooting);
}
drawShooting();

/* ===== CURSOR TRAIL ===== */
const trail = document.getElementById("cursor-trail");
const tctx = trail.getContext?.("2d") || null;

let trailPoints = [];
window.onmousemove = e => {
  trailPoints.push({x:e.clientX,y:e.clientY,life:20});
};

function drawTrail(){
  if(!tctx) return;
  tctx.clearRect(0,0,trail.width,trail.height);
  trailPoints.forEach((p,i)=>{
    tctx.fillStyle=`rgba(90,108,255,${p.life/20})`;
    tctx.beginPath();
    tctx.arc(p.x,p.y,3,0,Math.PI*2);
    tctx.fill();
    if(--p.life<=0) trailPoints.splice(i,1);
  });
  requestAnimationFrame(drawTrail);
}

/* ===== GLYPHS ===== */
const glyphContainer = document.getElementById("glyphs");
for(let i=1;i<=8;i++){
  const img=document.createElement("img");
  img.src=`assets/glyphs/glyph-${i}.png`;
  img.style.left=Math.random()*innerWidth+"px";
  img.style.top=Math.random()*innerHeight+"px";
  glyphContainer.appendChild(img);
}
