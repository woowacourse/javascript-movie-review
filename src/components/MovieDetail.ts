import star_empty from '../assets/star_empty.png';
import star_filled from '../assets/star_filled.png';

import { getMovieDetail, IMovie } from '../api/api';
import { makeImagePath } from '../utils/makeImagePath';
import { makeGenreList } from '../utils/makeGenreList';
import { $ } from '../utils';

function closeModal() {
  const $modalContainer = $('.modal-container') as HTMLDivElement;
  $modalContainer.remove();

  const $modal = $('.modal') as HTMLDialogElement;
  $modal.close();
}

export async function renderMovieDetail(movieId: string, parentEl: HTMLElement) {
  const clickedMovieDetail = await getMovieDetail(movieId);
  parentEl.insertAdjacentHTML('beforeend', MovieDetail(clickedMovieDetail));

  $('.modal-close-btn')?.addEventListener('click', () => {
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

export function Modal() {
  return `
        <dialog class="modal">
            <div class="modal-backdrop"></div>
        </dialog>
    `;
}

export function MovieDetail({ title, poster_path, genres, vote_average, overview }: IMovie) {
  return `
        <div class="modal-container">
            <header>
                <h2 class="modal-title text-title">${title}</h2>
                <button class="modal-close-btn">X</button>
            </header>
            <div id="poster">
                <img src=${makeImagePath(poster_path)} style="width: 200px;" loading="lazy">
            </div>
                <div class="movie-info">
                    <span>${makeGenreList(genres)}</span>
                    <img class="movie-vote-average" src=${star_filled} > 
                    <span>${vote_average}</span>
                    <p>${overview}</p>
                </div>
                <div class="movie-star">
                    <span>내 별점</span>
                    <img class="rate-star" src=${star_empty} data-value="1">
                    <img class="rate-star" src=${star_empty} data-value="2">
                    <img class="rate-star" src=${star_empty} data-value="3">
                    <img class="rate-star" src=${star_empty} data-value="4">
                    <img class="rate-star" src=${star_empty} data-value="5">
                    <span>별점 결과</span>
                </div>
        </div>
    `;
}
