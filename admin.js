import { db } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

window.addQ=async()=>{
 await addDoc(collection(db,"questions"),{
  category:cat.value,
  difficulty:d.value,
  question:q.value,
  answer:a.value
 });
 alert("تم");
}
