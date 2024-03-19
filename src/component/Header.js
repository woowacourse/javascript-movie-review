import { $ } from '../util/selector.js';
import LogoImagePath from '../asset/logo.png';

function createHeader() {
  const header = renderHeader();
  $('#app').prepend(header);
}

function renderHeader() {
  const header = document.createElement('header');

  const logo = document.createElement('img');
  logo.alt = 'MovieList 로고';
  logo.src = LogoImagePath;

  const searchBox = renderSearchBox();
  searchBox.classList.add('search-box');

  header.append(logo, searchBox);

  return header;
}

function renderSearchBox() {
  const searchBox = document.createElement('div');

  const input = document.createElement('input');
  input.placeholder = '검색';
  input.type = 'text';

  const searchButton = document.createElement('button');
  searchButton.classList.add('search-button');
  searchButton.innerText = '검색';

  searchBox.append(input, searchButton);

  return searchBox;
}

export default createHeader;
