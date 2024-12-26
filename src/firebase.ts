import { initializeApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcYh600MieLWv32dB_o1rKTrmmN_G6IAw",
  authDomain: "twitter-meme-ai.firebaseapp.com",
  projectId: "twitter-meme-ai",
  storageBucket: "twitter-meme-ai.firebasestorage.app",
  messagingSenderId: "728871373877",
  appId: "1:728871373877:web:a393bfe8e356a81c5eb57c",
};

// Initialize Firebase only in the browser
let db: Firestore | undefined; // Explicitly type db as Firestore or undefined
if (typeof window !== "undefined") {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app); // Initialize Firestore
}

export { db };
