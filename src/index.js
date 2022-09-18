import './css/styles.css';
import debounce from 'lodash.debounce';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetchCountries';


const DEBOUNCE_DELAY = 300;
const refs = {
  cardContainer: document.querySelector('.country-info'),
  searchForm: document.querySelector('#search-box'),
};

refs.searchForm.addEventListener(`input`, debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  e.preventDefault();
  const form = e.target.value;

    if (!form) {
      refs.cardContainer.innerHTML = '';
      return;
    }

  API.fetchCountries(form.trim()).then(renderCountryCard).catch(onFetchError);
}   

function renderCountryCard(country) {
    
    if (country.length > 10) {
        refs.cardContainer.innerHTML = '';
        refs.searchForm.innerHTML = '';
        Notify.info(
            'Too many matches found. Please enter a more specific name.'
        );
    }

    if (country.length >= 2 && country.length <= 10) {
        const markUp = country
            .map(e => {
                return `<div class="country-flag">
        <img class="flag" src="${e.flags.svg}" alt ="${e.name}"></>
        <h2 class = "name">Name: ${e.name}</h2>
        </div>`;
            })
            .join('');
        refs.cardContainer.insertAdjacentHTML('afterbegin', markUp);
    }

    if (country.length === 1) {
        const markUp = country
            .map(e => {
                return
                `<div class="country-flag">
        <img class="flag" src="${e.flags.svg}" alt ="${e.name}"></>
        <h2 class = "name">Name: ${e.name}</h2>
        </div>
    <div class="country-info">
        <h2 class="country-info_title"> ${e.name}</h2>
        <p class="country-info_text">Capital: ${e.capital}</p>
        <p class="country-info_text">Population: ${e.population}</p>
        <p class="country-info_text">Languages: ${Object.values(e.languages[0])
                        .join(', ')} </p>    
    </div>`
            }).join('');
        
        refs.cardContainer.insertAdjacentHTML('afterbegin', markUp);
    }
}

    function onFetchError(error) {
        Notify.failure('Oops, there is no country with that name');
    }
