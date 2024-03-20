import logoImg from '../assets/images/logo.png';
import { appendChildren } from '../utils/domUtil';

function getLogo() {
  const logo = document.createElement('h1');
  const logoImgElement = document.createElement('img');

  logoImgElement.src = logoImg;
  logoImgElement.alt = 'MovieList 로고';

  logo.appendChild(logoImgElement);

  return logo;
}

function getSearchBoxInput() {
  const inputTag = document.createElement('input');

  const state = {
    type: 'text',
    placeholder: '검색',
  };

  Object.assign(inputTag, state);

  return inputTag;
}

function getSearchBoxButton() {
  const buttonTag = document.createElement('button');

  const state = {
    className: 'search-button',
    innerText: '검색',
  };

  Object.assign(buttonTag, state);

  return buttonTag;
}

function getSearchBox() {
  const searchBox = document.createElement('div');
  const input = getSearchBoxInput();
  const button = getSearchBoxButton();

  searchBox.classList.add('search-box');

  appendChildren(searchBox, [input, button]);
  return searchBox;
}

function getHeader() {
  const headerTag = document.createElement('header');
  const logo = getLogo();
  const searchBox = getSearchBox();

  appendChildren(headerTag, [logo, searchBox]);

  return headerTag;
}

export default getHeader;
