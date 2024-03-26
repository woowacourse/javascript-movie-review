import { $ } from '../util/selector.js';
import LogoImagePath from '../asset/logo.png';

const SearchButtonClickEvent = new Event('clickSearchButton');
const LogoClickEvent = new Event('logoClickEvent');

function createHeader() {
  const header = createHeaderElement();
  $('#app').prepend(header);

  header.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    event.target.dispatchEvent(SearchButtonClickEvent);
  });

  header.querySelector('.logo').addEventListener('click', (event) => {
    event.target.dispatchEvent(LogoClickEvent);
  });
}

function createHeaderElement() {
  const header = document.createElement('header');

  const logo = document.createElement('img');
  logo.classList.add('logo');
  logo.alt = 'MovieList 로고';
  logo.src = LogoImagePath;

  const searchBox = createSearchBoxElement();
  searchBox.classList.add('search-box');

  header.append(logo, searchBox);

  return header;
}

function createSearchBoxElement() {
  const searchBox = document.createElement('form');

  const input = document.createElement('input');
  input.placeholder = '검색';
  input.type = 'text';

  const searchButton = document.createElement('button');
  searchButton.classList.add('search-button');
  searchButton.type = 'submit';
  searchButton.innerText = '검색';

  searchBox.append(input, searchButton);

  return searchBox;
}

export default createHeader;
