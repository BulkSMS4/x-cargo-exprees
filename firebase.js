import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBDAsdkGgC_80d2Wzh6DCxi42BhDRmNyVM",
  authDomain: "x-cargo-express-delivery.firebaseapp.com",
  projectId: "x-cargo-express-delivery",
  storageBucket: "x-cargo-express-delivery.firebasestorage.app",
  messagingSenderId: "422452155765",
  appId: "1:422452155765:web:d94533f838cfef656baf3c",
  measurementId: "G-5893LBFSFK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth };
