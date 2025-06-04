document.querySelector(".generate-button").addEventListener("click", () => {
  const templateData = {
    logoSize: document.getElementById("logoSize").value,
    bannerSize: document.getElementById("bannerSize").value,
    templateName: document.getElementById("templateName").value || "Untitled Template",
    bodyColor: document.getElementById("bodyColor").value,
    buttonColor: document.getElementById("buttonColor").value,
    textColor: document.getElementById("textColor").value,
    description: document.getElementById("description").value,
    emailContent: document.getElementById("emailContent").value,
    emailLabel: document.getElementById("emailLabel").value,
    passwordContent: document.getElementById("passwordContent").value,
    passwordLabel: document.getElementById("passwordLabel").value,
    buttonContent: document.getElementById("buttonContent").value,
    buttonWidth: document.getElementById("buttonWidth").value
  };

  let count = parseInt(localStorage.getItem("templateCount") || "0") + 1;
  localStorage.setItem("templateCount", count.toString());

  // Save the form data
  localStorage.setItem(`template_${count}`, JSON.stringify(templateData));

  // Save in the sidebar list
  const sidebarTemplates = JSON.parse(localStorage.getItem("sidebarTemplates") || "[]");
  sidebarTemplates.push({ id: count, name: templateData.templateName });
  localStorage.setItem("sidebarTemplates", JSON.stringify(sidebarTemplates));

  // Optional: redirect or notify
  alert(`Template generated!\nIt will appear in your Dashboard.\nLink: form-template.html?id=${count}`);
});
