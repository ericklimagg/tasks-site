document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("settingsModal");
  const openBtn = document.getElementById("openSettingsButton");
  const closeBtn = document.getElementById("closeSettingsButton");
  const saveBtn = document.getElementById("saveSettingsButton");
  const cancelBtn = document.getElementById("closeModalSettingsButton");

  const pomodoroInput = document.getElementById("pomodoroTime");
  const shortBreakInput = document.getElementById("shortBreakTime");
  const longBreakInput = document.getElementById("longBreakTime");
  const pomodorosUntilLongBreakInput = document.getElementById("pomodorosUntilLongBreak");

  const min = document.getElementById("minutes");
  const sec = document.getElementById("seconds");

  let prevSettings = {};
  let prevTimer = { minutes: "25", seconds: "00" };

  // Carrega configurações salvas
  const settings = JSON.parse(localStorage.getItem("pomodoroSettings")) || {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    pomodorosBeforeLongBreak: 4,
  };

  function loadSettingsIntoInputs(s) {
    pomodoroInput.value = s.pomodoro;
    shortBreakInput.value = s.shortBreak;
    longBreakInput.value = s.longBreak;
    pomodorosUntilLongBreakInput.value = s.pomodorosBeforeLongBreak;
  }

  loadSettingsIntoInputs(settings);

  if (openBtn && modal) {
    openBtn.onclick = () => {
      // Salva os valores dos inputs E do timer da tela
      prevSettings = {
        pomodoro: pomodoroInput.value,
        shortBreak: shortBreakInput.value,
        longBreak: longBreakInput.value,
        pomodorosBeforeLongBreak: pomodorosUntilLongBreakInput.value,
      };

      prevTimer = {
        minutes: min?.innerText || "25",
        seconds: sec?.innerText || "00",
      };

      modal.style.display = "block";
    };
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      // Restaura os valores anteriores dos inputs
      pomodoroInput.value = prevSettings.pomodoro;
      shortBreakInput.value = prevSettings.shortBreak;
      longBreakInput.value = prevSettings.longBreak;
      pomodorosUntilLongBreakInput.value = prevSettings.pomodorosBeforeLongBreak;

      // Restaura o tempo da tela
      if (min) min.innerText = prevTimer.minutes;
      if (sec) sec.innerText = prevTimer.seconds;

      modal.style.display = "none";
    });
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      const newSettings = {
        pomodoro: parseInt(pomodoroInput.value),
        shortBreak: parseInt(shortBreakInput.value),
        longBreak: parseInt(longBreakInput.value),
        pomodorosBeforeLongBreak: parseInt(pomodorosUntilLongBreakInput.value),
      };

      localStorage.setItem("pomodoroSettings", JSON.stringify(newSettings));
      alert("Configurações salvas!");
      modal.style.display = "none";

      // Atualiza o tempo da tela com o novo tempo de pomodoro
      if (min) min.innerText = String(newSettings.pomodoro).padStart(2, "0");
      if (sec) sec.innerText = "00";
    };
  }

  window.onclick = function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
});
