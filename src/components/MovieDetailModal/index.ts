import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import './MovieDetailModal.style.css';
import { IMAGE_URL, NO_OVERVIEW_MESSAGE } from '../../constants';
import StarRate from './StarRate';
import type { MovieDetail } from '../../types/movie';

const MovieDetailModal = {
  template() {
    return `
      <dialog>
        <div class="modal-backdrop"></div>
        <div id="movie-detail-modal">
          <button id="movie-detail-close">X</button>
          <h2 id="movie-detail-title"></h2>
          <div id="movie-detail-main">
            <img
              onerror="this.src='${posterNotFoundImage}'"
              loading="lazy"
              alt=""
            />
            <div id="movie-detail">
              <div id="movie-detail-text">
                <div id="movie-detail-genre-rate">
                  <div id="movie-detail-genres"></div>
                  <img src=${starFilledImage} alt="별점" />
                  <div id="movie-detail-rate"></div>
                </div>
                <p id="movie-detail-overview"></p>
              </div>
              ${StarRate.template()}
            </div>
          </div>
        </div>
      </dialog>
    `;
  },
  setEvent(target: HTMLElement) {
    StarRate.setEvent(target);

    const modal = document.querySelector<HTMLDialogElement>('dialog');
    if (modal === null) return;

    const closeButton = modal.querySelector('#movie-detail-close') as HTMLButtonElement;
    closeButton.addEventListener('click', () => modal.close());

    const backdrop = modal.querySelector('.modal-backdrop') as HTMLDivElement;
    backdrop.addEventListener('click', () => modal.close());
  },
  open(data: MovieDetail) {
    const modal = document.querySelector<HTMLDialogElement>('dialog');
    if (modal === null) return;

    MovieDetailModal.paint(data, modal);
    modal.showModal();
  },
  paint(data: MovieDetail, modal: HTMLDialogElement) {
    const title = modal.querySelector('h2') as HTMLHeadElement;
    title.innerHTML = data.title;

    const poster = modal.querySelector('img') as HTMLImageElement;
    poster.src = IMAGE_URL + data.poster_path;

    const genres = modal.querySelector('#movie-detail-genres') as HTMLDivElement;
    genres.innerHTML = data.genres.map((genre) => genre.name).join(', ');

    const rate = modal.querySelector('#movie-detail-rate') as HTMLDivElement;
    rate.innerText = data.vote_average.toFixed(1);

    const overview = modal.querySelector('#movie-detail-overview') as HTMLParagraphElement;
    overview.innerText = data.overview !== '' ? data.overview : NO_OVERVIEW_MESSAGE;
  },
};

export default MovieDetailModal;
