import { $ } from '../util/selector';
import LogoImagePath from '../asset/logo.png';

const SearchButtonClickEvent = new Event('clickSearchButton');
const LogoClickEvent = new Event('logoClickEvent');

function createHeader() {
  const header = renderHeader();
  $('#app').prepend(header);

  $('form', header).addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target) {
      event.target.dispatchEvent(SearchButtonClickEvent);
    }
  });

  $('.logo', header).addEventListener('click', (event) => {
    if (event.target) {
      event.target.dispatchEvent(LogoClickEvent);
    }
  });
}

function renderHeader() {
  const header = document.createElement('header');

  const logo = document.createElement('img');
  logo.classList.add('logo');
  logo.alt = 'MovieList 로고';
  logo.src = LogoImagePath;

  const searchBox = renderSearchBox();
  searchBox.classList.add('search-box');

  header.append(logo, searchBox);

  return header;
}

function renderSearchBox() {
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
