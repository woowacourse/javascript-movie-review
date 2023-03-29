import star_empty from '../assets/star_empty.png';
import star_filled from '../assets/star_filled.png';
import { ScoreType } from '../utils/type';
import { $ } from '../utils/index';

export function scoreStars() {
  return `
    <div class="modal-movie-score">
      <img id="star-index-1" class="score" src="${star_empty}" alt="빈 별" />
      <img id="star-index-2" class="score" src="${star_empty}" alt="빈 별" />
      <img id="star-index-3" class="score" src="${star_empty}" alt="빈 별" />
      <img id="star-index-4" class="score" src="${star_empty}" alt="빈 별" />
      <img id="star-index-5" class="score" src="${star_empty}" alt="빈 별" />
    </div>
    `;
}

export function showStar(score: ScoreType) {
  const stars = $('.modal-movie-score') as HTMLElement;
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
