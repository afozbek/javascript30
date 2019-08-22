const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(userMedia => {
            video.srcObject = userMedia;
            video.play();
        })
        .catch(err => console.log(err));
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        let pixels = ctx.getImageData(0, 0, width, height);

        // DO STH WITH PIXELS
        pixels = redEffect(pixels);

        ctx.putImageData(pixels, 0, 0);
    }, 15);
}

function takePhoto() {
    snap.currentTime = 0;
    snap.play();

    const dataUrl = canvas.toDataURL("image/jpeg");
    const a = document.createElement("a");

    a.href = dataUrl;
    a.setAttribute("download", "furkan");
    a.innerHTML = `<img src="${dataUrl}" alt="screenshot" />`;
    strip.insertBefore(a, strip.firstChild);
}

function redEffect(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i + 0] = pixels.data[i + 0] + 100; // red
        pixels.data[i + 1] = pixels.data[i + 1] - 50; // green
        pixels.data[i + 2] = pixels.data[i + 2] * 0.5; // blue
    }

    return pixels;
}

function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 350] = pixels.data[i + 0]; // red
        pixels.data[i + 500] = pixels.data[i + 1]; // green
        pixels.data[i - 350] = pixels.data[i + 2]; // blue
    }

    return pixels;
}

function greenScreen(pixels) {
    const levels = {};

    document.querySelectorAll(".rgb input").forEach(input => {
        levels[input.name] = input.value;
    });

    for (i = 0; i < pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0];
        green = pixels.data[i + 1];
        blue = pixels.data[i + 2];
        alpha = pixels.data[i + 3];

        if (
            red >= levels.rmin &&
            green >= levels.gmin &&
            blue >= levels.bmin &&
            red <= levels.rmax &&
            green <= levels.gmax &&
            blue <= levels.bmax
        ) {
            // take it out!
            pixels.data[i + 3] = 0;
        }
    }

    return pixels;
}

getVideo();

video.addEventListener("canplay", paintToCanvas);
