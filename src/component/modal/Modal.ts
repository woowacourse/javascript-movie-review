import { $ } from '../../utils/selector';
import modalLoadingTemplate from './loadingTemplate';
import ModalStar from './ModalStar';
import { MovieData } from '../../../types/movie';
import { MovieDetailData } from '../../../types/movie';
import MovieClient from '../../domain/MovieClient';
import LocalStorage from '../../domain/LocalStorage';

class Modal {
  #container;
  #movieData: MovieDetailData | null = null;
  #isLoading = true;
  #modalStar: ModalStar | null = null;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('modal-background');
    this.#container.id = 'modalBackground';
    this.#bindMovieClickedEvent();
    this.#bindESCEvent();
  }

  #renderModalContent(movieDetails?: MovieDetailData) {
    if (this.#isLoading) {
      this.#container.innerHTML = modalLoadingTemplate;
      return;
    }
    if (!movieDetails) throw new Error('영화 데이터가 존재하지 않습니다.');
    this.#container.innerHTML = `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="https://h0ngju.github.io/javascript-movie-review/close_button.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="${movieDetails.imgUrl}" />
          </div>
          <div class="modal-description">
            <h2>${movieDetails.title}</h2>
            <p class="category">${movieDetails.release_date} ${movieDetails.genres}</p>
            <p class="rate"><img src="https://h0ngju.github.io/javascript-movie-review/star_filled.png" class="modal-rate-star" /><span>${movieDetails.score}</span></p>
            <hr />
            <section class="modal-star-section"></section>
            <hr/>
            <p class="detail">${movieDetails.overview}</p>
          </div>
        </div>
      </div>
    `;

    this.#appendStars();
  }

  #appendStars() {
    const starSection = $({ root: this.#container, selector: '.modal-star-section' });
    if (!this.#movieData) throw new Error('영화 데이터가 존재하지 않습니다.');
    this.#modalStar = new ModalStar(this.#movieData.id);
    starSection?.appendChild(this.#modalStar.element);
  }

  #bindMovieClickedEvent = () => {
    document.addEventListener('movie-clicked', (e: Event) => {
      const customEvent = e as CustomEvent;
      this.openModal(customEvent.detail);
    });
  };

  #bindCloseButton = () => {
    const $close = $({ selector: '.close-modal' });
    if (!$close) throw Error('닫기 버튼이 존재하지 않습니다.');
    $close.addEventListener('click', () => this.closeModal());
  };

  #bindESCEvent = () => {
    document.addEventListener('keyup', (event) => {
      if (event.key === 'Escape') {
        this.closeModal();
      }
    });
  };

  #bindClickBarckDrop = () => {
    const $modalBackGround = $({ selector: '.modal-background' });
    if (!$modalBackGround) throw new Error('모달 백그라운드가 존재하지 않습니다.');
    $modalBackGround.addEventListener('click', (event) => {
      if (event.target === event.currentTarget) {
        this.closeModal();
      }
    });
  };

  async openModal(movieData: MovieData) {
    this.#isLoading = true;
    this.#renderModalContent();
    this.#container.classList.add('active');
    document.body.style.overflow = 'hidden';

    const movieDetails = await this.#fetchMovieDetails(movieData);
    this.#isLoading = false;
    this.#renderModalContent(movieDetails);
    this.#bindCloseButton();
    this.#bindClickBarckDrop();
  }

  async #fetchMovieDetails(movieData: MovieData) {
    const movieDetails = await MovieClient.getMovieDetails(movieData.id);
    this.#movieData = movieDetails;

    return movieDetails;
  }

  closeModal() {
    const modalBackground = $({ selector: '#modalBackground' });
    if (!modalBackground) throw Error('모달이 존재하지 않습니다.');
    if (!this.#modalStar) throw Error('modalStar를 찾을 수 없습니다.');
    if (!this.#movieData) throw Error('movieData 찾을 수 없습니다.');

    const userRating = this.#modalStar.getUserRating();
    const updatedMovie = {
      ...this.#movieData,
      userRating: userRating,
    };
    LocalStorage.saveMovie(updatedMovie);

    modalBackground.classList.remove('active');
    document.body.style.overflow = '';
  }

  get element() {
    return this.#container;
  }
}

export default Modal;
