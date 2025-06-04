<script>
  function previewImage(input, previewId) {
    const preview = document.getElementById(previewId);
    const file = input.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        preview.innerHTML = `<img src="${reader.result}" style="max-width: 100%; max-height: 100px; border-radius: 6px;" />`;
      };
      reader.readAsDataURL(file);
    } else {
      preview.innerHTML = "NO IMAGE";
    }
  }

  const generateBtn = document.querySelector(".generate-button");
  generateBtn.addEventListener("click", () => {
    const allInputs = document.querySelectorAll("input[type='text'], input[type='color']");
    const formData = {};
    allInputs.forEach((input, i) => {
      formData[`field${i}`] = input.value;
    });

    // Get current form count
    const currentCount = parseInt(localStorage.getItem("formCount") || "0") + 1;
    localStorage.setItem("formCount", currentCount);

    // Save form
    localStorage.setItem(`form_${currentCount}`, JSON.stringify(formData));

    // Generate Link
    const generatedLink = `https://x-cargo-expree.com${currentCount}`;
    alert("Form saved! Link: " + generatedLink);

    // Optional: Show below button
    const linkDisplay = document.createElement("div");
    linkDisplay.style.marginTop = "20px";
    linkDisplay.innerHTML = `<strong>Form Link:</strong> <a href="#">${generatedLink}</a>`;
    document.querySelector(".container").appendChild(linkDisplay);
  });
</script>