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

refs.input.addEventListener("input", debounce(inputHandler, DEBOUNCE_DELAY))


let nameCountry = null


function inputHandler(e) {
     nameCountry = e.target.value
   
    fetchCountries(nameCountry).then(countries => {
            refs.list.innerHTML = ""
            refs.info.innerHTML = ""
            renderList(countries)
}).catch(error => error);
};


function fetchCountries(name) {
return fetch(`https://restcountries.com/v3/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => response.json())
}

function createlist(arr) {
    return arr.reduce((acc, { flags, name }) => acc + 
    `<li>
     <p> <img src="${flags[0]}" wigth="20px" height="20px" alt="flag"> ${name.official}</p>
    </li>`, "");
}   
 
function createOneCountryList(arr) {
    return arr.reduce((acc, { flags, name, capital, population, languages }) => acc + 
`<ul>
 <li><p><img src="${flags[0]}" wigth="20px" height="20px" alt="flag"> ${name.official}</p></li>
<li>Capital: ${capital}</li>
<li>Population: ${population}</li>
<li>Languages: ${Object.values(languages)}</li>
    </ul>`, "")
};

function renderList(array) {
    
    if (array.length === 1) {
            refs.info.insertAdjacentHTML("beforeend", createOneCountryList(array))
        }
     if (array.length > 1 || array.length >= 10) {
         refs.list.insertAdjacentHTML("beforeend", createlist(array)) 
     }
    if (array.length > 10) {
        Notify.info("Too many matches found. Please enter a more specific name.");
    }
    
   
       
}




            // const countryName = countries.map(i => i.name.official).join().toLowerCase()
            // if (refs.input.value.toLowerCase() !== countryName) {
                
            // }