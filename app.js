import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let team1="", team2="";
let scores=[0,0];
let turn=0;

let DATA = { categories: [] };
let currentQuestion=null;
let currentPoints=0;

let time=0;
let interval;

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

async function loadQuestions(){
  const snapshot = await getDocs(collection(db,"questions"));

  let map={};

  snapshot.forEach(doc=>{
    let q=doc.data();

    if(!map[q.category]){
      map[q.category]={
        name:q.category,
        questions:{easy:[],medium:[],hard:[]}
      };
    }

    map[q.category].questions[q.difficulty].push({
      q:q.question,
      a:q.answer
    });
  });

  DATA.categories = Object.values(map);
}

window.startGame = async function(){
  team1=document.getElementById("team1").value||"فريق 1";
  team2=document.getElementById("team2").value||"فريق 2";

  document.getElementById("team1Btn").innerText=team1;
  document.getElementById("team2Btn").innerText=team2;

  await loadQuestions();
  renderBoard();
  show("boardScreen");
}

function renderBoard(){
  let html="";

  DATA.categories.forEach((cat,ci)=>{
    html+=`<div class="card">${cat.name}</div>`;

    ["easy","medium","hard"].forEach(level=>{
      let p= level==="easy"?100:level==="medium"?200:300;
      html+=`<div class="card" onclick="openQ(${ci},'${level}')">${p}</div>`;
    });
  });

  document.getElementById("board").innerHTML=html;
}

window.openQ=function(ci,level){
  let list=DATA.categories[ci].questions[level];
  let q=list[Math.floor(Math.random()*list.length)];

  currentQuestion=q;
  currentPoints= level==="easy"?100:level==="medium"?200:300;

  document.getElementById("question").innerText=q.q;

  startTimer();
  updateTurn();
  show("play");
}

function startTimer(){
  clearInterval(interval);
  time=0;

  interval=setInterval(()=>{
    time++;
    document.getElementById("time").innerText=time;
  },1000);
}

window.showAnswer=function(){
  clearInterval(interval);
  document.getElementById("answerText").innerText=currentQuestion.a;
  show("answer");
}

window.givePoint=function(team){
  if(team===1) scores[0]+=currentPoints;
  else scores[1]+=currentPoints;

  turn = turn===0?1:0;
  renderBoard();
  show("boardScreen");
}

function updateTurn(){
  let name= turn===0?team1:team2;
  document.getElementById("turn").innerText="الدور: "+name;
}