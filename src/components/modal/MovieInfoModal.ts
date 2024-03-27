import XMarker from '../../images/xmark.svg';
import { createElementWithAttribute } from '../../utils';
import { MovieImg, MovieScore, MovieTitle } from '../movie';
import UserScore from '../movie/UserScore';

import ModalContainer, { ModalContainerHandler } from './ModalContainer';

type MovieInfoGenre = {
  id: number;
  name: string;
}[];

export interface MovieInfo {
  id: number;
  title: string;
  genre: MovieInfoGenre | null;
  poster_path: string | null;
  overview: string | null;
  vote_average: number;
}

const COMMON_CLASS = 'modal-movie-info';

class MovieInfoModal {
  #movieInfo: MovieInfo;
  #element: HTMLElement;

  constructor(movieInfo: MovieInfo) {
    this.#movieInfo = movieInfo;
    this.#element = this.#makeMovieInfoModal();
    this.#renderMovieInfoModal();
  }

  //make element
  #makeMovieInfoModal() {
    const $movieInfoModal = createElementWithAttribute('div', {
      class: COMMON_CLASS,
    });

    const $movieInfoModalInner = this.#makeMovieInfoInner();
    $movieInfoModal.appendChild($movieInfoModalInner);

    return $movieInfoModal;
  }

  #makeMovieGenreEl() {
    const { genre } = this.#movieInfo;
    if (!genre) return;

    const $genreBox = createElementWithAttribute('span', {
      class: `${COMMON_CLASS}__genre`,
    });
    $genreBox.textContent = genre.map((i) => i.name).join(', ');

    return $genreBox;
  }

  #makeMovieInfoInner() {
    const $movieInfoInner = createElementWithAttribute('div', {
      class: `${COMMON_CLASS}__inner`,
    });

    const $header = this.#makeHeader();
    const $movieInfoContents = this.#makeMovieInfoContents();

    $movieInfoInner.appendChild($header);
    $movieInfoInner.appendChild($movieInfoContents);

    return $movieInfoInner;
  }

  #makeMovieInfoContents() {
    const $movieInfoContents = createElementWithAttribute('div', {
      class: `${COMMON_CLASS}__inner__contents`,
    });

    const $movieImg = new MovieImg({ ...this.#movieInfo }).element;
    const $movieDescription = this.#makeMovieDescription();
    $movieInfoContents.appendChild($movieImg);
    $movieInfoContents.appendChild($movieDescription);

    return $movieInfoContents;
  }

  #makeHeader() {
    const $h2 = createElementWithAttribute('div', {
      class: `${COMMON_CLASS}__inner__header`,
    });
    const $movieTitle = new MovieTitle(this.#movieInfo.title).element;
    const $closeButton = this.#makeCloseButton();
    $h2.appendChild($movieTitle);
    $h2.appendChild($closeButton);

    return $h2;
  }

  #makeCloseButton() {
    const $button = createElementWithAttribute('button', {
      class: 'button-close-modal',
    });
    const $img = createElementWithAttribute('img', {
      src: XMarker,
    });
    $button.appendChild($img);

    $button.addEventListener('click', this.#handleClickCloseButton);

    return $button;
  }

  #handleClickCloseButton(event: Event) {
    event.stopPropagation();
    ModalContainerHandler.closeModalContainer();
  }

  #makeMovieDescription() {
    const $description = createElementWithAttribute('div', {
      class: `${COMMON_CLASS}__description`,
    });
    const $top = this.#makeMovieDescriptionTop();
    const $overView = this.#makeMovieDescriptionOverView();
    const $userScore = new UserScore(this.#movieInfo.id).element;

    $description.appendChild($top);
    $description.appendChild($overView);
    $description.appendChild($userScore);

    return $description;
  }

  #makeMovieDescriptionTop() {
    const $top = createElementWithAttribute('section', {
      class: `${COMMON_CLASS}__description__top`,
    });
    const $genreBox = this.#makeMovieGenreEl();
    const $movieScore = new MovieScore(this.#movieInfo.vote_average).element;

    if ($genreBox) {
      $top.appendChild($genreBox);
    }
    $top.appendChild($movieScore);

    return $top;
  }

  #makeMovieDescriptionOverView() {
    const $overView = createElementWithAttribute('section', {
      class: `${COMMON_CLASS}__description__overview`,
    });
    $overView.textContent = this.#movieInfo.overview;

    return $overView;
  }
  //render modal

  #renderMovieInfoModal() {
    new ModalContainer({
      $children: this.#element,
    });
  }
}

export default MovieInfoModal;
