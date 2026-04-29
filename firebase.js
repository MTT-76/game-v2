import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PUT_YOUR_KEY_HERE",
  authDomain: "quiz-game-b8a2b.firebaseapp.com",
  projectId: "quiz-game-b8a2b",
  storageBucket: "quiz-game-b8a2b.appspot.com",
  messagingSenderId: "798634430060",
  appId: "1:798634430060:web:73bf383f6da8592f4a1249"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);