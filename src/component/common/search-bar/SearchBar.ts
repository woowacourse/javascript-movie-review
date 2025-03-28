import { redirectToPage } from '../../../route/router';

class SearchBar {
  #container: HTMLElement;
  #input: HTMLInputElement | null = null;

  #searchValue: string = '';

  constructor() {
    this.#container = document.createElement('form');
    this.#container.classList.add('searchbar');
    this.render();

    this.#bindEvent();
  }

  render() {
    this.#container.innerHTML = `
      <input placeholder="검색어를 입력하세요" class="text-placeholder searchbar__input" />
      <button class="searchbar__button" type="submit">
        <img src="./search-icon.png" class="searchbar__icon"/>
      </button>
  `;
  }

  #bindInputEvent() {
    this.#input = this.#container.querySelector('.searchbar__input');
    if (!this.#input) return;
    this.#input.addEventListener('input', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        this.#searchValue = event.target.value;
      }
    });
  }

  #bindSubmitEvent() {
    this.#container.addEventListener('submit', (event) => {
      if (!this.#input) return;

      event.preventDefault();
      this.#input.value = '';
      this.#search();
    });
  }

  #search() {
    if (this.#searchValue.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    params.set('query', this.#searchValue);
    const searchUrl = `/search?${params.toString()}`;
    redirectToPage(searchUrl);
  }

  resetSearchInput() {
    if (!this.#input) return;

    this.#input.value = '';
  }

  #bindEvent() {
    this.#bindInputEvent();

    this.#bindSubmitEvent();
  }

  get element() {
    return this.#container;
  }
}

export default SearchBar;
