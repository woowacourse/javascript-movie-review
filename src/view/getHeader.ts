import logoImg from '../assets/images/logo.png';
import searchButtonImg from '../assets/images/search_button.png';

import { replaceMain } from './main';
import { SEARCH_MOVIES_URL } from '../constants/tmdbConstants';
import movieStateMethod from '../store/movieStore';

interface ISearchInput {
  searchContent: {
    value: string;
  };
}

interface ISearchSubmitEvent<T> extends SubmitEvent {
  target: EventTarget & T;
}

function logoClickHandler() {
  // eslint-disable-next-line no-restricted-globals
  location.reload();
}

function getLogo() {
  const logo = document.createElement('h1');
  const logoImgElement = document.createElement('img');
  logoImgElement.src = logoImg;
  logoImgElement.alt = 'MovieList 로고';
  logo.onclick = logoClickHandler;
  logo.appendChild(logoImgElement);
  return logo;
}

const submitSearchEventHandler = (event: ISearchSubmitEvent<ISearchInput>) => {
  event.preventDefault();
  const query = event.target?.searchContent.value;
  if (movieStateMethod.getQuery() === query) return;
  movieStateMethod.setQuery(query);
  movieStateMethod.setUrl(SEARCH_MOVIES_URL);
  replaceMain();
};

// eslint-disable-next-line max-lines-per-function
function getSearchBoxInput() {
  const inputTag = document.createElement('input');
  const state: Partial<HTMLInputElement> = {
    name: 'searchContent',
    type: 'search',
    placeholder: '검색',
    required: true,
  };
  Object.assign(inputTag, state);
  return inputTag;
}

function getSearchBoxButton() {
  const buttonTag = document.createElement('button');
  const state: Partial<HTMLButtonElement> = {
    className: 'search-button',
    innerText: '검색',
  };
  Object.assign(buttonTag, state);
  return buttonTag;
}

function getSearchForm() {
  const searchBox = document.createElement('form');
  const input = getSearchBoxInput();
  const submitButton = getSearchBoxButton();
  searchBox.className = 'search-box absolute right-20 mobile-visibility-hidden';
  searchBox.onsubmit = (e) => submitSearchEventHandler(e as ISearchSubmitEvent<ISearchInput>);
  searchBox.append(input, submitButton);
  return searchBox;
}

function openSearchForm(button: HTMLButtonElement, searchBox: HTMLFormElement) {
  button.classList.remove('mobile-visibility-visible');
  button.classList.add('mobile-visibility-hidden');

  searchBox.classList.remove('mobile-visibility-hidden');
  searchBox.classList.add('mobile-visibility-visible');
}

export function closeSearchForm() {
  const button = document.querySelector('.mobile-search-button') as HTMLButtonElement;
  const searchBox = document.querySelector('.search-box') as HTMLFormElement;

  button.classList.add('mobile-visibility-visible');
  button.classList.remove('mobile-visibility-hidden');

  searchBox.classList.add('mobile-visibility-hidden');
  searchBox.classList.remove('mobile-visibility-visible');
}

function getMobileToggle(searchBox: HTMLFormElement) {
  const button = document.createElement('button');
  button.className = 'right-20 mobile-visibility-visible mobile-search-button absolute flex-XY-aligned';
  button.innerHTML = `<img src=${searchButtonImg} alt="search-form-toggle" class="w-14"></img>`;
  button.onclick = () => openSearchForm(button, searchBox);
  return button;
}

function getHeader() {
  const headerTag = document.createElement('header');
  const logo = getLogo();
  const searchBox = getSearchForm();
  const mobileToggle = getMobileToggle(searchBox);
  headerTag.append(logo, searchBox, mobileToggle);
  return headerTag;
}

export default getHeader;
