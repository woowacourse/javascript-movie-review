import logoImg from '../assets/images/logo.png';
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

function getLogo() {
  const logo = document.createElement('h1');
  const logoImgElement = document.createElement('img');

  logoImgElement.src = logoImg;
  logoImgElement.alt = 'MovieList 로고';

  logo.appendChild(logoImgElement);
  return logo;
}

const submitSearchEventHandler = (event: ISearchSubmitEvent<ISearchInput>) => {
  event.preventDefault();
  movieStateMethod.setQuery(event.target?.searchContent.value);
  movieStateMethod.setUrl(SEARCH_MOVIES_URL);
  replaceMain();
};

function getSearchBoxInput() {
  const inputTag = document.createElement('input');
  const state = {
    name: 'searchContent',
    type: 'search',
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
  searchBox.onsubmit = (e) => submitSearchEventHandler(e as ISearchSubmitEvent<ISearchInput>);
  searchBox.append(input, button);
  return searchBox;
}

function getHeader() {
  const headerTag = document.createElement('header');
  const logo = getLogo();
  const searchBox = getSearchBox();
  headerTag.append(logo, searchBox);
  return headerTag;
}

export default getHeader;
