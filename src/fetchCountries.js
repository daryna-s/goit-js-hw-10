const BASE_URL = `https://restcountries.com/v3.1`;

function fetchCountries(name) {
    return fetch(`BASE_URL/name/${name}`)
        .then(response => {
            
            if (!response.ok) {
                refs.cardContainer.innerHTML = ``;
                onFetchError();
            }
            return response.json();
        })
        .catch(onFetchError);
}

function onFetchError(error) {
  Notify.failure('Oops, there is no country with that name');
}

export default { fetchCountries, onFetchError };