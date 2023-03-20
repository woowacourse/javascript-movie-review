import { $, dispatchCustomEvent, isFormElement } from '../utils/domUtils';

class MovieHeader extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = /* html */ `
      <header>
        <h1 class="title"><img src="./logo.png" alt="MovieList 로고" /></h1>
        <form class="search-box">
          <input id="search-input" type="text" placeholder="검색" required />
          <button class="search-button">검색</button>
        </form>
      </header>
    `;
  }

  connectedCallback() {
    const $searchBox = $('.search-box');

    if (isFormElement($searchBox)) {
      $searchBox.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    $('.title')?.addEventListener('click', () => dispatchCustomEvent(this, 'home'));
  }

  handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    if (!(e.target instanceof HTMLFormElement)) return;

    const [input] = e.target.elements;
    if (!(input instanceof HTMLInputElement)) return;

    const isInputEmpty = input.value.trim() === '';
    if (isInputEmpty) {
      alert('검색어를 입력해 주세요.');
      return;
    }

    dispatchCustomEvent(this, 'search', input.value);
  }
}

export default MovieHeader;
