import star_filled from '../assets/star_filled.png';
import star_empty from '../assets/star_empty.png';
import { makePosterImagePath } from '../utils/makePosterImagePath';
import { MovieInterface, ScoreType } from '../utils/type';
import { $, Event } from '../utils/index';
import { scoreStars, showStar } from './UserScoreStar';
import { GENRE, USER_SCORE_TEXT } from '../CONSTANT';

export function MovieInfoModal() {
  Event.addEvent('click', '.modal-close', () => {
    const modalElem = $('.modal-movie-info') as HTMLDialogElement;
    modalElem.close();
  });

  return `
  <dialog class="modal-movie-info">
    <div class="modal-movie-header">
        <p class="modal-movie-name"> </p>
        <button type="button" class="modal-close">X</button>
    </div>
    <div class="modal-movie-detail">
      <img src="" class="modal-movie-poster" alt="poster">
      <div class="modal-movie-detail-text">
        <div class="modal-movie-category">
          <img src="" alt="별점" />
        </div>
        <P class="modal-movie-story"></p>
        <div class="modal-movie-star-area"> 내 별점 
          ${scoreStars()}
          <span class="modal-movie-star-text"></span>
        </div>
      </div>
    </div>
  </dialog>
     `;
}

export function printMovieDetail(
  elem: HTMLDialogElement,
  movie: MovieInterface,
  targetUSerScore: ScoreType
) {
  const { poster_path, genre_ids, vote_average, overview, id } = movie;
  const scoreText = targetUSerScore ? targetUSerScore + USER_SCORE_TEXT[targetUSerScore] : '';

  elem.children[0].children[0].textContent = movie.title;
  elem.children[1].children[0].setAttribute('src', makePosterImagePath(poster_path));
  elem.children[1].children[1].children[0].innerHTML = `<div class="modal-movie-category">
      ${genre_ids.map((id) => GENRE[id]).join(', ')}
      <img src="${vote_average === 0 ? star_empty : star_filled}" alt="별점" />
      ${vote_average}
    </div>`;
  elem.children[1].children[1].children[1].textContent = `${
    overview === '' ? '해당 영화의 줄거리 정보가 없습니다.' : overview
  }`;
  elem.children[1].children[1].children[2].className = `modal-movie-star-area ${id}`;
  console.log(elem.children[1].children[1].children[2].children[0]);

  elem.children[1].children[1].children[2].children[0].innerHTML = showStar(targetUSerScore);
  elem.children[1].children[1].children[2].children[1].textContent = `${scoreText}`;
}
