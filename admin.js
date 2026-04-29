import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.addQ=async function(){
 let category=document.getElementById("cat").value;
 let difficulty=document.getElementById("level").value;
 let question=document.getElementById("q").value;
 let answer=document.getElementById("a").value;

 await addDoc(collection(db,"questions"),{
   category,
   difficulty,
   question,
   answer
 });

 alert("تمت الإضافة");
}