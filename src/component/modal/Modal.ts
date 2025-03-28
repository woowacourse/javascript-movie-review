import { extractedMovieDetails } from '../../domain/APIManager';
import LocalStorage from '../../domain/LocalStorage';
import { $ } from '../../utils/selector';
import ModalStar from './ModalStar';

class Modal {
  #container;
  #movieData!: MovieData;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('modal-background');
    this.#container.id = 'modalBackground';
    this.#bindMovieClickedEvent();
    this.#bindESCEvent();
  }

  #renderModalContent(movieDetails: MovieDetailData) {
    this.#container.innerHTML = `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./public/close_button.png" />
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
            <section></section>
            <hr/>
            <p class="detail">${movieDetails.overview}</p>
          </div>
        </div>
      </div>
    `;

    const starSection = $({ root: this.#container, selector: 'section' });
    const savedStars = LocalStorage.getMovieStarById(this.#movieData.id);
    const modalStar = new ModalStar(this.#movieData.id, savedStars);
    starSection?.appendChild(modalStar.element);
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

  async openModal(movieData: MovieData) {
    document.body.style.overflow = 'hidden';
    this.#movieData = movieData;
    const movieDetails = await extractedMovieDetails(movieData.id);
    const stored = {
      ...movieDetails,
      userRating: LocalStorage.getMovieStarById(movieData.id),
    };
    LocalStorage.saveMovie(stored);

    this.#renderModalContent(movieDetails);
    this.#bindCloseButton();
    this.#container.classList.add('active');
  }

  closeModal() {
    const modalBackground = $({ selector: '#modalBackground' });
    if (!modalBackground) throw Error('모달이 존재하지 않습니다.');
    modalBackground.classList.remove('active');
  }

  get element() {
    return this.#container;
  }
}

export default Modal;
