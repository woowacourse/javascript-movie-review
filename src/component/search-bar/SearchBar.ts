import { redirectToPage } from '../../route/router';
import { $ } from '../../utils/selector';

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
    <form class="searchbar__form">
      <input placeholder="검색어를 입력하세요" class="text-placeholder searchbar__input" />
      <button type="submit" class="searchbar__button">
        <img src="https://h0ngju.github.io/javascript-movie-review/search-icon.png" class="searchbar__icon" alt="검색" />
      </button>
    </form>
  `;
  }

  #bindInputEvent() {
    const $input = $({ root: this.#container, selector: '.searchbar__input' });
    $input?.addEventListener('input', (event: Event) => {
      if (!(event.target instanceof HTMLInputElement)) return;
      this.#searchValue = event.target.value;
    });
  }

  #bindFromEvent() {
    const $form = $({ root: this.#container, selector: '.searchbar__form' });
    $form?.addEventListener('submit', (event) => {
      event.preventDefault();
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

  #bindEvent() {
    this.#bindInputEvent();
    this.#bindFromEvent();
  }

  get element() {
    return this.#container;
  }
}

export default SearchBar;
