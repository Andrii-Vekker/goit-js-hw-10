import './css/styles.css';
var debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    info: document.querySelector(".country-info")
}

const nameCountry = "ukraine"




fetch(`https://restcountries.com/v3.1/name/${nameCountry}?fields=name.official,capital,population,flags.svg,languages`)
.then(response => response.json).then(data => console.log(data))