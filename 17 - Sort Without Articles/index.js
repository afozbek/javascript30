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

const sortedBands = bands.sort((a, b) => {
    return filterBand(a) < filterBand(b) ? -1 : 1;
});

document.querySelector("#bands").innerHTML = sortedBands
    .map(band => {
        return `<li>${band}</li>`;
    })
    .join("");
