import { NONE_MOVIE_ITEM_TEXT } from '../../constants';
import NoMovie from '../../images/no_movie.svg';
import { createElementWithAttribute } from '../../utils';

/**
 * 화면에 보여줄 영화가 없을 경우를 위한 요소를 생성하는 클래스
 */
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
    const $img = createElementWithAttribute<HTMLImageElement>('img', {
      src: NoMovie,
    });
    const $text = document.createElement('p');
    $text.textContent = NONE_MOVIE_ITEM_TEXT;

    $noItem.appendChild($img);
    $noItem.appendChild($text);
    return $noItem;
  };
}

export default NoneMovieItem;
