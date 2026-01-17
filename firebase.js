// firebase.js
// Firebase v10 Modular SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase configuration (your project keys)
const firebaseConfig = {
  apiKey: "AIzaSyDw9pPppOPgRx36fJ9RHacdCeenPdhcHEs",
  authDomain: "codealpha-ecommerce-4ae8f.firebaseapp.com",
  projectId: "codealpha-ecommerce-4ae8f",
  storageBucket: "codealpha-ecommerce-4ae8f.appspot.com",
  messagingSenderId: "255596839340",
  appId: "1:255596839340:web:80bb1b9e77e5f02a477a09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Auth and Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
