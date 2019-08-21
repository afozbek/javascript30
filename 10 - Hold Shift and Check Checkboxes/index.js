let checkboxes = document.querySelectorAll('.inbox input[type="checkbox"]');
let isKeyPressed = false;
let lastCheckedId = 1;

function keyPressEventHandler(e) {
    if (e.key !== "Shift") return;
    isKeyPressed = true;
}

function keyUpEventHandler(e) {
    if (e.key !== "Shift") return;
    isKeyPressed = false;
}

window.addEventListener("keydown", keyPressEventHandler);
window.addEventListener("keyup", keyUpEventHandler);

const betweenRate = (num1, num2) => {
    if (num1 > num2) {
        return [num2, num1];
    }
    return [num1, num2];
};

function checkBoxChangeHandler(e) {
    if (isKeyPressed) {
        const [smallIndex, lastIndex] = betweenRate(lastCheckedId, this.id);

        checkboxes.forEach(check => {
            if (smallIndex <= check.id && check.id <= lastIndex) {
                check.checked = true;
            }
        });
    }
    if (this.checked) {
        lastCheckedId = this.id;
    } else {
        lastRemoveId = this.id;
    }
}
checkboxes.forEach(check =>
    check.addEventListener("change", checkBoxChangeHandler)
);
