/* =========================
   CONFIGURAÇÃO PRINCIPAL
========================= */

// 🔗 LINK FIXO DO CARTÃO DIGITAL (ALTERE AQUI)
const cardURL = "https://instagram.com/lar_das_ondas";

/* =========================
   ELEMENTOS
========================= */
const body = document.body;
const themeToggle = document.getElementById("themeToggle");

const shareBtn = document.getElementById("shareBtn");
const shareModal = document.getElementById("shareModal");
const closeShare = document.getElementById("closeShare");

const copyLinkBtn = document.getElementById("copyLinkBtn");
const shareLinkBtn = document.getElementById("shareLinkBtn");

const qrContainer = document.getElementById("qrcode");

/* =========================
   TEMA (DARK / LIGHT)
========================= */
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  body.className = savedTheme;
  themeToggle.textContent = savedTheme === "dark" ? "🌙" : "☀️";
} else {
  body.classList.add("dark");
  themeToggle.textContent = "🌙";
}

themeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  body.classList.toggle("light");

  const currentTheme = body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", currentTheme);

  themeToggle.textContent = currentTheme === "dark" ? "🌙" : "☀️";
});

/* =========================
   MODAL COMPARTILHAR
========================= */
shareBtn.addEventListener("click", () => {
  shareModal.style.display = "flex";
  generateQRCode();
});

closeShare.addEventListener("click", () => {
  shareModal.style.display = "none";
});

shareModal.addEventListener("click", (e) => {
  if (e.target === shareModal) {
    shareModal.style.display = "none";
  }
});

/* =========================
   QR CODE
========================= */
function generateQRCode() {
  qrContainer.innerHTML = "";

  const qr = new QRCode(qrContainer, {
    text: cardURL,
    width: 180,
    height: 180,
    colorDark: "#1fb6ff",
    colorLight: "#ffffff",
    correctLevel: QRCode.CorrectLevel.H
  });
}

/* =========================
   COPIAR LINK
========================= */
copyLinkBtn.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(cardURL);
    copyLinkBtn.textContent = "✅ Link copiado!";
    setTimeout(() => {
      copyLinkBtn.textContent = "📋 Copiar link";
    }, 2000);
  } catch {
    alert("Não foi possível copiar o link.");
  }
});

/* =========================
   COMPARTILHAMENTO NATIVO
========================= */
shareLinkBtn.addEventListener("click", async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: document.title,
        text: "Confira esta casa de veraneio incrível!",
        url: cardURL
      });
    } catch {
      console.log("Compartilhamento cancelado");
    }
  } else {
    alert("Compartilhamento não suportado neste dispositivo.");
  }
});

/* =========================
   ESTILO TEMA LIGHT (INJETADO)
========================= */
const lightStyle = document.createElement("style");
lightStyle.innerHTML = `
body.light {
  background: linear-gradient(180deg, #f2f6f9, #e3edf5);
  color: #0b1f2a;
}

body.light .card {
  background: #ffffff;
  box-shadow: 0 0 30px rgba(0,0,0,0.12);
}

body.light .subtitle,
body.light .features li,
body.light .footer {
  color: #4a6a7d;
}

body.light .btn.secondary {
  color: #b88a2e;
  border-color: #e6c67a;
}

body.light .share-content {
  background: #ffffff;
}
`;
document.head.appendChild(lightStyle);
