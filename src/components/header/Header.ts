import './Header.css';
import { dom } from '../../utils/dom';
import Button from '../common/button/Button';

const TEMPLATE = `
  <h1 class="header-title">
    <a href="/">
      <img class="header-title__logo" src="./images/logo.png" alt="MovieList - 홈으로 이동" />
    </a>
  </h1>
  <form class="search-box">
    <input id="search-input" type="text" placeholder="검색" />
  </form>
`;
const MD_SCREEN_WIDTH = 768;

interface IHeaderProps {
  readonly imageSrc: string;
  readonly onSubmit?: (e: SubmitEvent) => void;
}
class Header {
  $target: HTMLElement;
  #imageSrc: string;

  constructor({ imageSrc, onSubmit }: IHeaderProps) {
    this.$target = document.createElement('header');
    this.$target.classList.add('header');
    this.#imageSrc = imageSrc;
    this.render();

    const $form: HTMLFormElement = dom.getElement(this.$target, 'form');
    if (onSubmit) $form.addEventListener('submit', onSubmit);
  }

  render() {
    this.$target.innerHTML = TEMPLATE;
    const button = this.#createSearchButton();

    const $form = dom.getElement(this.$target, '.search-box');
    $form.appendChild(button.$target);

    const $image: HTMLImageElement = dom.getElement(this.$target, '.header-title__logo');
    $image.setAttribute('src', this.#imageSrc);
  }

  #createSearchButton() {
    const childImage = document.createElement('img');
    childImage.setAttribute('src', './images/search_button.png');
    childImage.classList.add('search-button-icon');

    return new Button({
      id: 'search-button',
      classNames: ['search-button'],
      children: [childImage],
      onClick: () => {
        if (window.innerWidth < MD_SCREEN_WIDTH) {
          dom.getElement(this.$target, '.header-title').style.display = 'none';
          const $searchBox = dom.getElement(this.$target, '.search-box');
          dom.getElement($searchBox, '#search-input').style.display = 'block';
          $searchBox.style.maxWidth = '300px';
          this.$target.style.justifyContent = 'flex-end';
        }
      },
    });
  }
}

export default Header;
