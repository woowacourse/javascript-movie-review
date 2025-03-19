import SearchBar from '../search-bar/SearchBar';

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
       <h1 class="logo">
         <img src="./logo.png" alt="MovieList" />
       </h1>
    `;

    const searchBarWrapper = document.createElement('div');
    searchBarWrapper.className = 'header__searchbar';
    searchBarWrapper.appendChild(this.#searchBar.element);

    this.#container.appendChild(searchBarWrapper);
  }
}

export default Header;
