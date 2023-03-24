import template from './index.html';
export class Header extends HTMLElement {
  #$logo: HTMLElement;
  #$secondSearch: HTMLElement;
  #$originalSearch: HTMLElement;

  constructor() {
    super();
    this.innerHTML = template;
    this.#$logo = this.querySelector('h1')!;
    this.#$originalSearch = this.querySelector('.search-box')!;
    this.#$secondSearch = this.querySelector('.search-box-second')!;
  }

  connectedCallback() {
    this.eventBind();
  }

  eventBind() {
    this.#$secondSearch.addEventListener('click', () => {
      this.#$logo.style.display = 'none';
      this.#$originalSearch.style.display = 'block';
      this.#$secondSearch.style.display = 'none';
    });
  }

  addSearchHandler(searchHandler: CallableFunction) {
    const $input = this.querySelector('input');
    $input?.addEventListener('change', (e: Event) => {
      if (!(e.currentTarget instanceof HTMLInputElement)) return;
      const { value } = e.currentTarget;
      if (value.trim() === '') {
        alert('검색어를 입력해주세요.');
        return;
      }
      searchHandler(value);
      e.currentTarget.value = '';

      this.#$logo.style.display = 'block';
      this.#$originalSearch.style.display = 'none';
      this.#$secondSearch.style.display = 'block';
    });
  }

  addClickLogoHandler(handler: CallableFunction) {
    const $logo = this.querySelector('img');
    $logo?.addEventListener('click', () => {
      handler();
    });
  }
}
