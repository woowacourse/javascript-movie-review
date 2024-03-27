import createElement from '../../utils/createElement';
import headerLogo from '../../../templates/logo.png';
import isHTMLElement from '../../utils/isHTMLElement';

const createHeaderBanner = () => {
  const container = createElement('div', { className: 'header-banner-wrapper' });
  const h1 = createElement('h1');
  const headerLogoImage = createElement('img', {
    src: headerLogo,
    alt: 'MovieList',
  });
  h1.appendChild(headerLogoImage);

  container.appendChild(h1);

  return container;
};

const createHeaderContainer = () => {
  const headerContainer = createElement('header');

  return headerContainer;
};

const createWebSearchButton = () => {
  const searchButton = createElement('button', {
    className: 'web-search-button web',
    textContent: '검색',
  });
  return searchButton;
};

const createMobileSearchButton = () => {
  const searchButton = createElement('button', {
    className: 'mobile-search-button mobile',
    textContent: '검색',
  });
  return searchButton;
};

const createMobileSubmitButton = () => {
  const submitButton = createElement('button', {
    className: 'mobile-submit-button',
    textContent: '검색',
    type: 'submit',
  });
  return submitButton;
};

/* eslint-disable max-lines-per-function */
const createMobileSearchBarContent = () => {
  const boxContainer = createElement('div', {
    className: 'box-container',
  });
  const input = createElement('input', {
    type: 'search mobile',
    placeholder: '검색',
    className: 'mobile-search-input',
  });
  const searchButton = createMobileSearchButton();
  const mobileSubmitButton = createMobileSubmitButton();
  boxContainer.appendChild(input);
  boxContainer.appendChild(searchButton);
  boxContainer.appendChild(mobileSubmitButton);

  return boxContainer;
};

const createMobileSearchBar = () => {
  const mobileSearchBox = createElement('form', {
    className: 'mobile-search-form mobile',
    id: 'searchForm',
  });
  const boxContainer = createMobileSearchBarContent();
  mobileSearchBox.appendChild(boxContainer);
  return mobileSearchBox;
};

/* eslint-disable max-lines-per-function */
const createWebSearchBar = () => {
  const webSearchBox = createElement('form', {
    className: 'web-search-form web',
    id: 'searchForm',
  });
  const input = createElement('input', {
    type: 'search web',
    placeholder: '검색',
    className: 'web-search-input',
  });
  const searchButton = createWebSearchButton();
  webSearchBox.appendChild(input);
  webSearchBox.appendChild(searchButton);

  return webSearchBox;
};

const createHeaderContent = () => {
  const headerWrapper = createElement('div', { className: 'header-wrapper' });
  const headerBanner = createHeaderBanner();
  const webSearchBar = createWebSearchBar();
  const mobileSearchBar = createMobileSearchBar();
  headerWrapper.appendChild(headerBanner);
  headerWrapper.appendChild(webSearchBar);
  headerWrapper.appendChild(mobileSearchBar);

  return headerWrapper;
};

export const renderHandler = () => {
  const appContainer = document.getElementById('app');
  const headerContainer = createHeaderContainer();
  const headerWrapper = createHeaderContent();
  headerContainer.appendChild(headerWrapper);
  if (isHTMLElement(appContainer)) {
    appContainer.appendChild(headerContainer);
  }
};
