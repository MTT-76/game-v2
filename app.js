import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { randomItem } from "./utils.js";

let teams=["",""];
let scores=[0,0];
let turn=0;

let allQuestions=[];
let selectedCats=[];
let DATA=[];

let current;
let timerInt;
let time=30;

let clickSound = new Audio("assets/click.mp3");

function show(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
 document.getElementById(id).classList.add("active");
}

window.goSetup=async()=>{
 await loadQuestions();
 renderCats();
 show("setup");
}

async function loadQuestions(){
 const snap=await getDocs(collection(db,"questions"));
 allQuestions=[];
 snap.forEach(d=>allQuestions.push(d.data()));
}

function renderCats(){
 let cats=[...new Set(allQuestions.map(q=>q.category))];
 let html="";
 cats.forEach(c=>{
  html+=`<div class="card" onclick="toggleCat('${c}')">${c}</div>`;
 });
 document.getElementById("categories").innerHTML=html;
}

window.toggleCat=(c)=>{
 if(selectedCats.includes(c)){
  selectedCats=selectedCats.filter(x=>x!==c);
 }else{
  selectedCats.push(c);
 }
 renderCats();
}

window.startGame=()=>{
 teams[0]=team1.value||"فريق 1";
 teams[1]=team2.value||"فريق 2";

 DATA = selectedCats.map(cat=>{
  let qs=allQuestions.filter(q=>q.category===cat);
  return {
    name:cat,
    easy:qs.filter(q=>q.difficulty==="easy"),
    medium:qs.filter(q=>q.difficulty==="medium"),
    hard:qs.filter(q=>q.difficulty==="hard")
  }
 });

 renderBoard();
 show("boardScreen");
}

function renderBoard(){
 let html="";
 DATA.forEach((c,i)=>{
  html+=`<div class="card">${c.name}</div>`;
  ["easy","medium","hard"].forEach(l=>{
    html+=`<div class="card" onclick="openQ(${i},'${l}')">${l}</div>`;
  });
 });
 board.innerHTML=html;
}

window.openQ=(i,l)=>{
 clickSound.play();

 current = randomItem(DATA[i][l]);

 question.innerText=current.question;
 startTimer();
 show("play");
}

function startTimer(){
 clearInterval(timerInt);
 time=30;
 timerInt=setInterval(()=>{
  time--;
  document.getElementById("time").innerText=time;
  if(time<=0){
    clearInterval(timerInt);
    showAnswer();
  }
 },1000);
}

window.showAnswer=()=>{
 answerText.innerText=current.answer;
 show("answer");
}

window.givePoint=(t)=>{
 if(t===1) scores[0]+=100;
 if(t===2) scores[1]+=100;

 checkWinner();

 turn = turn===0?1:0;
 updateScore();

 renderBoard();
 show("boardScreen");
}

function updateScore(){
 score.innerText = `${teams[0]}: ${scores[0]} | ${teams[1]}: ${scores[1]}`;
}

function checkWinner(){
 if(scores[0]>=1000) showWinner(teams[0]);
 if(scores[1]>=1000) showWinner(teams[1]);
}

function showWinner(name){
 winnerText.innerText="🏆 "+name;
 show("winner");
}

window.restart=()=>{
 location.reload();
}
