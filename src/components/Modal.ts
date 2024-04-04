import movieInfo from './MovieInfo';
import VoteHandler from './VoteHandler';

export default class Modal {
  #isOpen = false;

  #modalElement: HTMLElement | null = null;

  static instance: Modal | null = null;

  #movieId: number;

  #voteHandler: any;

  constructor(movieId: number) {
    this.#movieId = movieId;
  }

  // eslint-disable-next-line max-lines-per-function
  async generateModal() {
    this.#removeExistingModal();

    const skeletonModalElement = movieInfo.generateSkeletonModal();

    const movieDetail = await movieInfo.fetchMovieDetail(this.#movieId);
    const modalContent = movieInfo.prepareModalContent(movieDetail);
    const modalElement = movieInfo.createModalElement(modalContent);

    skeletonModalElement.remove();

    document.body.appendChild(modalElement);
    this.#modalElement = modalElement;
    this.#setupModalEventListener(this.#modalElement);

    this.#voteHandler = new VoteHandler(this.#movieId, this.#modalElement);
  }

  #removeExistingModal() {
    if (!this.#modalElement) return;

    this.#modalElement.remove();
    this.#modalElement = null;
  }

  // eslint-disable-next-line max-lines-per-function
  #setupModalEventListener(modalElement: HTMLElement) {
    modalElement.addEventListener('click', (event) => {
      this.handleModalClick(event);

      const button = event.target;
      const starButtons = modalElement.querySelectorAll('.my-vote-body button img');
      const starIndex = Array.from(starButtons).findIndex((btn) => btn === button);

      if (starIndex !== -1) {
        this.#voteHandler.handleStarClick(starIndex);
      }
    });
  }

  async openModal() {
    if (this.#isOpen) return;

    document.body.style.overflow = 'hidden';
    await this.generateModal();
    this.#voteHandler.VoteHandler();
    document.addEventListener('keydown', this.#handleKeyDown);
    this.#isOpen = true;
  }

  closeModal() {
    if (!this.#isOpen) return;

    document.body.style.overflow = 'auto';
    this.removeKeydownEventListener();
    this.#removeExistingModal();
    this.#isOpen = false;
  }

  #handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  };

  removeKeydownEventListener() {
    document.removeEventListener('keydown', this.#handleKeyDown);
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
