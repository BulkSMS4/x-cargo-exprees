// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLYDpP68NlfYGE1O9DafgrmFBUlgpoYeI",
  authDomain: "x-cargo-exprees.firebaseapp.com",
  databaseURL: "https://x-cargo-exprees-default-rtdb.firebaseio.com",
  projectId: "x-cargo-exprees",
  storageBucket: "x-cargo-exprees.firebasestorage.app",
  messagingSenderId: "1082201867958",
  appId: "1:1082201867958:web:d6600fbc82085b0b62c817",
  measurementId: "G-C3Y4PQC86V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };
