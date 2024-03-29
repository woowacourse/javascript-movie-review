import './Header.css';

import SEARCH_BUTTON_IMG from '../../assets/images/search_button.png';
import { dom } from '../../utils/dom';
import Button from '../common/button/Button';

let debounce: NodeJS.Timeout | undefined;

interface HeaderProps {
  imageSrc: string;
  onSubmit?: (e: SubmitEvent) => void;
}

interface EventProps extends Pick<HeaderProps, 'onSubmit'> {}

class Header {
  $target: HTMLElement;
  #imageSrc: string;

  constructor({ imageSrc, onSubmit }: HeaderProps) {
    this.$target = document.createElement('header');
    this.#imageSrc = imageSrc;
    this.render();
    this.setEvent({ onSubmit });
  }

  setEvent({ onSubmit }: EventProps) {
    const $form = dom.getElement<HTMLFormElement>(this.$target, 'form');
    if (onSubmit) $form.addEventListener('submit', onSubmit);
    window.addEventListener('resize', this.handleResize.bind(this));
  }

  template() {
    return /*html*/ `
      <h1 id='logo'>
        <a href=${process.env.NODE_ENV === 'production' ? process.env.PUBLIC_PATH : '/'}>
          <img src=${this.#imageSrc} alt="MovieList 로고" />
        </a>
      </h1>
      <form class="search-box">
        <input id="search-input" class='search-input' type="text" placeholder="검색" />
      </form>
`;
  }

  render() {
    this.$target.innerHTML += this.template();
    const searchButton = this.#createSearchButton();

    const $form = dom.getElement(this.$target, '.search-box');
    $form.appendChild(searchButton.$target);

    const $image = dom.getElement<HTMLImageElement>(this.$target, 'h1 > a > img');
    $image.setAttribute('src', this.#imageSrc);
  }

  #createSearchButton() {
    const childImage = document.createElement('img');
    childImage.setAttribute('src', SEARCH_BUTTON_IMG);
    childImage.classList.add('search-button-icon');

    return new Button({
      id: 'search-button',
      classNames: ['search-button'],
      children: [childImage],
    });
  }

  handleResize() {
    if (debounce) clearTimeout(debounce);

    debounce = setTimeout(() => {
      const width = window.innerWidth;
      if (width > 400) {
        dom.getElement(this.$target, '#logo').classList.remove('clicked-logo');
        dom.getElement(this.$target, '.search-box').classList.remove('clicked-form');
        dom.getElement(this.$target, '.search-input').classList.remove('clicked-input');
        dom.getElement(document.body, 'header').classList.remove('clicked-header');
      }
    }, 100);
  }
}

export default Header;
