const list = document.querySelector("#bands");
const regex = /^(the |a |an )/i;

const bands = [
    "The Plot in You",
    "The Devil Wears Prada",
    "Pierce the Veil",
    "Norma Jean",
    "The Bled",
    "Say Anything",
    "The Midway State",
    "We Came as Romans",
    "Counterparts",
    "Oh, Sleeper",
    "A Skylit Drive",
    "Anywhere But Here",
    "An Old Dog"
];

bands.sort((a, b) => {
    let bandName1 = a.replace(regex, "").trim();
    let bandName2 = b.replace(regex, "").trim();

    if (bandName1 < bandName2) {
        return -1;
    } else if (bandName2 > bandName1) {
        return 1;
    }

    return 0;
});

list.innerHTML = bands.map(band => {
    return `<li>${band}</li>`;
});
