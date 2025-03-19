import SearchBar from '../search-bar/SearchBar';

class Header {
  #container;
  #searchBar;

  constructor() {
    this.#container = document.createElement('div');
    this.#searchBar = new SearchBar();

    this.render();
  }

  get element() {
    return this.#container.firstElementChild;
  }

  render() {
    this.#container.innerHTML = `
     <header class="header">
       <h1 class="logo">
         <img src="./logo.png" alt="MovieList" />
       </h1>
       <div class="header__searchbar">
         ${this.#searchBarElement()}
       </div>
     </header>
    `;
  }

  #searchBarElement() {
    return this.#searchBar.element?.outerHTML;
  }
}

export default Header;
