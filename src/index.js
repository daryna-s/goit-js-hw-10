import './css/styles.css';
import debounce from 'lodash.debounce';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchCountries } from './fetchCountries';

const refs = {
  searchForm: document.querySelector('#search-box'),
  list: document.querySelector('.country-list'),
  cardContainer: document.querySelector('.country-info'),
};
const { searchForm, list, cardContainer } = refs;

const DEBOUNCE_DELAY = 300;


searchForm.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
    e.preventDefault();
  const name = e.target.value.trim();

  if (!name) {
    list.innerHTML = '';
    cardContainer.innerHTML = '';
    return;
  }

    fetchCountries(name)
        .then(response => {
        
      if (response.length > 10) {
          return Notify.info('Too many matches found. Please enter a more specific name.');
      }
      showCountries(response);
    })
    .catch(onFetchError);
}

function showCountries(country) {
  if (country.length === 1) {
    list.innerHTML = '';

    const markup = addToCountryInfo(country);
      cardContainer.innerHTML = markup;
  } else {
    cardContainer.innerHTML = '';

    const markup = addToCardList(country);
      list.innerHTML = markup;
  }
}


function onFetchError() {
  list.innerHTML = '';
  cardContainer.innerHTML = '';

  Notify.failure('Oops, there is no country with that name');
}

function addToCountryInfo(country) {
  return country.map(
    ({ name: { official }, flags: { svg }, capital, population, languages }) =>
      `
    <div class="flag__container" style = "display: flex; justify-content: space-between; align-items: center; width:290px">
        <img
          class="flag__img"
          src="${svg}"
          alt="this is flag those country"
          width = "30" height = "20"
        />
        <h1  style = "margin-bottom: 0; margin-top: 0">${official}</h1>
      </div>
      <ul class="country-info__desc" >
        <li class="country-info__item" style = "list-style: none; font-weight: 700">
          Capital:
          <span>${capital}</span>
        </li>
        <li class="country-info__item" style = "list-style: none; font-weight: 700">
          Population:
          <span>${population}</span
          >
        </li>
        <li class="country-info__item" style = "list-style: none; font-weight: 700">
          Languages:
          <span>${Object.values(languages)}</span
          >
        </li>
      </ul>`
  );
}

function addToCardList(country) {
  return country
    .map(
      ({ name:{official}, flags: {svg} }) =>
        `<li class="country-list__item" style = "list-style: none; font-family: sans-serif">
        <img
          class="country-list__flag"
          src="${svg}"
          alt="country flag"
          width = "20" height = "10"
          />
        <span class="country-list__name">${official}</span>
      </li>`
    )
    .join('');
}





