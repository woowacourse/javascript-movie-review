import './style.css';
import { MovieType } from '../../types/movie';
import { CLOSE_BUTTON, STAR_FILLED } from '../../images';
import ScoreCheckbox from './ScoreCheckbox';
import { URL } from '../../api/url';

const Modal = {
  render(movie: MovieType) {
    const modal = document.createElement('div');
    modal.setAttribute('id', `${movie.title}`);
    modal.classList.add('modal');

    modal.innerHTML = /* html */ `
    <div class="modal-container">
        <div class="modal-header">
            <h2>${movie.title}</h2>
            <button class="modal-close-btn">
                <img src="${CLOSE_BUTTON}" >
            </button>
        </div>
        <div class="modal-main">
            <div class="modal-poster">
                <img src="${URL.IMAGE}${movie.poster_path}" >
            </div>
            <div class="modal-details">
                <div class="movie-info">
                    <h3 class="movie-text">${movie.genre_ids}</h3>
                    <p class="movie-text"><img src=${STAR_FILLED} alt="별점">${movie.vote_average.toFixed(
      1,
    )}</p>
                </div>
                <p class="movie-text summary">${movie.overview}</p>
              
            </div>
        </div>
    </div>
    <div class="modal-backdrop"></div>
    `;

    ScoreCheckbox.render(modal, movie);

    this.handleModal(modal);

    return modal;
  },

  handleModal(modal: HTMLDivElement) {
    this.clickClose(modal);
    this.useEscClose(modal);
  },

  clickClose(modal: HTMLDivElement) {
    modal?.addEventListener('click', (e) => {
      const element = e.target as HTMLElement;

      if (element.className === 'modal-backdrop' || element.className === 'modal-close-btn') {
        modal.remove();
      }
    });
  },

  useEscClose(modal: HTMLDivElement) {
    window?.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modal.remove();
      }
    });
  },
};

export default Modal;
