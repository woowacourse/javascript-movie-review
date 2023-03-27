import star_filled from '../assets/star_filled.png';
import star_empty from '../assets/star_empty.png';
import { ScoreType } from '../utils/type';
import { $, Event } from '../utils/index';
import { USER_SCORE_TEXT } from '../CONSTANT';
import MovieData from '../data/MovieData';

export function scoreStars() {
  Event.addEvent('mouseover', '.modal-movie-star', (event) => {
    const target = event.target as HTMLElement;
    const targetImgElem = target.closest('img') as HTMLImageElement;
    if (targetImgElem === null) return;

    const starNumber = (Number(targetImgElem.id.split('-')[2]) * 2) as ScoreType;
    showStar(starNumber);

    const starArea = $('.modal-movie-star-area') as HTMLElement;
    const scoreText = starNumber ? starNumber + ' ' + USER_SCORE_TEXT[starNumber] : '';
    starArea.children[1].textContent = `${scoreText}`;
  });

  Event.addEvent('click', '.modal-movie-star', (event) => {
    const target = event.target as HTMLElement;
    const targetImgElem = target.closest('img') as HTMLImageElement;
    if (targetImgElem === null) return;

    const starNumber = (Number(targetImgElem.id.split('-')[2]) * 2) as ScoreType;
    const targetId = Number(targetImgElem.parentElement?.parentElement?.classList[1]);

    MovieData.giveUserScore(targetId, starNumber);
  });

  return `
    <div class="modal-movie-star">
      <img id="star-index-1" src="${star_empty}" alt="빈 별" />
      <img id="star-index-2" src="${star_empty}" alt="빈 별" />
      <img id="star-index-3" src="${star_empty}" alt="빈 별" />
      <img id="star-index-4" src="${star_empty}" alt="빈 별" />
      <img id="star-index-5" src="${star_empty}" alt="빈 별" />
    </div>
    `;
}

export function showStar(score: ScoreType) {
  if (score === undefined) return;
  const stars = $('.modal-movie-star') as HTMLElement;
  for (let i = 0; i <= 4; i++) {
    if (i < score / 2) {
      stars.children[i].setAttribute('src', star_filled);
      stars.children[i].setAttribute('alt', '채워진 별');
    } else {
      stars.children[i].setAttribute('src', star_empty);
      stars.children[i].setAttribute('alt', '빈 별');
    }
  }
}
