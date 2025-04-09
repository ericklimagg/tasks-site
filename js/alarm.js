document.addEventListener("DOMContentLoaded", function () {
    let timerInterval;
    let isRunning = false;
    let isPaused = false;
    let currentSeconds = 1500;
    let currentMode = "pomodoro";
    let completedPomodoros = 0;

    // Áudio de alarme configurado com caminho relativo
    const alarmSound = new Audio("js/alarme.mp3"); // certifique-se de que esse caminho está certo

    // Função que executa o som de alarme
    function playAlarm() {
        alarmSound.currentTime = 0; // Reinicia o áudio
        alarmSound.load(); // Garante pré-carregamento
        alarmSound.play().catch(error => {
            console.warn("Falha ao reproduzir o alarme (possivelmente por falta de interação do usuário):", error);
        });
    }

    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const startPauseBtn = document.getElementById("startPauseBtn");
    const shortBreakBtn = document.getElementById("shortBreakBtn");
    const longBreakBtn = document.getElementById("longBreakBtn");
    const setPomodoroButton = document.getElementById("setPomodoro");

    const pomodoroInput = document.getElementById("pomodoroTime");
    const shortBreakInput = document.getElementById("shortBreakTime");
    const longBreakInput = document.getElementById("longBreakTime");

    function updateDisplay(seconds) {
        const min = String(Math.floor(seconds / 60)).padStart(2, '0');
        const sec = String(seconds % 60).padStart(2, '0');
        minutesDisplay.textContent = min;
        secondsDisplay.textContent = sec;
    }

    function startTimer() {
        clearInterval(timerInterval);
        timerInterval = setInterval(() => {
            if (isPaused) return;

            if (currentSeconds > 0) {
                currentSeconds--;
                updateDisplay(currentSeconds);
            } else {
                clearInterval(timerInterval);
                isRunning = false;
                startPauseBtn.textContent = "Start";

                // Toca o som de alarme ao finalizar o tempo
                playAlarm();

                // Alterna entre modos: pomodoro → pausa, pausa → pomodoro
                if (currentMode === "pomodoro") {
                    completedPomodoros++;
                    if (completedPomodoros % 4 === 0) {
                        switchToLongBreak();
                    } else {
                        switchToShortBreak();
                    }
                } else if (currentMode === "shortBreak" || currentMode === "longBreak") {
                    switchToPomodoro();
                }
            }
        }, 1000);
    }

    function switchToPomodoro() {
        const pomodoroMin = parseInt(pomodoroInput.value) || 25;
        currentSeconds = pomodoroMin * 60;
        updateDisplay(currentSeconds);
        currentMode = "pomodoro";
    }

    function switchToShortBreak() {
        const shortBreakMin = parseInt(shortBreakInput.value) || 5;
        currentSeconds = shortBreakMin * 60;
        updateDisplay(currentSeconds);
        currentMode = "shortBreak";
    }

    function switchToLongBreak() {
        const longBreakMin = parseInt(longBreakInput.value) || 15;
        currentSeconds = longBreakMin * 60;
        updateDisplay(currentSeconds);
        currentMode = "longBreak";
    }

    startPauseBtn.addEventListener("click", () => {
        if (!isRunning) {
            startTimer();
            isRunning = true;
            isPaused = false;
            startPauseBtn.textContent = "Pausar";
    
            // 🔇 Para o alarme se ele estiver tocando
            alarmSound.pause();
            alarmSound.currentTime = 0;
        } else if (!isPaused) {
            isPaused = true;
            startPauseBtn.textContent = "Retomar";
        } else {
            isPaused = false;
            startPauseBtn.textContent = "Pausar";
        }
    });    

    shortBreakBtn.addEventListener("click", () => {
        clearInterval(timerInterval);
        switchToShortBreak();
        isRunning = false;
        isPaused = false;
        startPauseBtn.textContent = "Start";
    });

    longBreakBtn.addEventListener("click", () => {
        clearInterval(timerInterval);
        switchToLongBreak();
        isRunning = false;
        isPaused = false;
        startPauseBtn.textContent = "Start";
    });

    setPomodoroButton.addEventListener("click", function () {
        clearInterval(timerInterval);
        switchToPomodoro();
        isRunning = false;
        isPaused = false;
        startPauseBtn.textContent = "Start";
    });

    pomodoroInput.addEventListener("input", () => {
        if (!isRunning && currentMode === "pomodoro") {
            switchToPomodoro();
        }
    });

    shortBreakInput.addEventListener("input", () => {
        if (!isRunning && currentMode === "shortBreak") {
            switchToShortBreak();
        }
    });

    longBreakInput.addEventListener("input", () => {
        if (!isRunning && currentMode === "longBreak") {
            switchToLongBreak();
        }
    });

    document.addEventListener("pauseMainTimer", function () {
        isPaused = true;
    });

    document.addEventListener("resumeMainTimer", function () {
        isPaused = false;
    });

    document.addEventListener("resetToPomodoro", function () {
        clearInterval(timerInterval);
        switchToPomodoro();
        isRunning = false;
        isPaused = false;
        startPauseBtn.textContent = "Start";
    });

    // Define o tempo inicial com base no que está exibido
    currentSeconds = parseInt(minutesDisplay.textContent) * 60 + parseInt(secondsDisplay.textContent);
    updateDisplay(currentSeconds);
});
