// Fetch tracking details from Firebase
async function trackPackage() {
  const trackingId = document.getElementById('trackingId').value.trim();
  const infoDiv = document.getElementById('trackingInfo');

  if (!trackingId) {
    infoDiv.innerHTML = "<p style='color:red'>Please enter a tracking number.</p>";
    return;
  }

  try {
    // Fetch data from Firebase Realtime Database
    const response = await fetch(
      `https://x-cargo-exprees-default-rtdb.firebaseio.com/packages/${trackingId}.json`
    );
    const data = await response.json();

    if (data) {
      infoDiv.innerHTML = `
        <h3>Tracking Details</h3>
        <p><strong>Package ID:</strong> ${trackingId}</p>
        <p><strong>Status:</strong> ${data.status || "In Transit"}</p>
        <p><strong>Location:</strong> ${data.location || "Unknown"}</p>
        <p><strong>Expected Delivery:</strong> ${data.deliveryDate || "Pending"}</p>
        ${data.image ? `<img src="${data.image}" alt="Package Image" width="100%">` : ""}
      `;
    } else {
      infoDiv.innerHTML = "<p style='color:red'>Tracking ID not found. Please check and try again.</p>";
    }
  } catch (error) {
    console.error(error);
    infoDiv.innerHTML = "<p style='color:red'>Error fetching tracking information.</p>";
  }
}
