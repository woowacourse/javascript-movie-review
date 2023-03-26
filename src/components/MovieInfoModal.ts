import star_filled from '../assets/star_filled.png';
import star_empty from '../assets/star_empty.png';
import { makePosterImagePath } from '../utils/makePosterImagePath';
import { MovieInterface, ScoreType } from '../utils/type';
import { $, Event } from '../utils/index';
import { UserScoreStar } from './UserScoreStar';
import { GENRE, USER_SCORE_TEXT } from '../CONSTANT';

export function MovieInfoModal() {
  return `
  <dialog class="modal-movie-info">
    <div class="modal-movie-header">
        <p class="modal-movie-name"> </p>
        <button class="modal-close">X</button>
    </div>
    <div class="modal-movie-detail">
        
    </div>
  </dialog>
     `;
}

export function printMovieDetail(movie: MovieInterface, targetUSerScore: ScoreType) {
  const { poster_path, genre_ids, vote_average, overview, id } = movie;
  const scoreText = targetUSerScore ? targetUSerScore + USER_SCORE_TEXT[targetUSerScore] : '';
  console.log(genre_ids);
  return `
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
        <div class="modal-movie-star ${id}"> 내 별점 
          <div class="modal-movie-star">${UserScoreStar(targetUSerScore)}</div>
          ${scoreText}</div>
    </div>`;
}
