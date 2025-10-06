document.addEventListener('DOMContentLoaded', () => {
    let timer; 
    let isRunning = false;
    let timeLeft = 25 * 60; 
    let sessionTime = 25;
    let breakTime = 5;

    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const statusDisplay = document.getElementById('status');
    const sessionTimeDisplay = document.getElementById('session-time');
    const breakTimeDisplay = document.getElementById('break-time');

    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const sessionIncreaseButton = document.getElementById('session-increase');
    const sessionDecreaseButton = document.getElementById('session-decrease');
    const breakIncreaseButton = document.getElementById('break-increase');
    const breakDecreaseButton = document.getElementById('break-decrease');

    const pomodoroAlarm = new Audio('./assets/pomodoroalarm.mp3');
    const breakAlarm = new Audio('./assets/breakalarm.mp3');

    startButton.addEventListener('click', () => {
        if (!isRunning) {
            isRunning = true;
            statusDisplay.textContent = 'Focus Time';
            timer = setInterval(updateTimer, 1000);
        }
    });

    pauseButton.addEventListener('click', () => {
        if (isRunning) {
            isRunning = false;
            clearInterval(timer);
        }
    });

    resetButton.addEventListener('click', () => {
        isRunning = false;
        clearInterval(timer);
        timeLeft = sessionTime * 60;
        updateDisplay();
        statusDisplay.textContent = 'Focus Time';
    });

    sessionIncreaseButton.addEventListener('click', () => {
        sessionTime++;
        sessionTimeDisplay.textContent = `${sessionTime} min`;
        timeLeft = sessionTime * 60;
        updateDisplay();
    });

    sessionDecreaseButton.addEventListener('click', () => {
        if (sessionTime > 1) {
            sessionTime--;
            sessionTimeDisplay.textContent = `${sessionTime} min`;
            timeLeft = sessionTime * 60;
            updateDisplay();
        }
    });

    breakIncreaseButton.addEventListener('click', () => {
        breakTime++;
        breakTimeDisplay.textContent = `${breakTime} min`;
    });

    breakDecreaseButton.addEventListener('click', () => {
        if (breakTime > 1) {
            breakTime--;
            breakTimeDisplay.textContent = `${breakTime} min`;
        }
    });

    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timer);
            isRunning = false;

            if (statusDisplay.textContent === 'Focus Time') {
                pomodoroAlarm.play();
                statusDisplay.textContent = 'Break Time!';
                timeLeft = breakTime * 60;
                isRunning = true;
                timer = setInterval(updateTimer, 1000);
            } else {
                breakAlarm.play();
                statusDisplay.textContent = 'Focus Time!';
                timeLeft = sessionTime * 60;
                isRunning = true;
                timer = setInterval(updateTimer, 1000);
            }

            updateDisplay();
        }
    }

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        minutesDisplay.textContent = String(minutes).padStart(2, '0');
        secondsDisplay.textContent = String(seconds).padStart(2, '0');
    }
});