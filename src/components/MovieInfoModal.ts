import star_filled from '../assets/star_filled.png';
import star_empty from '../assets/star_empty.png';
import { makePosterImagePath } from '../utils/makePosterImagePath';
import { MovieInterface, ScoreType } from '../utils/type';
import { $, Event } from '../utils/index';
import { ScoreStars, showStar } from './ScoreStar';
import { GENRE, USER_SCORE_TEXT } from '../CONSTANT';
import MovieData from '../data/MovieData';

export function MovieInfoModal() {
  Event.addEvent('click', '.modal-movie-info', (event) => {
    const target = event.target as HTMLElement;

    if (target.classList.contains('modal-close')) {
      const modalElem = $('.modal-movie-info') as HTMLDialogElement;
      modalElem.close();
      return;
    }

    if (target.classList.contains('score')) {
      const starNumber = (Number(target.id.split('-')[2]) * 2) as ScoreType;
      const targetId = Number(target.parentElement?.parentElement?.classList[1]);

      MovieData.giveUserScore(targetId, starNumber);
    }
  });

  Event.addEvent('mouseover', '.modal-movie-info', (event) => {
    const target = event.target as HTMLElement;
    const targetImgElem = target.closest('img') as HTMLImageElement;
    if (targetImgElem === null) return;

    const starNumber = (Number(targetImgElem.id.split('-')[2]) * 2) as ScoreType;
    showStar(starNumber);

    const starArea = $('.modal-movie-score-area') as HTMLElement;
    const scoreText = starNumber ? starNumber + ' ' + USER_SCORE_TEXT[starNumber] : '';
    starArea.children[1].textContent = `${scoreText}`;
  });

  return `
  <dialog class="modal-movie-info">
  </dialog>
     `;
}

export function printMovieDetail(movie: MovieInterface, targetUSerScore: ScoreType) {
  const modalElem = $('.modal-movie-info') as HTMLDialogElement;
  const { poster_path, genre_ids, vote_average, overview, id, title } = movie;
  const scoreText = targetUSerScore ? targetUSerScore + ' ' + USER_SCORE_TEXT[targetUSerScore] : '';

  modalElem.innerText = '';

  modalElem.insertAdjacentHTML(
    'beforeend',
    `<div class="modal-movie-header">
      <p class="modal-movie-name">${title}</p>
      <button type="button" class="modal-close">X</button>
    </div>
    <div class="modal-movie-detail">
      <img src="${makePosterImagePath(poster_path)}" class="modal-movie-poster" alt="poster">
      <div class="modal-movie-detail-text">
        <div class="modal-movie-category">
          ${genre_ids.map((id) => GENRE[id]).join(', ')}
          <img src="${vote_average === 0 ? star_empty : star_filled}" alt="별점" />
          ${vote_average}
        </div>
        <P class="modal-movie-story">${
          overview === '' ? '해당 영화의 줄거리 정보가 없습니다.' : overview
        }</p>
        <div class="modal-movie-score-area ${id}"> 내 별점 
          ${ScoreStars()}
          <span class="modal-movie-score-text">${scoreText}</span>
        </div>
      </div>
    </div>`
  );

  showStar(targetUSerScore);
}
