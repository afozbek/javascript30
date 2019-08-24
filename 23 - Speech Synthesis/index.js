const msg = new SpeechSynthesisUtterance();
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector("#speak");
const stopButton = document.querySelector("#stop");

let voices = [];
msg.text = document.querySelector("[name='text']").value;

function populateVoices() {
    voices = this.getVoices();

    voicesDropdown.innerHTML = voices
        .filter(voice => voice.lang.includes("en")) // filtering english voices
        .map(
            voice =>
                `<option value="${voice.name}">${voice.name}(${voice.lang})</option>`
        )
        .join("");
}

function setVoice() {
    msg.voice = voices.find(voice => voice.name === this.value);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) {
        speechSynthesis.speak(msg);
    }
}

function setOption(e) {
    msg[this.name] = this.value;
    toggle();
}

function speak(e) {
    speechSynthesis.speak(msg);
}

function stop(e) {
    speechSynthesis.pause();
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
voicesDropdown.addEventListener("change", setVoice);
options.forEach(option => option.addEventListener("change", setOption));

speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));
