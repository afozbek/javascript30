const timeNodes = document.querySelectorAll("[data-time]");

const totalSeconds = [...timeNodes]
    .map(node => node.dataset.time)
    .map(timeCode => {
        const [mins, seconds] = timeCode.split(":").map(parseFloat);
        return mins * 60 + seconds;
    })
    .reduce((totalSeconds, seconds) => totalSeconds + seconds, 0);

let secondLeft = totalSeconds;

const hours = Math.floor(totalSeconds / 3600);

secondLeft = secondLeft % 3600;
const minutes = Math.floor(secondLeft / 60);

secondLeft = secondLeft % 60;

console.log(hours + ":" + minutes + ":" + secondLeft);
