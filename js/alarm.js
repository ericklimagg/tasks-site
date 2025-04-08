// Aguarda o carregamento do DOM para iniciar o script
document.addEventListener("DOMContentLoaded", function () {
    // Variáveis de controle do cronômetro
    let alarmInterval;
    let isRunning = false; // Indica se o alarme está ativo
    let isPaused = false;  // Indica se está em pausa (modo Pomodoro)

    // Seleção dos elementos de exibição do tempo e botão de controle
    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const toggleAlarmButton = document.getElementById("toggleAlarmButton");

    // Função para alterar o tempo (minutos ou segundos)
    function changeTime(unit, increment, max) {
        let value = parseInt(unit.textContent);
        // Garante que o valor fique entre 0 e (max - 1)
        value = (value + increment + max) % max;
        unit.textContent = value.toString().padStart(2, "0");
    }

    // Adiciona eventos para os botões de aumentar tempo (setas para cima)
    document.querySelectorAll(".arrow-up").forEach((btn) => {
        btn.addEventListener("click", function () {
            if (this.nextElementSibling.id === "minutes") {
                changeTime(this.nextElementSibling, 1, 60);
            } else {
                changeTime(this.nextElementSibling, 1, 60);
            }
        });
    });

    // Adiciona eventos para os botões de diminuir tempo (setas para baixo)
    document.querySelectorAll(".arrow-down").forEach((btn) => {
        btn.addEventListener("click", function () {
            if (this.previousElementSibling.id === "minutes") {
                changeTime(this.previousElementSibling, -1, 60);
            } else {
                changeTime(this.previousElementSibling, -1, 60);
            }
        });
    });

    // Botão que ativa ou para o alarme (cronômetro)
    toggleAlarmButton.addEventListener("click", function () {
        // Se já estiver rodando, para o cronômetro
        if (isRunning) {
            clearInterval(alarmInterval);
            isRunning = false;
            toggleAlarmButton.textContent = "Ativar Alarme";
            toggleAlarmButton.classList.remove("running");
            return;
        }

        // Inicia o cronômetro
        isRunning = true;
        toggleAlarmButton.textContent = "Parar";
        toggleAlarmButton.classList.add("running");

        // Captura o tempo inicial a partir da tela
        let minutes = parseInt(minutesDisplay.textContent);
        let seconds = parseInt(secondsDisplay.textContent);

        // Inicia a contagem regressiva
        alarmInterval = setInterval(() => {
            if (isPaused) return; // Pausa temporária (ex: modo Pomodoro)

            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                // Tempo finalizado: limpa intervalo e reseta botão
                clearInterval(alarmInterval);
                isRunning = false;
                toggleAlarmButton.textContent = "Ativar Alarme";
                toggleAlarmButton.classList.remove("running");
                return;
            }

            // Atualiza o display de minutos e segundos
            minutesDisplay.textContent = minutes.toString().padStart(2, "0");
            secondsDisplay.textContent = seconds.toString().padStart(2, "0");
        }, 1000);
    });

    // Evento disparado para pausar o cronômetro (vindo de outro script)
    document.addEventListener("pauseMainTimer", function () {
        isPaused = true;
    });

    // Evento disparado para retomar o cronômetro (vindo de outro script)
    document.addEventListener("resumeMainTimer", function () {
        isPaused = false;
    });
});
