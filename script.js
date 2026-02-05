const openBtn = document.getElementById("openBtn");
const screenIntro = document.getElementById("screenIntro");
const screenQuestion = document.getElementById("screenQuestion");

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const area = document.getElementById("buttonArea");
const message = document.getElementById("message");

let x = 220;
let y = 62;

function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

openBtn.onclick = () => {
  screenIntro.classList.add("hidden");
  screenQuestion.classList.remove("hidden");
};

area.onmousemove = (e) => {
  const r = area.getBoundingClientRect();
  const mx = e.clientX - r.left;
  const my = e.clientY - r.top;

  const dx = x - mx;
  const dy = y - my;

  if (Math.hypot(dx,dy) < 90) {
    x += dx * 0.4;
    y += dy * 0.4;
    x = clamp(x, 10, r.width - 90);
    y = clamp(y, 10, r.height - 40);
    noBtn.style.left = x + "px";
    noBtn.style.top = y + "px";
  }
};

yesBtn.onclick = () => {
  message.textContent = "Locked in. See you later pookie.";
  noBtn.style.display = "none";
};
