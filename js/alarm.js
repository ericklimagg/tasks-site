document.addEventListener("DOMContentLoaded", function () {
    let alarmInterval;
    let isRunning = false;

    const minutesDisplay = document.getElementById("minutes");
    const secondsDisplay = document.getElementById("seconds");
    const toggleAlarmButton = document.getElementById("toggleAlarmButton");

    function changeTime(unit, increment, max) {
        let value = parseInt(unit.textContent);
        value = (value + increment + max) % max;
        unit.textContent = value.toString().padStart(2, "0");
    }

    document.querySelectorAll(".arrow-up").forEach((btn) => {
        btn.addEventListener("click", function () {
            if (this.nextElementSibling.id === "minutes") {
                changeTime(this.nextElementSibling, 1, 60);
            } else {
                changeTime(this.nextElementSibling, 1, 60);
            }
        });
    });

    document.querySelectorAll(".arrow-down").forEach((btn) => {
        btn.addEventListener("click", function () {
            if (this.previousElementSibling.id === "minutes") {
                changeTime(this.previousElementSibling, -1, 60);
            } else {
                changeTime(this.previousElementSibling, -1, 60);
            }
        });
    });

    toggleAlarmButton.addEventListener("click", function () {
        if (isRunning) {
            clearInterval(alarmInterval);
            isRunning = false;
            toggleAlarmButton.textContent = "Ativar Alarme";
            toggleAlarmButton.classList.remove("running");
            return;
        }

        isRunning = true;
        toggleAlarmButton.textContent = "Parar";
        toggleAlarmButton.classList.add("running");

        let minutes = parseInt(minutesDisplay.textContent);
        let seconds = parseInt(secondsDisplay.textContent);

        alarmInterval = setInterval(() => {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59;
            } else {
                clearInterval(alarmInterval);
                isRunning = false;
                toggleAlarmButton.textContent = "Ativar Alarme";
                toggleAlarmButton.classList.remove("running");
                return;
            }

            minutesDisplay.textContent = minutes.toString().padStart(2, "0");
            secondsDisplay.textContent = seconds.toString().padStart(2, "0");
        }, 1000);
    });
});
