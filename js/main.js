// STARFIELD
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 200; i++) {
  stars.push({
    angle: Math.random() * Math.PI * 2,
    radius: Math.random() * Math.max(canvas.width, canvas.height),
    speed: 0.0001 + Math.random() * 0.0003,
    size: Math.random() * 2 + 0.5,
    alpha: Math.random()
  });
}

function drawStars() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.translate(canvas.width/2, canvas.height/2);

  stars.forEach(s => {
    s.angle += s.speed;
    ctx.beginPath();
    ctx.fillStyle = `rgba(180,160,255,${s.alpha})`;
    ctx.arc(
      Math.cos(s.angle) * s.radius,
      Math.sin(s.angle) * s.radius,
      s.size,
      0,
      Math.PI*2
    );
    ctx.fill();
  });

  ctx.setTransform(1,0,0,1,0,0);
  requestAnimationFrame(drawStars);
}
drawStars();

// GLYPH ORBIT POSITIONS
const glyphs = document.querySelectorAll(".glyph");
glyphs.forEach((g, i) => {
  g.style.transform = `rotate(${i * (360 / glyphs.length)}deg) translateX(260px)`;
});

// OVERLAY CONTENT
const content = {
  about: "EchoMatrix explores how meaning, emotion, and identity stabilize across time and context.",
  founder: "Founded by Astin Bremner, independent researcher and systems designer.",
  research: "Focused on cognitive systems, symbolic representation, and emotional structure.",
  status: "Two papers in final preparation. Core IP filed. Pre-publication phase.",
  funding: "Seeking early-stage research micro-grants and seed funding.",
  vision: "To build stable, interpretable systems for human-aligned cognition.",
  papers: "Paper I and II in LaTeX. Submission imminent.",
  contact: "research.ecomatrix@proton.me\n+27 83 950 5625\nSouth Africa"
};

const overlay = document.getElementById("overlay");
const overlayGlyph = document.getElementById("overlay-glyph");
const overlayText = document.getElementById("overlay-text");

glyphs.forEach(g => {
  g.addEventListener("click", () => {
    overlay.classList.remove("hidden");
    overlayGlyph.src = g.src;
    overlayText.innerText = content[g.dataset.section];
  });
});

overlayGlyph.addEventListener("click", () => {
  overlay.classList.add("hidden");
});
