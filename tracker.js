import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  child
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLYDpP68NlfYGE1O9DafgrmFBUlgpoYeI",
  authDomain: "x-cargo-exprees.firebaseapp.com",
  databaseURL: "https://x-cargo-exprees-default-rtdb.firebaseio.com",
  projectId: "x-cargo-exprees",
  storageBucket: "x-cargo-exprees.appspot.com",
  messagingSenderId: "1082201867958",
  appId: "1:1082201867958:web:d6600fbc82085b0b62c817"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.trackPackage = async function () {

  const trackingId =
    document.getElementById("trackingId").value.trim();

  const infoDiv =
    document.getElementById("trackingInfo");

  if (!trackingId) {
    infoDiv.innerHTML =
      "<p style='color:red'>⚠ Please enter a tracking number.</p>";
    return;
  }

  infoDiv.innerHTML =
    "<p>🔍 Searching for package...</p>";

  try {

    const dbRef = ref(db);

    const snapshot = await get(
      child(dbRef, `packages/${trackingId}`)
    );

    if (!snapshot.exists()) {

      infoDiv.innerHTML =
        "<p style='color:red'>❌ No package found with that tracking number.</p>";

      return;
    }

    const data = snapshot.val();

    let imageHtml = "";

    if (data.imageURLs && data.imageURLs.length > 0) {
      imageHtml = `
        <img
          src="${data.imageURLs[0]}"
          style="
            width:250px;
            margin-top:15px;
            border-radius:10px;
          "
        >
      `;
    }

    infoDiv.innerHTML = `
      <div style="
        background:#fff;
        padding:20px;
        border-radius:10px;
        margin-top:20px;
        box-shadow:0 0 10px rgba(0,0,0,.1);
      ">

        <h2>📦 Package Found</h2>

        <p><strong>Tracking ID:</strong> ${data.trackingId || trackingId}</p>

        <p><strong>Sender:</strong> ${data.senderName || "N/A"}</p>

        <p><strong>Receiver:</strong> ${data.receiverName || "N/A"}</p>

        <p><strong>Status:</strong> ${data.status || "Pending"}</p>

        <p><strong>Location:</strong> ${data.receiverLocation || "Not specified"}</p>

        <p><strong>Expected Delivery:</strong> ${data.expectedDate || "N/A"}</p>

        <p><strong>Description:</strong> ${data.description || ""}</p>

        ${imageHtml}

      </div>
    `;

  } catch (error) {

    console.error(error);

    infoDiv.innerHTML =
      "<p style='color:red'>⚠ Error connecting to Firebase.</p>";
  }
};

const params = new URLSearchParams(window.location.search);

const tracking = params.get("tracking");

if (tracking) {

  document.getElementById("trackingId").value = tracking;

  setTimeout(() => {
    trackPackage();
  }, 500);

}
