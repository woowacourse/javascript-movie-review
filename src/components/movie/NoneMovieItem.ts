import { NONE_MOVIE_ITEM_TEXT } from '../../constants';
import NoMovie from '../../images/no_movie.svg';
import { createElementWithAttribute } from '../../utils';

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
