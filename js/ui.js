document.addEventListener("DOMContentLoaded", () => {
  // Modal de configurações
  const openSettingsBtn = document.getElementById("openSettingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const closeModalSettingsButton = document.getElementById("closeModalSettingsButton");
  const saveSettingsButton = document.getElementById("saveSettingsButton");
  const menuIcon = document.getElementById("img_menu");

  if (openSettingsBtn && settingsModal) {
    openSettingsBtn.addEventListener("click", () => {
      settingsModal.style.display = "block";
    });
  }

  if (menuIcon && settingsModal) {
    menuIcon.addEventListener("click", () => {
      settingsModal.style.display = "block";
    });
  }

  if (closeModalSettingsButton && settingsModal) {
    closeModalSettingsButton.addEventListener("click", () => {
      settingsModal.style.display = "none";
    });
  }

  if (saveSettingsButton && settingsModal) {
    saveSettingsButton.addEventListener("click", () => {
      settingsModal.style.display = "none";
    });
  }

  // Removido o event listener do botão novaTaskButton para evitar conflito com newtask.js

  // Arrows para mudar manualmente o tempo
  function alterarTempo(id, incremento) {
    const el = document.getElementById(id);
    let valor = parseInt(el.innerText, 10);
    valor = (valor + incremento + 60) % 60;
    el.innerText = valor.toString().padStart(2, '0');

    // Resetar botão e estado ao mudar o tempo
    const startPauseBtn = document.getElementById("startPauseBtn");
    if (startPauseBtn) startPauseBtn.textContent = "Start";

    // Resetar modo para Pomodoro (via evento customizado, se desejar)
    document.dispatchEvent(new CustomEvent("resetToPomodoro"));
  }

  document.querySelectorAll(".arrow-up").forEach(arrow => {
    arrow.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      const id = parent.querySelector("span").id;
      alterarTempo(id, 1);
    });
  });

  document.querySelectorAll(".arrow-down").forEach(arrow => {
    arrow.addEventListener("click", (e) => {
      const parent = e.target.parentElement;
      const id = parent.querySelector("span").id;
      alterarTempo(id, -1);
    });
  });
});