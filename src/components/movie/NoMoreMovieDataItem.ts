import Tap from '../../images/tape.svg';
import { createElementWithAttribute } from '../../utils';

class NoMoreMovieDataItem {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeNoMoreMovieDataItem();
  }

  get element() {
    return this.#element;
  }

  #makeNoMoreMovieDataItem() {
    const $noItem = document.createElement('div');
    $noItem.classList.add('no-more-movie-data');
    const $img = createElementWithAttribute('img', { src: Tap });
    const $text = document.createElement('div');
    $text.textContent = '더 이상 불러올 영화가 없습니다.';

    $noItem.appendChild($img);
    $noItem.appendChild($text);
    return $noItem;
  }

  remove() {
    this.#element.remove();
  }
}

export default NoMoreMovieDataItem;
