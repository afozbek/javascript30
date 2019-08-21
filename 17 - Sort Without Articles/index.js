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

const filterBand = band => {
    return band.replace(regex, "").trim();
};

bands.sort((a, b) => {
    if (filterBand(a) < filterBand(b)) {
        return -1;
    } else {
        return 1;
    }
});

list.innerHTML = bands.map(band => {
    return `<li>${band}</li>`;
});
