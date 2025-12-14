/* Stars */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let w, h, stars;

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

stars = Array.from({ length: 220 }, () => ({
  r: Math.random() * 1.5 + 0.5,
  a: Math.random() * Math.PI * 2,
  d: Math.random() * Math.min(w, h),
  s: Math.random() * 0.00015 + 0.00005,
  o: Math.random() * 0.8 + 0.2
}));

function drawStars() {
  ctx.clearRect(0,0,w,h);
  stars.forEach(star => {
    star.a += star.s;
    const x = w/2 + Math.cos(star.a) * star.d;
    const y = h/2 + Math.sin(star.a) * star.d;
    ctx.fillStyle = `rgba(200,220,255,${star.o})`;
    ctx.beginPath();
    ctx.arc(x,y,star.r,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

/* Overlay content */
const content = {
  about: `<h2>About EchoMatrix</h2><p>EchoMatrix is a cognitive research initiative focused on how meaning, emotion, and identity stabilize over time. Current systems fragment these domains; EchoMatrix studies them as a unified structure.</p>`,
  founder: `<h2>Founder</h2><p>Astin Storm Bremner founded EchoMatrix to address gaps between lived emotional experience and formal cognitive models, with a long-term research-first approach.</p>`,
  problem: `<h2>The Problem</h2><p>Most systems reduce emotion or meaning to surface metrics. EchoMatrix investigates why this fails and how stability emerges instead.</p>`,
  research: `<h2>Research</h2><p>Current work explores stabilized meaning systems, emotional continuity, and identity persistence.</p>`,
  progress: `<h2>Progress</h2><p>Core framework established. Prototypes operational. Preparing first formal publications.</p>`,
  vision: `<h2>Vision</h2><p>A long-term research platform for understanding meaning at human scale.</p>`,
  funding: `<h2>Funding</h2><p>Funding enables dedicated research time, validation, and publication.</p>`,
  contact: `<h2>Contact</h2>
    <p>Email: contact@echomatrix.ai</p>
    <p>Phone: +27 83 950 5625</p>
    <p>Location: South Africa</p>`
};

document.querySelectorAll(".glyph").forEach(g => {
  g.onclick = () => {
    const id = g.dataset.id;
    document.getElementById("overlay").style.display = "block";
    document.getElementById("overlay-text").innerHTML = content[id];
    document.getElementById("overlay-glyph").src = g.src;
    document.getElementById("close-overlay").style.backgroundImage = `url(${g.src})`;
  };
});

document.getElementById("close-overlay").onclick = () => {
  document.getElementById("overlay").style.display = "none";
};
