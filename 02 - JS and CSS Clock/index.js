const secondHand = document.querySelector(".second-hand");
const minHand = document.querySelector(".min-hand");
const hourHand = document.querySelector(".hour-hand");

// 450 deg full
const setDate = () => {
    const now = new Date();

    const seconds = now.getSeconds();
    const secondDegrees = (seconds / 60) * 360 + 90;
    secondHand.style.transform = `rotate(${secondDegrees}deg)`;

    const minutes = now.getMinutes();
    const minutesDegrees = (minutes / 60) * 360 + 90;
    minHand.style.transform = `rotate(${minutesDegrees}deg)`;

    const hour = now.getHours();
    const hourDegrees = (hour / 12) * 360 + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
};

// Get Angle function
function getAngle(hand) {
    let el = hand;
    let st = window.getComputedStyle(el, null);
    let tr =
        st.getPropertyValue("-webkit-transform") ||
        st.getPropertyValue("-moz-transform") ||
        st.getPropertyValue("-ms-transform") ||
        st.getPropertyValue("-o-transform") ||
        st.getPropertyValue("transform") ||
        "fail...";

    let angle;
    if (tr !== "none") {
        var values = tr.split("(")[1];
        values = values.split(")")[0];
        values = values.split(",");

        var a = values[0];
        var b = values[1];

        var radians = Math.atan2(b, a);

        if (radians < 0) {
            radians += 2 * Math.PI;
        }

        angle = Math.round(radians * (180 / Math.PI));
    } else {
        angle = 0;
    }

    return angle;
}

setInterval(setDate, 1000);
