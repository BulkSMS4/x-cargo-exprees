<!-- tracker.js -->
<script type="module">
  // Import Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

  // ✅ Your Firebase config (replace with your real values)
  const firebaseConfig = {
  apiKey: "AIzaSyBLYDpP68NlfYGE1O9DafgrmFBUlgpoYeI",
  authDomain: "x-cargo-exprees.firebaseapp.com",
  databaseURL: "https://x-cargo-exprees-default-rtdb.firebaseio.com",  // <-- ADD THIS
  projectId: "x-cargo-exprees",
  storageBucket: "x-cargo-exprees.appspot.com",
  messagingSenderId: "1082201867958",
  appId: "1:1082201867958:web:d6600fbc82085b0b62c817"
};

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // Track package function
  window.trackPackage = async function () {
    const trackingId = document.getElementById("trackingId").value.trim();
    const infoDiv = document.getElementById("trackingInfo");
    infoDiv.innerHTML = "<p>Searching for package...</p>";

    if (!trackingId) {
      infoDiv.innerHTML = "<p style='color:red'>⚠ Please enter a tracking number.</p>";
      return;
    }

    try {
      const snapshot = await get(child(ref(db), "packages/" + trackingId));
      if (snapshot.exists()) {
        const data = snapshot.val();
        infoDiv.innerHTML = `
          <h3>📦 Package Details</h3>
          <p><strong>Tracking ID:</strong> ${data.trackingId}</p>
          <p><strong>Sender:</strong> ${data.sender}</p>
          <p><strong>Receiver:</strong> ${data.receiver}</p>
          <p><strong>Status:</strong> ${data.status}</p>
          <p><strong>Location:</strong> ${data.location}</p>
          <p><strong>Expected Date:</strong> ${data.expectedDate}</p>
          <p><strong>Suspended:</strong> ${data.isSuspended ? "Yes" : "No"}</p>
          ${data.packageImage ? `<p><img src="${data.packageImage}" alt="Package Image" width="250"></p>` : ""}
          ${data.logoImage ? `<p><img src="${data.logoImage}" alt="Company Logo" width="150"></p>` : ""}
        `;
      } else {
        infoDiv.innerHTML = "<p style='color:red'>❌ No package found with that tracking number.</p>";
      }
    } catch (error) {
      console.error(error);
      infoDiv.innerHTML = "<p style='color:red'>⚠ Error fetching package details. Check console.</p>";
    }
  };
</script>
