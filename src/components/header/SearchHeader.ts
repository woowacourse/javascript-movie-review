import { $ } from '../../utils/dom.ts';
import { Logo } from './Logo.ts';
import { SearchForm } from './SearchForm.ts';

export default class TopRateHeader {
  #$element: HTMLElement;

  constructor(onSubmit: (query: string) => void) {
    this.#$element = document.createElement('header');
    this.#$element.innerHTML = `
      <div class="background-container">
        <div class="top-rated-container"></div>
      </div>
    `;

    $<HTMLElement>(this.#$element, '.top-rated-container').append(Logo(), SearchForm(onSubmit));
  }

  get $element() {
    return this.#$element;
  }
}
