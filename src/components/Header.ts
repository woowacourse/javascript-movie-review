import { LOGO } from '../resource';

const Header = () => {
  const header = document.createElement('header');
  const title = document.createElement('h1');
  const logo = document.createElement('img');
  const searchBox = document.createElement('div');
  const searchInput = document.createElement('input');
  const searchButton = document.createElement('button');

  searchBox.classList.add('search-box');
  searchButton.classList.add('search-button');

  logo.src = LOGO;
  logo.setAttribute('alt', 'MovieList 로고');

  searchInput.type = 'text';
  searchInput.placeholder = '검색';
  searchButton.textContent = '검색';

  title.appendChild(logo);

  searchBox.appendChild(searchInput);
  searchBox.appendChild(searchButton);

  header.appendChild(title);
  header.appendChild(searchBox);

  return header;
};

export default Header;
