import { $ } from '../util/querySelector';

class Header {
  #element;
  #manager;

  constructor (manager, element) {
    this.#element = element;
    this.#manager = manager;
    this.#searchEvent();
  }

  render () {
    this.#element.replaceChildren();

    const header = document.createDocumentFragment();

    const title = document.createElement('h1');

    const titleImage = document.createElement('img');
    titleImage.setAttribute('src', './assets/logo.png');
    titleImage.setAttribute('alt', 'MovieList 로고');

    const searchForm = document.createElement('form');
    searchForm.setAttribute('class', 'search-box');

    const searchInput = document.createElement('input');
    searchInput.setAttribute('type', 'text');
    searchInput.setAttribute('id', 'search-input');
    searchInput.setAttribute('placeholder', '검색');

    const searchButton = document.createElement('button');
    searchButton.setAttribute('class', 'search-button');
    searchButton.textContent = '검색';

    searchForm.appendChild(searchInput);
    searchForm.appendChild(searchButton);
    title.appendChild(titleImage);

    header.appendChild(title);
    header.appendChild(searchForm);

    this.#element.appendChild(header);
  }

  #searchEvent () {
    this.#element.addEventListener('click', async (event) => {
      if (event.target.tagName === 'IMG') {
        this.#element.dispatchEvent(new CustomEvent('searchPending', { bubbles: true }));
        await this.#manager.searchMovieList('');
        this.#element.dispatchEvent(new CustomEvent('searchFullfilled', { bubbles: true }));
      }
    });

    this.#element.addEventListener('submit', async (event) => {
      event.preventDefault();

      const searchData = $('#search-input').value;
      this.#element.dispatchEvent(new CustomEvent('searchPending', { bubbles: true }));
      await this.#manager.searchMovieList(searchData);
      this.#element.dispatchEvent(new CustomEvent('searchFullfilled', { bubbles: true }));
    });
  }
}

export default Header;
