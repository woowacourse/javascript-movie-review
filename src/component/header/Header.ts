import SearchBar from '../search-bar/SearchBar';

class Header {
  #container;

  constructor() {
    this.#container = document.createElement('div');

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
    return new SearchBar().element?.outerHTML;
  }
}

export default Header;
