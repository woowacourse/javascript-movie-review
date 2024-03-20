import logoImg from '../assets/images/logo.png';

function getLogo() {
  const logo = document.createElement('h1');
  const logoImgElement = document.createElement('img');

  logoImgElement.src = logoImg;
  logoImgElement.alt = 'MovieList 로고';

  logo.appendChild(logoImgElement);
  return logo;
}

function getSearchBox() {
  const searchBox = document.createElement('div');
  const input = document.createElement('input');
  const button = document.createElement('button');

  searchBox.classList.add('search-box');

  input.type = 'text';
  input.placeholder = '검색';

  button.classList.add('search-button');
  button.innerText = '검색';

  searchBox.appendChild(input);
  searchBox.appendChild(button);

  return searchBox;
}

function getHeader() {
  const headerTag = document.createElement('header');
  const logo = getLogo();
  const searchBox = getSearchBox();

  headerTag.appendChild(logo);
  headerTag.appendChild(searchBox);

  return headerTag;
}

export default getHeader;
