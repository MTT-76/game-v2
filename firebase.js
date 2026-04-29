import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PUT_KEY_HERE",
  authDomain: "quiz-game-b8a2b.firebaseapp.com",
  projectId: "quiz-game-b8a2b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);