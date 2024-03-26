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
    const $img = createElementWithAttribute('img', {
      src: Tap,
      alt: 'list-end-icon',
    });
    const $text = document.createElement('div');
    $text.title = '영화 목록 끝';
    $text.textContent = '___________END____________';

    $noItem.appendChild($img);
    $noItem.appendChild($text);
    return $noItem;
  }
}

export default NoMoreMovieDataItem;
