import { $ } from '../../utils/dom.ts';
import { Logo } from './Logo.ts';
import { SearchForm } from './SearchForm.ts';

export default class SearchHeader {
  #$element: HTMLElement;

  constructor(onSubmit: (query: string) => void) {
    this.#$element = document.createElement('header');
    this.#$element.innerHTML = `
      <div class="background-container">
        <div class="search-container"></div>
      </div>
    `;

    const $justLayout = document.createElement('div');
    $<HTMLElement>(this.#$element, '.search-container').append(Logo(), SearchForm(onSubmit), $justLayout);
  }

  get $element() {
    return this.#$element;
  }
}
