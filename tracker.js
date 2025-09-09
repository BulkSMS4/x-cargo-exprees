import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLYDpP68NlfYGE1O9DafgrmFBUlgpoYeI",
  authDomain: "x-cargo-exprees.firebaseapp.com",
  databaseURL: "https://x-cargo-exprees-default-rtdb.firebaseio.com",
  projectId: "x-cargo-exprees",
  storageBucket: "x-cargo-exprees.appspot.com",
  messagingSenderId: "1082201867958",
  appId: "1:1082201867958:web:d6600fbc82085b0b62c817",
  measurementId: "G-C3Y4PQC86V"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.trackPackage = async function () {
  const trackingId = document.getElementById("trackingIdInput").value.trim();
  const trackingInfoDiv = document.getElementById("trackingInfo");

  if (!trackingId) {
    alert("Please enter a tracking ID.");
    return;
  }

  try {
    const snapshot = await get(child(ref(db), 'packages/' + trackingId));
    if (snapshot.exists()) {
      const data = snapshot.val();
      trackingInfoDiv.innerHTML = `
        <div class="tracking-card">
          <h2>📦 Tracking Details</h2>
          
          ${data.image ? `<img src="${data.image}" alt="Package Image" class="package-img"/>` : ''}

          <p><strong>Tracking ID:</strong> ${data.trackingId}</p>
          <p><strong>Description:</strong> ${data.description || 'N/A'}</p>
          <p><strong>Status:</strong> ${data.status || 'N/A'}</p>
          <p><strong>Location:</strong> ${data.location || 'N/A'}</p>
          <p><strong>Shipment Date:</strong> ${data.shipmentDate || 'N/A'}</p>
          <p><strong>Expected Delivery:</strong> ${data.expectedDate || 'N/A'}</p>
          ${data.feeWarning ? `<p class="warning"><strong>Note:</strong> A delivery fee may apply.</p>` : ''}
          <p><strong>Remarks:</strong> ${data.remark || 'N/A'}</p>
          <p><strong>Schedule:</strong> ${data.scheduleDelivery || 'N/A'}</p>

          ${data.video ? `<video controls width="100%"><source src="${data.video}" type="video/mp4"></video>` : ''}
        </div>
      `;
    } else {
      trackingInfoDiv.innerHTML = "<p class='error'>❌ No package found with that tracking ID.</p>";
    }
  } catch (error) {
    console.error(error);
    trackingInfoDiv.innerHTML = "<p class='error'>⚠️ Error retrieving package data. Please try again.</p>";
  }
};
