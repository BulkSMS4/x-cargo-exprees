<!-- tracker.js -->
<script type="module">
  // Import Firebase modules
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
  import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-database.js";

  // ✅ Your Firebase config
  const firebaseConfig = {
    apiKey: "AIzaSyBLYDpP68NlfYGE1O9DafgrmFBUlgpoYeI",
    authDomain: "x-cargo-exprees.firebaseapp.com",
    databaseURL: "https://x-cargo-exprees-default-rtdb.firebaseio.com",
    projectId: "x-cargo-exprees",
    storageBucket: "x-cargo-exprees.appspot.com",
    messagingSenderId: "1082201867958",
    appId: "1:1082201867958:web:d6600fbc82085b0b62c817"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);

  // ✅ Function to track only real saved packages
  window.trackPackage = async function () {
    const trackingId = document.getElementById("trackingId").value.trim();
    const infoDiv = document.getElementById("trackingInfo");

    // Clear previous result
    infoDiv.innerHTML = "<p>🔍 Searching for package...</p>";

    if (!trackingId) {
      infoDiv.innerHTML = "<p style='color:red'>⚠ Please enter a tracking number.</p>";
      return;
    }

    try {
      // Get package details from Firebase Realtime Database
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `packages/${trackingId}`));

      if (snapshot.exists()) {
        const data = snapshot.val();

        // ✅ Display only the actual package you created
        infoDiv.innerHTML = `
          <div style="border:1px solid #ccc; padding:15px; border-radius:8px; background:#fafafa;">
            <h3>📦 Package Found</h3>
            <p><strong>Tracking ID:</strong> ${trackingId}</p>
            <p><strong>Sender:</strong> ${data.sender || 'N/A'}</p>
            <p><strong>Receiver:</strong> ${data.receiver || 'N/A'}</p>
            <p><strong>Status:</strong> ${data.status || 'Pending'}</p>
            <p><strong>Location:</strong> ${data.location || 'Not specified'}</p>
            <p><strong>Expected Date:</strong> ${data.expectedDate || 'Not available'}</p>
            ${data.packageImage ? `<img src="${data.packageImage}" alt="Package" width="200" style="margin-top:10px;border-radius:8px;">` : ''}
          </div>
        `;
      } else {
        infoDiv.innerHTML = "<p style='color:red'>❌ No package found with that tracking number.</p>";
      }
    } catch (error) {
      console.error("Firebase error:", error);
      infoDiv.innerHTML = "<p style='color:red'>⚠ Error connecting to database.</p>";
    }
  };
</script>
