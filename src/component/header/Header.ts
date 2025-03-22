import { IMAGE_URL } from '../../constants/systemConstants';
import { redirectToPage } from '../../route/router';
import { $ } from '../../utils/selector';
import SearchBar from '../search-bar/SearchBar';

class Header {
  #container;

  constructor() {
    this.#container = document.createElement('header');
    this.#container.className = 'header';
    this.render();
  }

  get element() {
    return this.#container;
  }

  render() {
    this.#container.innerHTML = `
    <h1 class="logo">
      <img src=${IMAGE_URL.LOGO} alt="MovieList" >
    </h1>
    `;

    this.#bindLogoClickEvent();

    const searchBarWrapper = document.createElement('div');
    searchBarWrapper.className = 'header__searchbar';
    searchBarWrapper.appendChild(new SearchBar().element);

    this.#container.appendChild(searchBarWrapper);
  }

  #bindLogoClickEvent() {
    const $logo = $({ root: this.#container, selector: '.logo' });
    if ($logo) {
      $logo.addEventListener('click', () => {
        redirectToPage('/');
      });
    }
  }
}

export default Header;
