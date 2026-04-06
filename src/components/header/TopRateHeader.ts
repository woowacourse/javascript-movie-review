import { getOriginalImageUrl } from '../../api/renderImage.ts';
import { MovieData } from '../../api/type.ts';
import { $ } from '../../utils/dom.ts';
import { Logo } from './Logo.ts';
import { Overlay } from './Overlay.ts';
import { SearchForm } from './SearchForm.ts';
import { TopRate } from './TopRate.ts';

export default class TopRateHeader {
  #$element: HTMLElement;

  constructor(onSubmit: (query: string) => void) {
    this.#$element = document.createElement('header');
    this.#$element.innerHTML = `
      <div class="background-container top-header-container">
        <div class="top-rated-container"></div>
      </div>
    `;

    const $justLayout = document.createElement('div');
    $<HTMLElement>(this.#$element, '.top-rated-container').append(Logo(), SearchForm(onSubmit), $justLayout);
    $<HTMLElement>(this.#$element, '.background-container').append(Overlay());
  }

  get $element() {
    return this.#$element;
  }

  render(data: MovieData) {
    $<HTMLElement>(this.#$element, '.background-container').style.backgroundImage =
      `url(${getOriginalImageUrl(data.backdrop_path)})`;
    $<HTMLElement>(this.#$element, '.top-rated-container').append(TopRate(data));
  }
}
