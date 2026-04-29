import { db } from "./firebase.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let allQuestions=[];
let DATA=[];
let selected=[];

function show(id){
 document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
 document.getElementById(id).classList.add("active");
}

window.goSetup=async function(){
 await load();
 renderCats();
 show("setup");
}

async function load(){
 let snap=await getDocs(collection(db,"questions"));
 allQuestions=[];
 snap.forEach(d=>allQuestions.push(d.data()));
}

function renderCats(){
 let cats=[...new Set(allQuestions.map(q=>q.category))];
 let html="";
 cats.forEach(c=>{
  html+=`<div onclick="toggle('${c}')" class="cat">${c}</div>`;
 });
 document.getElementById("categories").innerHTML=html;
}

window.toggle=function(c){
 if(selected.includes(c)) selected=selected.filter(x=>x!==c);
 else selected.push(c);
 renderCats();
}

window.startGame=function(){
 DATA=[];
 selected.forEach(cat=>{
   let qs=allQuestions.filter(q=>q.category===cat);
   DATA.push({name:cat, qs});
 });
 renderBoard();
 show("boardScreen");
}

function renderBoard(){
 let html="";
 DATA.forEach((c,i)=>{
   html+=`<div class="card">${c.name}</div>`;
   c.qs.slice(0,3).forEach(q=>{
     html+=`<div class="card" onclick="openQ(${i})">100</div>`;
   });
 });
 document.getElementById("board").innerHTML=html;
}

window.openQ=function(i){
 let q=DATA[i].qs[Math.floor(Math.random()*DATA[i].qs.length)];
 window.current=q;
 document.getElementById("question").innerText=q.question;
 show("play");
}

window.showAnswer=function(){
 document.getElementById("answerText").innerText=current.answer;
 show("answer");
}

window.givePoint=function(){
 show("boardScreen");
}