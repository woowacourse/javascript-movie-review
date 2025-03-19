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
         <img src="./logo.png" alt="MovieList" />
       </h1>
       <div class="header__searchbar">
         ${this.#searchBarElement()}
       </div>
    `;
  }

  #searchBarElement() {
    return new SearchBar().element?.outerHTML;
  }
}

export default Header;
