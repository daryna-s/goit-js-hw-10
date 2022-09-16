import './css/styles.css';

var debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const DEBOUNCE_DELAY = 300;
const refs = {
  cardContainer: document.querySelector('.country-info'),
  searchForm: document.querySelector('#search-box'),
};



fetchCountries();

function fetchCountries() {
fetch(`https://restcountries.com/v3.1/name/peru`)
  .then(response => {
    return response.json();
  })
  .then(renderCountryCard)
  .catch(error => {
    console.log(error);
  });
}


function renderCountryCard(country) {
          const markup = countryCard(country);
          refs.cardContainer.innerHTML = markup;
  }