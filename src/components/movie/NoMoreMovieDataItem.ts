import Tap from '../../images/tape.svg';
import { createElementWithAttribute } from '../../utils';

/**
 * 더 이상 불러올 영화가 없을 경우 영화 리스트의 마지막에 등장하는 요소를 생성하는 클래스
 */
class NoMoreMovieDataItem {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeNoMoreMovieDataItem();
  }

  get element() {
    return this.#element;
  }

  #makeNoMoreMovieDataItem() {
    const $noItem = createElementWithAttribute('div', {
      class: 'no-more-movie-data',
    });

    const $img = createElementWithAttribute<HTMLImageElement>('img', {
      src: Tap,
      alt: 'list-end-icon',
    });

    $noItem.appendChild($img);
    $noItem.appendChild(this.#makeNoMoreMovieDataItemText());

    return $noItem;
  }

  #makeNoMoreMovieDataItemText() {
    const $text = document.createElement('div');
    $text.title = '영화 목록 끝';
    $text.textContent = '___________END____________';

    return $text;
  }
}

export default NoMoreMovieDataItem;
