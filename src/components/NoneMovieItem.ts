import NoMovie from '../images/no_movie.svg';
import { createElementWithAttribute } from '../utils';

class NoneMovieItem {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeNoneMovieItem();
  }

  get element() {
    return this.#element;
  }

  #makeNoneMovieItem = () => {
    const $noItem = document.createElement('li');
    const $img = createElementWithAttribute('img', { src: NoMovie });
    const $text = document.createElement('p');
    $text.textContent = '검색 결과가 없습니다.';

    $noItem.appendChild($img);
    $noItem.appendChild($text);
    return $noItem;
  };
}

export default NoneMovieItem;
