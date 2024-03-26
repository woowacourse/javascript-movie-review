import createElement from '../../utils/createElement';
import headerLogo from '../../../templates/logo.png';
import isHTMLElement from '../../utils/isHTMLElement';

const createHeaderBanner = () => {
  const h1 = createElement('h1');
  const headerLogoImage = createElement('img', {
    src: headerLogo,
    alt: 'MovieList',
  });
  h1.appendChild(headerLogoImage);

  return h1;
};

const createHeaderContainer = () => {
  const headerContainer = createElement('header');
  const container = createElement('div', { className: 'header-wrapper' });
  const headerBanner = createHeaderBanner();

  container.appendChild(headerBanner);
  headerContainer.appendChild(container);

  return headerContainer;
};

const createWebSearchButton = () => {
  const searchButton = createElement('button', {
    className: 'search-button',
    textContent: '검색',
  });
  return searchButton;
};

/* eslint-disable max-lines-per-function */
const createWebSearchBar = () => {
  const searchBox = createElement('form', {
    className: 'search-form',
    id: 'searchForm',
  });
  const input = createElement('input', {
    type: 'search',
    placeholder: '검색',
    className: 'search-input',
  });
  const searchButton = createWebSearchButton();
  searchBox.appendChild(input);
  searchBox.appendChild(searchButton);

  return searchBox;
};

export const renderHandler = () => {
  const appContainer = document.getElementById('app');
  const headerContainer = createHeaderContainer();
  const searchBar = createWebSearchBar();
  headerContainer.appendChild(searchBar);
  if (isHTMLElement(appContainer)) {
    appContainer.appendChild(headerContainer);
  }
};
