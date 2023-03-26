import star_filled from '../assets/star_filled.png';
import star_empty from '../assets/star_empty.png';
import { ScoreType } from '../utils/type';
import { $, Event } from '../utils/index';
import { USER_SCORE_TEXT } from '../CONSTANT';

export function scoreStars() {
  //계속 hover되는 문제점 발생
  Event.addEvent('mouseover', '.modal-movie-star', (event) => {
    const target = event.target as HTMLElement;
    const targetImgElem = target.closest('img') as HTMLImageElement;
    if (!targetImgElem) return;

    const starNumber = (Number(targetImgElem.id.split('-')[2]) * 2) as ScoreType;
    console.log(starNumber);

    const starArea = $('.modal-movie-star-area') as HTMLElement;
    starArea.children[0].innerHTML = showStar(starNumber);

    const scoreText = starNumber ? starNumber + ' ' + USER_SCORE_TEXT[starNumber] : '';
    starArea.children[1].textContent = `${scoreText}`;
  });

  Event.addEvent('click', '.modal-movie-star', (event) => {
    const target = event.target as HTMLElement;
    const targetImgElem = target.closest('img') as HTMLImageElement;
    if (targetImgElem) console.log(targetImgElem.id);
  });

  return `
    <div class="modal-movie-star">

    </div>`;
}

function transStarColor() {}

export function showStar(score: ScoreType) {
  const scoreNumber = score === undefined ? 0 : score;
  const starArray = new Array(5)
    .fill(null)
    .map((_, index) => (index < scoreNumber / 2 ? 'filled' : 'empty'));

  return `
    ${starTemplate(starArray)}`;
}

function starTemplate(starArray: ('filled' | 'empty')[]) {
  return starArray
    .map((state, index) => {
      return `<img id="star-index-${index + 1}" src="${
        state === 'empty' ? star_empty : star_filled
      }" alt="${state === 'empty' ? '빈 별' : '채워진 별'}" />
  `;
    })
    .join('');
}
