let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll("[data-time]");

function timer(seconds) {
    clearInterval(countdown); // Clearing previous timer

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        console.log("TCL: countdown -> secondsLeft", secondsLeft);

        if (secondsLeft < 0) {
            clearInterval(countdown);
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remSeconds = seconds % 60;

    let minuteContent = `${minutes < 10 ? "0" : ""}${minutes}`;
    let secondContent = `${remSeconds < 10 ? "0" : ""}${remSeconds}`;

    let displayContent = `${minuteContent}:${secondContent}`;

    document.title = displayContent;
    timerDisplay.textContent = displayContent;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    let minuteContent = `${minutes < 10 ? "0" : ""}${minutes}`;

    endTime.textContent = `Be Back at ${hour}:${minuteContent}`;
}

function startTimer(e) {
    timer(this.dataset.time);
}

buttons.forEach(button => button.addEventListener("click", startTimer));
document.customForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const seconds = this.minutes.value * 60;

    timer(seconds);

    this.reset();
});
