import { MOVIE_INFO_COMMON_CLASS } from '../../constants';
import XMarker from '../../images/xmark.svg';
import { MovieInfo } from '../../type/movie';
import { createElementWithAttribute } from '../../utils';
import { MovieImg, MovieScore, MovieTitle } from '../movie';
import UserScore from '../movie/UserScore';

import ModalContainer, { ModalContainerHandler } from './ModalContainer';

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
      class: MOVIE_INFO_COMMON_CLASS,
    });

    const $movieInfoModalInner = this.#makeMovieInfoInner();
    $movieInfoModal.appendChild($movieInfoModalInner);

    return $movieInfoModal;
  }

  #makeMovieGenreEl() {
    const { genres } = this.#movieInfo;
    if (!genres) return;

    const $genreBox = createElementWithAttribute('span', {
      class: `${MOVIE_INFO_COMMON_CLASS}__genre`,
    });
    $genreBox.textContent = genres.map((i) => i.name).join(', ');

    return $genreBox;
  }

  #makeMovieInfoInner() {
    const $movieInfoInner = createElementWithAttribute('div', {
      class: `${MOVIE_INFO_COMMON_CLASS}__inner`,
    });

    const $header = this.#makeHeader();
    const $movieInfoContents = this.#makeMovieInfoContents();

    $movieInfoInner.appendChild($header);
    $movieInfoInner.appendChild($movieInfoContents);

    return $movieInfoInner;
  }

  #makeMovieInfoContents() {
    const $movieInfoContents = createElementWithAttribute('div', {
      class: `${MOVIE_INFO_COMMON_CLASS}__inner__contents`,
    });

    const $movieImg = new MovieImg({ ...this.#movieInfo }).element;
    const $movieDescription = this.#makeMovieDescription();
    $movieInfoContents.appendChild($movieImg);
    $movieInfoContents.appendChild($movieDescription);

    return $movieInfoContents;
  }

  #makeHeader() {
    const $h2 = createElementWithAttribute('div', {
      class: `${MOVIE_INFO_COMMON_CLASS}__inner__header`,
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
      class: `${MOVIE_INFO_COMMON_CLASS}__description`,
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
      class: `${MOVIE_INFO_COMMON_CLASS}__description__top`,
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
      class: `${MOVIE_INFO_COMMON_CLASS}__description__overview`,
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
