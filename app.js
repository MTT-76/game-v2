let team1="", team2="";
let scores=[0,0];
let turn=0;

let usedQuestions={};

let currentQuestion=null;
let currentPoints=0;

let time=0;
let running=true;
let interval;

function show(id){
  document.querySelectorAll(".card-box").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function startGame(){
  team1 = document.getElementById("team1").value || "فريق 1";
  team2 = document.getElementById("team2").value || "فريق 2";

  loadGame();

  renderBoard();
  updateTurn();
  updateScore();

  show("boardScreen");
}

function renderBoard(){
  let html="";

  DATA.categories.forEach((cat,ci)=>{
    html+=`<div class="card">${cat.name}</div>`;

    ["easy","medium","hard"].forEach(level=>{
      let points = level==="easy"?200:level==="medium"?400:600;

      html+=`<div class="card" onclick="openQ(${ci},'${level}',this)">
      ${points}
      </div>`;
    });
  });

  document.getElementById("board").innerHTML=html;
}

function openQ(ci,level,el){
  if(el.classList.contains("used")) return;

  el.classList.add("used");

  let list = DATA.categories[ci].questions[level];

  if(!usedQuestions[ci]) usedQuestions[ci]={};
  if(!usedQuestions[ci][level]) usedQuestions[ci][level]=[];

  let available = list.filter((q,i)=>!usedQuestions[ci][level].includes(i));

  if(available.length===0){
    alert("انتهت الأسئلة");
    return;
  }

  let index = list.indexOf(
    available[Math.floor(Math.random()*available.length)]
  );

  usedQuestions[ci][level].push(index);

  let q = list[index];

  currentQuestion=q;
  currentPoints = level==="easy"?200:level==="medium"?400:600;

  document.getElementById("question").innerText=q.q;

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
  document.getElementById("time").innerText=0;
}

function showAnswer(){
  clearInterval(interval);

  document.getElementById("answerText").innerText=currentQuestion.a;

  show("answer");
}

function givePoint(team){
  if(team===1) scores[0]+=currentPoints;
  if(team===2) scores[1]+=currentPoints;

  saveGame();
  updateScore();

  checkWinner();

  nextTurn();
  renderBoard();
  show("boardScreen");
}

function nextTurn(){
  turn = turn===0?1:0;
}

function updateTurn(){
  let name = turn===0?team1:team2;
  document.getElementById("turn").innerText="الدور: "+name;
}

function updateScore(){
  document.getElementById("score").innerText =
    team1 + ": " + scores[0] + " | " + team2 + ": " + scores[1];
}

function checkWinner(){
  if(scores[0] >= 2000){
    showWinner(team1);
  }
  if(scores[1] >= 2000){
    showWinner(team2);
  }
}

function showWinner(name){
  document.getElementById("winnerText").innerText = "🏆 الفائز: " + name;
  show("winner");
}

function restartGame(){
  scores=[0,0];
  usedQuestions={};
  localStorage.clear();
  show("setup");
}

function saveGame(){
  localStorage.setItem("scores", JSON.stringify(scores));
}

function loadGame(){
  let s = localStorage.getItem("scores");
  if(s) scores = JSON.parse(s);
}
