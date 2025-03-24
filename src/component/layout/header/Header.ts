import { redirectToPage } from '../../../route/router';
import SearchBar from '../../common/search-bar/SearchBar';

class Header {
  #container;
  #searchBar;

  constructor() {
    this.#container = document.createElement('header');
    this.#container.className = 'header';

    this.#searchBar = new SearchBar();

    this.render();
  }

  get element() {
    return this.#container;
  }

  render() {
    this.#container.innerHTML = `
    <h1 class="logo"/>
      <img src="./logo.png" alt="MovieList" class="logo__img"/>
    </h1>
    `;

    this.#bindLogoClickEvent();

    const searchBarWrapper = document.createElement('div');
    searchBarWrapper.className = 'header__searchbar';
    searchBarWrapper.appendChild(this.#searchBar.element);

    this.#container.appendChild(searchBarWrapper);
  }

  #bindLogoClickEvent() {
    const logo = this.#container.querySelector('.logo img');
    if (logo) {
      logo.addEventListener('click', () => {
        redirectToPage('/');
      });
    }
  }
}

export default Header;
