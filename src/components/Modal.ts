import { fetchMovieDetail } from '../store/API';

export default class Modal {
  #isOpen = false;

  #modalElement: HTMLElement | null = null;

  static instance: Modal | null = null;

  #movieId: number;

  constructor(movieId: number) {
    this.#movieId = movieId;
  }

  // eslint-disable-next-line max-lines-per-function
  async generateModal() {
    if (this.#modalElement) {
      this.#modalElement.remove();
      this.#modalElement = null;
    }

    const movieDetail = await fetchMovieDetail(this.#movieId);

    const posterPath = movieDetail.poster_path
      ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
      : '../images/no-image.png';

    const genres = movieDetail.genres.map((genre: any) => genre.name).join(', ');

    const modalElement = document.createElement('div');
    modalElement.classList.add('modal', 'modal--open');

    const modalHTML = /* html */ `
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <div class="modal-header">
        <h3 class="detail-title text-detail-title">${movieDetail.title}</h3>
        <button class="modal-close-button"></button>
      </div>
      <div class="modal-body">
        <img src=${posterPath} alt="포스터 이미지" class="detail-poster"/>
        <div class="modal-contents">
          <div class="detail-text-container">
            <div class="detail-text-top">
              <p class="detail-genres text-detail-contents">${genres}</p>
              <p class="detail-vote_average text-detail-contents">${movieDetail.vote_average}</p>
            </div>
            <p class="detail-overview text-detail-contents">${movieDetail.overview}</p>
          </div>
          <div class="my-vote">
            <p class="my-vote-title text-detail-vote">내 별점</p>
            <div class="my-vote-body">
              <button><img src="./images/star_filled.png"/></button>
              <button><img src="./images/star_filled.png"/></button>
              <button><img src="./images/star_filled.png"/></button>
              <button><img src="./images/star_empty.png"/></button>
              <button><img src="./images/star_empty.png"/></button>
            </div>
            <p class="my-vote-number text-detail-vote-contents">6</p>
            <p class="my-vote-description text-detail-vote-contents">보통이에요</p>
          </div>
        </div>
      </div>
    </div>
   `;

    modalElement.innerHTML = modalHTML;
    document.body.appendChild(modalElement);
    this.#modalElement = modalElement;

    modalElement.addEventListener('click', (event) => this.handleModalClick(event));
  }

  async openModal() {
    if (this.#isOpen) return;

    await this.generateModal();
    this.#isOpen = true;
  }

  closeModal() {
    if (!this.#isOpen) return;

    if (this.#modalElement) {
      this.#modalElement.remove();
      this.#modalElement = null;
    }

    this.#isOpen = false;
  }

  handleModalClick(event: Event) {
    if (!(event.target instanceof HTMLElement)) return;

    const modalBackDrop = document.querySelector('.modal-backdrop');
    const modalCloseButton = event.target.closest('.modal-close-button');

    if (event.target === modalBackDrop || event.target === modalCloseButton) {
      this.closeModal();
    }
  }

  static getInstance(movieId: number) {
    if (!Modal.instance || Modal.instance.#movieId !== movieId) {
      Modal.instance = new Modal(movieId);
    }

    return Modal.instance;
  }
}
