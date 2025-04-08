// Aguarda o carregamento completo do DOM antes de executar o script
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona os elementos do DOM relacionados à pausa e cronômetro principal
  const pauseButton = document.getElementById("pauseButton");
  const pauseBox = document.getElementById("pauseBox");
  const pauseTimerDisplay = document.getElementById("pauseTimer");
  const resumeButton = document.getElementById("resumeButton");
  const alarmContainer = document.querySelector(".alarm-container");

  // Variáveis de controle do estado da pausa
  let pauseInterval;
  let isPauseRunning = false;

  // Define visibilidade inicial: cronômetro visível, box de pausa escondido
  pauseBox.style.display = "none";
  alarmContainer.style.display = "flex";

  // Função para encerrar o cronômetro de pausa e retornar ao cronômetro principal
  function stopPauseTimer() {
    clearInterval(pauseInterval); // Interrompe o intervalo
    pauseBox.style.display = "none"; // Esconde o box de pausa
    alarmContainer.style.display = "flex"; // Mostra o cronômetro principal
    isPauseRunning = false; // Marca que a pausa terminou
    document.dispatchEvent(new Event("resumeMainTimer")); // Dispara evento para retomar o cronômetro principal
  }

  // Evento de clique no botão de pausa
  pauseButton.addEventListener("click", function () {
    if (isPauseRunning) return; // Evita múltiplas pausas simultâneas

    isPauseRunning = true;
    pauseBox.style.display = "flex"; // Mostra o box de pausa
    alarmContainer.style.display = "none"; // Esconde o cronômetro principal

    document.dispatchEvent(new Event("pauseMainTimer")); // Dispara evento para pausar o cronômetro principal

    // Inicia contagem regressiva de 5 minutos
    let minutes = 5;
    let seconds = 0;
    pauseTimerDisplay.textContent = "05:00";

    // Inicia o intervalo que atualiza o cronômetro da pausa a cada segundo
    pauseInterval = setInterval(() => {
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else {
        stopPauseTimer(); // Tempo esgotado, finaliza a pausa
        return;
      }

      // Atualiza o texto do cronômetro no formato MM:SS
      pauseTimerDisplay.textContent =
        minutes.toString().padStart(2, "0") + ":" +
        seconds.toString().padStart(2, "0");
    }, 1000);
  });

  // Evento de clique no botão "Voltar ao Cronômetro"
  resumeButton.addEventListener("click", stopPauseTimer);
});
