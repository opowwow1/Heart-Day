const openBtn = document.getElementById("openBtn");
const screenIntro = document.getElementById("screenIntro");
const screenQuestion = document.getElementById("screenQuestion");

const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const area = document.getElementById("buttonArea");
const message = document.getElementById("message");
const promptLine = document.getElementById("promptLine");

let x = 290;  // matches CSS starting position
let y = 92;

function clamp(v, min, max){
  return Math.max(min, Math.min(max, v));
}

function updateNoPos(){
  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

openBtn.onclick = () => {
  screenIntro.classList.add("hidden");
  screenQuestion.classList.remove("hidden");
  updateNoPos();
};

function dodge(mx, my){
  const r = area.getBoundingClientRect();
  const btnR = noBtn.getBoundingClientRect();
  const bw = btnR.width;
  const bh = btnR.height;

  // cursor position relative to area
  const cx = mx - r.left;
  const cy = my - r.top;

  // button center
  const bx = x + bw / 2;
  const by = y + bh / 2;

  const dx = bx - cx;
  const dy = by - cy;

  const dist = Math.hypot(dx, dy);

  // tune these for feel
  const trigger = 140;     // starts moving sooner
  const strength = 0.20;   // lower = smoother/slower

  if (dist < trigger) {

    const factor = (trigger - dist) / trigger; // 0..1
    x += dx * strength * factor;
    y += dy * strength * factor;

    // keep inside the area
    x = clamp(x, 12, r.width - bw - 12);
    y = clamp(y, 12, r.height - bh - 12);

    updateNoPos();

    // tiny, non-cringe hint text
    if (promptLine) promptLine.textContent = "Pick one.";
  }
}


area.addEventListener("mousemove", (e) => {
  dodge(e.clientX, e.clientY);
});


area.addEventListener("touchmove", (e) => {
  const t = e.touches[0];
  if (!t) return;
  dodge(t.clientX, t.clientY);
}, { passive: true });


noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const r = noBtn.getBoundingClientRect();
  dodge(r.left + r.width / 2, r.top + r.height / 2);
});

yesBtn.onclick = () => {
  message.textContent = "Locked in. See you later pookie.";
  noBtn.style.display = "none";
  yesBtn.textContent = "Yes";
};
