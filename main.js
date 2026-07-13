/* ── Data ────────────────────────────────────────────────────── */
const DEF = [
  { 
    id: "1", 
    year: "2024", 
    title: "Verdant — Plant Care App",
    desc: "Mobile-first app tracking watering schedules and identifying plant diseases via on-device computer vision. 800 users in week one.",
    tags: ["React Native", "TensorFlow.js", "Node.js"],
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=500&fit=crop&auto=format", 
    live: "", 
    gh: "" 
  },
  { 
    id: "2", 
    year: "2024", 
    title: "Meridian — Transit Dashboard",
    desc: "Real-time transit aggregator pulling feeds from 5 agencies. 50k daily users at sub-200ms across peak load.",
    tags: ["Next.js", "PostgreSQL", "Redis", "WebSockets"],
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&h=500&fit=crop&auto=format", 
    live: "", 
    gh: "" 
  },
  { 
    id: "3", 
    year: "2023", 
    title: "Folio — Design System",
    desc: "Open-source component library: 60+ accessible components, full dark mode, and a companion Figma kit. 1.2k GitHub stars.",
    tags: ["TypeScript", "Radix UI", "Storybook"],
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop&auto=format", 
    live: "", 
    gh: "" 
  },
  { 
    id: "4", 
    year: "2023", 
    title: "Cartograph — Map Editor",
    desc: "Browser-based GeoJSON editor with real-time collaborative editing and export to PDF/SVG. Used by planners at three city governments.",
    tags: ["MapLibre GL", "CRDT", "Rust/WASM"],
    img: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=500&fit=crop&auto=format", 
    live: "", 
    gh: "" 
  }
];

let projects = (() => { 
  try { 
    const r = localStorage.getItem("pf_v3"); 
    return r ? JSON.parse(r) : DEF; 
  } catch { 
    return DEF; 
  } 
})();

const save = () => {
  localStorage.setItem("pf_v3", JSON.stringify(projects));
};

const esc = (s) => {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
};

/* ── Render grid ─────────────────────────────────────────────── */
function render() {
  const g = document.getElementById("grid");
  document.getElementById("proj-count").textContent = projects.length;

  if (!projects.length) {
    g.innerHTML = `
      <div class="card glass" style="grid-column:1/-1;text-align:center;padding:60px 24px">
        <p style="font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.22em;text-transform:uppercase;color:var(--muted);margin-bottom:12px">No projects yet</p>
        <button onclick="openModal()" style="background:none;border:none;cursor:pointer;color:var(--accent);font-size:.875rem;text-decoration:underline;text-underline-offset:4px">Add your first project</button>
      </div>`;
    return;
  }

  g.innerHTML = projects.map((p, i) => `
    <article class="card glass">
      <div class="ci">
        <img src="${esc(p.img)}" alt="${esc(p.title)}" loading="lazy" />
        <div class="ci-ov"></div>
        <span class="cbadge">${esc(p.year)}</span>
        <button class="cdel" onclick="del('${p.id}')" title="Remove">
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </button>
      </div>
      <div class="cb">
        <div class="cm">
          <span class="cnum">${String(i+1).padStart(2,"0")}</span>
          <div class="cls">
            ${p.gh ? `<a href="${esc(p.gh)}" target="_blank" rel="noreferrer" aria-label="GitHub"><svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg></a>` : ""}
            ${p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noreferrer" aria-label="Live"><svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg></a>` : ""}
          </div>
        </div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        <div class="tags">
          ${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}
        </div>
      </div>
    </article>`
  ).join("");
}

function del(id) { 
  projects = projects.filter(p => p.id !== id); 
  save(); 
  render(); 
}

/* ── Theme ───────────────────────────────────────────────────── */
let dark = true;

function toggleTheme() {
  dark = !dark;
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.getElementById("sun").style.display = dark ? "none" : "block";
  document.getElementById("moon").style.display = dark ? "block" : "none";
  initP();
}

/* ── Mobile nav ──────────────────────────────────────────────── */
let mOpen = false;

function toggleMob() {
  mOpen = !mOpen;
  document.getElementById("mm").classList.toggle("open", mOpen);
  document.getElementById("hopen").style.display = mOpen ? "none" : "block";
  document.getElementById("hclose").style.display = mOpen ? "block" : "none";
}

function closeMob() {
  mOpen = false;
  document.getElementById("mm").classList.remove("open");
  document.getElementById("hopen").style.display = "block";
  document.getElementById("hclose").style.display = "none";
}

/* ── Active nav on scroll ────────────────────────────────────── */
const sections = ["hero", "projects", "about", "contact"];
const navLinks = document.querySelectorAll(".nav-links .nl");

function updateActiveNav() {
  let current = "hero";
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) {
      current = id;
    }
  });
  
  navLinks.forEach(a => {
    a.classList.toggle("on", a.getAttribute("href") === "#" + current);
  });
}

window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

/* ── Contact form ────────────────────────────────────────────── */
function submitContact(e) {
  e.preventDefault();
  const btn = document.getElementById("csend");
  btn.disabled = true; 
  btn.textContent = "Sending...";
  
  setTimeout(() => {
    document.getElementById("fw").innerHTML = `
      <div class="succ">
        <div class="succ-ico">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </div>
        <h3>Message received.</h3>
        <p>I'll be in touch soon. Thanks for reaching out.</p>
        <button class="bl" onclick="resetContact()">Send another</button>
      </div>`;
  }, 1400);
}

function resetContact() {
  document.getElementById("fw").innerHTML = `
    <form onsubmit="submitContact(event)">
      <div class="fg">
        <label class="fl">Name</label>
        <input class="fi" type="text" placeholder="Your name" required />
      </div>
      <div class="fg">
        <label class="fl">Email</label>
        <input class="fi" type="email" placeholder="you@example.com" required />
      </div>
      <div class="fg">
        <label class="fl">Message</label>
        <textarea class="fta" placeholder="Tell me about your project..." required></textarea>
      </div>
      <button type="submit" class="bp" id="csend">Send Message</button>
    </form>`;
}

/* ── Modal ───────────────────────────────────────────────────── */
function openModal() {
  document.getElementById("modal-overlay").classList.add("open");
  document.body.style.overflow = "hidden";
  resetModal();
}

function closeModal() {
  document.getElementById("modal-overlay").classList.remove("open");
  document.body.style.overflow = "";
}

function overlayClick(e) { 
  if (e.target === document.getElementById("modal-overlay")) {
    closeModal();
  }
}

function resetModal() {
  ["u-t", "u-d", "u-tg", "u-i", "u-l", "u-g"].forEach(id => { 
    const el = document.getElementById(id); 
    if (el) el.value = ""; 
  });
  
  const y = document.getElementById("u-y"); 
  if (y) y.value = new Date().getFullYear();
  
  document.getElementById("lt").innerHTML = "";
  document.getElementById("ip").style.display = "none";
}

function liveT() {
  const tags = document.getElementById("u-tg").value
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);
    
  document.getElementById("lt").innerHTML = tags.map(t => `<span class="tag">${esc(t)}</span>`).join("");
}

function liveP() {
  const url = document.getElementById("u-i").value.trim();
  const wrap = document.getElementById("ip");
  const img = document.getElementById("ipi");
  
  if (url) {
    img.src = url; 
    wrap.style.display = "block";
    img.onerror = () => wrap.style.display = "none";
    img.onload = () => wrap.style.display = "block";
  } else { 
    wrap.style.display = "none"; 
  }
}

function submitUpload(e) {
  e.preventDefault();
  const tags = document.getElementById("u-tg").value
    .split(",")
    .map(t => t.trim())
    .filter(Boolean);
    
  projects.unshift({
    id: Date.now().toString(),
    title: document.getElementById("u-t").value.trim(),
    desc: document.getElementById("u-d").value.trim(),
    tags,
    img: document.getElementById("u-i").value.trim() || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop&auto=format",
    live: document.getElementById("u-l").value.trim(),
    gh: document.getElementById("u-g").value.trim(),
    year: document.getElementById("u-y").value.trim() || String(new Date().getFullYear())
  });
  
  save(); 
  closeModal(); 
  render();
  document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
}

/* ── Particles ───────────────────────────────────────────────── */
const cv = document.getElementById("cv");
const cx = cv.getContext("2d");
let pts = [], raf, mx = -9999, my = -9999;

function initP() {
  cancelAnimationFrame(raf);
  cv.width = innerWidth; 
  cv.height = innerHeight;
  
  pts = Array.from({ length: 90 }, () => ({
    x: Math.random() * cv.width, 
    y: Math.random() * cv.height,
    vx: (Math.random() - .5) * .35, 
    vy: (Math.random() - .5) * .35,
    r: Math.random() * 2 + .5, 
    o: Math.random() * .5 + .3
  }));
  
  drawP();
}

function drawP() {
  cx.clearRect(0, 0, cv.width, cv.height);
  const c = dark ? [167, 139, 250] : [109, 40, 217];
  const M = 140;
  
  for (const p of pts) {
    p.x += p.vx; 
    p.y += p.vy;
    
    if (p.x < 0 || p.x > cv.width) p.vx *= -1;
    if (p.y < 0 || p.y > cv.height) p.vy *= -1;
    
    const dx = p.x - mx;
    const dy = p.y - my;
    const d = Math.sqrt(dx * dx + dy * dy);
    
    if (d < 100 && d > 0) { 
      const f = (100 - d) / 100; 
      p.x += dx / d * f * 1.8; 
      p.y += dy / d * f * 1.8; 
    }
    
    cx.beginPath(); 
    cx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    cx.fillStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${p.o})`; 
    cx.fill();
  }
  
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      
      if (d < M) {
        cx.beginPath(); 
        cx.moveTo(pts[i].x, pts[i].y); 
        cx.lineTo(pts[j].x, pts[j].y);
        cx.strokeStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${(1 - d / M) * (dark ? .22 : .16)})`; 
        cx.lineWidth = .7; 
        cx.stroke();
      }
    }
  }
  
  raf = requestAnimationFrame(drawP);
}

addEventListener("mousemove", e => { 
  mx = e.clientX; 
  my = e.clientY; 
});

addEventListener("resize", () => { 
  cv.width = innerWidth; 
  cv.height = innerHeight; 
});

/* ── Boot ────────────────────────────────────────────────────── */
document.getElementById("yr").textContent = new Date().getFullYear();
render();
initP();