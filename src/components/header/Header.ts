import { dom } from '../../utils/dom';

interface IHeaderProps {
  imageSrc: string;
}
class Header {
  $target: HTMLElement;
  #imageSrc: string;

  constructor({ imageSrc }: IHeaderProps) {
    this.$target = document.createElement('header');
    this.#imageSrc = imageSrc;
    this.render();
  }

  template() {
    return /*html*/ `
      <h1>
        <img src="./images/logo.png" alt="MovieList 로고" />
      </h1>
      <div class="search-box">
        <input type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </div>
`;
  }

  render() {
    this.$target.innerHTML += this.template();
    const $image = dom.getElement<HTMLImageElement>(this.$target, 'h1 > img');
    $image.setAttribute('src', this.#imageSrc);
  }
}

export default Header;
