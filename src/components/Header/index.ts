import template from './index.html';
import { STRING } from '../../utils/Constant';
import { $$ } from '../../utils/Dom';
export class Header extends HTMLElement {
  #$logo: HTMLElement;
  #$secondSearch: HTMLElement;
  #$originalSearch: HTMLElement;

  constructor() {
    super();
    this.innerHTML = template;
    this.#$logo = $$('h1', HTMLElement, this);
    this.#$originalSearch = $$('.search-box', HTMLDivElement, this);
    this.#$secondSearch = $$('.search-box-second', HTMLDivElement, this);
  }

  connectedCallback() {
    this.eventBind();
  }

  private eventBind() {
    this.#$secondSearch.addEventListener('click', () => {
      this.#$logo.style.display = 'none';
      this.#$originalSearch.style.display = 'block';
      this.#$secondSearch.style.display = 'none';
    });
  }

  addSearchHandler(searchHandler: CallableFunction) {
    const $input = $$('input', HTMLInputElement, this);
    $input?.addEventListener('change', (e: Event) => {
      if (!(e.currentTarget instanceof HTMLInputElement)) return;
      const { value } = e.currentTarget;
      if (value.trim() === '') {
        alert(STRING.INPUT_SEARCH);
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
    const $logo = $$('img', HTMLImageElement, this);
    $logo?.addEventListener('click', () => {
      handler();
    });
  }
}
