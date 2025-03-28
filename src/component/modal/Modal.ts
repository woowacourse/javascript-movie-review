import { $ } from '../../utils/selector';

class Modal {
  #container;

  constructor() {
    this.#container = document.createElement('div');
    this.#container.classList.add('modal-background');
    this.#container.id = 'modalBackground';

    this.#bindMovieClickedEvent();
  }

  #renderModalContent(movieData: MovieData) {
    this.#container.innerHTML = `
      <div class="modal">
        <button class="close-modal" id="closeModal">
          <img src="./public/close_button.png" />
        </button>
        <div class="modal-container">
          <div class="modal-image">
            <img src="${movieData.imgUrl}" />
          </div>
          <div class="modal-description">
            <h2>${movieData.title}</h2>
            <p class="category">${movieData.genres}</p>
            <p class="rate"><img src="https://h0ngju.github.io/javascript-movie-review/star_filled.png" class="star" /><span>${movieData.score}</span></p>
            <hr />
            <p class="detail">${movieData.overview}</p>
          </div>
        </div>
      </div>
    `;
  }

  #bindMovieClickedEvent = () => {
    document.addEventListener('movie-clicked', (e: Event) => {
      const customEvent = e as CustomEvent;
      console.log(customEvent.detail);
      this.openModal(customEvent.detail);
    });
  };

  #bindCloseButton = () => {
    const $close = $({ selector: '.close-modal' });
    if (!$close) throw Error('닫기 버튼이 존재하지 않습니다.');
    $close.addEventListener('click', () => this.closeModal());
  };

  openModal(movieData: MovieData) {
    this.#renderModalContent(movieData);
    this.#bindCloseButton();
    this.#container.classList.add('active');
  }

  closeModal() {
    const modalBackground = $({ selector: '#modalBackground' });
    if (!modalBackground) throw Error('모달이 존재하지 않습니다.');
    modalBackground.classList.remove('active');
    console.log(modalBackground.classList);
  }

  get element() {
    return this.#container;
  }
}

export default Modal;
