import createElement from '../../utils/createElement';
import headerLogo from '../../../templates/logo.png';
import isHTMLElement from '../../utils/isHTMLElement';

const createHeaderContainer = () => {
  const headerContainer = createElement('header');
  const h1 = createElement('h1');
  const headerLogoImage = createElement('img', { src: headerLogo, alt: 'MovieList' });
  h1.appendChild(headerLogoImage);
  headerContainer.appendChild(h1);

  return headerContainer;
};

const createSearchBar = () => {
  const searchBox = createElement('div', { className: 'search-box' });
  const input = createElement('input', { type: 'text', placeholder: '검색' });
  const searchButton = createElement('button', { className: 'search-button' });
  searchBox.appendChild(input);
  searchBox.appendChild(searchButton);

  return searchBox;
};

export const renderHandler = () => {
  const appContainer = document.getElementById('app');
  const headerContainer = createHeaderContainer();
  console.log(headerContainer);
  const searchBar = createSearchBar();
  headerContainer.appendChild(searchBar);
  if (isHTMLElement(appContainer)) {
    appContainer.appendChild(headerContainer);
  }
};
