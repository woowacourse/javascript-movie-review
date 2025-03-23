import { redirectToPage } from '../../route/router';
//@TODO 버튼을 먼저 확장성 좋게 리팩토링 한 후 사용 할 것

class SearchBar {
  #container: HTMLElement;
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
    const input = this.#container.querySelector('.searchbar__input');
    input?.addEventListener('input', (event: Event) => {
      if (event.target instanceof HTMLInputElement) {
        this.#searchValue = event.target.value;
      }
    });
  }

  #bindSubmitEvent() {
    this.#container.addEventListener('submit', (event) => {
      event.preventDefault();
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
    this.#bindSubmitEvent();
  }

  get element() {
    return this.#container;
  }
}

export default SearchBar;
