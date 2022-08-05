export { fetchCountries }

function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3/name/${name}?fields=name,capital,population,flags,languages`)
        .then(response => {
            return response.json();
        });
};