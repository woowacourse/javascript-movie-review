import { SearchBar } from '../search-bar/SearchBar';

export default class Header {
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

/*
            <h1 class="logo">
              <img src="./images/logo.png" alt="MovieList" />
            </h1>
            <div class="top-rated-movie">
              <div class="rate">
                <img src="./images/star_empty.png" class="star" />
                <span class="rate-value">9.5</span>
              </div>
              <div class="title">인사이드 아웃2</div>
              <button class="primary detail">자세히 보기</button>
            </div>
          </div>
 */
