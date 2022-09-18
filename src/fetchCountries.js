const BASE_URL = `https://restcountries.com/v3.1`;

function fetchCountries(name) {
    return fetch(`BASE_URL/name/${name}`)
        .then(response => {
            
            if (!response.ok) {
            throw new Error(response.statusText);
            }
            return response.json();
        })
}

export default { fetchCountries };