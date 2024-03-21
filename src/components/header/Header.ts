import './Header.css';
import { dom } from '../../utils/dom';
import Button from '../common/button/Button';

interface IHeaderProps {
  imageSrc: string;
  onSubmit?: (e: SubmitEvent) => void;
}
class Header {
  $target: HTMLElement;
  #imageSrc: string;

  constructor({ imageSrc, onSubmit }: IHeaderProps) {
    this.$target = document.createElement('header');
    this.#imageSrc = imageSrc;
    this.render();

    console.log(process.env.NODE_ENV); 
    console.log(process.env.PUBLIC_PATH);    
    const $form = dom.getElement<HTMLFormElement>(this.$target, 'form');
    if (onSubmit) $form.addEventListener('submit', onSubmit);
  }

  template() {
    return /*html*/ `
      <h1>
        <a href=${process.env.NODE_ENV === 'production' ? process.env.PUBLIC_PATH :'/'}>
          <img src="./images/logo.png" alt="MovieList 로고" />
        </a>
      </h1>
      <form class="search-box">
        <input id="search-input" type="text" placeholder="검색" />
        
      </form>
`;
  }

  render() {
    this.$target.innerHTML += this.template();
    const button = this.#createSearchButton();

    const $form = dom.getElement(this.$target, '.search-box');
    $form.appendChild(button.$target);

    const $image = dom.getElement<HTMLImageElement>(this.$target, 'h1 > a > img');
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
    });
  }
}

export default Header;
