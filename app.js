let DATA = { categories: [] };

let team1="", team2="";
let scores=[0,0];
let turn=0;

let currentQuestion=null;
let currentPoints=0;

let time=0;
let running=true;
let interval;

// تحميل البيانات من Firebase
window.onload = async function(){

  try{
    const querySnapshot = await getDocs(collection(db, "categories"));

    DATA.categories = [];

    querySnapshot.forEach((doc) => {
      DATA.categories.push(doc.data());
    });

    console.log("تم التحميل:", DATA);

    renderBoard();

  }catch(e){
    console.error("خطأ:", e);
    alert("تأكد أنك أضفت البيانات في Firebase");
  }

};

function show(id){
  document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function startGame(){
  team1=document.getElementById("team1").value || "فريق 1";
  team2=document.getElementById("team2").value || "فريق 2";

  show("board");
}

function renderBoard(){
  let html="";

  DATA.categories.forEach((cat,ci)=>{
    html+=`<div class="card">${cat.name}</div>`;

    ["easy","medium","hard"].forEach(level=>{
      let p=level==="easy"?200:level==="medium"?400:600;
      html+=`<div class="card" onclick="openQ(${ci},'${level}')">${p}</div>`;
    });
  });

  document.getElementById("board").innerHTML=html;
}

function openQ(ci,level){
  let list=DATA.categories[ci].questions[level];
  let q=list[Math.floor(Math.random()*list.length)];

  currentQuestion=q;
  currentPoints=level==="easy"?200:level==="medium"?400:600;

  document.getElementById("question").innerText=q.q;

  startTimer();
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
  document.getElementById("time").innerText=time;
}

function showAnswer(){
  clearInterval(interval);

  document.getElementById("answerText").innerText=currentQuestion.a;
  show("answer");
}

function givePoint(team){
  if(team===1) scores[0]+=currentPoints;
  if(team===2) scores[1]+=currentPoints;

  show("board");
}
