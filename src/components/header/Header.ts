import { getOriginalImageUrl } from '../../api/renderImage.ts';
import { MovieData } from '../../api/types.ts';
import { $ } from '../../utils/dom.ts';
import { Logo } from './Logo.ts';
import { SearchForm } from './SearchForm.ts';
import { TopRate } from './TopRate.ts';
import { Overlay } from './Overlay.ts';

export default class Header {
  #$element: HTMLElement;
  #$background: HTMLElement;
  #$banner: HTMLElement;
  #$overlay: HTMLElement;
  #$topRate: HTMLElement | null = null;

  constructor(onSubmit: (query: string) => void) {
    this.#$element = document.createElement('header');
    this.#$element.innerHTML = `
      <div class="background-container">
        <div class="banner-container"></div>
      </div>
    `;

    this.#$background = $(this.#$element, '.background-container');
    this.#$banner = $(this.#$element, '.banner-container');
    this.#$overlay = Overlay();
    this.#$overlay.classList.add('hidden');

    this.#$background.prepend(this.#$overlay);
    const $justLayout = document.createElement('div');
    this.#$banner.append(Logo(), SearchForm(onSubmit), $justLayout);
    this.#$banner.classList.add('hidden');
  }

  get $element() {
    return this.#$element;
  }

  showBanner(data: MovieData) {
    this.#$background.style.backgroundImage = `url(${getOriginalImageUrl(data.backdrop_path)})`;
    this.#$background.classList.add('top-header-container');

    if (this.#$topRate) this.#$topRate.remove();
    this.#$topRate = TopRate(data);
    this.#$background.append(this.#$topRate);

    this.#$overlay.classList.remove('hidden');
    this.#$banner.classList.remove('hidden');
  }

  hideBanner() {
    this.#$overlay.classList.add('hidden');
    this.#$banner.classList.add('hidden');
    this.#$background.classList.remove('top-header-container');
    this.#$background.style.backgroundImage = '';
  }
}
