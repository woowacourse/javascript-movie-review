import { dom } from '../../utils/dom';

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

    const $form = dom.getElement<HTMLFormElement>(this.$target, 'form');
    if (onSubmit) $form.addEventListener('submit', onSubmit);
  }

  template() {
    return /*html*/ `
      <h1>
        <img src="./images/logo.png" alt="MovieList 로고" />
      </h1>
      <form class="search-box">
        <input id="search-input" type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </form>
`;
  }

  render() {
    this.$target.innerHTML += this.template();
    const $image = dom.getElement<HTMLImageElement>(this.$target, 'h1 > img');
    $image.setAttribute('src', this.#imageSrc);
  }
}

export default Header;
