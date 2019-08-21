const hero = document.querySelector(".hero");
const text = hero.querySelector("h1");
const walk = 150; //100px

let hue = 0;

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;

    if (this !== e.target) {
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
    }

    const xWalk = (x / width) * walk - walk / 2;
    const yWalk = (y / height) * walk - walk / 2;

    hue++;
    if (hue >= 360) {
        hue = 0;
    }

    text.style.textShadow = `
    ${xWalk}px ${yWalk}px 0 hsl(${hue},100%, 50% ),
    ${xWalk * -1}px ${yWalk}px 0 hsl(${360 - hue},100%, 50% ),
    ${yWalk}px ${xWalk * -1}px 0 hsl(${hue + 100},100%, 50% ),
    ${yWalk * -1}px ${xWalk}px 0 hsl(${(360 - hue) / 2},100%, 50% )
    `;
}

hero.addEventListener("mousemove", shadow);
