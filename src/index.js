import './css/styles.css';
import debounce from 'lodash.debounce';
var debounce = require('lodash.debounce');
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
            console.log(response);
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

    //   cardContainer.insertAdjacentHTML('beforeend', addToCountryInfo(country));
  } else {
    cardContainer.innerHTML = '';

    const markup = addToCardList(country);
      list.innerHTML = markup;

    //   list.insertAdjacentHTML('beforeend', addToCardList(country));
  }
}


function onFetchError() {
  list.innerHTML = '';
  cardContainer.innerHTML = '';

  Notify.failure('Oops, there is no country with that name');
}

function addToCountryInfo(country) {
  return country.map(
    ({ name, flags, capital, population, languages }) =>
      `
    <div class="flag__container">
        <img
          class="flag__img"
          src="${flags.svg}"
          alt="this is flag those country"
          width=130
        />
        <h1>${name.official}</h1>
      </div>
      <ul class="country-info__desc">
        <li class="country-info__item">
          Capital:
          <span>${capital}</span>
        </li>
        <li class="country-info__item">
          Population:
          <span>${population}</span
          >
        </li>
        <li class="country-info__item">
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
      ({ name, flags }) =>
        `<li class="country-list__item">
        <img
          class="country-list__flag"
          src="${flags.svg}"
          alt="country flag"
          width=130
          />
        <span class="country-list__name">${name.official}</span>
      </li>`
    )
    .join('');
}





