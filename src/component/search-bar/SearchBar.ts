import { redirectToPage } from '../../route/router';

class SearchBar {
  #container: HTMLElement;
  #searchValue: string = '';

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('searchbar');
    this.render();

    this.#bindEvent();
  }

  render() {
    this.#container.innerHTML = `
      <input placeholder="검색어를 입력하세요" class="text-placeholder searchbar__input" />
      <img src="./search-icon.png" class="searchbar__icon"/>
  `;
  }

  #bindInputEvent() {
    const input = this.#container.querySelector('.searchbar__input');
    input?.addEventListener('input', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        this.#searchValue = event.target.value;
      }
    });
  }

  #bindEnterEvent() {
    const input = this.#container.querySelector('.searchbar__input');
    input?.addEventListener('keydown', (event) => {
      if (event instanceof KeyboardEvent && event.key === 'Enter' && event.target instanceof HTMLInputElement) {
        this.#search();
      }
    });
  }

  #bindSearchIconEvent() {
    const icon = this.#container.querySelector('.searchbar__icon');
    icon?.addEventListener('click', () => {
      this.#search();
    });
  }

  #search() {
    if (this.#searchValue.length === 0) return;

    const params = new URLSearchParams(window.location.search);
    params.set('query', this.#searchValue);
    const searchUrl = `/search?${params.toString()}`;
    window.history.pushState({}, '', searchUrl);
    redirectToPage(searchUrl);
  }

  #bindEvent() {
    this.#bindInputEvent();
    this.#bindSearchIconEvent();
    this.#bindEnterEvent();
  }

  get element() {
    return this.#container;
  }
}

export default SearchBar;
