// =======================
// STARFIELD
// =======================
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let w, h, stars = [];

function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

for (let i = 0; i < 300; i++) {
  stars.push({
    x: Math.random() * w,
    y: Math.random() * h,
    r: Math.random() * 1.5 + 0.3,
    a: Math.random(),
    s: Math.random() * 0.15 + 0.02
  });
}

function drawStars() {
  ctx.clearRect(0, 0, w, h);
  stars.forEach(s => {
    s.a += s.s;
    ctx.fillStyle = `rgba(255,255,255,${0.5 + Math.sin(s.a) * 0.5})`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

// =======================
// GLYPH ORBIT
// =======================
const orbit = document.getElementById("orbit");

const glyphData = [
  { title: "About EchoMatrix", content: "EchoMatrix is a research system focused on stabilizing meaning, emotion, and identity in intelligent systems." },
  { title: "Founder", content: "Astin Storm Bremner — Founder & Lead Researcher. ORCID: 0009-0005-4617-0421. Cape Town, South Africa." },
  { title: "Research Focus", content: "Meaning formation, emotional structure, and identity stability across human–AI systems." },
  { title: "Current Status", content: "Registered company. Patents filed. Research papers in preparation. Prototype systems under development." },
  { title: "Validation", content: "CIPC registered. SARS registered. ORCID verified. Patent filings pending." },
  { title: "Funding Use", content: "Funding enables research time, compute resources, validation studies, and publication." },
  { title: "Vision", content: "To build foundational cognitive systems that support stable, interpretable intelligence." },
  { title: "Contact", content: "Email: astinstormb@gmail.com | Phone: +27 83 950 5625 | Cape Town, South Africa" }
];

const radius = 260;
let angle = 0;

glyphData.forEach((g, i) => {
  const el = document.createElement("div");
  el.className = "glyph";
  el.innerHTML = `<img src="assets/glyphs/glyph-${i + 1}.png" />`;
  orbit.appendChild(el);

  el.addEventListener("click", () => {
    document.getElementById("panelTitle").textContent = g.title;
    document.getElementById("panelContent").innerHTML = `<p>${g.content}</p>`;
    document.getElementById("overlay").style.display = "flex";
  });

  el._index = i;
  el._el = el;
});

function animateOrbit() {
  angle += 0.002; // slow rotation
  const items = orbit.children;
  for (let i = 0; i < items.length; i++) {
    const theta = angle + (i * Math.PI * 2) / items.length;
    const x = Math.cos(theta) * radius + radius;
    const y = Math.sin(theta) * radius + radius;
    items[i].style.left = `${x}px`;
    items[i].style.top = `${y}px`;
  }
  requestAnimationFrame(animateOrbit);
}
animateOrbit();

// =======================
// OVERLAY CLOSE
// =======================
document.getElementById("closeOverlay").onclick = () => {
  document.getElementById("overlay").style.display = "none";
};
