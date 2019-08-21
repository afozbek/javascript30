const endpoint =
    "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

let cities = [];

fetch(endpoint)
    .then(res => res.json())
    .then(data => {
        cities = data;
        console.log(cities);
    });

const findMatches = (wordToMatch, cities) => {
    return cities.filter(place => {
        let searchRegex = new RegExp(wordToMatch, "gi");

        return place.city.match(searchRegex) || place.state.match(searchRegex);
    });
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayMatches() {
    const matchedArr = findMatches(this.value, cities);
    if (this.value === "") return;

    const regex = new RegExp(this.value, "gi");
    const html = matchedArr
        .map(place => {
            const cityName = place.city.replace(
                regex,
                `
                <span class="hl">${this.value}</span>
                `
            );
            const stateName = place.state.replace(
                regex,
                `
                <span class="hl">${this.value}</span>
                `
            );
            return `
            <li>
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(
                    place.population
                )}</span>
            </li>
        `;
        })
        .join("");

    suggestions.innerHTML = html;
}

const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

search.addEventListener("change", displayMatches);
search.addEventListener("keyup", displayMatches);
