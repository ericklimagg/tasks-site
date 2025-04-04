document.addEventListener("DOMContentLoaded", function () {
    const pauseButton = document.getElementById("pauseButton");
    const pauseBox = document.getElementById("pauseBox");
    const pauseTimerDisplay = document.getElementById("pauseTimer");
    const resumeButton = document.getElementById("resumeButton");
    const alarmContainer = document.querySelector(".alarm-container");
  
    let pauseInterval;
    let isPauseRunning = false;
  
    pauseBox.style.display = "none";
    alarmContainer.style.display = "flex";
  
    function stopPauseTimer() {
      clearInterval(pauseInterval);
      pauseBox.style.display = "none";
      alarmContainer.style.display = "flex";
      isPauseRunning = false;
      document.dispatchEvent(new Event("resumeMainTimer"));
    }
  
    pauseButton.addEventListener("click", function () {
      if (isPauseRunning) return;
  
      isPauseRunning = true;
      pauseBox.style.display = "flex";
      alarmContainer.style.display = "none";
  
      document.dispatchEvent(new Event("pauseMainTimer"));
  
      let minutes = 5;
      let seconds = 0;
      pauseTimerDisplay.textContent = "05:00";
  
      pauseInterval = setInterval(() => {
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else {
          stopPauseTimer(); 
          return;
        }
  
        pauseTimerDisplay.textContent =
          minutes.toString().padStart(2, "0") + ":" +
          seconds.toString().padStart(2, "0");
      }, 1000);
    });
  
    resumeButton.addEventListener("click", stopPauseTimer);
  });
  
