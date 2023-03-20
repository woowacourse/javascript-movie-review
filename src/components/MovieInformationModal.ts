import { Movie } from '../types/movie';
import { MOVIE_RETRIEVED } from '../constants';
import MovieList from '../domain/MovieList';
import { CloseButton, EmptyStar } from '../assets';
import { $ } from '../utils/domSelector';

class MovieInformationModal {
  private static instance: MovieInformationModal;
  private informationModal: HTMLDialogElement;

  constructor() {
    $<HTMLElement>('main').insertAdjacentHTML('beforeend', this.template());
    this.init();
    this.informationModal = $<HTMLDialogElement>('.information-modal');
    this.addEventListenerToBackdrop();
  }

  static getInstance(): MovieInformationModal {
    if (!MovieInformationModal.instance) {
      MovieInformationModal.instance = new MovieInformationModal();
    }

    return MovieInformationModal.instance;
  }

  // <img src="${EmptyStar}" alt="별점" />
  // <img src="${EmptyStar}" alt="별점" />
  // <img src="${EmptyStar}" alt="별점" />
  // <img src="${EmptyStar}" alt="별점" />
  // <img src="${EmptyStar}" alt="별점" />

  // need to import close button
  private template() {
    return `
      <dialog class="information-modal">
        <img class="information-image" src="" loading="lazy" alt="" />
        <div class="information-container">
          <img src="${CloseButton}" alt="" class="close-button" />
          <h3 class="information-title"></h3>
          <p class="information-meta-info"></p>
          <p class="information-average-rate"></p>
          <div class="hr"></div>
          <h6 class="information-sub-title">내 별점</h6>
          <div class="information-user-score-container">
            <div class="score-stars"></div>
            <p class="score-comment">볼만해요</p>
            <p class="score-info">(6/10)</p>
          </div>
          <div class="hr"></div>
          <h6 class="information-sub-title">줄거리</h6>
          <p class="information-summary"></p>
        </div>
      </dialog>
    `;
  }

  private init() {
    MovieList.on(MOVIE_RETRIEVED, (event) => {
      const { movie } = (event as CustomEvent).detail;
      this.openModal(movie);
    });
  }

  private openModal(movie: Movie) {
    this.informationModal.showModal();
    // render movie data
  }

  private closeModal() {
    this.informationModal.close();
  }

  private addEventListenerToBackdrop() {
    this.informationModal.addEventListener('click', () => {
      this.closeModal();
    });
  }
}

export default MovieInformationModal.getInstance();
