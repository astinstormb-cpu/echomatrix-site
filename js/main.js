/* STARFIELD */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h;
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

const stars = [];
const STAR_COUNT = 180;

for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    r: Math.random() * Math.max(w, h),
    a: Math.random() * Math.PI * 2,
    s: 0.00005 + Math.random() * 0.00015,
    size: 0.5 + Math.random() * 2,
    alpha: 0.3 + Math.random() * 0.7
  });
}

function drawStars() {
  ctx.clearRect(0, 0, w, h);
  ctx.translate(w / 2, h / 2);

  stars.forEach(star => {
    star.a += star.s;
    const x = Math.cos(star.a) * star.r;
    const y = Math.sin(star.a) * star.r;

    ctx.beginPath();
    ctx.fillStyle = `rgba(180,160,255,${star.alpha})`;
    ctx.arc(x, y, star.size, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.setTransform(1,0,0,1,0,0);
  requestAnimationFrame(drawStars);
}
drawStars();

/* OVERLAYS */
const overlay = document.getElementById("overlay");
const overlayText = document.getElementById("overlay-text");
const overlayGlyph = document.getElementById("overlay-glyph");

const content = {
  about: "EchoMatrix is a computational research initiative exploring how emotional structure, resonance, and meaning can be modeled, stabilized, and studied within complex systems.",
  founder: "Founded by Astin Bremner. Lead cognitive systems engineer and researcher focused on emotional computation, identity dynamics, and human–AI co-evolution.",
  problem: "Current systems fail to model emotional meaning with continuity and stability. EchoMatrix addresses this gap through structured, testable representations.",
  system: "A modular research system integrating computational modeling, symbolic structure, and longitudinal analysis of emotional states.",
  progress: "Two provisional patents filed. Research papers in final preparation. Working prototypes, datasets, and internal validation completed.",
  vision: "To establish a new research foundation for emotional computation and aligned human-centric systems.",
  funding: "Seeking early-stage research and seed funding to support publication, infrastructure, and controlled expansion.",
  contact: "research.ecomatrix@proton.me"
};

document.querySelectorAll(".glyph").forEach(glyph => {
  glyph.addEventListener("click", () => {
    const key = glyph.dataset.section;
    overlayText.innerText = content[key];
    overlayGlyph.src = glyph.src;
    overlay.classList.remove("hidden");
  });
});

overlayGlyph.addEventListener("click", () => {
  overlay.classList.add("hidden");
});
