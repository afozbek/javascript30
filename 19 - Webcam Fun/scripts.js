const video = document.querySelector(".player");
const canvas = document.querySelector(".photo");
const ctx = canvas.getContext("2d");
const strip = document.querySelector(".strip");
const snap = document.querySelector(".snap");

function getVideo() {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
            console.log(localMediaStream);

            video.srcObject = localMediaStream;
            video.play();
        })
        .catch(err => {
            console.error(`OH NO!!!`, err);
        });
}

function paintToCanvas() {
    const width = video.videoWidth;
    const height = video.videoHeight;

    canvas.width = width;
    canvas.height = height;

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height);

        // take the pixels out of the image
        let pixels = ctx.getImageData(0, 0, width, height);

        // work with pixels
        // pixels = redEffect(pixels);
        pixels = rgbSplit(pixels);
        // pixels = redEffect(pixels);

        // ctx.globalAlpha = 0.1;
        // put them back
        ctx.putImageData(pixels, 0, 0);
    }, 15);
}

function takePhoto() {
    //played the sound
    snap.currentTime = 0;
    snap.play();

    const data = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");

    link.href = data;
    link.setAttribute("download", "handsome");
    link.innerHTML = `<img src="${data}" alt="screenshot" />`;
    strip.insertBefore(link, strip.firstChild);
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

getVideo();

video.addEventListener("canplay", paintToCanvas);