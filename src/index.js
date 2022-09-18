import './css/styles.css';
import debounce from 'lodash.debounce';
var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import API from './fetchCountries';
// import countryCard from '';

const DEBOUNCE_DELAY = 300;
const refs = {
  cardContainer: document.querySelector('.country-info'),
  searchForm: document.querySelector('#search-box'),
};

refs.searchForm.addEventListener(`input`, debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
    const form = e.target.value;

    API.fetchCountries(form.trim())
      .then(renderCountryCard)
      .catch(onFetchError)      
}   

function renderCountryCard(country) {
    //       const markup = countryCard(country);
    // refs.cardContainer.innerHTML = markup;
    
    if (country.length > 10) {
      Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
    }

    if (country.length >= 2 && country.length <= 10) {
    //        <div class="country-flag">  
    //     <img src="{{flags.svg}}" alt="{{name.common}}">
    // </div>
    }

    if (country.length === 1) {
    //        <div class="country-flag">  
    //     <img src="{{flags.svg}}" alt="{{name.common}}">
    // </div>
    // <div class="country-info">
    //     <h2 class="country-info_title"> {{name.official}}</h2>
    //     <p class="country-info_text">Capital: {{capital}}</p>
    //     <p class="country-info_text">Population: {{population}}</p>
    //     <p class="country-info_text">Languages: {{languages}} </p>    
    // </div>
    }
}

function onFetchError (error){
  Notify.failure('Oops, there is no country with that name');
}