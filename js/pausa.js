document.addEventListener("DOMContentLoaded", function () {
  const pauseButton = document.getElementById("pauseButton");
  const pauseBox = document.getElementById("pauseBox");
  const pauseTimerDisplay = document.getElementById("pauseTimer");
  const resumeButton = document.getElementById("resumeButton");
  const alarmContainer = document.querySelector(".alarm-container");

  let pauseInterval;
  let isPauseRunning = false;
  let isPausePaused = false;
  let pauseSeconds = 300; // 5 minutos

  pauseBox.style.display = "none";
  alarmContainer.style.display = "flex";

  function updatePauseDisplay() {
    const min = String(Math.floor(pauseSeconds / 60)).padStart(2, '0');
    const sec = String(pauseSeconds % 60).padStart(2, '0');
    pauseTimerDisplay.textContent = `${min}:${sec}`;
  }

  function startPauseTimer() {
    clearInterval(pauseInterval);

    pauseInterval = setInterval(() => {
      if (isPausePaused) return;

      if (pauseSeconds > 0) {
        pauseSeconds--;
        updatePauseDisplay();
      } else {
        stopPauseTimer();
      }
    }, 1000);
  }

  function stopPauseTimer() {
    clearInterval(pauseInterval);
    pauseBox.style.display = "none";
    alarmContainer.style.display = "flex";
    isPauseRunning = false;
    isPausePaused = false;
    pauseSeconds = 300;
    updatePauseDisplay();
    resumeButton.textContent = "Start";
    document.dispatchEvent(new Event("resumeMainTimer"));
  }

 

  resumeButton.addEventListener("click", function () {
    if (!isPauseRunning) return;

    if (isPausePaused) {
      isPausePaused = false;
      startPauseTimer();
      resumeButton.textContent = "Pausar";
    } else {
      isPausePaused = true;
      resumeButton.textContent = "Start";
    }
  });
});
