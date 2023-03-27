import star_filled from '../assets/star_filled.png';

import { getMovieDetail, IMovie } from '../api/api';
import { makeImagePath } from '../utils/makeImagePath';
import { makeGenreList } from '../utils/makeGenreList';
import { $ } from '../utils';
import { fixDecimal } from '../utils/fixDecimal';
import { RATE_DETAIL } from '../constants/constants';
import { MovieRate } from '../data/MovieRate';
import { getData } from '../utils/localStorage';
import { ErrorModal, ErrorPage } from './ErrorPage';

const rateData = new MovieRate(getData('rate'));

export function Modal() {
  return `
        <dialog class="modal">
            <div class="modal-backdrop"></div>
        </dialog>
    `;
}

export async function renderMovieDetail(movieId: string, parentEl: HTMLElement) {
  const clickedMovieDetail = await getMovieDetail(movieId);

  if (clickedMovieDetail) {
    parentEl.insertAdjacentHTML('beforeend', MovieDetail(clickedMovieDetail));

    const rating_star = $('.rating-star') as HTMLSpanElement;
    const rating_input = $('.rating input') as HTMLInputElement;

    const currentRate = rateData.getMovieRate(movieId);
    if (currentRate) rating_star.style.width = `${currentRate * 10}%`;

    rating_input?.addEventListener('input', (event) => {
      const rating_number = rating_input.value;
      const rating_detail = RATE_DETAIL[rating_number];

      rating_star.style.width = `${Number(rating_number) * 10}%`;
      $('#rate-result').textContent = `${rating_number} ${rating_detail}`;

      if (rating_number === '0' && rating_detail === undefined) {
        $('#rate-result').textContent = '';
      }

      if (event.target instanceof HTMLInputElement)
        rateData.setClickedMovie(event.target.id, Number(rating_number));
    });
    setModalCloseEvent();
    return;
  }

  parentEl.insertAdjacentHTML('beforeend', ErrorModal());
  setModalCloseEvent();
}

function setModalCloseEvent() {
  $('.modal-close-btn')?.addEventListener('click', () => {
    if (rateData.clickedMovie !== null) rateData.setMovieRate();
    closeModal();
  });
  /* ESC 이벤트가 2번 실행되는 이슈 존재함
    document.addEventListener('keydown', (event) => {
        if (event instanceof KeyboardEvent && event.key === 'Escape') {
            closeModal();
        }
    });
  */
}

function closeModal() {
  const $modalContainer = $('.modal-container') as HTMLDivElement;
  $modalContainer.remove();

  const $modal = $('.modal') as HTMLDialogElement;
  $modal.close();
}

export function MovieDetail({ id, title, poster_path, genres, vote_average, overview }: IMovie) {
  return `
        <div class="modal-container">
            <header>
                <h2 class="modal-title text-title">${title}</h2>
                <button class="modal-close-btn">X</button>
            </header>
            <div class="poster">
                <img src=${makeImagePath(poster_path)} style="width: 200px;" loading="lazy">
            </div>
            <div class="movie-info">
                <span class="movie-info-header">
                    ${makeGenreList(genres)}
                    <img class="movie-vote-average" src=${star_filled} >
                    <span>${fixDecimal(vote_average)}</span>
                </span>
                <p>${overview}</p>
                ${MovieRatingBox(id)}
            </div>
        </div>
    `;
}

export function MovieRatingBox(movieId: number) {
  let rateMessage;
  const currentRate = rateData.getMovieRate(String(movieId));

  if (currentRate) rateMessage = RATE_DETAIL[String(currentRate)];
  else rateMessage = '';

  return `
    <div class="rating-box">
        <h3>내 별점</h3>
        <div class="rating">
            ★★★★★
            <span class="rating-star">★★★★★</span>
            <input type="range" value="0" step="2" min="0" max="10" id=${movieId}>
        </div>
        <h3 id="rate-result">${rateMessage}</h3>
    </div>
 
 `;
}
