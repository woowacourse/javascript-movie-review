import { fetchMovieDetail } from '../store/API';
import { VOTE } from '../constants';

import NoImage from '../images/no-image.png';
import StarFilled from '../images/star_filled.png';
import StarEmpty from '../images/star_empty.png';

export default class Modal {
  #isOpen = false;

  #modalElement: HTMLElement | null = null;

  static instance: Modal | null = null;

  #movieId: number;

  #myVoteResult: { [key: string]: number } = {};

  constructor(movieId: number) {
    this.#movieId = movieId;

    const savedVotes = localStorage.getItem('myVoteResult');
    if (savedVotes) {
      this.#myVoteResult = JSON.parse(savedVotes);
    }
  }

  async generateModal() {
    this.#removeExistingModal();

    const movieDetail = await this.#fetchMovieDetail();

    const modalElement = this.#createModalElement(movieDetail);
    document.body.appendChild(modalElement);
    this.#modalElement = modalElement;

    this.#setupModalEventListener(this.#modalElement);
  }

  get Element() {
    return this.#modalElement;
  }

  #removeExistingModal() {
    if (!this.#modalElement) return;

    this.#modalElement.remove();
    this.#modalElement = null;
  }

  async #fetchMovieDetail() {
    const moviedetail = await fetchMovieDetail(this.#movieId);
    const movieDetail = await moviedetail.json();

    return movieDetail;
  }

  // eslint-disable-next-line max-lines-per-function
  #createModalElement(movieDetail: any) {
    const modalElement = document.createElement('div');
    modalElement.classList.add('modal', 'modal--open');

    const posterPath = movieDetail.poster_path ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}` : NoImage;
    const genres = movieDetail.genres.map((genre: any) => genre.name).join(', ');
    const overview = movieDetail.overview ? movieDetail.overview : '해당 영화의 줄거리 정보가 없습니다.';

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
                <p class="detail-vote_average text-detail-contents">
                  <img src=${StarFilled} alt="별점" class="star-start" />
                  ${movieDetail.vote_average.toFixed(2)}
                </p>
              </div>
              <p class="detail-overview text-detail-contents">${overview}</p>
            </div>
            <div class="my-vote">
              <p class="my-vote-title text-detail-vote">내 별점</p>
              <div class="my-vote-body">
                <button><img src=${StarEmpty} /></button>
                <button><img src=${StarEmpty} /></button>
                <button><img src=${StarEmpty} /></button>
                <button><img src=${StarEmpty} /></button>
                <button><img src=${StarEmpty} /></button>
              </div>
              <p class="my-vote-number text-detail-vote-contents">0</p>
              <p class="my-vote-description text-detail-vote-contents">남겨주세요</p>
            </div>
          </div>
        </div>
      </div>
    `;

    modalElement.innerHTML = modalHTML;
    return modalElement;
  }

  #setupModalEventListener(modalElement: HTMLElement) {
    modalElement.addEventListener('click', (event) => {
      this.handleModalClick(event);

      const button = event.target;
      const starButtons = modalElement.querySelectorAll('.my-vote-body button img');
      const starIndex = Array.from(starButtons).findIndex((btn) => btn === button);
      if (starIndex !== -1) {
        this.handleStarClick(starIndex);
      }
    });
  }

  // eslint-disable-next-line max-lines-per-function
  async openModal() {
    if (this.#isOpen) return;

    document.body.style.overflow = 'hidden';
    await this.generateModal();

    this.#VoteHandler();

    document.addEventListener('keydown', this.#handleKeyDown);

    this.#isOpen = true;
  }

  // eslint-disable-next-line max-lines-per-function
  #VoteHandler() {
    const savedVotes = localStorage.getItem('myVoteResult');
    if (savedVotes) {
      const savedVotesJSON = JSON.parse(savedVotes);
      this.#myVoteResult = savedVotesJSON;
    }

    const voteForMovie = this.#myVoteResult[this.#movieId];
    if (voteForMovie) {
      this.#updateVoteStar(voteForMovie);
      this.#updateVoteText(voteForMovie);
    }
  }

  // eslint-disable-next-line max-lines-per-function
  #updateVoteStar(voteForMovie: number) {
    const starButtons = this.#modalElement?.querySelectorAll('.my-vote-body button img');

    if (starButtons) {
      starButtons.forEach((starButton, index) => {
        if (index < voteForMovie / 2) {
          starButton.setAttribute('src', StarFilled);
        } else {
          starButton.setAttribute('src', StarEmpty);
        }
      });
    }
  }

  #updateVoteText(voteForMovie: number) {
    const myVoteNumber = this.#modalElement?.querySelector('.my-vote-number');
    const myVoteDescription = this.#modalElement?.querySelector('.my-vote-description');

    if (!myVoteNumber || !myVoteDescription) return;

    myVoteNumber.textContent = voteForMovie.toString();
    myVoteDescription.textContent = VOTE[voteForMovie];
  }

  #handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      this.closeModal();
    }
  };

  removeKeydownEventListener() {
    document.removeEventListener('keydown', this.#handleKeyDown);
  }

  closeModal() {
    if (!this.#isOpen) return;

    document.body.style.overflow = 'auto';

    this.removeKeydownEventListener();
    this.#removeExistingModal();

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

  // eslint-disable-next-line max-lines-per-function
  handleStarClick(starIndex: number) {
    const myVoteNumber = this.#modalElement?.querySelector('.my-vote-number');
    const myVoteDescription = this.#modalElement?.querySelector('.my-vote-description');

    if (!myVoteNumber || !myVoteDescription) return;

    const starButtons = this.#modalElement?.querySelectorAll('.my-vote-body button img');
    if (!starButtons) return;

    starButtons.forEach((starButton, index) => {
      if (index <= starIndex) {
        starButton.setAttribute('src', StarFilled);
      } else {
        starButton.setAttribute('src', StarEmpty);
      }
    });

    const myVoteKey = (starIndex + 1) * 2;
    myVoteNumber.textContent = myVoteKey.toString();
    myVoteDescription.textContent = VOTE[myVoteKey];

    this.#myVoteResult[this.#movieId] = myVoteKey;
    localStorage.setItem('myVoteResult', JSON.stringify(this.#myVoteResult));
  }

  static getInstance(movieId: number) {
    if (!Modal.instance || Modal.instance.#movieId !== movieId) {
      Modal.instance = new Modal(movieId);
    }

    return Modal.instance;
  }
}
