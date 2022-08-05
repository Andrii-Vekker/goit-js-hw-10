import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce'
import { fetchCountries } from '../fetchCountries';

const DEBOUNCE_DELAY = 500;

const refs = {
    input: document.querySelector("#search-box"),
    list: document.querySelector(".country-list"),
    info: document.querySelector(".country-info")
};

// fetch(`https://restcountries.com/v3/all`).then(response => response.json()).then(data => console.log(data))

refs.input.addEventListener("input", debounce(inputHandler, DEBOUNCE_DELAY));

let nameCountry = null;

function inputHandler(e) {
    nameCountry = e.target.value.trim();
  if (nameCountry === "") {
      refs.list.innerHTML = "";
      refs.info.innerHTML = "";
    };
    
    if (nameCountry !== "") {
        fetchCountries(nameCountry).then(countries => {
      
        refs.list.innerHTML = "";
        refs.info.innerHTML = "";
        
        renderList(countries);
        
}).catch(error => error(Notify.failure("Oops, there is no country with that name")));
    };   
};

function createlist(arr) {
    return arr.reduce((acc, { flags, name }) => acc + 
    `<li class ="listItem">
     <p> <img src="${flags[0]}" wigth="20px" height="20px" alt="flag"> ${name.official}</p>
    </li>`, "");
};
 
function createOneCountryList(arr) {
    return arr.reduce((acc, { flags, name, capital, population, languages }) => acc +
        `<ul class="list">
 <li class="listItemOne"><p class="p"><img src="${flags[0]}" wigth="20px" height="20px" alt="flag"> ${name.official}</p></li>
<li><span class="span">Capital</span>: ${capital}</li>
<li><span class="span">Population</span>: ${population}</li>
<li><span class="span">Languages</span>: ${Object.values(languages)}</li>
    </ul>`, "");
};

function renderList(array) {
    
    if (array.length === 1) {
        refs.info.insertAdjacentHTML("beforeend", createOneCountryList(array));
    };
     if (array.length > 1 || array.length >= 10) {
         refs.list.insertAdjacentHTML("beforeend", createlist(array));
    };
    if (array.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    };   
};

