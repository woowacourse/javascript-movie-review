import logoImg from '../assets/images/logo.png';
import { SEARCH_MOVIES_URL } from '../constants/tmdbConstants';
import { appendChildren } from '../utils/domUtil';
import replaceMain from './getMain';

function getLogo() {
  const logo = document.createElement('h1');
  const logoImgElement = document.createElement('img');

  logoImgElement.src = logoImg;
  logoImgElement.alt = 'MovieList 로고';

  logo.appendChild(logoImgElement);
  return logo;
}

const submitEventHandler = (event: any) => {
  event.preventDefault();
  const query = event.target.searchContent.value;

  // TODO: 검색어로 영화 fetch 및 replace
  replaceMain(SEARCH_MOVIES_URL, { page: '1', query });
};

function getSearchBoxInput() {
  const inputTag = document.createElement('input');
  const state = {
    name: 'searchContent',
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
  const searchBox = document.createElement('form');
  const input = getSearchBoxInput();
  const button = getSearchBoxButton();
  searchBox.classList.add('search-box');
  searchBox.onsubmit = submitEventHandler;

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
