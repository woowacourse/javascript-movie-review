import Logo from '../../statics/images/logo.png';
import './Header.css';

const createSearchBox = () => {
  const $searchBox = document.createElement('div');
  $searchBox.classList.add('search-box');

  const $searchInput = document.createElement('input');
  $searchInput.type = 'text';
  $searchInput.placeholder = '검색';

  const $searchBtn = document.createElement('button');
  $searchBtn.classList.add('search-button');
  $searchBtn.textContent = '검색';

  $searchBox.appendChild($searchInput);
  $searchBox.appendChild($searchBtn);
  return $searchBox;
};

const createLogo = () => {
  const $h1 = document.createElement('h1');
  const $img = document.createElement('img');
  $img.src = Logo;
  $img.alt = 'MovieList 로고';

  $h1.appendChild($img);
  return $h1;
};

const createHeader = () => {
  const $header = document.createElement('header');
  const $logo = createLogo();
  const $searchBox = createSearchBox();

  $header.appendChild($logo);
  $header.appendChild($searchBox);
  return $header;
};

function Header() {
  const state = {
    searchInput: '',
  };

  return {
    render: () => {
      const $header = createHeader();
      return $header;
    },
  };
}

export default Header;
