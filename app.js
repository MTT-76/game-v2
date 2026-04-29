// ======================
// بيانات عامة
// ======================
let team1 = "الفريق 1";
let team2 = "الفريق 2";

let scores = [0, 0];
let turn = 0;

let currentQuestion = null;
let currentPoints = 0;

let time = 0;
let running = true;
let interval;

// ======================
// تبديل الشاشات
// ======================
function show(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// ======================
// إعداد الفرق (اختياري لاحقاً)
// ======================
function startGame() {
  const t1 = document.getElementById("team1");
  const t2 = document.getElementById("team2");

  if (t1 && t2) {
    team1 = t1.value || "الفريق 1";
    team2 = t2.value || "الفريق 2";
  }

  const t1Btn = document.getElementById("team1Btn");
  const t2Btn = document.getElementById("team2Btn");

  if (t1Btn) t1Btn.innerText = team1;
  if (t2Btn) t2Btn.innerText = team2;

  renderBoard();
  show("board");
}

// ======================
// رسم لوحة الفئات
// ======================
function renderBoard() {
  let board = document.getElementById("board");
  if (!board) return;

  let html = "";

  DATA.categories.forEach((cat, ci) => {

    // عنوان الفئة
    html += `<div class="card">${cat.name}</div>`;

    // أسئلة عادية
    if (cat.type === "question") {
      ["easy", "medium", "hard"].forEach(level => {
        let points = level === "easy" ? 200 : level === "medium" ? 400 : 600;

        html += `
          <div class="card" onclick="openQ(${ci}, '${level}')">
            ${points}
          </div>
        `;
      });
    }

    // فئات خاصة
    else {
      [200, 400, 600].forEach(p => {
        html += `
          <div class="card" onclick="openSpecial(${ci}, ${p})">
            ${p}
          </div>
        `;
      });
    }
  });

  board.innerHTML = html;
}

// ======================
// فتح سؤال عادي
// ======================
function openQ(ci, level) {
  let list = DATA.categories[ci].questions[level];
  let q = list[Math.floor(Math.random() * list.length)];

  currentQuestion = q;
  currentPoints = level === "easy" ? 200 : level === "medium" ? 400 : 600;

  document.getElementById("question").innerText = q.q;

  startTimer();
  updateTurn();
  show("play");
}

// ======================
// فئات خاصة (QR / تحدي)
// ======================
function openSpecial(ci, points) {
  let cat = DATA.categories[ci];
  let item = cat.items[Math.floor(Math.random() * cat.items.length)];

  currentQuestion = item;
  currentPoints = points;

  document.getElementById("question").innerText = "🎯 تحدي!";
  
  let qr = document.getElementById("qrcode");
  if (qr) {
    qr.innerHTML = "";
    try {
      new QRCode(qr, item);
    } catch (e) {
      qr.innerText = item; // fallback
    }
  }

  startTimer();
  updateTurn();
  show("play");
}

// ======================
// المؤقت
// ======================
function startTimer() {
  clearInterval(interval);
  time = 0;
  running = true;

  interval = setInterval(() => {
    if (running) {
      time++;
      let t = document.getElementById("time");
      if (t) t.innerText = time;
    }
  }, 1000);
}

function toggleTimer() {
  running = !running;
}

function resetTimer() {
  time = 0;
  let t = document.getElementById("time");
  if (t) t.innerText = time;
}

// ======================
// عرض الإجابة
// ======================
function showAnswer() {
  clearInterval(interval);

  let ans = "";

  if (typeof currentQuestion === "object") {
    ans = currentQuestion.a || "—";
  } else {
    ans = currentQuestion;
  }

  document.getElementById("answerText").innerText = ans;
  show("answer");
}

// ======================
// احتساب النقاط
// ======================
function givePoint(team) {
  if (team === 1) scores[0] += currentPoints;
  if (team === 2) scores[1] += currentPoints;

  nextTurn();
  renderBoard();
  show("board");
}

// ======================
// تبديل الدور
// ======================
function nextTurn() {
  turn = turn === 0 ? 1 : 0;
}

// ======================
// تحديث عرض الدور
// ======================
function updateTurn() {
  let name = turn === 0 ? team1 : team2;
  let el = document.getElementById("turn");
  if (el) el.innerText = "🎯 الدور: " + name;
}

// ======================
// تشغيل اللعبة عند تحميل الصفحة
// ======================
window.onload = function () {
  renderBoard();
};
