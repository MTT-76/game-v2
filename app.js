let team1="الفريق 1";
let team2="الفريق 2";

let logo1="🦁";
let logo2="🦅";

let scores=[0,0];
let turn=0;

let currentQuestion=null;
let currentPoints=0;

let time=0;
let running=true;
let interval;

// تبديل الشاشات
function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// بدء اللعبة
function startGame(){
  team1 = document.getElementById("team1").value || "الفريق 1";
  team2 = document.getElementById("team2").value || "الفريق 2";

  logo1 = document.getElementById("logo1").value;
  logo2 = document.getElementById("logo2").value;

  document.getElementById("team1Btn").innerText = logo1 + " " + team1;
  document.getElementById("team2Btn").innerText = logo2 + " " + team2;

  renderBoard();
  show("board");
}

// لوحة الفئات
function renderBoard(){
  let html="";

  DATA.categories.forEach((cat,ci)=>{
    html+=`<div class="card">${cat.name}</div>`;

    if(cat.type==="question"){
      ["easy","medium","hard"].forEach(level=>{
        let p=level==="easy"?200:level==="medium"?400:600;
        html+=`<div class="card" onclick="openQ(${ci},'${level}')">${p}</div>`;
      });
    }else{
      [200,400,600].forEach(p=>{
        html+=`<div class="card" onclick="openSpecial(${ci},${p})">${p}</div>`;
      });
    }
  });

  document.getElementById("board").innerHTML=html;
}

// سؤال عادي
function openQ(ci,level){
  let list=DATA.categories[ci].questions[level];
  let q=list[Math.floor(Math.random()*list.length)];

  currentQuestion=q;
  currentPoints=level==="easy"?200:level==="medium"?400:600;

  document.getElementById("question").innerText=q.q;

  startTimer();
  updateTurn();
  show("play");
}

// فئات خاصة
function openSpecial(ci,points){
  let cat=DATA.categories[ci];
  let item=cat.items[Math.floor(Math.random()*cat.items.length)];

  currentQuestion=item;
  currentPoints=points;

  let qEl=document.getElementById("question");
  let qr=document.getElementById("qrcode");

  qEl.innerHTML="";
  qr.innerHTML="";

  if(cat.type==="images"){
    item.images.forEach(img=>{
      qEl.innerHTML += `<img src="${img}">`;
    });
  }
  else if(cat.type==="multi"){
    qEl.innerText=item.question;
    console.log(item.answers);
  }
  else if(cat.type==="luck"){
    qEl.innerText=item;
  }
  else{
    qEl.innerText="🎯 تحدي!";
    new QRCode(qr,item);
  }

  startTimer();
  updateTurn();
  show("play");
}

// المؤقت
function startTimer(){
  clearInterval(interval);
  time=0;
  running=true;

  interval=setInterval(()=>{
    if(running){
      time++;
      document.getElementById("time").innerText=time;
    }
  },1000);
}

function toggleTimer(){
  running=!running;
}

function resetTimer(){
  time=0;
  document.getElementById("time").innerText=time;
}

// عرض الإجابة
function showAnswer(){
  clearInterval(interval);

  let ans="";

  if(typeof currentQuestion==="object"){
    ans=currentQuestion.a || currentQuestion.answer || "—";
  }else{
    ans=currentQuestion;
  }

  document.getElementById("answerText").innerText=ans;
  show("answer");
}

// احتساب النقاط
function givePoint(team){
  if(team===1) scores[0]+=currentPoints;
  if(team===2) scores[1]+=currentPoints;

  turn = turn===0?1:0;

  renderBoard();
  show("board");
}

// تحديث الدور
function updateTurn(){
  let name = turn===0 
    ? logo1 + " " + team1 
    : logo2 + " " + team2;

  document.getElementById("turn").innerText="🎯 الدور: "+name;
}
