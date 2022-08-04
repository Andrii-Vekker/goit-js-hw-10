import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce'
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    info: document.querySelector(".country-info")
}

// fetch(`https://restcountries.com/v3/all`).then(response => response.json()).then(data => console.log(data))

refs.input.addEventListener("input", inputHandler)





function inputHandler(e) {
    let nameCountry = e.target.value
    fetch(`https://restcountries.com/v3/name/${nameCountry}?fields=name,capital,population,flags,languages`)
        .then(response => response.json()).then(countries => {
            refs.list.innerHTML = ""
            refs.info.innerHTML = ""
            renderList(countries)
            // console.log(countries[0].flags[0])
});
};


function fetchCountries(name) {

}

function createlist(arr) {
    // console.log()
    return arr.reduce((acc, { flags, name }) => acc + 
    `<li>
     <img src="${flags[0]}" wigth="20px" height="20px" alt="flag"> <p>${name.official}</p>
    </li>`, "");

}   
 
function createOneCountryList(arr) {
    return arr.reduce((acc, { flags, name, capital, population, languages }) => acc + 
`<ul>
 <p><li><img src="${flags[0]}" wigth="20px" height="20px" alt="flag"> ${name.official}</p></li>
<li>Capital: ${capital}</li>
<li>Population: ${population}</li>
<li>Languages: ${Object.values(languages)}</li>
    </ul>`, "")
};

function renderList(array) {
     if (array.length > 1 && array.length <= 10) {
        refs.list.insertAdjacentHTML("beforeend", createlist(array)) 
     }
    else{refs.info.insertAdjacentHTML("beforeend", createOneCountryList(array))}
}
