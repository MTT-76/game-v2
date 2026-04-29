let team1="", team2="";
let scores=[0,0];
let turn=0;

let currentQuestion=null;
let currentPoints=0;

let time=0;
let running=true;
let interval;

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function goSetup(){
  show("setup");
}

function startGame(){
  team1=document.getElementById("team1").value || "فريق 1";
  team2=document.getElementById("team2").value || "فريق 2";

  document.getElementById("team1Btn").innerText=team1;
  document.getElementById("team2Btn").innerText=team2;

  renderBoard();
  show("board");
}

function renderBoard(){
  let html="";
  DATA.categories.forEach((cat,ci)=>{
    html+=`<div class="card">${cat.name}</div>`;

    if(cat.type==="question"){
      ["easy","medium","hard"].forEach(level=>{
        let points = level==="easy"?200:level==="medium"?400:600;
        html+=`<div class="card" onclick="openQ(${ci},'${level}')">${points}</div>`;
      });
    }else{
      [200,400,600].forEach(p=>{
        html+=`<div class="card" onclick="openSpecial(${ci},${p})">${p}</div>`;
      });
    }
  });

  document.getElementById("board").innerHTML=html;
}

function openQ(ci,level){
  let list = DATA.categories[ci].questions[level];
  let q = list[Math.floor(Math.random()*list.length)];

  currentQuestion=q;
  currentPoints= level==="easy"?200:level==="medium"?400:600;

  document.getElementById("question").innerText=q.q;

  startTimer();
  updateTurn();
  show("play");
}

function openSpecial(ci,points){
  let cat = DATA.categories[ci];
  let item = cat.items[Math.floor(Math.random()*cat.items.length)];

  currentQuestion=item;
  currentPoints=points;

  document.getElementById("question").innerText="تحدي!";
  document.getElementById("qrcode").innerHTML="";

  new QRCode(document.getElementById("qrcode"), item);

  startTimer();
  updateTurn();
  show("play");
}

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
}

function showAnswer(){
  clearInterval(interval);

  let ans = currentQuestion.a || currentQuestion;

  document.getElementById("answerText").innerText=ans;
  show("answer");
}

function givePoint(team){
  if(team===1) scores[0]+=currentPoints;
  if(team===2) scores[1]+=currentPoints;

  nextTurn();
  renderBoard();
  show("board");
}

function nextTurn(){
  turn = turn===0?1:0;
}

function updateTurn(){
  let name = turn===0?team1:team2;
  document.getElementById("turn").innerText="الدور: "+name;
}