import axios from "axios";
export { fetchCountries }

// function fetchCountries(name) {
//     return fetch(`https://restcountries.com/v3/name/${name}?fields=name,capital,population,flags,languages`)
//         .then(response => {
//             if (!response.ok) {
//                 Notify.failure("Oops, there is no country with that name");
//             };
//             return response.json();
//         });
// };

////////////////////////////////with async and axios////////////////////

async function fetchCountries(name) {
try {
    const response = await axios.get(`https://restcountries.com/v3/name/${name}?fields=name,capital,
    population,flags,languages`);
            return response.data;
          } catch {console.error();}
        
};